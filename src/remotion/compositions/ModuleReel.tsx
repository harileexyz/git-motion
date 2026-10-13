import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";
import { RepoAnalysis, ThemePreset } from "../../core/types";
import { THEMES } from "../themes";
import { computeGraphLayout } from "../../core/layout";
import { GraphCanvas } from "../components/GraphCanvas";
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
  const { fps, width, height, durationInFrames } = useVideoConfig();
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

  // Compute layout focused on this module
  const layout = React.useMemo(() => {
    return computeGraphLayout(analysis.files, analysis.links, analysis.modules, {
      width,
      height,
      moduleId: moduleInfo.id,
    });
  }, [analysis, width, height, moduleInfo.id]);

  const progress = frame / durationInFrames;

  // Scene timing
  // Scene 1: Module Boundary & Focus (0 - 180)
  // Scene 2: Inbound & Outbound Ports (180 - 400)
  // Scene 3: Internal Anatomy (400 - 600)
  // Scene 4: Module Scorecard (600 - 750)

  let sceneTitle = `Module: [${moduleInfo.name}]`;
  let sceneSubtitle = "Subsystem boundary isolation";

  if (frame >= 180 && frame < 400) {
    sceneTitle = "Ingress & Egress Ports";
    sceneSubtitle = `Calls from: ${moduleInfo.inboundDependencies.join(", ") || "none"} • Depends on: ${moduleInfo.outboundDependencies.join(", ") || "none"}`;
  } else if (frame >= 400 && frame < 600) {
    sceneTitle = "Internal Component Topology";
    sceneSubtitle = `${moduleInfo.fileCount} files • ${moduleInfo.loc} LOC • Primary: ${moduleInfo.primaryLanguage}`;
  } else if (frame >= 600) {
    sceneTitle = "Subsystem Scorecard";
    sceneSubtitle = "Ready for module documentation";
  }

  const nodeEnterProgress = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 70 },
  });

  const cameraScale = interpolate(
    frame,
    [0, 150, 350, 550, 750],
    [1.6, 1.25, 1.35, 1.2, 1.0],
    { extrapolateRight: "clamp" }
  );

  const activePulseProgress = (frame % 45) / 45;

  const cardOpacity = interpolate(frame, [600, 650], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ backgroundColor: theme.background }}>
      {/* Background radial beacon focused on module */}
      <div
        className="absolute w-[600px] h-[600px] rounded-full blur-[140px] pointer-events-none opacity-25"
        style={{
          backgroundColor: moduleInfo.color,
          left: width / 2 - 300,
          top: height / 2 - 300,
        }}
      />

      {/* Graph Canvas highlighting only this module */}
      <GraphCanvas
        layout={layout}
        theme={theme}
        width={width}
        height={height}
        cameraScale={cameraScale}
        cameraX={0}
        cameraY={0}
        nodeEnterProgress={nodeEnterProgress}
        isHeatmapMode={false}
        highlightedModuleId={moduleInfo.id}
        activePulseProgress={activePulseProgress}
      />

      {/* Boundary Callout Badges (Scene 2) */}
      {frame >= 180 && frame < 500 && (
        <div className="absolute top-28 left-16 right-16 flex justify-between pointer-events-none font-mono z-20">
          {/* Inbound Callers */}
          <div className="bg-black/60 border border-white/10 rounded-2xl p-4 backdrop-blur-md max-w-sm">
            <span className="text-[11px] uppercase tracking-wider text-emerald-400 font-bold flex items-center gap-1.5">
              <span>↙</span> Inbound Callers ({moduleInfo.inboundDependencies.length})
            </span>
            <div className="flex flex-wrap gap-1.5 mt-2">
              {moduleInfo.inboundDependencies.length > 0 ? (
                moduleInfo.inboundDependencies.map((dep) => (
                  <span
                    key={dep}
                    className="px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 text-xs"
                  >
                    {dep}
                  </span>
                ))
              ) : (
                <span className="text-white/40 text-xs">No external callers (root entrypoint)</span>
              )}
            </div>
          </div>

          {/* Outbound Dependencies */}
          <div className="bg-black/60 border border-white/10 rounded-2xl p-4 backdrop-blur-md max-w-sm text-right">
            <span className="text-[11px] uppercase tracking-wider text-cyan-400 font-bold flex items-center justify-end gap-1.5">
              Outbound Dependencies ({moduleInfo.outboundDependencies.length}) <span>↗</span>
            </span>
            <div className="flex flex-wrap justify-end gap-1.5 mt-2">
              {moduleInfo.outboundDependencies.length > 0 ? (
                moduleInfo.outboundDependencies.map((dep) => (
                  <span
                    key={dep}
                    className="px-2.5 py-1 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 text-xs"
                  >
                    {dep}
                  </span>
                ))
              ) : (
                <span className="text-white/40 text-xs">Self-contained (zero external imports)</span>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Module Scorecard (Scene 4) */}
      {frame >= 600 && (
        <div
          className="absolute inset-0 flex items-center justify-center p-16 z-20 pointer-events-none"
          style={{ opacity: cardOpacity }}
        >
          <div
            className="w-full max-w-2xl rounded-3xl p-8 border shadow-2xl backdrop-blur-xl flex flex-col gap-6 font-mono"
            style={{
              backgroundColor: `${theme.canvasCard}f5`,
              borderColor: `${moduleInfo.color}88`,
              boxShadow: `0 0 50px ${moduleInfo.color}40`,
            }}
          >
            <div className="flex justify-between items-center border-b border-white/10 pb-4">
              <div>
                <span className="text-xs uppercase tracking-widest text-cyan-400 font-semibold">
                  Module Spotlight
                </span>
                <h2 className="text-3xl font-extrabold text-white mt-0.5">{moduleInfo.name}</h2>
                <div className="text-xs text-white/50">{moduleInfo.path}</div>
              </div>
              <div
                className="px-3.5 py-1.5 rounded-xl text-xs font-bold border"
                style={{
                  backgroundColor: `${moduleInfo.color}20`,
                  borderColor: moduleInfo.color,
                  color: moduleInfo.color,
                }}
              >
                {moduleInfo.primaryLanguage}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div className="bg-white/5 rounded-xl p-3 border border-white/5">
                <div className="text-[10px] text-white/50">Files Inside</div>
                <div className="text-xl font-bold text-white mt-1">{moduleInfo.fileCount}</div>
              </div>
              <div className="bg-white/5 rounded-xl p-3 border border-white/5">
                <div className="text-[10px] text-white/50">Lines of Code</div>
                <div className="text-xl font-bold text-white mt-1">{moduleInfo.loc}</div>
              </div>
              <div className="bg-white/5 rounded-xl p-3 border border-white/5">
                <div className="text-[10px] text-white/50">Commits</div>
                <div className="text-xl font-bold text-white mt-1">{moduleInfo.totalCommits}</div>
              </div>
            </div>

            <div>
              <div className="text-xs text-white/50 uppercase tracking-wider mb-2">
                Top Internal Files
              </div>
              <div className="flex flex-wrap gap-2">
                {moduleInfo.files.slice(0, 6).map((f) => (
                  <span
                    key={f}
                    className="px-2.5 py-1 rounded bg-white/10 text-white text-xs border border-white/10"
                  >
                    📄 {f.split("/").pop()}
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
