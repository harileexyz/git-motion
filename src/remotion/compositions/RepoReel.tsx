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

  // Exact step frame boundaries from stitched Kokoro narration: [0, 243, 459, 691]
  let activeStep = 0;
  let sceneTitle = "1. Starting Point";
  let sceneSubtitle = "Runs on your laptop";
  let captionText =
    "When you run git motion, it starts right on your computer. It opens a local web server and studio so you can see your project immediately.";
  let highlightWords = ["git motion", "computer", "local", "web", "server", "studio", "immediately"];
  let accentColor = "#38bdf8"; // Sky Blue

  if (frame >= 243 && frame < 459) {
    activeStep = 1;
    sceneTitle = "2. Scanning Your Files";
    sceneSubtitle = "Reads imports & Git churn";
    captionText =
      "Next, git motion reads your code files to see how they connect, and checks your git history to find the most active files.";
    highlightWords = ["reads", "code", "files", "connect", "git", "history", "active"];
    accentColor = "#00f3ff"; // Cyan
  } else if (frame >= 459 && frame < 691) {
    activeStep = 2;
    sceneTitle = "3. Organizing The Code";
    sceneSubtitle = "Four simple layers";
    captionText =
      "Then, it organizes your codebase into four simple layers: your entry points, the server, the core engine, and the video renderer.";
    highlightWords = ["organizes", "four", "simple", "layers", "entry", "points", "server", "core", "renderer"];
    accentColor = "#ff967d"; // Coral
  } else if (frame >= 691) {
    activeStep = 3;
    sceneTitle = "4. Creating The Video";
    sceneSubtitle = "Ready for your GitHub README";
    captionText =
      "Finally, it turns this blueprint into a smooth video that shows how your project works from start to finish.";
    highlightWords = ["blueprint", "smooth", "video", "project", "works", "start", "finish"];
    accentColor = "#c4ff78"; // Mint
  }

  // Outro opacity
  const outroOpacity = interpolate(frame, [810, 850], [0, 1], {
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
