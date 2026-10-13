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
      <div className="grid grid-cols-12 gap-8 h-[82%] items-center">
        {/* Left: Inbound Callers */}
        <div
          className={`col-span-3 rounded-3xl border p-6 flex flex-col justify-between h-[90%] backdrop-blur-md transition-all ${
            activePhase === 0 ? "border-emerald-500/80 bg-slate-900/98 shadow-2xl scale-[1.02]" : "border-white/10 bg-slate-950/70 opacity-70"
          }`}
        >
          <div>
            <div className="flex items-center gap-2 text-emerald-400 text-sm font-black uppercase tracking-wider mb-2">
              <span>↙</span> Inbound Consumers
            </div>
            <p className="text-xs text-white/60 mb-4">
              Other subsystems in the repo that import or invoke this module
            </p>

            <div className="space-y-2.5">
              {module.inboundDependencies.length > 0 ? (
                module.inboundDependencies.map((dep) => (
                  <div
                    key={dep}
                    className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-200 text-sm font-bold flex items-center justify-between"
                  >
                    <span>{dep}</span>
                    <span className="text-xs text-emerald-400 font-mono">imports ➔</span>
                  </div>
                ))
              ) : (
                <div className="p-4 rounded-2xl bg-white/5 text-white/50 text-sm text-center border border-white/5">
                  Root entrypoint (no internal callers)
                </div>
              )}
            </div>
          </div>

          <div className="text-xs text-white/50 pt-3 border-t border-white/10">
            Total Inbound Callers: <span className="text-emerald-400 font-bold">{module.inboundDependencies.length}</span>
          </div>
        </div>

        {/* Center: Hero Module Card & Anatomy */}
        <div
          className={`col-span-6 rounded-3xl border p-8 flex flex-col justify-between h-full backdrop-blur-xl transition-all shadow-2xl relative ${
            activePhase === 1 || activePhase === 2
              ? "border-cyan-400 bg-slate-900/98 scale-[1.02]"
              : "border-white/15 bg-slate-950/85"
          }`}
          style={{
            borderColor: activePhase === 1 || activePhase === 2 ? module.color : undefined,
            boxShadow: `0 0 45px ${module.color}35`,
          }}
        >
          {/* Header */}
          <div className="flex justify-between items-start border-b border-white/10 pb-5">
            <div>
              <div className="flex items-center gap-3">
                <span className="text-xs px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 font-black border border-cyan-500/40 uppercase tracking-wider">
                  Target Subsystem
                </span>
                <span className="text-sm text-white/50 font-mono">{module.path}</span>
              </div>
              <h2 className="text-4xl font-black text-white mt-2 flex items-center gap-3">
                <span
                  className="w-5 h-5 rounded-full shadow-lg"
                  style={{ backgroundColor: module.color }}
                />
                {module.name}
              </h2>
            </div>

            <div className="text-right">
              <span className="text-base font-bold text-white px-3.5 py-1.5 rounded-xl bg-white/10 border border-white/10">
                {module.primaryLanguage}
              </span>
              <div className="text-xs text-white/60 mt-1.5 font-mono">
                {module.fileCount} files • {module.loc} LOC
              </div>
            </div>
          </div>

          {/* Core Content: Internal Anatomy or Code Card */}
          {activePhase === 2 ? (
            /* Syntax-styled Code Snippet */
            <div className="my-4 rounded-2xl bg-[#0b0e14] border border-white/10 p-5 font-mono text-sm overflow-hidden shadow-inner">
              <div className="flex justify-between text-xs text-white/50 border-b border-white/5 pb-2 mb-3">
                <span>📄 {primaryFile.name} (Core Implementation)</span>
                <span>{primaryFile.loc} lines</span>
              </div>
              <div className="text-slate-300 space-y-1.5 text-sm leading-relaxed">
                <div><span className="text-purple-400 font-bold">export function</span> <span className="text-cyan-400 font-black">{module.name}Engine</span>() &#123;</div>
                <div className="pl-6 text-slate-400">// Ingest and process module state</div>
                <div className="pl-6"><span className="text-purple-400">const</span> state = <span className="text-indigo-400">initializeContext</span>();</div>
                <div className="pl-6"><span className="text-purple-400">return</span> state.<span className="text-cyan-300 font-semibold">executeLifecycle</span>();</div>
                <div>&#125;</div>
              </div>
            </div>
          ) : (
            /* File List Grid */
            <div className="my-4 flex-1 flex flex-col justify-center">
              <div className="text-xs text-white/60 mb-2.5 uppercase tracking-wider font-bold">
                Internal Files & Components:
              </div>
              <div className="grid grid-cols-2 gap-3 max-h-56 overflow-hidden">
                {moduleFiles.slice(0, 6).map((f) => (
                  <div
                    key={f.id}
                    className="p-3 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-between text-sm"
                  >
                    <span className="text-white font-semibold truncate">📄 {f.name}</span>
                    <span className="text-xs text-white/50 shrink-0 font-mono">{f.loc} loc</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Quick Metrics */}
          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/10 text-center">
            <div className="bg-white/5 rounded-2xl p-3">
              <div className="text-xs text-white/50 font-mono">Files</div>
              <div className="text-lg font-black text-white mt-0.5">{module.fileCount}</div>
            </div>
            <div className="bg-white/5 rounded-2xl p-3">
              <div className="text-xs text-white/50 font-mono">Total Commits</div>
              <div className="text-lg font-black text-white mt-0.5">{module.totalCommits}</div>
            </div>
            <div className="bg-white/5 rounded-2xl p-3">
              <div className="text-xs text-white/50 font-mono">Coupling Score</div>
              <div className="text-lg font-black text-cyan-300 mt-0.5">
                {module.inboundDependencies.length + module.outboundDependencies.length} Links
              </div>
            </div>
          </div>
        </div>

        {/* Right: Outbound Dependencies */}
        <div
          className={`col-span-3 rounded-3xl border p-6 flex flex-col justify-between h-[90%] backdrop-blur-md transition-all ${
            activePhase === 0 || activePhase === 1 ? "border-cyan-500/80 bg-slate-900/98 shadow-2xl scale-[1.02]" : "border-white/10 bg-slate-950/70 opacity-70"
          }`}
        >
          <div>
            <div className="flex items-center gap-2 text-cyan-400 text-sm font-black uppercase tracking-wider mb-2">
              Outbound Dependencies <span>↗</span>
            </div>
            <p className="text-xs text-white/60 mb-4">
              External libraries and modules that this subsystem relies on
            </p>

            <div className="space-y-2.5">
              {module.outboundDependencies.length > 0 ? (
                module.outboundDependencies.map((dep) => (
                  <div
                    key={dep}
                    className="p-3 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-200 text-sm font-bold flex items-center justify-between"
                  >
                    <span>{dep}</span>
                    <span className="text-xs text-cyan-400 font-mono">➔ calls</span>
                  </div>
                ))
              ) : (
                <div className="p-4 rounded-2xl bg-white/5 text-white/50 text-sm text-center border border-white/5">
                  Self-contained (no external imports)
                </div>
              )}
            </div>
          </div>

          <div className="text-xs text-white/50 pt-3 border-t border-white/10">
            Total Dependencies: <span className="text-cyan-400 font-bold">{module.outboundDependencies.length}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
