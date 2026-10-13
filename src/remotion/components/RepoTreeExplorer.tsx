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
      className="w-[740px] h-[680px] rounded-3xl border p-8 flex flex-col justify-between font-['Roboto',sans-serif] backdrop-blur-2xl shadow-2xl transition-all"
      style={{
        backgroundColor: "rgba(11, 22, 40, 0.95)",
        borderColor: "rgba(255, 255, 255, 0.15)",
      }}
    >
      {/* Explorer Header */}
      <div>
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <span className="text-2xl">📁</span>
            <span className="text-lg font-black uppercase tracking-wider text-white">
              Project File Explorer
            </span>
          </div>
          <span className="text-xs text-white/50 font-mono">where your code lives</span>
        </div>
      </div>

      {/* Directory Tree */}
      <div className="my-4 space-y-3.5 flex-1 overflow-hidden">
        {treeSections.map((sec) => {
          const isActive = sec.step === activeStepIndex;

          return (
            <div
              key={sec.folder}
              className={`rounded-2xl p-4 border transition-all duration-300 ${
                isActive
                  ? "bg-slate-900/98 shadow-2xl scale-[1.02]"
                  : "bg-white/[0.02] border-white/5 opacity-55"
              }`}
              style={{
                borderColor: isActive ? accentColor : "rgba(255, 255, 255, 0.08)",
                boxShadow: isActive ? `0 0 35px ${accentColor}30` : "none",
              }}
            >
              {/* Folder Line */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 font-mono text-2xl font-bold text-white">
                  <span className="text-3xl">{isActive ? "📂" : "📁"}</span>
                  <span style={{ color: isActive ? accentColor : "#ffffff" }}>
                    {sec.folder}
                  </span>
                </div>
                {isActive && (
                  <span
                    className="text-xs font-black uppercase px-3.5 py-1 rounded-full text-black font-['Roboto',sans-serif] shadow-md"
                    style={{ backgroundColor: accentColor }}
                  >
                    Active Step
                  </span>
                )}
              </div>

              {/* Purpose in Plain English */}
              <p className="text-base text-white/80 mt-1.5 pl-10 leading-snug">
                {sec.purpose}
              </p>

              {/* Contained Files */}
              {isActive && (
                <div className="mt-3 pl-10 space-y-2 font-mono">
                  {sec.files.map((f) => (
                    <div
                      key={f.name}
                      className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10"
                    >
                      <span className="text-white font-bold text-lg">📄 {f.name}</span>
                      <span className="text-sm text-white/70">{f.desc}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Footer Info */}
      <div className="pt-3 border-t border-white/10 flex items-center justify-between text-sm text-white/50">
        <span>Runs 100% locally on your machine</span>
        <span className="text-emerald-400 font-bold text-base">✓ Zero cloud uploads</span>
      </div>
    </div>
  );
};
