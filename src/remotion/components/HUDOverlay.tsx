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
    <div className="absolute inset-0 pointer-events-none p-10 flex flex-col justify-between font-mono">
      {/* Top 3px Progress Line (Pinned to very top edge, zero overlap with captions) */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-white/10 overflow-hidden">
        <div
          className="h-full transition-all duration-75"
          style={{
            width: `${Math.min(100, Math.max(0, progress * 100))}%`,
            backgroundColor: theme.accent,
            boxShadow: `0 0 16px ${theme.accent}`,
          }}
        />
      </div>

      {/* Top Header Bar */}
      <div className="relative z-10 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-lg shadow-lg border border-white/10"
            style={{ backgroundColor: "#0b1628", color: theme.accent }}
          >
            GM
          </div>
          <div>
            <div className="flex items-center gap-3">
              <span className="text-xl font-bold tracking-tight text-white">{repoName}</span>
              <span
                className="px-2.5 py-0.5 rounded-full text-xs font-medium border"
                style={{
                  backgroundColor: `${theme.accent}1a`,
                  borderColor: `${theme.accent}40`,
                  color: theme.accent,
                }}
              >
                git:{branch}
              </span>
            </div>
            <div className="text-xs text-white/50 flex items-center gap-4 mt-0.5">
              <span>{totalFiles} files</span>
              <span>•</span>
              <span>{totalCommits} commits</span>
              <span>•</span>
              <span className="text-cyan-400 font-semibold">{Math.round(progress * 100)}% complete</span>
            </div>
          </div>
        </div>

        {/* Live Scene Badge */}
        <div
          className="px-5 py-2.5 rounded-xl border backdrop-blur-md flex items-center gap-3 shadow-2xl"
          style={{
            backgroundColor: "rgba(11, 22, 40, 0.85)",
            borderColor: "rgba(255, 255, 255, 0.12)",
          }}
        >
          <div
            className="w-2.5 h-2.5 rounded-full animate-ping"
            style={{ backgroundColor: theme.accent }}
          />
          <div className="text-right">
            <div className="text-xs font-semibold text-white tracking-wider uppercase">
              {currentSceneTitle}
            </div>
            <div className="text-[10px] text-white/60">{currentSceneSubtitle}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
