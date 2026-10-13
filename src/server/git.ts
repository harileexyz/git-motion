import { execSync } from "child_process";
import { Contributor, FileNode } from "../core/types";

export interface GitAnalysisResult {
  branch: string;
  totalCommits: number;
  contributors: Contributor[];
  fileCommitMap: Map<string, number>;
  fileChurnMap: Map<string, number>;
  timeline: {
    hash: string;
    author: string;
    date: string;
    message: string;
  }[];
}

export function analyzeGitRepo(rootDir: string): GitAnalysisResult {
  let branch = "main";
  let totalCommits = 0;
  const contributors: Contributor[] = [];
  const fileCommitMap = new Map<string, number>();
  const fileChurnMap = new Map<string, number>();
  const timeline: { hash: string; author: string; date: string; message: string }[] = [];

  try {
    // Current branch
    branch = execSync("git rev-parse --abbrev-ref HEAD", { cwd: rootDir, encoding: "utf-8" }).trim();
  } catch {
    branch = "main";
  }

  try {
    // Total commits
    const countStr = execSync("git rev-list --count HEAD", { cwd: rootDir, encoding: "utf-8" }).trim();
    totalCommits = parseInt(countStr, 10) || 0;
  } catch {
    totalCommits = 0;
  }

  try {
    // Recent commit timeline (up to 30)
    const logRaw = execSync('git log -n 30 --pretty=format:"%h|%an|%ad|%s"', {
      cwd: rootDir,
      encoding: "utf-8",
    }).trim();

    if (logRaw) {
      for (const line of logRaw.split("\n")) {
        const [hash, author, date, message] = line.split("|");
        if (hash) {
          timeline.push({ hash, author: author || "Unknown", date: date || "", message: message || "" });
        }
      }
    }
  } catch {
    // Non-fatal if git log fails
  }

  try {
    // Contributors
    const shortlogRaw = execSync("git shortlog -sne HEAD", { cwd: rootDir, encoding: "utf-8" }).trim();
    if (shortlogRaw) {
      for (const line of shortlogRaw.split("\n")) {
        const match = line.trim().match(/^(\d+)\s+(.+)\s+<(.+)>$/);
        if (match) {
          contributors.push({
            commits: parseInt(match[1], 10),
            name: match[2],
            email: match[3],
          });
        }
      }
    }
  } catch {
    // Non-fatal
  }

  try {
    // Per-file commit count & churn
    const nameOnlyRaw = execSync("git log --name-only --pretty=format:''", {
      cwd: rootDir,
      encoding: "utf-8",
      maxBuffer: 10 * 1024 * 1024,
    });

    for (const file of nameOnlyRaw.split("\n")) {
      const trimmed = file.trim().replace(/\\/g, "/");
      if (!trimmed) continue;
      fileCommitMap.set(trimmed, (fileCommitMap.get(trimmed) || 0) + 1);
    }
  } catch {
    // Non-fatal
  }

  return {
    branch,
    totalCommits,
    contributors,
    fileCommitMap,
    fileChurnMap,
    timeline,
  };
}

export function enrichFilesWithGit(files: FileNode[], gitInfo: GitAnalysisResult): { files: FileNode[]; hotspots: FileNode[] } {
  let maxCommits = 1;

  for (const f of files) {
    const commits = gitInfo.fileCommitMap.get(f.id) || 1;
    f.commitCount = commits;
    if (commits > maxCommits) maxCommits = commits;
  }

  for (const f of files) {
    // Calculate normalized churn score (0.05 to 1.0)
    const normalized = Math.min(1.0, Math.max(0.05, f.commitCount / maxCommits));
    f.churnScore = parseFloat(normalized.toFixed(2));
  }

  // Hotspots: top files by commit count
  const hotspots = [...files]
    .sort((a, b) => b.commitCount - a.commitCount)
    .slice(0, 8);

  return { files, hotspots };
}
