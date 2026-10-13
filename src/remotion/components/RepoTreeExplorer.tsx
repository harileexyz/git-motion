import React from "react";
import { FileNode, ModuleCluster } from "../../core/types";

interface RepoTreeExplorerProps {
  activeStepIndex: number;
  files: FileNode[];
  modules: ModuleCluster[];
  accentColor: string;
}

export const RepoTreeExplorer: React.FC<RepoTreeExplorerProps> = ({
  activeStepIndex,
  accentColor,
}) => {
  // Simplified directory structure mapped to the 4 steps
  const treeSections = [
    {
      step: 0,
      folder: "src/cli",
      label: "1. Starting Point",
      purpose: "Starts git-motion locally from your terminal",
      files: [{ name: "bin.ts", desc: "Runs CLI command" }],
    },
    {
      step: 1,
      folder: "src/server",
      label: "2. File Scanner",
      purpose: "Reads your files & Git commit history",
      files: [
        { name: "analyzer.ts", desc: "Finds imports & dependencies" },
        { name: "git.ts", desc: "Checks active commits" },
      ],
    },
    {
      step: 2,
      folder: "src/core",
      label: "3. Project Blueprint",
      purpose: "Organizes files into simple logical groups",
      files: [
        { name: "architecture.ts", desc: "Groups the 4 tiers" },
        { name: "types.ts", desc: "Data definitions" },
      ],
    },
    {
      step: 3,
      folder: "src/remotion",
      label: "4. Video Maker",
      purpose: "Draws the animated video at 60 frames/sec",
      files: [
        { name: "RepoReel.tsx", desc: "The animated walkthrough" },
        { name: "Root.tsx", desc: "Video configurations" },
      ],
    },
  ];

  return (
    <div
      className="w-[380px] h-[520px] rounded-2xl border p-5 flex flex-col justify-between font-['Roboto',sans-serif] backdrop-blur-xl shadow-2xl transition-all"
      style={{
        backgroundColor: "rgba(11, 22, 40, 0.92)",
        borderColor: "rgba(255, 255, 255, 0.12)",
      }}
    >
      {/* Explorer Header */}
      <div>
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <div className="flex items-center gap-2">
            <span className="text-base">📁</span>
            <span className="text-xs font-bold uppercase tracking-wider text-white">
              Project File Explorer
            </span>
          </div>
          <span className="text-[10px] text-white/40 font-mono">where things live</span>
        </div>
      </div>

      {/* Directory Tree */}
      <div className="my-3 space-y-2.5 flex-1 overflow-hidden">
        {treeSections.map((sec) => {
          const isActive = sec.step === activeStepIndex;

          return (
            <div
              key={sec.folder}
              className={`rounded-xl p-3 border transition-all duration-300 ${
                isActive
                  ? "bg-slate-900/90 shadow-lg scale-[1.02]"
                  : "bg-white/[0.02] border-white/5 opacity-60"
              }`}
              style={{
                borderColor: isActive ? accentColor : "rgba(255, 255, 255, 0.08)",
                boxShadow: isActive ? `0 0 25px ${accentColor}25` : "none",
              }}
            >
              {/* Folder Line */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 font-mono text-xs font-bold text-white">
                  <span>{isActive ? "📂" : "📁"}</span>
                  <span style={{ color: isActive ? accentColor : "#ffffff" }}>
                    {sec.folder}
                  </span>
                </div>
                {isActive && (
                  <span
                    className="text-[9px] font-black uppercase px-2 py-0.5 rounded-full text-black font-['Roboto',sans-serif]"
                    style={{ backgroundColor: accentColor }}
                  >
                    Active Step
                  </span>
                )}
              </div>

              {/* Purpose in Plain English */}
              <p className="text-[10px] text-white/60 mt-1 pl-6 leading-tight">
                {sec.purpose}
              </p>

              {/* Contained Files */}
              {isActive && (
                <div className="mt-2 pl-6 space-y-1 font-mono text-[11px]">
                  {sec.files.map((f) => (
                    <div
                      key={f.name}
                      className="flex items-center justify-between p-1.5 rounded bg-white/5 border border-white/5"
                    >
                      <span className="text-white font-medium">📄 {f.name}</span>
                      <span className="text-[9px] text-white/50">{f.desc}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Footer Info */}
      <div className="pt-2.5 border-t border-white/5 flex items-center justify-between text-[10px] text-white/40">
        <span>Runs 100% on your laptop</span>
        <span className="text-emerald-400 font-bold">Zero cloud uploads</span>
      </div>
    </div>
  );
};
