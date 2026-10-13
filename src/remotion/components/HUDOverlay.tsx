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
    <div className="absolute inset-0 pointer-events-none p-12 flex flex-col justify-between font-mono">
      {/* Subtle background tech grid */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `radial-gradient(${theme.textPrimary} 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Top Bar */}
      <div className="relative z-10 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-lg shadow-lg border border-white/10"
            style={{ backgroundColor: theme.canvasCard, color: theme.accent }}
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
              <span>60fps architecture trace</span>
            </div>
          </div>
        </div>

        {/* Live Scene Badge */}
        <div
          className="px-5 py-2.5 rounded-xl border backdrop-blur-md flex items-center gap-3 shadow-2xl"
          style={{
            backgroundColor: `${theme.canvasCard}cc`,
            borderColor: "rgba(255, 255, 255, 0.1)",
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

      {/* Bottom Progress Bar */}
      <div className="relative z-10 flex flex-col gap-2">
        <div className="flex justify-between items-center text-xs text-white/40">
          <span>git-motion reel</span>
          <span>{Math.round(progress * 100)}%</span>
        </div>
        <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-75"
            style={{
              width: `${Math.min(100, Math.max(0, progress * 100))}%`,
              backgroundColor: theme.accent,
              boxShadow: `0 0 12px ${theme.accent}`,
            }}
          />
        </div>
      </div>
    </div>
  );
};
