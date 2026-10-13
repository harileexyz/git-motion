import fs from "fs";
import path from "path";
import { FileNode, DependencyLink, ModuleCluster, SupportedLanguage } from "../core/types";

// Language color palette
export const LANGUAGE_COLORS: Record<SupportedLanguage, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f7df1e",
  Python: "#3572a5",
  Go: "#00add8",
  Rust: "#dea584",
  Java: "#b07219",
  "C/C++": "#f34b7d",
  Ruby: "#701516",
  PHP: "#4f5d95",
  Swift: "#f05138",
  Kotlin: "#a97bff",
  Shell: "#89e051",
  "HTML/CSS": "#e34c26",
  Other: "#6e7681",
};

// Extension mapping
const EXTENSION_MAP: Record<string, SupportedLanguage> = {
  ".ts": "TypeScript",
  ".tsx": "TypeScript",
  ".js": "JavaScript",
  ".jsx": "JavaScript",
  ".mjs": "JavaScript",
  ".cjs": "JavaScript",
  ".py": "Python",
  ".go": "Go",
  ".rs": "Rust",
  ".java": "Java",
  ".c": "C/C++",
  ".cpp": "C/C++",
  ".cc": "C/C++",
  ".h": "C/C++",
  ".hpp": "C/C++",
  ".rb": "Ruby",
  ".php": "PHP",
  ".swift": "Swift",
  ".kt": "Kotlin",
  ".kts": "Kotlin",
  ".sh": "Shell",
  ".bash": "Shell",
  ".zsh": "Shell",
  ".html": "HTML/CSS",
  ".css": "HTML/CSS",
  ".scss": "HTML/CSS",
};

const IGNORED_DIRS = new Set([
  "node_modules",
  ".git",
  ".github",
  "dist",
  "build",
  "target",
  "vendor",
  "__pycache__",
  ".next",
  ".nuxt",
  ".output",
  ".venv",
  "venv",
  "coverage",
  ".turbo",
  ".agents",
]);

const IGNORED_FILES = new Set([
  "package-lock.json",
  "pnpm-lock.yaml",
  "yarn.lock",
  "Cargo.lock",
  "go.sum",
  "poetry.lock",
  "composer.lock",
  ".DS_Store",
]);

export interface ScanResult {
  files: FileNode[];
  links: DependencyLink[];
  modules: ModuleCluster[];
}

export function scanRepository(rootDir: string): ScanResult {
  const fileNodes: FileNode[] = [];
  const relativeFilePaths: string[] = [];

  function traverse(currentDir: string) {
    let entries: fs.Dirent[];
    try {
      entries = fs.readdirSync(currentDir, { withFileTypes: true });
    } catch {
      return;
    }

    for (const entry of entries) {
      if (entry.isDirectory()) {
        if (IGNORED_DIRS.has(entry.name) || entry.name.startsWith(".")) {
          continue;
        }
        traverse(path.join(currentDir, entry.name));
      } else if (entry.isFile()) {
        if (IGNORED_FILES.has(entry.name) || entry.name.startsWith(".")) {
          continue;
        }

        const ext = path.extname(entry.name).toLowerCase();
        const language = EXTENSION_MAP[ext] || "Other";
        if (language === "Other" && ![".json", ".yaml", ".yml", ".md", ".toml"].includes(ext)) {
          continue;
        }

        const fullPath = path.join(currentDir, entry.name);
        const relPath = path.relative(rootDir, fullPath).replace(/\\/g, "/");

        let stats: fs.Stats;
        let loc = 0;
        try {
          stats = fs.statSync(fullPath);
          if (stats.size > 1024 * 1024) continue; // Skip huge generated files (>1MB)
          const content = fs.readFileSync(fullPath, "utf-8");
          loc = content.split("\n").length;
        } catch {
          continue;
        }

        const moduleName = deriveModuleName(relPath);

        fileNodes.push({
          id: relPath,
          name: entry.name,
          path: relPath,
          module: moduleName,
          extension: ext,
          language,
          size: stats.size,
          loc,
          commitCount: 1, // Will be enriched by git parser
          churnScore: 0.1,
          lastModified: stats.mtimeMs,
          color: LANGUAGE_COLORS[language] || "#6e7681",
        });

        relativeFilePaths.push(relPath);
      }
    }
  }

  traverse(rootDir);

  // Extract universal dependency links
  const links = extractUniversalLinks(rootDir, fileNodes);

  // Group files into cohesive modules
  const modules = clusterModules(fileNodes, links);

  return {
    files: fileNodes,
    links,
    modules,
  };
}

function deriveModuleName(relPath: string): string {
  const parts = relPath.split("/");
  if (parts.length === 1) return "root";

  // Common root wrappers: src/foo, packages/foo, internal/foo, lib/foo, app/foo
  const roots = ["src", "packages", "internal", "pkg", "lib", "app", "cmd", "modules"];
  if (roots.includes(parts[0]) && parts.length > 2) {
    return parts[1]; // e.g. "src/auth/token.ts" -> "auth"
  }

  return parts[0]; // e.g. "auth/token.ts" -> "auth"
}

