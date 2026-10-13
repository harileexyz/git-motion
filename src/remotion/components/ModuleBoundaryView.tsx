import React from "react";
import { ModuleCluster, ThemeColors, FileNode } from "../../core/types";
import { useCurrentFrame, interpolate } from "remotion";

interface ModuleBoundaryViewProps {
  module: ModuleCluster;
  allFiles: FileNode[];
  theme: ThemeColors;
  activePhase: number; // 0, 1, 2, 3
}

interface UnderTheHoodStep {
  num: number;
  title: string;
  subTitle: string;
  fileName: string;
  whatItDoes: string;
  tag: string;
  icon: string;
}

export const ModuleBoundaryView: React.FC<ModuleBoundaryViewProps> = ({
  module,
  allFiles,
  theme,
  activePhase,
}) => {
  const frame = useCurrentFrame();
  const pulseLoop = (frame % 45) / 45;

  const moduleFiles = allFiles.filter((f) => f.module === module.id);

  // Generate specialized under-the-hood steps based on the actual subsystem
  const getUnderTheHoodSteps = (): UnderTheHoodStep[] => {
    const id = module.id.toLowerCase();

    if (id.includes("server")) {
      return [
        {
          num: 1,
          title: "Express API Listener",
          subTitle: "Bootstraps local daemon",
          fileName: "src/server/index.ts",
          whatItDoes: "Starts Express HTTP daemon on port 4321, binds CORS, and registers REST routes (/api/analysis, /api/render).",
          tag: "HTTP Daemon",
          icon: "⚡",
        },
        {
          num: 2,
          title: "AST File Scanner",
          subTitle: "Extracts imports across languages",
          fileName: "src/server/analyzer.ts",
          whatItDoes: "Recursively scans repository, ignores node_modules/git, extracts imports for TS, JS, Python, Go, Rust, Java.",
          tag: "AST Parsing",
          icon: "🔍",
        },
        {
          num: 3,
          title: "Git Churn & Hotspots",
          subTitle: "Parses commit velocity",
          fileName: "src/server/git.ts",
          whatItDoes: "Executes git log --numstat to score file churn, active contributors, and identify code hotspots.",
          tag: "Git History",
          icon: "📈",
        },
        {
          num: 4,
          title: "Graph Ingestion & Cache",
          subTitle: "Builds universal model",
          fileName: "src/server/index.ts",
          whatItDoes: "Links modules and imports into a universal in-memory graph and serves analysis JSON to studio & video renderer.",
          tag: "Memory Cache",
          icon: "🧩",
        },
      ];
    }

    if (id.includes("core")) {
      return [
        {
          num: 1,
          title: "Universal Type Models",
          subTitle: "Defines architectural schema",
          fileName: "src/core/types.ts",
          whatItDoes: "Declares universal FileNode, ModuleCluster, and DependencyLink schemas for cross-language consistency.",
          tag: "Type Schema",
          icon: "📐",
        },
        {
          num: 2,
          title: "4-Tier Classifier",
          subTitle: "Organizes subsystems cleanly",
          fileName: "src/core/architecture.ts",
          whatItDoes: "Groups detected files into 4 tiers: Entrypoints, Processing, Core Blueprint, and Canvas Rendering.",
          tag: "Tier Grouping",
          icon: "🏛️",
        },
        {
          num: 3,
          title: "Coupling Calculator",
          subTitle: "Inbound vs Outbound edges",
          fileName: "src/core/architecture.ts",
          whatItDoes: "Calculates architectural coupling scores and surfaces boundary violations between modules.",
          tag: "Coupling Score",
          icon: "🔗",
        },
        {
          num: 4,
          title: "Flowchart & Blueprint Engine",
          subTitle: "Builds Mermaid & SVG maps",
          fileName: "src/core/mermaid.ts",
          whatItDoes: "Generates Markdown Mermaid syntax and standalone interactive HTML blueprints for documentation.",
          tag: "Diagram Output",
          icon: "📊",
        },
      ];
    }

    if (id.includes("remotion")) {
      return [
        {
          num: 1,
          title: "Composition Registry",
          subTitle: "Landscape & Vertical setups",
          fileName: "src/remotion/Root.tsx",
          whatItDoes: "Registers RepoOverview (1060 frames) and ModuleSpotlight (900 frames) in 16:9 and 9:16 aspect ratios.",
          tag: "Root Setup",
          icon: "🎬",
        },
        {
          num: 2,
          title: "60fps Frame Compositor",
          subTitle: "Draws visual architecture",
          fileName: "src/remotion/RepoReel.tsx",
          whatItDoes: "Mounts AnimatedArchitectureDiagram with moving SVG light beams, glowing step badges, and background aura.",
          tag: "Canvas Render",
          icon: "✨",
        },
        {
          num: 3,
          title: "HUD & Timeline Sync",
          subTitle: "Top-edge progress meter",
          fileName: "src/remotion/HUDOverlay.tsx",
          whatItDoes: "Tracks frame/duration progress, displays active scene titles, and eliminates subtitle overlap.",
          tag: "HUD Metrics",
          icon: "⏱️",
        },
        {
          num: 4,
          title: "Kinetic Captions & Audio",
          subTitle: "Kokoro TTS human narration",
          fileName: "src/remotion/KineticCaptionBar.tsx",
          whatItDoes: "Synchronizes Kokoro af_heart plain-English voice with word-highlighted typography in real time.",
          tag: "Speech & Text",
          icon: "🎙️",
        },
      ];
    }

    if (id.includes("studio")) {
      return [
        {
          num: 1,
          title: "Vite React Application",
          subTitle: "Fast client mounting",
          fileName: "src/studio/main.tsx",
          whatItDoes: "Mounts dark developer studio interface with Tailwind CSS, Lucide icons, and hot module reloading.",
          tag: "Client UI",
          icon: "💻",
        },
        {
          num: 2,
          title: "Remotion Player Controller",
          subTitle: "Video playback & controls",
          fileName: "src/studio/App.tsx",
          whatItDoes: "Controls 60fps player with click-to-play, spacebar toggle, theater mode, and aspect ratio switcher.",
          tag: "Player Bridge",
          icon: "▶️",
        },
        {
          num: 3,
          title: "Interactive Blueprint Viewer",
          subTitle: "Standalone SVG & HTML preview",
          fileName: "src/studio/App.tsx",
          whatItDoes: "Embeds standalone architecture blueprint iframe and provides one-click export for GitHub documentation.",
          tag: "Blueprint Tab",
          icon: "🗺️",
        },
        {
          num: 4,
          title: "Headless Render Dispatcher",
          subTitle: "Triggers MP4 generation",
          fileName: "src/studio/App.tsx",
          whatItDoes: "Sends compositionId and theme preset to /api/render to invoke Remotion renderer for MP4 file export.",
          tag: "Export Job",
          icon: "💾",
        },
      ];
    }

    if (id.includes("cli")) {
      return [
        {
          num: 1,
          title: "Command Line Parser",
          subTitle: "Reads terminal arguments",
          fileName: "src/cli/bin.ts",
          whatItDoes: "Parses CLI commands: git-motion studio, git-motion reel, and git-motion inspect.",
          tag: "CLI Entry",
          icon: "⌨️",
        },
        {
          num: 2,
          title: "Git Repository Discovery",
          subTitle: "Locates workspace root",
          fileName: "src/cli/bin.ts",
          whatItDoes: "Traverses working directory to locate .git repository root and validates source file structure.",
          tag: "Path Resolver",
          icon: "📂",
        },
        {
          num: 3,
          title: "Background Daemon Spawner",
          subTitle: "Boots local server",
          fileName: "src/cli/bin.ts",
          whatItDoes: "Starts Express server process on port 4321 and automatically launches browser preview cockpit.",
          tag: "Process Spawn",
          icon: "🚀",
        },
        {
          num: 4,
          title: "Headless Render Trigger",
          subTitle: "Direct CLI export",
          fileName: "src/cli/bin.ts",
          whatItDoes: "Directly runs renderVideoToFile() to output 1080p MP4 without requiring browser interaction.",
          tag: "Export CLI",
          icon: "🎥",
        },
      ];
    }

    // Default / Root
    return [
      {
        num: 1,
        title: "Package Manifest & Setup",
        subTitle: "Declares core dependencies",
        fileName: moduleFiles[0]?.name || "package.json",
        whatItDoes: "Orchestrates Remotion, Express, Tailwind CSS, Vite, and ONNX Runtime dependencies across the workspace.",
        tag: "Manifest",
        icon: "📦",
      },
      {
        num: 2,
        title: "Build & Compiler Pipeline",
        subTitle: "TypeScript & Vite targets",
        fileName: moduleFiles[1]?.name || "tsconfig.json",
        whatItDoes: "Configures ES2022 module bundling, JSX transformations, and Node.js server compilation.",
        tag: "Build Config",
        icon: "⚙️",
      },
      {
        num: 3,
        title: "Styling Tokens & Themes",
        subTitle: "High-contrast developer palettes",
        fileName: moduleFiles[2]?.name || "tailwind.config.js",
        whatItDoes: "Configures dark themes (Tokyo Night, Cyberpunk, Catppuccin) and glowing filter effects.",
        tag: "Theme Tokens",
        icon: "🎨",
      },
      {
        num: 4,
        title: "Repository Documentation",
        subTitle: "README hero banner",
        fileName: moduleFiles[3]?.name || "README.md",
        whatItDoes: "Documents project architecture, CLI usage, and embeds cinematic walkthrough video banners.",
        tag: "Docs & Embed",
        icon: "📖",
      },
    ];
  };

  const steps = getUnderTheHoodSteps();

  return (
    <div className="absolute inset-0 px-12 pt-20 pb-28 flex flex-col justify-between font-['Roboto',sans-serif] pointer-events-none select-none">
      {/* Top Header Card */}
      <div className="flex items-center justify-between bg-slate-900/90 border border-slate-800 rounded-2xl p-5 backdrop-blur-xl shadow-xl">
        <div className="flex items-center gap-4">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center text-xl font-black shadow-lg"
            style={{ backgroundColor: module.color, color: "#0b1628" }}
          >
            0{activePhase + 1}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono uppercase px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold">
                SUB-SYSTEM DEEP DIVE
              </span>
              <span className="text-xs font-mono text-slate-400">path: {module.path}</span>
            </div>
            <h2 className="text-2xl font-black text-white mt-1 flex items-center gap-2">
              <span>{module.name}</span>
              <span className="text-slate-400 font-normal text-lg">• How It Works Under The Hood</span>
            </h2>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs font-mono px-3 py-1.5 rounded-xl bg-slate-800 border border-slate-700 text-slate-300">
            {module.primaryLanguage} • {module.fileCount} files • {module.loc.toLocaleString()} LOC
          </span>
          <span className="text-xs font-mono px-3 py-1.5 rounded-xl bg-emerald-950/60 border border-emerald-800/40 text-emerald-300 font-bold">
            {module.inboundDependencies.length} Callers ➔ {module.outboundDependencies.length} Deps
          </span>
        </div>
      </div>

      {/* Main Under-The-Hood Pipeline Canvas: 4 Horizontal Sequential Cards with Animated Connectors */}
      <div className="relative flex-1 my-5 bg-[#0b1322] border border-slate-800 rounded-3xl p-6 flex flex-col justify-between shadow-2xl overflow-hidden">
        {/* SVG Connectors between the 4 steps */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <marker id="arr-pipe" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto">
              <path d="M0,1 L8,5 L0,9 z" fill="#38bdf8" />
            </marker>
          </defs>

          {/* Connection lines between cards: Step 1 -> 2, 2 -> 3, 3 -> 4 */}
          <line x1="24%" y1="50%" x2="27%" y2="50%" stroke="#38bdf8" strokeWidth="2.5" markerEnd="url(#arr-pipe)" />
          <line x1="49%" y1="50%" x2="52%" y2="50%" stroke="#00f3ff" strokeWidth="2.5" markerEnd="url(#arr-pipe)" />
          <line x1="74%" y1="50%" x2="77%" y2="50%" stroke="#ff967d" strokeWidth="2.5" markerEnd="url(#arr-pipe)" />

          {/* Travelling light pulses */}
          <circle
            cx={`${interpolate(pulseLoop, [0, 1], [24, 27])}%`}
            cy="50%"
            r="4"
            fill="#38bdf8"
          />
          <circle
            cx={`${interpolate(pulseLoop, [0, 1], [49, 52])}%`}
            cy="50%"
            r="4"
            fill="#00f3ff"
          />
          <circle
            cx={`${interpolate(pulseLoop, [0, 1], [74, 77])}%`}
            cy="50%"
            r="4"
            fill="#ff967d"
          />
        </svg>

        {/* 4 Execution Cards Grid */}
        <div className="grid grid-cols-4 gap-6 h-full items-center z-10">
          {steps.map((s, idx) => {
            const isActive = idx === activePhase;
            const isPassed = idx < activePhase;

            return (
              <div
                key={s.num}
                className={`h-[92%] rounded-2xl p-5 border flex flex-col justify-between transition-all duration-300 relative ${
                  isActive
                    ? "bg-slate-900/98 shadow-2xl scale-[1.03]"
                    : isPassed
                    ? "bg-slate-950/80 border-slate-700/60 opacity-90"
                    : "bg-slate-950/50 border-slate-800/40 opacity-55"
                }`}
                style={{
                  borderColor: isActive
                    ? "#00f3ff"
                    : isPassed
                    ? "rgba(56, 189, 248, 0.4)"
                    : "rgba(255, 255, 255, 0.08)",
                  boxShadow: isActive ? "0 0 35px rgba(0, 243, 255, 0.25)" : "none",
                }}
              >
                {/* Step Header */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2.5">
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center font-mono font-black text-sm"
                        style={{
                          backgroundColor: isActive ? "#00f3ff" : "rgba(255, 255, 255, 0.1)",
                          color: isActive ? "#0b1628" : "#ffffff",
                        }}
                      >
                        {s.num}
                      </div>
                      <span className="text-xl">{s.icon}</span>
                    </div>

                    <span
                      className="text-[10px] font-mono px-2 py-0.5 rounded-full font-bold uppercase"
                      style={{
                        backgroundColor: isActive ? "rgba(0, 243, 255, 0.2)" : "rgba(255, 255, 255, 0.05)",
                        color: isActive ? "#00f3ff" : "#94a3b8",
                        border: `1px solid ${isActive ? "rgba(0, 243, 255, 0.4)" : "rgba(255, 255, 255, 0.1)"}`,
                      }}
                    >
                      {s.tag}
                    </span>
                  </div>

                  <h3 className="text-lg font-black text-white tracking-tight">{s.title}</h3>
                  <p className="text-xs text-slate-400 mt-0.5">{s.subTitle}</p>
                </div>

                {/* File Reference */}
                <div className="my-2 p-2 rounded-xl bg-black/40 border border-white/5 font-mono text-xs flex items-center justify-between">
                  <span className="text-cyan-300 font-bold truncate">📄 {s.fileName}</span>
                </div>

                {/* What It Does Under The Hood */}
                <div className="flex-1 my-2">
                  <p className="text-xs text-slate-300 leading-relaxed bg-white/[0.02] p-3 rounded-xl border border-white/5">
                    {s.whatItDoes}
                  </p>
                </div>

                {/* Step Status Footer */}
                <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px] font-mono">
                  <span className="text-slate-500">Execution Phase {s.num}</span>
                  {isActive ? (
                    <span className="text-cyan-400 font-bold flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                      ACTIVE
                    </span>
                  ) : isPassed ? (
                    <span className="text-emerald-400 font-bold">✓ DONE</span>
                  ) : (
                    <span className="text-slate-600">WAITING</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Integration Context Bar: Inbound Callers -> Subsystem -> Outbound Dependencies */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 flex items-center justify-between text-xs font-mono shadow-xl">
        <div className="flex items-center gap-3">
          <span className="text-emerald-400 font-bold uppercase tracking-wider">↙ Inbound Callers:</span>
          <div className="flex items-center gap-1.5">
            {module.inboundDependencies.length > 0 ? (
              module.inboundDependencies.map((c) => (
                <span key={c} className="px-2.5 py-1 rounded-lg bg-emerald-950/60 border border-emerald-800/40 text-emerald-300 font-bold">
                  {c}
                </span>
              ))
            ) : (
              <span className="text-slate-500">Root Entrypoint (No Callers)</span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2 text-slate-400">
          <span>➔</span>
          <span className="text-white font-bold px-3 py-1 rounded-lg bg-white/10 border border-white/10">
            {module.name} Engine
          </span>
          <span>➔</span>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-cyan-400 font-bold uppercase tracking-wider">↗ Outbound Dependencies:</span>
          <div className="flex items-center gap-1.5">
            {module.outboundDependencies.length > 0 ? (
              module.outboundDependencies.map((d) => (
                <span key={d} className="px-2.5 py-1 rounded-lg bg-cyan-950/60 border border-cyan-800/40 text-cyan-300 font-bold">
                  {d}
                </span>
              ))
            ) : (
              <span className="text-slate-500">Self-Contained (No Dependencies)</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
