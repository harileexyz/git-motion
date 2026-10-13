import React from "react";
import { Composition } from "remotion";
import { RepoReel, RepoReelProps } from "./compositions/RepoReel";
import { ModuleReel, ModuleReelProps } from "./compositions/ModuleReel";
import { RepoAnalysis } from "../core/types";

// Default mock analysis for Remotion preview fallback
const DEFAULT_MOCK_ANALYSIS: RepoAnalysis = {
  name: "git-motion",
  rootPath: ".",
  branch: "main",
  totalFiles: 24,
  totalLOC: 3200,
  totalCommits: 48,
  contributors: [{ name: "harileexyz", email: "dev@gitmotion.io", commits: 48 }],
  modules: [
    {
      id: "core",
      name: "Core Engine",
      path: "src/core",
      fileCount: 4,
      loc: 820,
      totalCommits: 18,
      primaryLanguage: "TypeScript",
      languages: { TypeScript: 4 },
      inboundDependencies: ["cli", "studio", "server"],
      outboundDependencies: [],
      files: ["src/core/types.ts", "src/core/layout.ts"],
      color: "#00f3ff",
      churnScore: 0.8,
    },
    {
      id: "remotion",
      name: "Video Canvas",
      path: "src/remotion",
      fileCount: 6,
      loc: 1100,
      totalCommits: 22,
      primaryLanguage: "TypeScript",
      languages: { TypeScript: 6 },
      inboundDependencies: ["studio", "server"],
      outboundDependencies: ["core"],
      files: ["src/remotion/Root.tsx", "src/remotion/compositions/RepoReel.tsx"],
      color: "#bd00ff",
      churnScore: 0.9,
    },
    {
      id: "studio",
      name: "Web Studio",
      path: "src/studio",
      fileCount: 8,
      loc: 950,
      totalCommits: 14,
      primaryLanguage: "TypeScript",
      languages: { TypeScript: 8 },
      inboundDependencies: ["cli"],
      outboundDependencies: ["core", "remotion"],
      files: ["src/studio/App.tsx", "src/studio/main.tsx"],
      color: "#10b981",
      churnScore: 0.7,
    },
  ],
  files: [
    {
      id: "src/core/types.ts",
      name: "types.ts",
      path: "src/core/types.ts",
      module: "core",
      extension: ".ts",
      language: "TypeScript",
      size: 2100,
      loc: 110,
      commitCount: 12,
      churnScore: 0.6,
      lastModified: Date.now(),
      color: "#3178c6",
    },
    {
      id: "src/core/layout.ts",
      name: "layout.ts",
      path: "src/core/layout.ts",
      module: "core",
      extension: ".ts",
      language: "TypeScript",
      size: 3400,
      loc: 160,
      commitCount: 18,
      churnScore: 0.9,
      lastModified: Date.now(),
      color: "#3178c6",
    },
    {
      id: "src/remotion/Root.tsx",
      name: "Root.tsx",
      path: "src/remotion/Root.tsx",
      module: "remotion",
      extension: ".tsx",
      language: "TypeScript",
      size: 2800,
      loc: 130,
      commitCount: 8,
      churnScore: 0.4,
      lastModified: Date.now(),
      color: "#3178c6",
    },
    {
      id: "src/studio/App.tsx",
      name: "App.tsx",
      path: "src/studio/App.tsx",
      module: "studio",
      extension: ".tsx",
      language: "TypeScript",
      size: 4200,
      loc: 210,
      commitCount: 15,
      churnScore: 0.7,
      lastModified: Date.now(),
      color: "#3178c6",
    },
  ],
  links: [
    { source: "src/core/layout.ts", target: "src/core/types.ts", type: "import", weight: 1 },
    { source: "src/remotion/Root.tsx", target: "src/core/types.ts", type: "import", weight: 1 },
    { source: "src/studio/App.tsx", target: "src/core/types.ts", type: "import", weight: 1 },
  ],
  hotspots: [
    {
      id: "src/core/layout.ts",
      name: "layout.ts",
      path: "src/core/layout.ts",
      module: "core",
      extension: ".ts",
      language: "TypeScript",
      size: 3400,
      loc: 160,
      commitCount: 18,
      churnScore: 0.9,
      lastModified: Date.now(),
      color: "#3178c6",
    },
  ],
  timeline: [],
};

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* 16:9 Landscape Full Repo Overview */}
      <Composition
        id="RepoOverview"
        component={RepoReel as any}
        durationInFrames={1060}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{
          analysis: DEFAULT_MOCK_ANALYSIS,
          themePreset: "tokyo-night",
        }}
      />

      {/* 16:9 Landscape Module Spotlight */}
      <Composition
        id="ModuleSpotlight"
        component={ModuleReel as any}
        durationInFrames={900}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{
          analysis: DEFAULT_MOCK_ANALYSIS,
          moduleId: "core",
          themePreset: "tokyo-night",
        }}
      />

      {/* 9:16 Vertical Shorts / Reels Repo Overview */}
      <Composition
        id="VerticalOverview"
        component={RepoReel as any}
        durationInFrames={1060}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          analysis: DEFAULT_MOCK_ANALYSIS,
          themePreset: "cyberpunk",
        }}
      />

      {/* 9:16 Vertical Module Spotlight */}
      <Composition
        id="VerticalModule"
        component={ModuleReel as any}
        durationInFrames={900}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          analysis: DEFAULT_MOCK_ANALYSIS,
          moduleId: "core",
          themePreset: "cyberpunk",
        }}
      />
    </>
  );
};
