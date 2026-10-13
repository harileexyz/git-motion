export type SupportedLanguage =
  | "TypeScript"
  | "JavaScript"
  | "Python"
  | "Go"
  | "Rust"
  | "Java"
  | "C/C++"
  | "Ruby"
  | "PHP"
  | "Swift"
  | "Kotlin"
  | "Shell"
  | "HTML/CSS"
  | "Other";

export interface FileNode {
  id: string; // Relative path, e.g. "src/auth/token.ts"
  name: string; // "token.ts"
  path: string;
  module: string; // Module identifier, e.g. "auth"
  extension: string;
  language: SupportedLanguage;
  size: number;
  loc: number;
  commitCount: number;
  churnScore: number; // 0.0 - 1.0
  lastModified: number;
  color: string;
  // Position calculated by layout engine
  x?: number;
  y?: number;
  vx?: number;
  vy?: number;
}

export interface DependencyLink {
  source: string; // FileNode id
  target: string; // FileNode id
  type: "import" | "co_commit" | "parent";
  weight: number;
}

export interface ModuleCluster {
  id: string; // e.g. "auth"
  name: string;
  path: string;
  fileCount: number;
  loc: number;
  totalCommits: number;
  primaryLanguage: SupportedLanguage;
  languages: Record<string, number>;
  inboundDependencies: string[]; // Modules calling this module
  outboundDependencies: string[]; // Modules called by this module
  files: string[]; // File IDs
  color: string;
  churnScore: number;
}

export interface Contributor {
  name: string;
  email: string;
  commits: number;
}

export interface RepoAnalysis {
  name: string;
  rootPath: string;
  branch: string;
  totalFiles: number;
  totalLOC: number;
  totalCommits: number;
  contributors: Contributor[];
  modules: ModuleCluster[];
  files: FileNode[];
  links: DependencyLink[];
  hotspots: FileNode[];
  timeline: {
    hash: string;
    author: string;
    date: string;
    message: string;
  }[];
}

export type ThemePreset = "tokyo-night" | "cyberpunk" | "catppuccin" | "monokai";

export interface ThemeColors {
  name: string;
  background: string;
  canvasCard: string;
  textPrimary: string;
  textSecondary: string;
  accent: string;
  accentGlow: string;
  edge: string;
  edgeActive: string;
  heatmapHot: string;
  heatmapWarm: string;
  heatmapCold: string;
}

export interface StoryboardConfig {
  mode: "overview" | "module";
  selectedModuleId?: string;
  theme: ThemePreset;
  aspectRatio: "16:9" | "9:16";
  durationSeconds: number;
  fps: number;
  showCodeCards: boolean;
  pulseSpeed: number;
}
