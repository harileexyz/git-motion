import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, Audio, staticFile } from "remotion";
import { RepoAnalysis, ThemePreset } from "../../core/types";
import { THEMES } from "../themes";
import { AnimatedArchitectureDiagram } from "../components/AnimatedArchitectureDiagram";
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

  const progress = frame / durationInFrames;

  // Exact step frame boundaries from stitched Kokoro narration: [0, 443, 884, 1238]
  let activeStep = 0;
  let sceneTitle = "1. Ingestion & Workspace Boot";
  let sceneSubtitle = "Local workstation runtime";
  let captionText =
    "When git motion starts, it runs locally on your workstation with zero cloud dependencies. It boots an Express daemon on port 4321 and mounts the Vite studio interface for immediate architectural inspection.";
  let highlightWords = ["git motion", "locally", "workstation", "zero", "cloud", "Express", "daemon", "4321", "Vite", "studio", "architectural"];
  let accentColor = "#38bdf8"; // Sky Blue

  if (frame >= 443 && frame < 884) {
    activeStep = 1;
    sceneTitle = "2. AST Scanner & Git Churn";
    sceneSubtitle = "Multi-language token parsing";
    captionText =
      "Next, the ingestion pipeline traverses your repository with multi language AST token parsers. It maps file import edges and calculates git churn scores using normalized commit frequency and line alterations.";
    highlightWords = ["ingestion", "pipeline", "traverses", "multi", "language", "AST", "token", "parsers", "churn", "commit", "frequency", "alterations"];
    accentColor = "#00f3ff"; // Cyan
  } else if (frame >= 884 && frame < 1238) {
    activeStep = 2;
    sceneTitle = "3. 4-Tier Subsystem Classifier";
    sceneSubtitle = "Hierarchical architectural modeling";
    captionText =
      "Then, the core architecture engine partitions the codebase into four clean tiers: entry points, transport orchestration, foundational domain models, and presentation rendering leaves.";
    highlightWords = ["architecture", "engine", "partitions", "four", "clean", "tiers", "entry", "points", "orchestration", "domain", "rendering", "leaves"];
    accentColor = "#ff967d"; // Coral
  } else if (frame >= 1238) {
    activeStep = 3;
    sceneTitle = "4. 60fps Motion Graphics Canvas";
    sceneSubtitle = "Travelling Bezier light beams & Narration";
    captionText =
      "Finally, it compiles an interactive SVG architectural blueprint and renders sixty frames per second motion graphics with traveling light beams and neural voiceover narration.";
    highlightWords = ["compiles", "interactive", "SVG", "blueprint", "sixty", "frames", "motion", "graphics", "light", "beams", "neural", "narration"];
    accentColor = "#c4ff78"; // Mint
  }

  // Outro opacity
  const outroOpacity = interpolate(frame, [1500, 1550], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ backgroundColor: "#0b1628" }}>
      {/* Semicolon Kokoro af_heart Voice Narration - Unified single audio track, zero stutter */}
      <Audio src={staticFile("audio/voice/overview_full.mp3")} volume={1.0} />

      {/* Dynamic Background Radial Aura */}
      <div
        className="absolute w-[900px] h-[650px] rounded-full blur-[180px] pointer-events-none opacity-20"
        style={{
          backgroundColor: accentColor,
          left: width / 2 - 450,
          top: height / 2 - 325,
        }}
      />

      {/* Real Visual Architecture Diagram (like forge-architecture.html) */}
      <AnimatedArchitectureDiagram
        analysis={analysis}
        theme={{ ...theme, accent: accentColor }}
        activeStep={activeStep}
      />

      {/* Semicolon Kinetic Captions Bar */}
      <KineticCaptionBar
        stepNumber={activeStep + 1}
        title={sceneTitle}
        captionText={captionText}
        highlightWords={highlightWords}
        accentColor={accentColor}
      />

      {/* Outro Blueprint Card (Final frames) */}
      {frame >= 810 && (
        <div
          className="absolute inset-0 flex items-center justify-center p-16 z-40 pointer-events-none"
          style={{ opacity: outroOpacity }}
        >
          <div
            className="w-full max-w-2xl rounded-3xl p-8 border shadow-2xl backdrop-blur-2xl flex flex-col gap-6 font-['Roboto',sans-serif]"
            style={{
              backgroundColor: "rgba(11, 22, 40, 0.98)",
              borderColor: "rgba(196, 255, 120, 0.6)",
              boxShadow: "0 0 60px rgba(196, 255, 120, 0.25)",
            }}
          >
            <div className="flex justify-between items-start border-b border-white/10 pb-4">
              <div>
                <span className="text-xs uppercase tracking-widest text-[#c4ff78] font-bold">
                  Walkthrough Complete
                </span>
                <h1 className="text-3xl font-black text-white mt-1">{analysis.name}</h1>
                <p className="text-xs text-white/60 mt-1">
                  Ready to put directly in your project README
                </p>
              </div>
              <div
                className="px-3.5 py-1.5 rounded-xl text-xs font-bold border"
                style={{
                  backgroundColor: "rgba(196, 255, 120, 0.15)",
                  borderColor: "#c4ff78",
                  color: "#c4ff78",
                }}
              >
                git-motion
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
                <span className="text-xs text-white/60 font-mono">Files Scanned</span>
                <div className="text-2xl font-black text-white mt-1">{analysis.totalFiles}</div>
              </div>
              <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
                <span className="text-xs text-white/60 font-mono">Lines of Code</span>
                <div className="text-2xl font-black text-white mt-1">{analysis.totalLOC.toLocaleString()}</div>
              </div>
              <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
                <span className="text-xs text-white/60 font-mono">Subsystems</span>
                <div className="text-2xl font-black text-white mt-1">{analysis.modules.length}</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Futuristic HUD with top-edge progress bar (NO bottom overlap) */}
      <HUDOverlay
        theme={{ ...theme, accent: accentColor }}
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
