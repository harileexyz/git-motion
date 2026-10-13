import React, { useEffect, useState, useMemo, useRef } from "react";
import { Player, PlayerRef } from "@remotion/player";
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
  Copy,
  Check,
  Code2,
  Volume2,
  Play,
  Pause,
  BookOpen,
  Maximize2,
  Minimize2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { RepoAnalysis, ThemePreset } from "../core/types";
import { RepoReel } from "../remotion/compositions/RepoReel";
import { ModuleReel } from "../remotion/compositions/ModuleReel";
import { buildStructuredArchitecture } from "../core/architecture";
import { generateRepoMermaid, generateModuleMermaid } from "../core/mermaid";
import { MermaidViewer } from "./components/MermaidViewer";
import { VideoControlsBar } from "./components/VideoControlsBar";

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
  const [viewTab, setViewTab] = useState<"video" | "blueprint" | "design" | "mermaid">("video");
  const [copiedMermaid, setCopiedMermaid] = useState(false);
  const [showLeftSidebar, setShowLeftSidebar] = useState(true);
  const [showRightSidebar, setShowRightSidebar] = useState(true);
  const [theaterMode, setTheaterMode] = useState(false);

  // Video Player Ref & Instance state
  const playerRef = useRef<PlayerRef>(null);
  const [playerInstance, setPlayerInstance] = useState<PlayerRef | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

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

  // Generate Mermaid markdown
  const mermaidMarkdown = useMemo(() => {
    if (!analysis) return "";
    if (mode === "overview") {
      const arch = buildStructuredArchitecture(analysis.modules, analysis.files, analysis.links);
      return generateRepoMermaid(arch);
    } else if (activeModule) {
      return generateModuleMermaid(activeModule);
    }
    return "";
  }, [analysis, mode, activeModule]);

  const handleCopyMermaid = () => {
    if (!mermaidMarkdown) return;
    navigator.clipboard.writeText(mermaidMarkdown);
    setCopiedMermaid(true);
    setTimeout(() => setCopiedMermaid(false), 2000);
  };

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

  // Dynamic duration matching exact unified Kokoro narration
  const durationFrames = useMemo(() => {
    if (mode === "overview") return 1564;
    const id = (selectedModuleId || "").toLowerCase();
    if (id.includes("server")) return 1826;
    if (id.includes("core")) return 1532;
    if (id.includes("remotion")) return 1541;
    if (id.includes("cli")) return 1281;
    if (id.includes("studio")) return 1409;
    return 1192;
  }, [mode, selectedModuleId]);

  // URLs for Module-Specific Blueprint and Technical Design
  const blueprintUrl = useMemo(() => {
    if (mode === "overview" || !selectedModuleId) return "/api/architecture.html";
    return `/api/architecture.html?module=${encodeURIComponent(selectedModuleId)}`;
  }, [mode, selectedModuleId]);

  const technicalDesignUrl = useMemo(() => {
    if (mode === "overview" || !selectedModuleId) return "/api/technical-design.html";
    return `/api/technical-design.html?module=${encodeURIComponent(selectedModuleId)}`;
  }, [mode, selectedModuleId]);

  // Memoize input props to guarantee reference stability and prevent re-render storms
  const overviewInputProps = useMemo(() => {
    if (!analysis) return null;
    return {
      analysis,
      themePreset: theme,
    };
  }, [analysis, theme]);

  const moduleInputProps = useMemo(() => {
    if (!analysis) return null;
    return {
      analysis,
      moduleId: selectedModuleId || analysis.modules[0]?.id || "core",
      themePreset: theme,
    };
  }, [analysis, selectedModuleId, theme]);

  // Pause & reset to frame 0 immediately when switching modes or modules
  useEffect(() => {
    if (playerRef.current) {
      try {
        playerRef.current.pause();
        playerRef.current.seekTo(0);
      } catch {}
    }
    setIsPlaying(false);
  }, [mode, selectedModuleId]);

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

          {/* View Tab Switcher: Video Reel vs Mermaid Diagram */}
          <div className="flex items-center bg-slate-900 border border-slate-800 rounded-xl p-1 text-xs">
            <button
              onClick={() => setViewTab("video")}
              className={`px-3 py-1.5 rounded-lg font-semibold flex items-center gap-2 transition ${
                viewTab === "video"
                  ? "bg-cyan-500 text-black shadow-md shadow-cyan-500/20"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Film className="w-3.5 h-3.5" />
              <span>Animated Reel</span>
              <Volume2 className="w-3 h-3 opacity-60" />
            </button>
            <button
              onClick={() => setViewTab("blueprint")}
              className={`px-3 py-1.5 rounded-lg font-semibold flex items-center gap-2 transition ${
                viewTab === "blueprint"
                  ? "bg-cyan-500 text-black shadow-md shadow-cyan-500/20 font-bold"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>System Blueprint (HTML)</span>
            </button>
            <button
              onClick={() => setViewTab("design")}
              className={`px-3 py-1.5 rounded-lg font-semibold flex items-center gap-2 transition ${
                viewTab === "design"
                  ? "bg-cyan-500 text-black shadow-md shadow-cyan-500/20 font-bold"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Technical Design (as built)</span>
            </button>
            <button
              onClick={() => setViewTab("mermaid")}
              className={`px-3 py-1.5 rounded-lg font-semibold flex items-center gap-2 transition ${
                viewTab === "mermaid"
                  ? "bg-cyan-500 text-black shadow-md shadow-cyan-500/20 font-bold"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Code2 className="w-3.5 h-3.5" />
              <span>Mermaid Diagram</span>
            </button>
          </div>

          {/* Theater Mode Button */}
          <button
            onClick={() => {
              if (theaterMode) {
                setTheaterMode(false);
                setShowLeftSidebar(true);
                setShowRightSidebar(true);
              } else {
                setTheaterMode(true);
                setShowLeftSidebar(false);
                setShowRightSidebar(false);
              }
            }}
            className={`px-3 py-1.5 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition ${
              theaterMode
                ? "bg-cyan-500 text-black border-cyan-400 shadow-md shadow-cyan-500/20 font-bold"
                : "bg-slate-900/80 hover:bg-slate-800 border-slate-800 text-slate-300 hover:text-white"
            }`}
            title="Toggle Theater Mode (expands video to max screen size)"
          >
            {theaterMode ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
            <span>{theaterMode ? "Standard View" : "Theater Mode"}</span>
          </button>

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
        {!showLeftSidebar ? (
          <div className="w-12 border-r border-slate-800/80 bg-[#0b0f19] flex flex-col items-center py-4 shrink-0 justify-between transition-all">
            <button
              onClick={() => {
                setShowLeftSidebar(true);
                setTheaterMode(false);
              }}
              className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition"
              title="Expand Subsystems Panel"
            >
              <ChevronRight className="w-4 h-4 text-cyan-400" />
            </button>
            <span className="text-[10px] uppercase font-mono tracking-widest text-slate-500 [writing-mode:vertical-rl] rotate-180">
              Subsystems ({analysis?.modules.length || 0})
            </span>
            <div className="w-1 h-4" />
          </div>
        ) : (
          <aside className="w-72 lg:w-80 border-r border-slate-800/80 bg-[#0b0f19] flex flex-col shrink-0 transition-all">
            <div className="p-4 border-b border-slate-800/80 flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-cyan-400" />
                  Target Subsystem
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-mono text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded-full border border-cyan-800/40">
                    {analysis?.modules.length || 0} detected
                  </span>
                  <button
                    onClick={() => setShowLeftSidebar(false)}
                    className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
                    title="Collapse Panel"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                </div>
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
                    <div className="font-semibold text-white">Full Repository View</div>
                    <div className="text-[10px] text-slate-400">4-Tier System Architecture</div>
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
        )}

        {/* Center Stage: Live Remotion Video Player OR Mermaid Diagram */}
        <main className="flex-1 bg-[#070a10] flex flex-col items-center justify-start p-2 sm:p-4 overflow-y-auto relative">
          {analysis ? (
            viewTab === "video" ? (
              <div className="flex flex-col items-center justify-center w-full max-w-6xl mx-auto my-auto gap-3.5">
                {/* Player Frame with Click-to-Play and Large Center Play Button */}
                <div
                  className="w-full relative rounded-2xl overflow-hidden border border-slate-800 shadow-2xl bg-black flex items-center justify-center transition-all group select-none"
                  style={{
                    aspectRatio: aspectRatio === "16:9" ? "16/9" : "9/16",
                    maxHeight: theaterMode ? "calc(100vh - 175px)" : "calc(100vh - 215px)",
                    maxWidth: aspectRatio === "16:9" ? "100%" : "440px",
                  }}
                  onClick={() => {
                    if (!playerRef.current) return;
                    if (isPlaying) {
                      playerRef.current.pause();
                      setIsPlaying(false);
                    } else {
                      playerRef.current.play();
                      setIsPlaying(true);
                    }
                  }}
                >
                  <Player
                    ref={(inst) => {
                      playerRef.current = inst;
                      setPlayerInstance(inst);
                    }}
                    key={`${mode}-${selectedModuleId}-${aspectRatio}`}
                    component={mode === "overview" ? RepoReel : ModuleReel}
                    inputProps={(mode === "overview" ? overviewInputProps : moduleInputProps) as any}
                    durationInFrames={durationFrames}
                    compositionWidth={compWidth}
                    compositionHeight={compHeight}
                    fps={30}
                    controls={false}
                    className="w-full h-full object-contain pointer-events-none"
                  />

                  {/* Center Play Overlay when Paused */}
                  {!isPlaying && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[2px] transition-all group-hover:bg-black/25 pointer-events-none">
                      <div className="w-20 h-20 rounded-full bg-cyan-500/90 text-black flex items-center justify-center shadow-2xl shadow-cyan-500/60 transform group-hover:scale-110 transition duration-200">
                        <Play className="w-9 h-9 fill-black translate-x-0.5" />
                      </div>
                    </div>
                  )}

                  {/* Subtitle / Mode pill in top-left corner */}
                  <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md px-3 py-1 rounded-lg border border-white/10 text-xs font-mono text-slate-300 pointer-events-none flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                    <span className="font-semibold text-white">
                      {mode === "overview" ? "Whole Repo Walkthrough" : `Subsystem Spotlight: ${selectedModuleId}`}
                    </span>
                  </div>
                </div>

                {/* DEDICATED VIDEO PLAYER CONTROLLER BAR (Isolated state to eliminate re-renders) */}
                <VideoControlsBar
                  player={playerInstance}
                  durationFrames={durationFrames}
                  mode={mode}
                  aspectRatio={aspectRatio}
                  setAspectRatio={setAspectRatio}
                  theaterMode={theaterMode}
                  setTheaterMode={setTheaterMode}
                  setShowLeftSidebar={setShowLeftSidebar}
                  setShowRightSidebar={setShowRightSidebar}
                  onPlayStateChange={setIsPlaying}
                />

                {/* Status Toast */}
                {exportMessage && (
                  <div className="mt-1 px-4 py-2 rounded-xl bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 text-xs font-mono flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-cyan-400" />
                    {exportMessage}
                  </div>
                )}
              </div>
            ) : viewTab === "blueprint" ? (
              /* System Blueprint View (Whole App or Selected Module) */
              <div className="w-full h-full flex flex-col justify-between py-1">
                <div className="flex items-center justify-between mb-3 px-1">
                  <div>
                    <h2 className="text-xl font-bold text-white flex items-center gap-2 font-['Roboto',sans-serif]">
                      <span>🏗️</span>
                      <span>
                        {mode === "overview"
                          ? "System Architecture Blueprint (Whole App)"
                          : `Subsystem Blueprint: [${activeModule?.name || selectedModuleId}]`}
                      </span>
                    </h2>
                    <p className="text-xs text-slate-400 mt-0.5">
                      {mode === "overview"
                        ? "Visual whole-app architecture with local boundaries, numbered step sequences, and section audio narration"
                        : `Visual execution blueprint with inbound callers, internal pipeline stages, and outbound dependencies for ${activeModule?.name}`}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <a
                      href={blueprintUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-1.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black text-xs font-bold flex items-center gap-2 shadow-lg shadow-cyan-500/20 transition"
                    >
                      <span>Open in New Tab</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>

                <div className="flex-1 bg-[#090e17] border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
                  <iframe
                    key={blueprintUrl}
                    src={blueprintUrl}
                    title="System Architecture Blueprint"
                    className="w-full h-full border-0"
                  />
                </div>
              </div>
            ) : viewTab === "design" ? (
              /* Technical Design View (Whole App or Selected Module) */
              <div className="w-full h-full flex flex-col justify-between py-1">
                <div className="flex items-center justify-between mb-3 px-1">
                  <div>
                    <h2 className="text-xl font-bold text-white flex items-center gap-2 font-['Roboto',sans-serif]">
                      <span>📐</span>
                      <span>
                        {mode === "overview"
                          ? "Git-Motion Technical Design Document (As Built)"
                          : `Subsystem Technical Design: [${activeModule?.name || selectedModuleId}]`}
                      </span>
                    </h2>
                    <p className="text-xs text-slate-400 mt-0.5">
                      {mode === "overview"
                        ? "Production engineering design: 4-tier plane architecture, AST extraction, Git churn mechanics, and Remotion 60fps canvas"
                        : `Engineering design specification: role, coupling metric, 4-stage execution spine, code mechanics, and file churn for ${activeModule?.name}`}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <a
                      href={technicalDesignUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-1.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black text-xs font-bold flex items-center gap-2 shadow-lg shadow-cyan-500/20 transition"
                    >
                      <span>Open in New Tab</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>

                <div className="flex-1 bg-[#090e17] border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
                  <iframe
                    key={technicalDesignUrl}
                    src={technicalDesignUrl}
                    title="Git-Motion Technical Design"
                    className="w-full h-full border-0"
                  />
                </div>
              </div>
            ) : (
              /* Mermaid Architecture Diagram View */
              <MermaidViewer
                chartText={mermaidMarkdown}
                title={
                  mode === "overview"
                    ? "Full 4-Tier Architecture Flowchart"
                    : `Subsystem Boundary: [${activeModule?.name || "Module"}]`
                }
                subtitle={
                  mode === "overview"
                    ? "Interactive visual diagram showing how your entire project connects"
                    : `Visual map of inbound callers and outbound dependencies for ${activeModule?.name}`
                }
              />
            )
          ) : (
            <div className="text-center font-mono text-sm text-slate-500 flex flex-col items-center gap-3">
              <RefreshCw className="w-6 h-6 animate-spin text-cyan-400" />
              <span>Analyzing repository structure & git churn...</span>
            </div>
          )}
        </main>

        {/* Right Sidebar: Inspector & Video Customization */}
        {!showRightSidebar ? (
          <div className="w-12 border-l border-slate-800/80 bg-[#0b0f19] flex flex-col items-center py-4 shrink-0 justify-between transition-all">
            <button
              onClick={() => {
                setShowRightSidebar(true);
                setTheaterMode(false);
              }}
              className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition"
              title="Expand Controls Panel"
            >
              <ChevronLeft className="w-4 h-4 text-cyan-400" />
            </button>
            <span className="text-[10px] uppercase font-mono tracking-widest text-slate-500 [writing-mode:vertical-rl] rotate-180">
              Styling & Controls
            </span>
            <div className="w-1 h-4" />
          </div>
        ) : (
          <aside className="w-72 lg:w-80 border-l border-slate-800/80 bg-[#0b0f19] flex flex-col shrink-0 p-5 space-y-6 overflow-y-auto transition-all">
            {/* Controls Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <Sliders className="w-3.5 h-3.5 text-cyan-400" />
                  Styling & Audio
                </span>
                <button
                  onClick={() => setShowRightSidebar(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
                  title="Collapse Panel"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* Audio Indicator */}
              <div className="p-3 rounded-xl bg-cyan-950/40 border border-cyan-800/40 flex items-center gap-3 text-xs text-cyan-300 font-mono">
                <Volume2 className="w-4 h-4 text-cyan-400 animate-pulse" />
                <div>
                  <div className="font-bold">Natural AI Voiceover</div>
                  <div className="text-[10px] text-cyan-400/70">Kokoro TTS • Plain-English Narration</div>
                </div>
              </div>

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
        )}
      </div>
    </div>
  );
};
