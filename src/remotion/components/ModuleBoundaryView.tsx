import React from "react";
import { ModuleCluster, ThemeColors, FileNode } from "../../core/types";

interface ModuleBoundaryViewProps {
  module: ModuleCluster;
  allFiles: FileNode[];
  theme: ThemeColors;
  activePhase: number; // 0: Boundary context, 1: Internal anatomy, 2: Code zoom, 3: Maintainer scorecard
}

export const ModuleBoundaryView: React.FC<ModuleBoundaryViewProps> = ({
  module,
  allFiles,
  theme,
  activePhase,
}) => {
  const moduleFiles = allFiles.filter((f) => f.module === module.id);
  const primaryFile = moduleFiles[0] || { name: "index.ts", loc: 50, language: "TypeScript" };

  return (
    <div className="absolute inset-0 px-16 pt-24 pb-36 flex flex-col justify-between font-mono z-10 pointer-events-none">
      {/* 3-Column Architecture Boundary Map */}
      <div className="grid grid-cols-12 gap-6 h-[65%] items-center">
        {/* Left: Inbound Callers */}
        <div
          className={`col-span-3 rounded-2xl border p-5 flex flex-col justify-between h-[85%] backdrop-blur-md transition-all ${
            activePhase === 0 ? "border-emerald-500/80 bg-slate-900/90 shadow-2xl scale-[1.02]" : "border-white/10 bg-slate-950/60 opacity-70"
          }`}
        >
          <div>
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-2">
              <span>↙</span> Inbound Consumers
            </div>
            <p className="text-[10px] text-white/50 mb-4">
              Other subsystems in the repo that import or invoke this module
            </p>

            <div className="space-y-2">
              {module.inboundDependencies.length > 0 ? (
                module.inboundDependencies.map((dep) => (
                  <div
                    key={dep}
                    className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-200 text-xs font-bold flex items-center justify-between"
                  >
                    <span>{dep}</span>
                    <span className="text-[10px] text-emerald-400">imports ➔</span>
                  </div>
                ))
              ) : (
                <div className="p-3 rounded-xl bg-white/5 text-white/40 text-xs text-center border border-white/5">
                  Root entrypoint (no internal callers)
                </div>
              )}
            </div>
          </div>

          <div className="text-[10px] text-white/40 pt-2 border-t border-white/5">
            Total Callers: {module.inboundDependencies.length}
          </div>
        </div>

        {/* Center: Hero Module Card & Anatomy */}
        <div
          className={`col-span-6 rounded-3xl border p-7 flex flex-col justify-between h-full backdrop-blur-xl transition-all shadow-2xl relative ${
            activePhase === 1 || activePhase === 2
              ? "border-cyan-400 bg-slate-900/95 scale-[1.02]"
              : "border-white/15 bg-slate-950/80"
          }`}
          style={{
            borderColor: activePhase === 1 || activePhase === 2 ? module.color : undefined,
            boxShadow: `0 0 45px ${module.color}35`,
          }}
        >
          {/* Header */}
          <div className="flex justify-between items-start border-b border-white/10 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/40 uppercase tracking-wider">
                  Target Subsystem
                </span>
                <span className="text-xs text-white/40">{module.path}</span>
              </div>
              <h2 className="text-3xl font-extrabold text-white mt-1.5 flex items-center gap-3">
                <span
                  className="w-4 h-4 rounded-full shadow-lg"
                  style={{ backgroundColor: module.color }}
                />
                {module.name}
              </h2>
            </div>

            <div className="text-right">
              <span className="text-sm font-bold text-white px-3 py-1 rounded-xl bg-white/10 border border-white/10">
                {module.primaryLanguage}
              </span>
              <div className="text-[10px] text-white/50 mt-1">
                {module.fileCount} files • {module.loc} LOC
              </div>
            </div>
          </div>

          {/* Core Content: Internal Anatomy or Code Card */}
          {activePhase === 2 ? (
            /* Syntax-styled Code Snippet */
            <div className="my-3 rounded-2xl bg-[#0b0e14] border border-white/10 p-4 font-mono text-xs overflow-hidden shadow-inner">
              <div className="flex justify-between text-[10px] text-white/40 border-b border-white/5 pb-2 mb-3">
                <span>📄 {primaryFile.name} (Core Implementation)</span>
                <span>{primaryFile.loc} lines</span>
              </div>
              <div className="text-slate-300 space-y-1 text-[11px] leading-relaxed">
                <div><span className="text-purple-400">export function</span> <span className="text-cyan-400 font-bold">{module.name}Engine</span>() &#123;</div>
                <div className="pl-4 text-slate-400">// Ingest and process module state</div>
                <div className="pl-4"><span className="text-purple-400">const</span> state = <span className="text-indigo-400">initializeContext</span>();</div>
                <div className="pl-4"><span className="text-purple-400">return</span> state.<span className="text-cyan-300">executeLifecycle</span>();</div>
                <div>&#125;</div>
              </div>
            </div>
          ) : (
            /* File List Grid */
            <div className="my-3 flex-1 flex flex-col justify-center">
              <div className="text-xs text-white/60 mb-2 uppercase tracking-wider font-semibold">
                Internal Files & Components:
              </div>
              <div className="grid grid-cols-2 gap-2 max-h-48 overflow-hidden">
                {moduleFiles.slice(0, 6).map((f) => (
                  <div
                    key={f.id}
                    className="p-2.5 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between text-xs"
                  >
                    <span className="text-white font-medium truncate">{f.name}</span>
                    <span className="text-[10px] text-white/40 shrink-0 font-mono">{f.loc} loc</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Quick Metrics */}
          <div className="grid grid-cols-3 gap-3 pt-3 border-t border-white/10 text-center">
            <div className="bg-white/5 rounded-xl p-2">
              <div className="text-[10px] text-white/40">Files</div>
              <div className="text-sm font-bold text-white">{module.fileCount}</div>
            </div>
            <div className="bg-white/5 rounded-xl p-2">
              <div className="text-[10px] text-white/40">Total Commits</div>
              <div className="text-sm font-bold text-white">{module.totalCommits}</div>
            </div>
            <div className="bg-white/5 rounded-xl p-2">
              <div className="text-[10px] text-white/40">Coupling Score</div>
              <div className="text-sm font-bold text-cyan-300">
                {module.inboundDependencies.length + module.outboundDependencies.length} Links
              </div>
            </div>
          </div>
        </div>

        {/* Right: Outbound Dependencies */}
        <div
          className={`col-span-3 rounded-2xl border p-5 flex flex-col justify-between h-[85%] backdrop-blur-md transition-all ${
            activePhase === 0 || activePhase === 1 ? "border-cyan-500/80 bg-slate-900/90 shadow-2xl scale-[1.02]" : "border-white/10 bg-slate-950/60 opacity-70"
          }`}
        >
          <div>
            <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-2">
              Outbound Dependencies <span>↗</span>
            </div>
            <p className="text-[10px] text-white/50 mb-4">
              External libraries and modules that this subsystem relies on
            </p>

            <div className="space-y-2">
              {module.outboundDependencies.length > 0 ? (
                module.outboundDependencies.map((dep) => (
                  <div
                    key={dep}
                    className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-200 text-xs font-bold flex items-center justify-between"
                  >
                    <span>{dep}</span>
                    <span className="text-[10px] text-cyan-400">➔ calls</span>
                  </div>
                ))
              ) : (
                <div className="p-3 rounded-xl bg-white/5 text-white/40 text-xs text-center border border-white/5">
                  Self-contained (no external imports)
                </div>
              )}
            </div>
          </div>

          <div className="text-[10px] text-white/40 pt-2 border-t border-white/5">
            Total Dependencies: {module.outboundDependencies.length}
          </div>
        </div>
      </div>

      {/* Explanatory Narrative Banner */}
      <div
        className="w-full rounded-2xl p-5 border shadow-2xl backdrop-blur-xl flex items-center justify-between"
        style={{
          backgroundColor: `${theme.canvasCard}f2`,
          borderColor: `${module.color}66`,
          boxShadow: `0 0 35px ${module.color}30`,
        }}
      >
        <div className="flex items-center gap-4">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-black text-black shrink-0 shadow-lg"
            style={{ backgroundColor: module.color }}
          >
            0{activePhase + 1}
          </div>
          <div>
            <div className="text-sm font-extrabold text-white">
              {activePhase === 0 && `Boundary Isolation: Where [${module.name}] sits in the system`}
              {activePhase === 1 && `Internal Architecture: ${module.fileCount} files working in concert`}
              {activePhase === 2 && `Core Execution Logic: Handlers & Data Processing`}
              {activePhase === 3 && `Module Health & Velocity: Ready for documentation`}
            </div>
            <p className="text-xs text-white/70 mt-0.5">
              {activePhase === 0 &&
                `Consumes inputs from ${module.inboundDependencies.join(", ") || "clients"} and dispatches to ${module.outboundDependencies.join(", ") || "storage"}.`}
              {activePhase === 1 &&
                `Written primarily in ${module.primaryLanguage} with ${module.loc} lines of verified source code.`}
              {activePhase === 2 &&
                `Core functions orchestrate state transformations and enforce architectural boundaries.`}
              {activePhase === 3 &&
                `Export this walkthrough to embed into ${module.path}/README.md.`}
            </p>
          </div>
        </div>

        <div className="px-4 py-2 rounded-xl bg-white/10 text-white font-mono text-xs border border-white/10 shrink-0">
          Subsystem: {module.name}
        </div>
      </div>
    </div>
  );
};
