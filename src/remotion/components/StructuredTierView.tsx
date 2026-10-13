import React from "react";
import { StructuredArchitecture, DataflowStep } from "../../core/architecture";
import { ThemeColors } from "../../core/types";

interface StructuredTierViewProps {
  architecture: StructuredArchitecture;
  theme: ThemeColors;
  activeStepIndex: number;
  highlightHotspots: boolean;
}

export const StructuredTierView: React.FC<StructuredTierViewProps> = ({
  architecture,
  theme,
  activeStepIndex,
  highlightHotspots,
}) => {
  const { tiers, flowSteps } = architecture;
  const currentStep = flowSteps[activeStepIndex] || flowSteps[0];

  return (
    <div className="absolute inset-0 px-16 pt-24 pb-36 flex flex-col justify-between font-mono z-10 pointer-events-none">
      {/* 4 Architectural Tier Containers */}
      <div className="grid grid-cols-4 gap-6 h-[65%]">
        {tiers.map((tier, idx) => {
          const isActive = idx === activeStepIndex;

          return (
            <div
              key={tier.id}
              className={`rounded-2xl border p-5 flex flex-col justify-between transition-all duration-300 backdrop-blur-md relative ${
                isActive
                  ? "bg-slate-900/90 shadow-2xl scale-[1.02]"
                  : "bg-slate-950/60 opacity-80"
              }`}
              style={{
                borderColor: isActive ? theme.accent : "rgba(255, 255, 255, 0.08)",
                boxShadow: isActive ? `0 0 35px ${theme.accentGlow}` : "none",
              }}
            >
              {/* Active Step Indicator Pill */}
              {isActive && (
                <div
                  className="absolute -top-3.5 right-4 px-3 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider text-black flex items-center gap-1.5 shadow-lg"
                  style={{ backgroundColor: theme.accent }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-black animate-ping" />
                  Active Execution
                </div>
              )}

              {/* Tier Header */}
              <div>
                <div className="flex items-center gap-2.5 mb-1.5">
                  <span className="text-2xl">{tier.icon}</span>
                  <div>
                    <h3 className="text-sm font-extrabold text-white tracking-tight">
                      {tier.title}
                    </h3>
                    <p className="text-[10px] text-white/50">{tier.subtitle}</p>
                  </div>
                </div>
              </div>

              {/* Subsystem & File Cards inside this Tier */}
              <div className="flex-1 my-3 overflow-hidden space-y-2.5">
                {tier.modules.map((mod) => (
                  <div
                    key={mod.id}
                    className="p-3 rounded-xl bg-white/[0.04] border border-white/5 flex flex-col gap-1.5"
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold text-white flex items-center gap-1.5">
                        <span
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: mod.color }}
                        />
                        {mod.name}
                      </span>
                      <span className="text-[9px] px-1.5 py-0.5 rounded bg-white/10 text-white/70">
                        {mod.primaryLanguage}
                      </span>
                    </div>

                    {/* File Pills */}
                    <div className="flex flex-wrap gap-1 mt-1">
                      {mod.files.slice(0, 4).map((f) => (
                        <span
                          key={f}
                          className={`text-[9px] px-2 py-0.5 rounded border truncate max-w-[130px] ${
                            highlightHotspots
                              ? "bg-amber-500/10 border-amber-500/30 text-amber-300"
                              : "bg-white/5 border-white/5 text-white/60"
                          }`}
                        >
                          {f.split("/").pop()}
                        </span>
                      ))}
                      {mod.files.length > 4 && (
                        <span className="text-[9px] px-1 text-white/40">
                          +{mod.files.length - 4} more
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Tier Bottom Stats */}
              <div className="pt-2 border-t border-white/5 flex justify-between text-[10px] text-white/40">
                <span>
                  {tier.modules.reduce((acc, m) => acc + m.fileCount, 0)} Files
                </span>
                <span>
                  {tier.modules.reduce((acc, m) => acc + m.loc, 0).toLocaleString()} LOC
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Explanatory Dataflow Banner (Human Understandable Narrative) */}
      <div
        className="w-full rounded-2xl p-5 border shadow-2xl backdrop-blur-xl flex items-center justify-between"
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
            0{currentStep.stepNumber}
          </div>
          <div>
            <div className="flex items-center gap-3">
              <span className="text-sm font-extrabold text-white tracking-wide">
                {currentStep.title}
              </span>
              <span className="text-xs text-white/40">
                ({currentStep.sourceModule} ➔ {currentStep.targetModule})
              </span>
            </div>
            <p className="text-xs text-white/70 mt-0.5">{currentStep.description}</p>
          </div>
        </div>

        {/* Data Packet Pulse Badge */}
        <div className="flex items-center gap-3 text-xs bg-white/5 px-4 py-2 rounded-xl border border-white/10 shrink-0">
          <span className="text-white/50">Active Call:</span>
          <span className="text-cyan-300 font-bold">{currentStep.sourceFile}</span>
          <span className="text-white/40">➔</span>
          <span className="text-indigo-300 font-bold">{currentStep.targetFile}</span>
        </div>
      </div>
    </div>
  );
};
