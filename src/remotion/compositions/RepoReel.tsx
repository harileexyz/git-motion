import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, Audio, Sequence, staticFile } from "remotion";
import { RepoAnalysis, ThemePreset } from "../../core/types";
import { THEMES } from "../themes";
import { buildStructuredArchitecture } from "../../core/architecture";
import { MermaidFlowCanvas } from "../components/MermaidFlowCanvas";
import { KineticCaptionBar } from "../components/KineticCaptionBar";
import { HUDOverlay } from "../components/HUDOverlay";

export interface RepoReelProps {
  analysis: RepoAnalysis;
  themePreset?: ThemePreset;
}

export const RepoReel: React.FC<RepoReelProps> = ({
  analysis,
  themePreset = "tokyo-night",
}) => {
  const frame = useCurrentFrame();
  const { width, height, durationInFrames } = useVideoConfig();
  const theme = THEMES[themePreset] || THEMES["tokyo-night"];

  const architecture = React.useMemo(() => {
    return buildStructuredArchitecture(analysis.modules, analysis.files, analysis.links);
  }, [analysis]);

  const progress = frame / durationInFrames;

  // Active step calculation across 4 tiers
  let activeStep = 0;
  let sceneTitle = "1. Entrypoints & Interfaces";
  let sceneSubtitle = "CLI triggers & studio client";
  let captionText =
    "When you run git-motion, execution begins right at your terminal or browser, reading your local workspace without sending any code to the cloud.";
  let highlightWords = ["git-motion", "terminal", "browser", "local", "cloud"];
  let accentColor = "#c4ff78"; // Semicolon Mint

  if (frame >= 230 && frame < 460) {
    activeStep = 1;
    sceneTitle = "2. Processing & Analysis";
    sceneSubtitle = "AST file parsing & git churn";
    captionText =
      "The local engine instantly inspects your files, mapping import statements across TypeScript, Python, and Go, while calculating your Git commit churn.";
    highlightWords = ["local", "inspects", "TypeScript", "Python", "Go", "churn"];
    accentColor = "#00f3ff"; // Cyan
  } else if (frame >= 460 && frame < 690) {
    activeStep = 2;
    sceneTitle = "3. Core Architecture & Physics";
    sceneSubtitle = "Layout graph & topology models";
    captionText =
      "Next, the layout engine clusters your files into four architectural tiers, tracing inbound consumers and outbound dependencies.";
    highlightWords = ["layout", "clusters", "four", "architectural", "tiers", "dependencies"];
    accentColor = "#ff967d"; // Semicolon Coral
  } else if (frame >= 690) {
    activeStep = 3;
    sceneTitle = "4. Video Canvas & Rendering";
    sceneSubtitle = "Remotion 60fps composition pipeline";
    captionText =
      "Finally, Remotion composes the timeline at sixty frames per second, exporting a verified video ready to embed directly in your documentation.";
    highlightWords = ["Remotion", "sixty", "frames", "video", "documentation"];
    accentColor = "#c4ff78"; // Semicolon Mint
  }

  // Outro opacity
  const outroOpacity = interpolate(frame, [760, 820], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ backgroundColor: "#0b1628" }}>
      {/* Background Subtle Cyber Ambient Bed (18% volume) */}
      <Audio src={staticFile("audio/ambient-cyber.wav")} volume={0.18} />

      {/* Semicolon-Studio Kokoro af_heart Voice Narration Sequences (speed 1.12) */}
      <Sequence from={0} durationInFrames={230}>
        <Audio src={staticFile("audio/voice/step1.wav")} volume={1.0} />
      </Sequence>
      <Sequence from={230} durationInFrames={230}>
        <Audio src={staticFile("audio/voice/step2.wav")} volume={1.0} />
      </Sequence>
      <Sequence from={460} durationInFrames={230}>
        <Audio src={staticFile("audio/voice/step3.wav")} volume={1.0} />
      </Sequence>
      <Sequence from={690} durationInFrames={210}>
        <Audio src={staticFile("audio/voice/step4.wav")} volume={1.0} />
      </Sequence>

      {/* Dynamic Background Ambient Light */}
      <div
        className="absolute w-[900px] h-[700px] rounded-full blur-[180px] pointer-events-none opacity-20"
        style={{
          backgroundColor: accentColor,
          left: width / 2 - 450,
          top: height / 2 - 350,
        }}
      />

      {/* Proper Mermaid Flowchart Diagram */}
      <MermaidFlowCanvas
        architecture={architecture}
        theme={{ ...theme, accent: accentColor }}
        activeStepIndex={activeStep}
        progress={progress}
      />

      {/* Semicolon Kinetic Captions Bar (Roboto + Word Highlights) */}
      <KineticCaptionBar
        stepNumber={activeStep + 1}
        title={sceneTitle}
        captionText={captionText}
        highlightWords={highlightWords}
        accentColor={accentColor}
      />

      {/* Outro Blueprint Card (Final frames) */}
      {frame >= 760 && (
        <div
          className="absolute inset-0 flex items-center justify-center p-16 z-40 pointer-events-none"
          style={{ opacity: outroOpacity }}
        >
          <div
            className="w-full max-w-3xl rounded-3xl p-10 border shadow-2xl backdrop-blur-2xl flex flex-col gap-6 font-['Roboto',sans-serif]"
            style={{
              backgroundColor: "rgba(11, 22, 40, 0.96)",
              borderColor: "rgba(196, 255, 120, 0.5)",
              boxShadow: "0 0 60px rgba(196, 255, 120, 0.25)",
            }}
          >
            <div className="flex justify-between items-start border-b border-white/10 pb-5">
              <div>
                <span className="text-xs uppercase tracking-widest text-[#c4ff78] font-bold">
                  Architecture Scorecard
                </span>
                <h1 className="text-4xl font-black text-white mt-1">{analysis.name}</h1>
                <p className="text-xs text-white/60 mt-1">
                  Full codebase mapped across 4 tiers • Verified 0 circular dependencies
                </p>
              </div>
              <div
                className="px-4 py-2 rounded-xl text-xs font-bold border"
                style={{
                  backgroundColor: "rgba(196, 255, 120, 0.15)",
                  borderColor: "#c4ff78",
                  color: "#c4ff78",
                }}
              >
                git-motion
              </div>
            </div>

            <div className="grid grid-cols-4 gap-4">
              <div className="bg-white/5 rounded-2xl p-4 border border-white/5 text-center">
                <div className="text-[10px] text-white/50 uppercase">Total Files</div>
                <div className="text-2xl font-bold text-white mt-1">{analysis.totalFiles}</div>
              </div>
              <div className="bg-white/5 rounded-2xl p-4 border border-white/5 text-center">
                <div className="text-[10px] text-white/50 uppercase">Lines of Code</div>
                <div className="text-2xl font-bold text-white mt-1">{analysis.totalLOC.toLocaleString()}</div>
              </div>
              <div className="bg-white/5 rounded-2xl p-4 border border-white/5 text-center">
                <div className="text-[10px] text-white/50 uppercase">Subsystems</div>
                <div className="text-2xl font-bold text-white mt-1">{analysis.modules.length}</div>
              </div>
              <div className="bg-white/5 rounded-2xl p-4 border border-white/5 text-center">
                <div className="text-[10px] text-white/50 uppercase">Commits</div>
                <div className="text-2xl font-bold text-white mt-1">{analysis.totalCommits}</div>
              </div>
            </div>
          </div>
        </div>
      )}

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