function extractUniversalLinks(rootDir: string, files: FileNode[]): DependencyLink[] {
  const links: DependencyLink[] = [];
  const fileSet = new Set(files.map((f) => f.id));
  const fileBasenameMap = new Map<string, string[]>();

  for (const f of files) {
    const base = path.basename(f.id, f.extension);
    const existing = fileBasenameMap.get(base) || [];
    existing.push(f.id);
    fileBasenameMap.set(base, existing);
  }

  for (const file of files) {
    let content = "";
    try {
      content = fs.readFileSync(path.join(rootDir, file.id), "utf-8");
    } catch {
      continue;
    }

    const targets = new Set<string>();

    // 1. JS / TS imports: import ... from './path' or require('./path')
    const jsMatches = content.matchAll(/(?:from\s+['"]([^'"]+)['"]|require\(['"]([^'"]+)['"]\))/g);
    for (const match of jsMatches) {
      const imp = match[1] || match[2];
      if (imp && imp.startsWith(".")) {
        const resolved = resolveRelativeImport(file.id, imp, fileSet);
        if (resolved) targets.add(resolved);
      }
    }

    // 2. Python imports: from .path import x or from path import x
    const pyMatches = content.matchAll(/(?:from\s+([a-zA-Z0-9_.]+)\s+import|import\s+([a-zA-Z0-9_.]+))/g);
    for (const match of pyMatches) {
      const pkg = (match[1] || match[2] || "").replace(/\./g, "/");
      const candidates = fileBasenameMap.get(path.basename(pkg)) || [];
      for (const cand of candidates) {
        if (cand !== file.id) targets.add(cand);
      }
    }

    // 3. Go imports: "github.com/org/repo/pkg/foo" or "./foo"
    const goMatches = content.matchAll(/"([^"]+)"/g);
    for (const match of goMatches) {
      const imp = match[1];
      const base = path.basename(imp);
      const candidates = fileBasenameMap.get(base) || [];
      for (const cand of candidates) {
        if (cand !== file.id) targets.add(cand);
      }
    }

    // 4. Rust use: use crate::foo::bar
    const rsMatches = content.matchAll(/use\s+(?:crate::)?([a-zA-Z0-9_]+)::([a-zA-Z0-9_]+)/g);
    for (const match of rsMatches) {
      const modName = match[2] || match[1];
      const candidates = fileBasenameMap.get(modName) || [];
      for (const cand of candidates) {
        if (cand !== file.id) targets.add(cand);
      }
    }

    for (const targetId of targets) {
      if (targetId !== file.id) {
        links.push({
          source: file.id,
          target: targetId,
          type: "import",
          weight: 1,
        });
      }
    }
  }

  return links;
}

function resolveRelativeImport(sourcePath: string, importPath: string, fileSet: Set<string>): string | null {
  const dir = path.dirname(sourcePath);
  const normalized = path.normalize(path.join(dir, importPath)).replace(/\\/g, "/");

  // Try exact match or extensions
  const candidates = [
    normalized,
    `${normalized}.ts`,
    `${normalized}.tsx`,
    `${normalized}.js`,
    `${normalized}.jsx`,
    `${normalized}/index.ts`,
    `${normalized}/index.js`,
  ];

  for (const cand of candidates) {
    if (fileSet.has(cand)) return cand;
  }

  return null;
}

function clusterModules(files: FileNode[], links: DependencyLink[]): ModuleCluster[] {
  const moduleMap = new Map<string, { files: FileNode[]; languages: Record<string, number> }>();

  for (const f of files) {
    const mod = f.module;
    const entry = moduleMap.get(mod) || { files: [], languages: {} };
    entry.files.push(f);
    entry.languages[f.language] = (entry.languages[f.language] || 0) + 1;
    moduleMap.set(mod, entry);
  }

  // Pre-build file -> module lookup
  const fileToModule = new Map<string, string>();
  for (const f of files) {
    fileToModule.set(f.id, f.module);
  }

  const clusters: ModuleCluster[] = [];
  const palette = ["#00f3ff", "#bd00ff", "#ff007f", "#10b981", "#f59e0b", "#3b82f6", "#ec4899", "#8b5cf6"];
  let colorIndex = 0;

  for (const [modId, data] of moduleMap.entries()) {
    const fileIds = data.files.map((f) => f.id);
    const totalLoc = data.files.reduce((acc, f) => acc + f.loc, 0);

    // Primary language
    let primaryLanguage: SupportedLanguage = "TypeScript";
    let maxLangCount = 0;
    for (const [lang, count] of Object.entries(data.languages)) {
      if (count > maxLangCount) {
        maxLangCount = count;
        primaryLanguage = lang as SupportedLanguage;
      }
    }

    // Inbound & Outbound dependencies
    const inbound = new Set<string>();
    const outbound = new Set<string>();

    for (const link of links) {
      const srcMod = fileToModule.get(link.source);
      const tgtMod = fileToModule.get(link.target);

      if (srcMod && tgtMod && srcMod !== tgtMod) {
        if (tgtMod === modId) inbound.add(srcMod);
        if (srcMod === modId) outbound.add(tgtMod);
      }
    }

    const assignedColor = palette[colorIndex % palette.length];
    colorIndex++;

    clusters.push({
      id: modId,
      name: modId.charAt(0).toUpperCase() + modId.slice(1),
      path: modId,
      fileCount: data.files.length,
      loc: totalLoc,
      totalCommits: data.files.length * 3, // Initial estimate, git parser will refine
      primaryLanguage,
      languages: data.languages,
      inboundDependencies: Array.from(inbound),
      outboundDependencies: Array.from(outbound),
      files: fileIds,
      color: assignedColor,
      churnScore: 0.5,
    });
  }

  // Sort by file count descending
  return clusters.sort((a, b) => b.fileCount - a.fileCount);
}
