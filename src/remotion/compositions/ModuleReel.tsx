import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, Audio, Sequence, staticFile } from "remotion";
import { RepoAnalysis, ThemePreset } from "../../core/types";
import { THEMES } from "../themes";
import { ModuleBoundaryView } from "../components/ModuleBoundaryView";
import { KineticCaptionBar } from "../components/KineticCaptionBar";
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
        color: "#c4ff78",
        churnScore: 0.5,
      }
    );
  }, [analysis, moduleId]);

  const progress = frame / durationInFrames;

  // 4 Phased Walkthrough
  let activePhase = 0;
  let sceneTitle = `Module Spotlight: [${moduleInfo.name}]`;
  let captionText =
    "This is the subsystem boundary spotlight. On the left, we map all inbound consumers that import this module.";
  let highlightWords = ["subsystem", "boundary", "inbound", "consumers", "module"];
  let accentColor = "#c4ff78";

  if (frame >= 190 && frame < 400) {
    activePhase = 1;
    sceneTitle = "Internal Component Topology";
    captionText =
      "In the center, we inspect the module's internal file anatomy, language breakdown, and total lines of verified code.";
    highlightWords = ["internal", "anatomy", "language", "lines", "verified"];
    accentColor = "#00f3ff";
  } else if (frame >= 400 && frame < 590) {
    activePhase = 2;
    sceneTitle = "Core Logic & Handlers";
    captionText =
      "Here is the core handler logic, orchestrating state transformations within this architectural boundary.";
    highlightWords = ["core", "handler", "state", "transformations", "boundary"];
    accentColor = "#ff967d";
  } else if (frame >= 590) {
    activePhase = 3;
    sceneTitle = "Subsystem Health Scorecard";
    captionText =
      "On the right, we track outbound dependencies required by this module to complete execution.";
    highlightWords = ["outbound", "dependencies", "complete", "execution"];
    accentColor = "#c4ff78";
  }

  return (
    <AbsoluteFill style={{ backgroundColor: "#0b1628" }}>
      {/* Background Soft Cyber Ambient Bed */}
      <Audio src={staticFile("audio/ambient-cyber.wav")} volume={0.18} />

      {/* Semicolon-Studio Kokoro af_heart Voice Narration Sequences for Module Spotlight */}
      <Sequence from={0} durationInFrames={190}>
        <Audio src={staticFile("audio/voice/module_step1.wav")} volume={1.0} />
      </Sequence>
      <Sequence from={190} durationInFrames={210}>
        <Audio src={staticFile("audio/voice/module_step2.wav")} volume={1.0} />
      </Sequence>
      <Sequence from={400} durationInFrames={190}>
        <Audio src={staticFile("audio/voice/module_step3.wav")} volume={1.0} />
      </Sequence>
      <Sequence from={590} durationInFrames={160}>
        <Audio src={staticFile("audio/voice/module_step4.wav")} volume={1.0} />
      </Sequence>

      {/* Background radial beacon */}
      <div
        className="absolute w-[800px] h-[600px] rounded-full blur-[160px] pointer-events-none opacity-20"
        style={{
          backgroundColor: accentColor,
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />

      {/* Structured 3-Column Boundary & Code View */}
      <ModuleBoundaryView
        module={moduleInfo}
        allFiles={analysis.files}
        theme={{ ...theme, accent: accentColor }}
        activePhase={activePhase}
      />

      {/* Semicolon Kinetic Captions Bar */}
      <KineticCaptionBar
        stepNumber={activePhase + 1}
        title={sceneTitle}
        captionText={captionText}
        highlightWords={highlightWords}
        accentColor={accentColor}
      />

      {/* Futuristic HUD */}
      <HUDOverlay
        theme={theme}
        repoName={analysis.name}
        branch={analysis.branch}
        totalCommits={analysis.totalCommits}
        totalFiles={analysis.totalFiles}
        currentSceneTitle={sceneTitle}
        currentSceneSubtitle={`${moduleInfo.fileCount} files • ${moduleInfo.loc} LOC`}
        progress={progress}
      />
    </AbsoluteFill>
  );
};
