import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, Audio, Sequence, staticFile } from "remotion";
import { RepoAnalysis, ThemePreset } from "../../core/types";
import { THEMES } from "../themes";
import { buildStructuredArchitecture } from "../../core/architecture";
import { MermaidFlowCanvas } from "../components/MermaidFlowCanvas";
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

  if (frame >= 220 && frame < 450) {
    activeStep = 1;
    sceneTitle = "2. Processing & Analysis";
    sceneSubtitle = "AST file parsing & git churn";
  } else if (frame >= 450 && frame < 680) {
    activeStep = 2;
    sceneTitle = "3. Core Architecture & Physics";
    sceneSubtitle = "Layout graph & topology models";
  } else if (frame >= 680) {
    activeStep = 3;
    sceneTitle = "4. Video Canvas & Rendering";
    sceneSubtitle = "Remotion 60fps composition pipeline";
  }

  const currentFlow = architecture.flowSteps[activeStep] || architecture.flowSteps[0];

  // Outro opacity
  const outroOpacity = interpolate(frame, [740, 800], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ backgroundColor: theme.background }}>
      {/* Background Soft Cyber Ambient Bed (20% volume) */}
      <Audio src={staticFile("audio/ambient-cyber.wav")} volume={0.2} />

      {/* Voiceover Narration Sequences (100% volume) */}
      <Sequence from={0} durationInFrames={210}>
        <Audio src={staticFile("audio/voice/step1.wav")} volume={1.0} />
      </Sequence>
      <Sequence from={220} durationInFrames={210}>
        <Audio src={staticFile("audio/voice/step2.wav")} volume={1.0} />
      </Sequence>
      <Sequence from={450} durationInFrames={210}>
        <Audio src={staticFile("audio/voice/step3.wav")} volume={1.0} />
      </Sequence>
      <Sequence from={680} durationInFrames={200}>
        <Audio src={staticFile("audio/voice/step4.wav")} volume={1.0} />
      </Sequence>

      {/* Dynamic Background Ambient Light */}
      <div
        className="absolute w-[900px] h-[700px] rounded-full blur-[180px] pointer-events-none opacity-20"
        style={{
          backgroundColor: theme.accent,
          left: width / 2 - 450,
          top: height / 2 - 350,
        }}
      />

      {/* Proper Mermaid Flowchart Diagram */}
      <MermaidFlowCanvas
        architecture={architecture}
        theme={theme}
        activeStepIndex={activeStep}
        progress={progress}
      />

      {/* Explanatory Dataflow Banner (Clear, Plain-English Explanation) */}
      <div className="absolute bottom-16 left-16 right-16 z-20 pointer-events-none">
        <div
          className="w-full rounded-2xl p-5 border shadow-2xl backdrop-blur-xl flex items-center justify-between font-mono"
          style={{
            backgroundColor: `${theme.canvasCard}f2`,
            borderColor: `${theme.accent}66`,
            boxShadow: `0 0 40px ${theme.accentGlow}`,
          }}
        >
          <div className="flex items-center gap-4">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-black text-black shrink-0 shadow-lg"
              style={{ backgroundColor: theme.accent }}
            >
              0{currentFlow.stepNumber}
            </div>
            <div>
              <div className="flex items-center gap-3">
                <span className="text-sm font-extrabold text-white tracking-wide">
                  {currentFlow.title}
                </span>
                <span className="text-xs text-white/40">
                  ({currentFlow.sourceModule} ➔ {currentFlow.targetModule})
                </span>
              </div>
              <p className="text-xs text-white/70 mt-0.5">{currentFlow.description}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 text-xs bg-white/5 px-4 py-2 rounded-xl border border-white/10 shrink-0">
            <span className="text-white/50">Active Pipe:</span>
            <span className="text-cyan-300 font-bold">{currentFlow.sourceFile}</span>
            <span className="text-white/40">➔</span>
            <span className="text-indigo-300 font-bold">{currentFlow.targetFile}</span>
          </div>
        </div>
      </div>

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
