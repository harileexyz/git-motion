import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { RepoAnalysis, ThemePreset } from "../../core/types";
import { THEMES } from "../themes";
import { ModuleBoundaryView } from "../components/ModuleBoundaryView";
import { HUDOverlay } from "../components/HUDOverlay";

export interface ModuleReelProps {
  analysis: RepoAnalysis;
  moduleId: string;
  themePreset?: ThemePreset;
}

export const ModuleReel: React.FC<ModuleReelProps> = ({
  analysis,
  moduleId,
  themePreset = "tokyo-night",
}) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const theme = THEMES[themePreset] || THEMES["tokyo-night"];

  const moduleInfo = React.useMemo(() => {
    return (
      analysis.modules.find((m) => m.id === moduleId) ||
      analysis.modules[0] || {
        id: moduleId,
        name: moduleId,
        path: moduleId,
        fileCount: 0,
        loc: 0,
        totalCommits: 0,
        primaryLanguage: "TypeScript",
        languages: {},
        inboundDependencies: [],
        outboundDependencies: [],
        files: [],
        color: "#00f3ff",
        churnScore: 0.5,
      }
    );
  }, [analysis, moduleId]);

  const progress = frame / durationInFrames;

  // 4 Phased Walkthrough
  let activePhase = 0;
  let sceneTitle = `Module Spotlight: [${moduleInfo.name}]`;
  let sceneSubtitle = "Subsystem boundary isolation";

  if (frame >= 200 && frame < 420) {
    activePhase = 1;
    sceneTitle = "Internal Component Topology";
    sceneSubtitle = `${moduleInfo.fileCount} files • ${moduleInfo.loc} LOC • ${moduleInfo.primaryLanguage}`;
  } else if (frame >= 420 && frame < 620) {
    activePhase = 2;
    sceneTitle = "Core Logic & Handlers";
    sceneSubtitle = "Internal dataflow & request lifecycle";
  } else if (frame >= 620) {
    activePhase = 3;
    sceneTitle = "Subsystem Health Scorecard";
    sceneSubtitle = "Maintainer velocity & coupling metrics";
  }

  return (
    <AbsoluteFill style={{ backgroundColor: theme.background }}>
      {/* Background radial beacon */}
      <div
        className="absolute w-[800px] h-[600px] rounded-full blur-[160px] pointer-events-none opacity-20"
        style={{
          backgroundColor: moduleInfo.color,
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />

      {/* Structured 3-Column Boundary & Code View */}
      <ModuleBoundaryView
        module={moduleInfo}
        allFiles={analysis.files}
        theme={theme}
        activePhase={activePhase}
      />

      {/* Futuristic HUD */}
      <HUDOverlay
        theme={theme}
        repoName={analysis.name}
        branch={analysis.branch}
        totalCommits={analysis.totalCommits}
        totalFiles={analysis.totalFiles}
        currentSceneTitle={sceneTitle}
        currentSceneSubtitle={sceneSubtitle}
        progress={progress}
      />
    </AbsoluteFill>
  );
};
