import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";
import { RepoAnalysis, ThemePreset } from "../../core/types";
import { THEMES } from "../themes";
import { computeGraphLayout } from "../../core/layout";
import { GraphCanvas } from "../components/GraphCanvas";
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
  const { fps, width, height, durationInFrames } = useVideoConfig();
  const theme = THEMES[themePreset] || THEMES["tokyo-night"];

  // Compute layout
  const layout = React.useMemo(() => {
    return computeGraphLayout(analysis.files, analysis.links, analysis.modules, {
      width,
      height,
    });
  }, [analysis, width, height]);

  // Overall progress
  const progress = frame / durationInFrames;

  // Scene timing
  // Scene 1: Genesis (0 - 180)
  // Scene 2: Constellation (180 - 450)
  // Scene 3: Churn Heatmap (450 - 700)
  // Scene 4: Outro (700 - 900)

  let sceneTitle = "1. Genesis";
  let sceneSubtitle = "Topological file emergence";
  let isHeatmap = false;

  if (frame >= 180 && frame < 450) {
    sceneTitle = "2. Architecture Constellation";
    sceneSubtitle = "Subsystem clustering & import links";
  } else if (frame >= 450 && frame < 700) {
    sceneTitle = "3. Churn Thermal Scan";
    sceneSubtitle = "Git commit velocity & hot pillars";
    isHeatmap = true;
  } else if (frame >= 700) {
    sceneTitle = "4. Repository Blueprint";
    sceneSubtitle = "Contributor lifeline & scale";
  }

  // Node enter progress (spring)
  const nodeEnterProgress = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 60 },
  });

  // Camera scale and panning interpolation
  const cameraScale = interpolate(
    frame,
    [0, 150, 300, 500, 700, 900],
    [1.4, 1.0, 1.15, 1.05, 0.95, 1.0],
    { extrapolateRight: "clamp" }
  );

  const cameraX = interpolate(
    frame,
    [0, 150, 300, 450, 650, 900],
    [0, 0, -40, 50, 0, 0],
    { extrapolateRight: "clamp" }
  );

  const cameraY = interpolate(
    frame,
    [0, 150, 300, 450, 650, 900],
    [0, 0, 25, -30, 0, 0],
    { extrapolateRight: "clamp" }
  );

  const activePulseProgress = (frame % 60) / 60;

  // Outro overlay animation
  const outroOpacity = interpolate(frame, [720, 780], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ backgroundColor: theme.background }}>
      {/* Dynamic Background Glow */}
      <div
        className="absolute w-[800px] h-[800px] rounded-full blur-[160px] pointer-events-none opacity-20"
        style={{
          backgroundColor: theme.accent,
          left: width / 2 - 400,
          top: height / 2 - 400,
        }}
      />

      {/* Main Animated Graph Canvas */}
      <GraphCanvas
        layout={layout}
        theme={theme}
        width={width}
        height={height}
        cameraScale={cameraScale}
        cameraX={cameraX}
        cameraY={cameraY}
        nodeEnterProgress={nodeEnterProgress}
        isHeatmapMode={isHeatmap}
        activePulseProgress={activePulseProgress}
      />

      {/* Outro Summary Card (Scene 4) */}
      {frame >= 700 && (
        <div
          className="absolute inset-0 flex items-center justify-center p-16 z-20 pointer-events-none"
          style={{ opacity: outroOpacity }}
        >
          <div
            className="w-full max-w-3xl rounded-3xl p-10 border shadow-2xl backdrop-blur-xl flex flex-col gap-8 font-mono"
            style={{
              backgroundColor: `${theme.canvasCard}f2`,
              borderColor: `${theme.accent}66`,
              boxShadow: `0 0 60px ${theme.accentGlow}`,
            }}
          >
            <div className="flex justify-between items-start border-b border-white/10 pb-6">
              <div>
                <span className="text-xs uppercase tracking-widest text-cyan-400 font-semibold">
                  Repository Blueprint
                </span>
                <h1 className="text-4xl font-extrabold text-white mt-1">{analysis.name}</h1>
                <p className="text-sm text-white/60 mt-1">
                  Generated with git-motion • Ready to embed in README.md
                </p>
              </div>
              <div
                className="px-4 py-2 rounded-xl text-sm font-bold border"
                style={{
                  backgroundColor: `${theme.accent}20`,
                  borderColor: theme.accent,
                  color: theme.accent,
                }}
              >
                git-motion
              </div>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-4 gap-4">
              <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
                <div className="text-xs text-white/50">Total Files</div>
                <div className="text-2xl font-bold text-white mt-1">{analysis.totalFiles}</div>
              </div>
              <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
                <div className="text-xs text-white/50">Lines of Code</div>
                <div className="text-2xl font-bold text-white mt-1">{analysis.totalLOC}</div>
              </div>
              <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
                <div className="text-xs text-white/50">Commits</div>
                <div className="text-2xl font-bold text-white mt-1">{analysis.totalCommits}</div>
              </div>
              <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
                <div className="text-xs text-white/50">Subsystems</div>
                <div className="text-2xl font-bold text-white mt-1">{analysis.modules.length}</div>
              </div>
            </div>

            {/* Top Hotspots */}
            <div>
              <div className="text-xs text-white/50 uppercase tracking-wider mb-3">
                Core Architectural Pillars (Highest Churn)
              </div>
              <div className="flex flex-wrap gap-2">
                {analysis.hotspots.slice(0, 5).map((hot) => (
                  <span
                    key={hot.id}
                    className="px-3 py-1.5 rounded-lg text-xs bg-white/10 text-white font-mono border border-white/10"
                  >
                    🔥 {hot.name} ({hot.loc} loc)
                  </span>
                ))}
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
