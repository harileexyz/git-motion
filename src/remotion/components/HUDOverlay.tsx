import React from "react";
import { ThemeColors } from "../../core/types";

interface HUDOverlayProps {
  theme: ThemeColors;
  repoName: string;
  branch: string;
  totalCommits: number;
  totalFiles: number;
  currentSceneTitle: string;
  currentSceneSubtitle: string;
  progress: number; // 0.0 - 1.0
}

export const HUDOverlay: React.FC<HUDOverlayProps> = ({
  theme,
  repoName,
  branch,
  totalCommits,
  totalFiles,
  currentSceneTitle,
  currentSceneSubtitle,
  progress,
}) => {
  return (
    <div className="absolute inset-0 pointer-events-none p-12 flex flex-col justify-between font-['Roboto',sans-serif]">
      {/* Top Glowing Progress Line (Pinned to top) */}
      <div className="absolute top-0 left-0 right-0 h-2 bg-white/10 overflow-hidden">
        <div
          className="h-full transition-all duration-75"
          style={{
            width: `${Math.min(100, Math.max(0, progress * 100))}%`,
            backgroundColor: theme.accent,
            boxShadow: `0 0 20px ${theme.accent}`,
          }}
        />
      </div>

      {/* Top Header Bar (Scaled for 1920x1080) */}
      <div className="relative z-10 flex items-center justify-between">
        <div className="flex items-center gap-5">
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center font-black text-2xl shadow-xl border border-white/10"
            style={{ backgroundColor: "#0b1628", color: theme.accent }}
          >
            GM
          </div>
          <div>
            <div className="flex items-center gap-4">
              <span className="text-3xl font-black tracking-tight text-white">{repoName}</span>
              <span
                className="px-3.5 py-1 rounded-full text-sm font-bold border font-mono"
                style={{
                  backgroundColor: `${theme.accent}20`,
                  borderColor: `${theme.accent}60`,
                  color: theme.accent,
                }}
              >
                git:{branch}
              </span>
            </div>
            <div className="text-sm text-white/60 flex items-center gap-4 mt-1 font-mono">
              <span>{totalFiles} files</span>
              <span>•</span>
              <span>{totalCommits} commits</span>
              <span>•</span>
              <span className="text-emerald-400 font-bold">{Math.round(progress * 100)}% complete</span>
            </div>
          </div>
        </div>

        {/* Live Scene Badge */}
        <div
          className="px-7 py-3 rounded-2xl border backdrop-blur-md flex items-center gap-4 shadow-2xl"
          style={{
            backgroundColor: "rgba(11, 22, 40, 0.92)",
            borderColor: "rgba(255, 255, 255, 0.15)",
          }}
        >
          <div
            className="w-3.5 h-3.5 rounded-full animate-ping"
            style={{ backgroundColor: theme.accent }}
          />
          <div className="text-right">
            <div className="text-lg font-black text-white tracking-wide uppercase">
              {currentSceneTitle}
            </div>
            <div className="text-xs text-white/70 font-mono mt-0.5">{currentSceneSubtitle}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
