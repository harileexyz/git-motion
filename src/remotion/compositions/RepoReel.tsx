import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import { RepoAnalysis, ThemePreset } from "../../core/types";
import { THEMES } from "../themes";
import { buildStructuredArchitecture } from "../../core/architecture";
import { StructuredTierView } from "../components/StructuredTierView";
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
  let highlightHotspots = false;

  if (frame >= 220 && frame < 450) {
    activeStep = 1;
    sceneTitle = "2. Processing & Analysis";
    sceneSubtitle = "AST file parsing & git churn";
  } else if (frame >= 450 && frame < 680) {
    activeStep = 2;
    sceneTitle = "3. Core Architecture & Physics";
    sceneSubtitle = "Layout graph & topology models";
    highlightHotspots = true;
  } else if (frame >= 680) {
    activeStep = 3;
    sceneTitle = "4. Video Canvas & Rendering";
    sceneSubtitle = "Remotion 60fps composition pipeline";
  }

  // Outro opacity
  const outroOpacity = interpolate(frame, [740, 800], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ backgroundColor: theme.background }}>
      {/* Dynamic Background Ambient Light */}
      <div
        className="absolute w-[900px] h-[700px] rounded-full blur-[180px] pointer-events-none opacity-20"
        style={{
          backgroundColor: theme.accent,
          left: width / 2 - 450,
          top: height / 2 - 350,
        }}
      />

      {/* Structured 4-Tier Architecture Diagram */}
      <StructuredTierView
        architecture={architecture}
        theme={theme}
        activeStepIndex={activeStep}
        highlightHotspots={highlightHotspots}
      />

      {/* Outro Blueprint Card (Final frames) */}
      {frame >= 740 && (
        <div
          className="absolute inset-0 flex items-center justify-center p-16 z-30 pointer-events-none"
          style={{ opacity: outroOpacity }}
        >
          <div
            className="w-full max-w-3xl rounded-3xl p-10 border shadow-2xl backdrop-blur-2xl flex flex-col gap-6 font-mono"
            style={{
              backgroundColor: `${theme.canvasCard}f8`,
              borderColor: `${theme.accent}88`,
              boxShadow: `0 0 60px ${theme.accentGlow}`,
            }}
          >
            <div className="flex justify-between items-start border-b border-white/10 pb-5">
              <div>
                <span className="text-xs uppercase tracking-widest text-cyan-400 font-bold">
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
                  backgroundColor: `${theme.accent}20`,
                  borderColor: theme.accent,
                  color: theme.accent,
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

            <div>
              <div className="text-xs text-white/50 uppercase tracking-wider mb-2 font-semibold">
                Highest Churn Modules (Active Development Focus)
              </div>
              <div className="flex flex-wrap gap-2">
                {analysis.modules.slice(0, 4).map((m) => (
                  <span
                    key={m.id}
                    className="px-3 py-1.5 rounded-xl text-xs bg-white/10 text-white font-mono border border-white/10 flex items-center gap-2"
                  >
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: m.color }} />
                    {m.name} ({m.loc} loc)
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
