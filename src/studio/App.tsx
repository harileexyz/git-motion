import React, { useEffect, useState, useMemo } from "react";
import { Player } from "@remotion/player";
import {
  Folder,
  Layers,
  Sparkles,
  Download,
  Film,
  GitBranch,
  Terminal,
  FileCode,
  ArrowDownLeft,
  ArrowUpRight,
  RefreshCw,
  Sliders,
  CheckCircle,
  ExternalLink,
} from "lucide-react";
import { RepoAnalysis, ThemePreset } from "../core/types";
import { RepoReel } from "../remotion/compositions/RepoReel";
import { ModuleReel } from "../remotion/compositions/ModuleReel";
import { THEMES } from "../remotion/themes";

export const App: React.FC = () => {
  const [analysis, setAnalysis] = useState<RepoAnalysis | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [mode, setMode] = useState<"overview" | "module">("overview");
  const [selectedModuleId, setSelectedModuleId] = useState<string>("");
  const [theme, setTheme] = useState<ThemePreset>("tokyo-night");
  const [aspectRatio, setAspectRatio] = useState<"16:9" | "9:16">("16:9");
  const [isExporting, setIsExporting] = useState(false);
  const [exportMessage, setExportMessage] = useState<string | null>(null);

  // Fetch analysis from local API server
  const loadAnalysis = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/analysis");
      if (res.ok) {
        const data: RepoAnalysis = await res.json();
        setAnalysis(data);
        if (data.modules.length > 0 && !selectedModuleId) {
          setSelectedModuleId(data.modules[0].id);
        }
      }
    } catch {
      // API not ready yet, keep waiting
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAnalysis();
  }, []);

  // Filter modules
  const filteredModules = useMemo(() => {
    if (!analysis) return [];
    return analysis.modules.filter((m) =>
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.id.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [analysis, searchQuery]);

  // Selected module details
  const activeModule = useMemo(() => {
    if (!analysis) return null;
    return analysis.modules.find((m) => m.id === selectedModuleId) || analysis.modules[0] || null;
  }, [analysis, selectedModuleId]);

  // Trigger MP4 export via local backend
  const handleExport = async () => {
    if (!analysis) return;
    setIsExporting(true);
    setExportMessage(null);

    const compId =
      mode === "overview"
        ? aspectRatio === "16:9"
          ? "RepoOverview"
          : "VerticalOverview"
        : aspectRatio === "16:9"
        ? "ModuleSpotlight"
        : "VerticalModule";

    const outFilename =
      mode === "overview"
        ? `${analysis.name}-reel.mp4`
        : `${analysis.name}-${selectedModuleId}-spotlight.mp4`;

    try {
      const res = await fetch("/api/render", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          compositionId: compId,
          outputFile: `./outputs/${outFilename}`,
          moduleId: selectedModuleId,
          themePreset: theme,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setExportMessage(`Rendered successfully to ${data.outputPath}`);
      } else {
        setExportMessage(`Error: ${data.error}`);
      }
    } catch (err: any) {
      setExportMessage(`Export failed: ${err.message}`);
    } finally {
      setIsExporting(false);
    }
  };

  const compWidth = aspectRatio === "16:9" ? 1920 : 1080;
  const compHeight = aspectRatio === "16:9" ? 1080 : 1920;
  const durationFrames = mode === "overview" ? 30 * 30 : 25 * 30;

  return (
    <div className="flex flex-col h-screen bg-[#090d16] text-slate-100 font-sans overflow-hidden">
      {/* Top Navbar */}
      <header className="h-16 border-b border-slate-800/80 bg-[#0c111c]/90 backdrop-blur-md px-6 flex items-center justify-between shrink-0 z-30">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-cyan-500/20 text-white font-black text-sm">
              GM
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-base tracking-tight text-white">git-motion</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-mono font-medium">
                  studio v0.1
                </span>
              </div>
            </div>
          </div>

          <div className="h-4 w-px bg-slate-800" />

          {/* Repo metadata pill */}
          {analysis && (
            <div className="flex items-center gap-3 text-xs font-mono text-slate-400">
              <span className="text-white font-semibold flex items-center gap-1.5">
                <Folder className="w-3.5 h-3.5 text-cyan-400" />
                {analysis.name}
              </span>
              <span className="flex items-center gap-1 text-slate-400">
                <GitBranch className="w-3 h-3 text-indigo-400" />
                {analysis.branch}
              </span>
              <span>•</span>
              <span>{analysis.totalFiles} files</span>
              <span>•</span>
              <span>{analysis.totalLOC.toLocaleString()} LOC</span>
              <span>•</span>
              <span>{analysis.totalCommits} commits</span>
            </div>
          )}
        </div>

        {/* Export / Refresh Action Buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={loadAnalysis}
            className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 text-slate-300 hover:text-white transition border border-slate-700/60"
            title="Refresh Analysis"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin text-cyan-400" : ""}`} />
          </button>

          <button
            onClick={handleExport}
            disabled={isExporting || !analysis}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white text-xs font-semibold flex items-center gap-2 shadow-lg shadow-cyan-500/25 transition disabled:opacity-50"
          >
            <Download className="w-4 h-4" />
            {isExporting ? "Rendering Video..." : "Export MP4"}
          </button>
        </div>
      </header>

      {/* Main Workspace Layout */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar: Subsystems & Modules */}
        <aside className="w-80 border-r border-slate-800/80 bg-[#0b0f19] flex flex-col shrink-0">
          <div className="p-4 border-b border-slate-800/80 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-cyan-400" />
                Target Subsystem
              </span>
              <span className="text-[11px] font-mono text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded-full border border-cyan-800/40">
                {analysis?.modules.length || 0} detected
              </span>
            </div>

            {/* Global Overview Radio Button */}
            <button
              onClick={() => setMode("overview")}
              className={`w-full text-left p-3 rounded-xl border text-xs font-medium transition flex items-center justify-between ${
                mode === "overview"
                  ? "bg-cyan-500/10 border-cyan-500/40 text-cyan-300 shadow-sm"
                  : "bg-slate-900/60 border-slate-800 text-slate-400 hover:bg-slate-800/50 hover:text-slate-200"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Film className="w-4 h-4 text-cyan-400" />
                <div>
                  <div className="font-semibold text-white">Full Repository Reel</div>
                  <div className="text-[10px] text-slate-400">Genesis & Macro Architecture</div>
                </div>
              </div>
              {mode === "overview" && <Sparkles className="w-3.5 h-3.5 text-cyan-400" />}
            </button>

            {/* Search Input */}
            <input
              type="text"
              placeholder="Filter modules..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900/80 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-cyan-500/50"
            />
          </div>

          {/* Module List */}
          <div className="flex-1 overflow-y-auto p-3 space-y-1.5">
            {filteredModules.map((m) => {
              const isSelected = mode === "module" && selectedModuleId === m.id;

              return (
                <button
                  key={m.id}
                  onClick={() => {
                    setSelectedModuleId(m.id);
                    setMode("module");
                  }}
                  className={`w-full text-left p-2.5 rounded-xl border text-xs transition flex flex-col gap-1.5 ${
                    isSelected
                      ? "bg-indigo-600/15 border-indigo-500/40 text-white shadow-sm"
                      : "bg-slate-900/40 border-slate-800/60 text-slate-400 hover:bg-slate-800/40 hover:text-slate-200"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 font-semibold text-slate-200">
                      <span
                        className="w-2.5 h-2.5 rounded-full"
                        style={{ backgroundColor: m.color }}
                      />
                      <span>{m.name}</span>
                    </div>
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">
                      {m.primaryLanguage}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 pl-4">
                    <span>
                      {m.fileCount} files • {m.loc} LOC
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="flex items-center gap-0.5 text-emerald-400/80" title="Inbound callers">
                        <ArrowDownLeft className="w-2.5 h-2.5" />
                        {m.inboundDependencies.length}
                      </span>
                      <span className="flex items-center gap-0.5 text-cyan-400/80" title="Outbound dependencies">
                        <ArrowUpRight className="w-2.5 h-2.5" />
                        {m.outboundDependencies.length}
                      </span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </aside>

        {/* Center Canvas: Live Remotion Video Player */}
        <main className="flex-1 bg-[#070a10] flex flex-col items-center justify-center p-8 overflow-hidden relative">
          {analysis ? (
            <div className="flex flex-col items-center justify-center w-full max-w-5xl">
              {/* Player Frame */}
              <div
                className="w-full relative rounded-2xl overflow-hidden border border-slate-800 shadow-2xl bg-black flex items-center justify-center"
                style={{
                  aspectRatio: aspectRatio === "16:9" ? "16/9" : "9/16",
                  maxHeight: aspectRatio === "16:9" ? "650px" : "680px",
                }}
              >
                {mode === "overview" ? (
                  <Player
                    component={RepoReel}
                    inputProps={{
                      analysis,
                      themePreset: theme,
                    }}
                    durationInFrames={durationFrames}
                    compositionWidth={compWidth}
                    compositionHeight={compHeight}
                    fps={30}
                    controls
                    loop
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <Player
                    component={ModuleReel}
                    inputProps={{
                      analysis,
                      moduleId: selectedModuleId || analysis.modules[0]?.id || "core",
                      themePreset: theme,
                    }}
                    durationInFrames={durationFrames}
                    compositionWidth={compWidth}
                    compositionHeight={compHeight}
                    fps={30}
                    controls
                    loop
                    className="w-full h-full object-contain"
                  />
                )}
              </div>

              {/* Status Toast */}
              {exportMessage && (
                <div className="mt-4 px-4 py-2 rounded-xl bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 text-xs font-mono flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-cyan-400" />
                  {exportMessage}
                </div>
              )}
            </div>
          ) : (
            <div className="text-center font-mono text-sm text-slate-500 flex flex-col items-center gap-3">
              <RefreshCw className="w-6 h-6 animate-spin text-cyan-400" />
              <span>Analyzing repository structure & git churn...</span>
            </div>
          )}
        </main>

        {/* Right Sidebar: Inspector & Video Customization */}
        <aside className="w-80 border-l border-slate-800/80 bg-[#0b0f19] flex flex-col shrink-0 p-5 space-y-6 overflow-y-auto">
          {/* Controls Section */}
          <div className="space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5 text-cyan-400" />
              Styling & Canvas
            </span>

            {/* Theme Preset */}
            <div>
              <label className="text-[11px] font-mono text-slate-400 mb-1.5 block">Theme Preset</label>
              <div className="grid grid-cols-2 gap-2">
                {(["tokyo-night", "cyberpunk", "catppuccin", "monokai"] as ThemePreset[]).map((t) => (
                  <button
                    key={t}
                    onClick={() => setTheme(t)}
                    className={`px-3 py-2 rounded-xl border text-xs font-medium text-left capitalize transition ${
                      theme === t
                        ? "bg-cyan-500/15 border-cyan-500/50 text-white"
                        : "bg-slate-900 border-slate-800 text-slate-400 hover:text-white"
                    }`}
                  >
                    {t.replace("-", " ")}
                  </button>
                ))}
              </div>
            </div>

            {/* Aspect Ratio */}
            <div>
              <label className="text-[11px] font-mono text-slate-400 mb-1.5 block">Aspect Ratio</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setAspectRatio("16:9")}
                  className={`px-3 py-2 rounded-xl border text-xs font-medium transition ${
                    aspectRatio === "16:9"
                      ? "bg-cyan-500/15 border-cyan-500/50 text-white"
                      : "bg-slate-900 border-slate-800 text-slate-400 hover:text-white"
                  }`}
                >
                  16:9 (Landscape)
                </button>
                <button
                  onClick={() => setAspectRatio("9:16")}
                  className={`px-3 py-2 rounded-xl border text-xs font-medium transition ${
                    aspectRatio === "9:16"
                      ? "bg-cyan-500/15 border-cyan-500/50 text-white"
                      : "bg-slate-900 border-slate-800 text-slate-400 hover:text-white"
                  }`}
                >
                  9:16 (Shorts/Reels)
                </button>
              </div>
            </div>
          </div>

          <div className="h-px bg-slate-800/80" />

          {/* Active Context Details */}
          {mode === "module" && activeModule ? (
            <div className="space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <FileCode className="w-3.5 h-3.5 text-indigo-400" />
                Active Module Details
              </span>

              <div className="bg-slate-900/60 rounded-xl p-3.5 border border-slate-800 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-bold text-white">{activeModule.name}</span>
                  <span
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: activeModule.color }}
                  />
                </div>
                <div className="text-[11px] text-slate-400 font-mono">{activeModule.path}</div>
              </div>

              {/* Inbound & Outbound Ports */}
              <div className="space-y-2 text-xs font-mono">
                <div className="text-slate-400 text-[11px]">Inbound Callers:</div>
                <div className="flex flex-wrap gap-1">
                  {activeModule.inboundDependencies.length > 0 ? (
                    activeModule.inboundDependencies.map((dep) => (
                      <span
                        key={dep}
                        className="px-2 py-0.5 rounded bg-emerald-950/60 border border-emerald-800/40 text-emerald-300 text-[10px]"
                      >
                        {dep}
                      </span>
                    ))
                  ) : (
                    <span className="text-slate-600 text-[10px]">None</span>
                  )}
                </div>

                <div className="text-slate-400 text-[11px] mt-2">Outbound Dependencies:</div>
                <div className="flex flex-wrap gap-1">
                  {activeModule.outboundDependencies.length > 0 ? (
                    activeModule.outboundDependencies.map((dep) => (
                      <span
                        key={dep}
                        className="px-2 py-0.5 rounded bg-cyan-950/60 border border-cyan-800/40 text-cyan-300 text-[10px]"
                      >
                        {dep}
                      </span>
                    ))
                  ) : (
                    <span className="text-slate-600 text-[10px]">None</span>
                  )}
                </div>
              </div>

              {/* Internal Files */}
              <div>
                <div className="text-slate-400 text-[11px] font-mono mb-1.5">Internal Files:</div>
                <div className="max-h-48 overflow-y-auto space-y-1 pr-1 font-mono text-[11px]">
                  {activeModule.files.map((f) => (
                    <div
                      key={f}
                      className="p-1.5 rounded bg-slate-900/60 border border-slate-800/40 text-slate-300 truncate"
                    >
                      {f.split("/").pop()}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-3 font-mono text-xs">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5 font-sans">
                <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                README Embed Instructions
              </span>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                Export the MP4 or GIF, commit it into your repo, and place this hero banner at the top of your{" "}
                <code className="text-cyan-400">README.md</code>:
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-[10px] text-slate-300 select-all overflow-x-auto">
                {`![Architecture Walkthrough](./docs/${analysis?.name || "repo"}-reel.gif)`}
              </div>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
};
