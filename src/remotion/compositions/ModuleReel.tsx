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

  // Exact step frame boundaries matching measured Kokoro audio durations:
  // Phase 1: 0 -> 175 frames (module_step1.mp3: 161 frames)
  // Phase 2: 175 -> 325 frames (module_step2.mp3: 138 frames)
  // Phase 3: 325 -> 465 frames (module_step3.mp3: 124 frames)
  // Phase 4: 465 -> 625 frames (module_step4.mp3: 136 frames)
  let activePhase = 0;
  let sceneTitle = `1. Ingestion: [${moduleInfo.name}]`;
  let captionText =
    "This shows just one part of your project. On the left, you can see which other folders use this code.";
  let highlightWords = ["one", "part", "project", "left", "folders", "use", "code"];
  let accentColor = "#38bdf8"; // Sky Blue

  if (frame >= 175 && frame < 325) {
    activePhase = 1;
    sceneTitle = "2. Under-The-Hood Execution";
    captionText =
      "Here in the middle are all the files inside this folder, so you can see where everything lives.";
    highlightWords = ["middle", "files", "folder", "where", "everything", "lives"];
    accentColor = "#00f3ff"; // Cyan
  } else if (frame >= 325 && frame < 465) {
    activePhase = 2;
    sceneTitle = "3. Core Code Processing";
    captionText =
      "Here is the main code file that actually does the work for this part of your app.";
    highlightWords = ["main", "code", "file", "work", "app"];
    accentColor = "#ff967d"; // Semicolon Coral
  } else if (frame >= 465) {
    activePhase = 3;
    sceneTitle = "4. Delivering Outputs";
    captionText =
      "And on the right, you see what outside tools and libraries this folder needs to run.";
    highlightWords = ["right", "outside", "tools", "libraries", "needs", "run"];
    accentColor = "#c4ff78"; // Semicolon Mint
  }

  return (
    <AbsoluteFill style={{ backgroundColor: "#0b1628" }}>
      {/* Semicolon Kokoro af_heart Voice Narration (Universal MP3, instant decode) */}
      <Sequence from={0} durationInFrames={175}>
        <Audio src={staticFile("audio/voice/module_step1.mp3")} volume={1.0} />
      </Sequence>
      <Sequence from={175} durationInFrames={150}>
        <Audio src={staticFile("audio/voice/module_step2.mp3")} volume={1.0} />
      </Sequence>
      <Sequence from={325} durationInFrames={140}>
        <Audio src={staticFile("audio/voice/module_step3.mp3")} volume={1.0} />
      </Sequence>
      <Sequence from={465} durationInFrames={160}>
        <Audio src={staticFile("audio/voice/module_step4.mp3")} volume={1.0} />
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

      {/* Futuristic HUD with top-edge progress bar (NO bottom overlap) */}
      <HUDOverlay
        theme={{ ...theme, accent: accentColor }}
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
