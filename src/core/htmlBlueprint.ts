import { RepoAnalysis, ModuleCluster } from "./types";

interface SubsystemMetadata {
  storyKey: string;
  badge: string;
  role: string;
  tierName: string;
  steps: Array<{
    num: number;
    title: string;
    subTitle: string;
    fileName: string;
    audioFile: string;
    whatItDoes: string;
    narrationText: string;
    tag: string;
    icon: string;
  }>;
}

const SUBSYSTEM_METADATA: Record<string, SubsystemMetadata> = {
  server: {
    storyKey: "server",
    badge: "INGESTION & DAEMON",
    role: "Local Express HTTP daemon & multi-language AST scanner",
    tierName: "Tier 2: Transport & Orchestration",
    steps: [
      {
        num: 1,
        title: "Express HTTP Server",
        subTitle: "Bootstraps local HTTP daemon",
        fileName: "src/server/index.ts",
        audioFile: "/audio/voice/server_step1.mp3",
        whatItDoes: "Starts Express HTTP daemon on port 4321, binds CORS policies, and exposes REST endpoints (/api/analysis, /api/render).",
        narrationText: "Inside the server subsystem, index dot t s bootstraps an Express HTTP daemon on port 4321, binding CORS policies and registering REST endpoints for analytical queries and headless video rendering.",
        tag: "HTTP Daemon",
        icon: "⚡",
      },
      {
        num: 2,
        title: "Multi-Language AST Scanner",
        subTitle: "Extracts imports across languages",
        fileName: "src/server/analyzer.ts",
        audioFile: "/audio/voice/server_step2.mp3",
        whatItDoes: "Recursively traverses disk, skipping node_modules and .git, extracting import and require tokens across TypeScript, JavaScript, Python, Go, and Rust.",
        narrationText: "Next, analyzer dot t s performs recursive directory scans while ignoring node modules and git. It uses language-specific regex tokenizers to extract imports across TypeScript, Python, Go, and Rust, resolving relative paths into concrete edges.",
        tag: "AST Parsing",
        icon: "🔍",
      },
      {
        num: 3,
        title: "Git Churn Normalization",
        subTitle: "Parses commit velocity & deltas",
        fileName: "src/server/git.ts",
        audioFile: "/audio/voice/server_step3.mp3",
        whatItDoes: "Executes git log --numstat in a child process to score commit velocity and line alterations, applying Cf = 0.65*commits + 0.35*deltas.",
        narrationText: "Then, git dot t s spawns a child process to execute git log with numstat. It scores file velocity using the normalized formula sixty-five percent commit frequency plus thirty-five percent line deltas to spotlight critical code hotspots.",
        tag: "Git History",
        icon: "📈",
      },
      {
        num: 4,
        title: "In-Memory Graph Cache",
        subTitle: "Feeds Studio & Video Renderer",
        fileName: "src/server/index.ts",
        audioFile: "/audio/voice/server_step4.mp3",
        whatItDoes: "Constructs the universal RepoAnalysis data model, caching file nodes and links in memory to instantly serve the studio and headless MP4 engine.",
        narrationText: "Finally, it constructs the universal RepoAnalysis data model, caching file nodes and dependency links in memory to instantly feed both the web studio and the Remotion video engine.",
        tag: "Memory Cache",
        icon: "🧩",
      },
    ],
  },
  core: {
    storyKey: "core",
    badge: "MODELING & ARCHITECTURE",
    role: "Universal architectural contracts, classifier, and blueprint compiler",
    tierName: "Tier 3: Core Domain Foundation",
    steps: [
      {
        num: 1,
        title: "Universal Type Contracts",
        subTitle: "Architectural schemas",
        fileName: "src/core/types.ts",
        audioFile: "/audio/voice/core_step1.mp3",
        whatItDoes: "Declares universal schemas for FileNode, ModuleCluster, and DependencyLink with zero external dependencies.",
        narrationText: "The core subsystem defines the architectural schema in types dot t s, establishing strongly typed contracts for FileNode, ModuleCluster, and DependencyLink with zero external dependencies.",
        tag: "Schema",
        icon: "📐",
      },
      {
        num: 2,
        title: "4-Tier Classifier",
        subTitle: "Organizes clean hierarchy",
        fileName: "src/core/architecture.ts",
        audioFile: "/audio/voice/core_step2.mp3",
        whatItDoes: "Groups detected files into 4 clean tiers: Entrypoints, Transport Orchestration, Core Domain, and Video Presentation.",
        narrationText: "Next, architecture dot t s groups files into four hierarchical tiers: entry points with high outbound calls, orchestration servers, foundational domain data models, and output rendering leaves.",
        tag: "Classification",
        icon: "🏛️",
      },
      {
        num: 3,
        title: "Coupling & Hotspot Calculator",
        subTitle: "Evaluates dependency ratios",
        fileName: "src/core/architecture.ts",
        audioFile: "/audio/voice/core_step3.mp3",
        whatItDoes: "Calculates module coupling score (outbound / total links) to identify tightly coupled coordinators versus independent domain packages.",
        narrationText: "Then, it calculates module coupling ratios by dividing outbound dependencies by total connections, identifying tightly coupled orchestration layers versus independent foundational libraries.",
        tag: "Metrics",
        icon: "⚖️",
      },
      {
        num: 4,
        title: "SVG Blueprint Compiler",
        subTitle: "Renders interactive system maps",
        fileName: "src/core/htmlBlueprint.ts",
        audioFile: "/audio/voice/core_step4.mp3",
        whatItDoes: "Generates standalone SVG architecture blueprints with animated photon pulses and embedded neural narration audio.",
        narrationText: "Finally, htmlBlueprint dot t s compiles interactive standalone SVG system blueprints with themed zone boundaries, data lanes, and travelling photon pulse animations.",
        tag: "Compiler",
        icon: "📊",
      },
    ],
  },
  remotion: {
    storyKey: "remotion",
    badge: "MOTION CANVAS",
    role: "60fps cinematic video compositions & kinetic typography",
    tierName: "Tier 4: Rendering Presentation Leaves",
    steps: [
      {
        num: 1,
        title: "60fps Composition Registry",
        subTitle: "Widescreen & Vertical Viewports",
        fileName: "src/remotion/Root.tsx",
        audioFile: "/audio/voice/remotion_step1.mp3",
        whatItDoes: "Registers RepoOverview (1920x1080) and VerticalOverview (1080x1920) compositions at strict 60fps.",
        narrationText: "The remotion subsystem houses sixty frames per second video compositions in Root dot t s, configuring landscape nineteen-twenty by ten-eighty and vertical ten-eighty by nineteen-twenty viewports.",
        tag: "Canvas",
        icon: "🎬",
      },
      {
        num: 2,
        title: "Cubic Bezier Light Beams",
        subTitle: "Animated connection pulses",
        fileName: "src/remotion/AnimatedArchitectureDiagram.tsx",
        audioFile: "/audio/voice/remotion_step2.mp3",
        whatItDoes: "Computes SVG cubic bezier curves between modules and interpolates travelling photon pulses as a pure mathematical function of the current frame.",
        narrationText: "Next, AnimatedArchitectureDiagram dot t s x computes SVG cubic bezier paths between modules, interpolating photon light pulses across connection curves as a pure mathematical function of the current frame.",
        tag: "Animation",
        icon: "✨",
      },
      {
        num: 3,
        title: "Kinetic Subtitle Typography",
        subTitle: "Word-by-word highlights",
        fileName: "src/remotion/KineticCaptionBar.tsx",
        audioFile: "/audio/voice/remotion_step3.mp3",
        whatItDoes: "Highlights technical keywords in real time with glowing backgrounds matched to neural voice timing.",
        narrationText: "Then, KineticCaptionBar dot t s x renders word-by-word subtitles with dynamic glowing backgrounds, highlighting critical technical keywords in real time as the neural voiceover speaks.",
        tag: "Typography",
        icon: "💬",
      },
      {
        num: 4,
        title: "Motion Camera & Progress Sync",
        subTitle: "Frame interpolation & Audio",
        fileName: "src/remotion/HUDOverlay.tsx",
        audioFile: "/audio/voice/remotion_step4.mp3",
        whatItDoes: "Smoothly pans and scales the viewport into active module boundaries while keeping a clean top progress bar and zero audio stutter.",
        narrationText: "Finally, spring and interpolate hooks smoothly pan and zoom the camera into active subsystem boundaries, synchronized with a top glowing progress bar and zero audio stutter.",
        tag: "Camera",
        icon: "🎥",
      },
    ],
  },
  cli: {
    storyKey: "cli",
    badge: "ENTRYPOINT",
    role: "Terminal entrypoint & headless render dispatcher",
    tierName: "Tier 1: Entry Points & Triggers",
    steps: [
      {
        num: 1,
        title: "Commander CLI Entrypoint",
        subTitle: "Flag parsing & validation",
        fileName: "src/cli/bin.ts",
        audioFile: "/audio/voice/cli_step1.mp3",
        whatItDoes: "Parses options (--port, --theme, --render), validates local directory, and locates git repository marker.",
        narrationText: "In bin dot t s, the commander CLI handles flags like port, theme, and headless render, validating the working tree and locating the root git repository marker.",
        tag: "Commander",
        icon: "⌨️",
      },
      {
        num: 2,
        title: "Repository Validation",
        subTitle: "Integrity & directory checks",
        fileName: "src/cli/bin.ts",
        audioFile: "/audio/voice/cli_step2.mp3",
        whatItDoes: "Verifies local filesystem paths, bundles server scripts, and checks for .git directory.",
        narrationText: "Next, it verifies local repository integrity, builds the server and client bundles, and spawns the background Express daemon on an available local port.",
        tag: "Validation",
        icon: "🛡️",
      },
      {
        num: 3,
        title: "Local Studio Spawner",
        subTitle: "Launches background server",
        fileName: "src/cli/bin.ts",
        audioFile: "/audio/voice/cli_step3.mp3",
        whatItDoes: "Spawns the local Express daemon on port 4321 and opens the user's default browser.",
        narrationText: "Then, it automatically opens your default web browser to localhost 4321, connecting you directly to the interactive studio cockpit.",
        tag: "Spawner",
        icon: "🚀",
      },
      {
        num: 4,
        title: "Headless MP4 Rendering",
        subTitle: "CI/CD export pipeline",
        fileName: "src/cli/bin.ts",
        audioFile: "/audio/voice/cli_step4.mp3",
        whatItDoes: "Invokes @remotion/renderer to composite 60fps frames and transcode to MP4 without launching a GUI.",
        narrationText: "Finally, it supports headless batch rendering, compiling sixty frames per second MP4 architecture walkthroughs directly from CI/CD without requiring a browser window.",
        tag: "Headless",
        icon: "📦",
      },
    ],
  },
  studio: {
    storyKey: "studio",
    badge: "HUMAN COCKPIT",
    role: "Interactive React Vite developer cockpit & scrubber",
    tierName: "Tier 2: Transport & Orchestration",
    steps: [
      {
        num: 1,
        title: "React Vite Dashboard",
        subTitle: "Instant HMR SPA Cockpit",
        fileName: "src/studio/main.tsx",
        audioFile: "/audio/voice/studio_step1.mp3",
        whatItDoes: "Initializes React 18 root, Tailwind CSS styles, and Lucide icon kits for a responsive developer interface.",
        narrationText: "The studio plane provides an interactive developer cockpit built with React and Vite, featuring zero-lag responsive layout and hot module reloading.",
        tag: "Vite SPA",
        icon: "🖥️",
      },
      {
        num: 2,
        title: "Isolated 60fps Scrubber Loop",
        subTitle: "Eliminates re-render storms",
        fileName: "src/studio/components/VideoControlsBar.tsx",
        audioFile: "/audio/voice/studio_step2.mp3",
        whatItDoes: "Subscribes to player frames inside an isolated sub-component via requestAnimationFrame, keeping App.tsx unburdened.",
        narrationText: "In VideoControlsBar dot t s x, player state is strictly isolated from parent components, using a sixty frames per second animation frame loop to guarantee butter-smooth scrubbing without re-render storms.",
        tag: "RAF Loop",
        icon: "⏱️",
      },
      {
        num: 3,
        title: "Multi-View Architecture Tabs",
        subTitle: "Video, Blueprint & Technical Design",
        fileName: "src/studio/App.tsx",
        audioFile: "/audio/voice/studio_step3.mp3",
        whatItDoes: "Provides seamless tab switching between Video Walkthrough, System Blueprint, Technical Design, and Mermaid diagrams.",
        narrationText: "Next, App dot t s x lets engineers switch instantly between the cinematic video walkthrough, the interactive SVG blueprint, the production technical design document, and raw Mermaid diagrams.",
        tag: "Tabs",
        icon: "📑",
      },
      {
        num: 4,
        title: "Subsystem Inspector & Export",
        subTitle: "Live metrics & video rendering",
        fileName: "src/studio/App.tsx",
        audioFile: "/audio/voice/studio_step4.mp3",
        whatItDoes: "Displays inbound/outbound connection stats, churn velocity, and dispatches one-click MP4 export jobs.",
        narrationText: "Finally, engineers can filter subsystems, inspect inbound callers and outbound dependencies, customize visual themes, and export high-definition video walkthroughs with one click.",
        tag: "Dispatcher",
        icon: "🎯",
      },
    ],
  },
};

function getSubsystemMeta(moduleId: string, moduleName?: string): SubsystemMetadata {
  const id = (moduleId || "").toLowerCase();
  for (const key of Object.keys(SUBSYSTEM_METADATA)) {
    if (id.includes(key)) return SUBSYSTEM_METADATA[key];
  }
  return {
    storyKey: "module",
    badge: "FOUNDATION & CONFIG",
    role: "Project workspace foundation, root manifests & build automation",
    tierName: "Tier 1: Foundation & Infrastructure",
    steps: [
      {
        num: 1,
        title: "Workspace Manifest & Setup",
        subTitle: "Environment configuration",
        fileName: "package.json / tsconfig.json",
        audioFile: "/audio/voice/module_step1.mp3",
        whatItDoes: "Declares environment configuration, root dependency manifests, and build automation pipelines.",
        narrationText: "This module organizes the foundation of your project workspace, declaring environment configuration, root dependency manifests, and build automation pipelines.",
        tag: "Manifest",
        icon: "⚙️",
      },
      {
        num: 2,
        title: "Type Safety & Bundler Rules",
        subTitle: "Strict cross-boundary typing",
        fileName: "vite.config.ts / tsconfig.json",
        audioFile: "/audio/voice/module_step2.mp3",
        whatItDoes: "Ensures strict type checking across frontend and backend compilation boundaries.",
        narrationText: "Inside, TypeScript compilation targets and bundler configurations ensure strict type safety across both frontend and backend compilation boundaries.",
        tag: "Compiler",
        icon: "🛡️",
      },
      {
        num: 3,
        title: "Task Automation Scripts",
        subTitle: "Build, lint & test coordination",
        fileName: "scripts / package scripts",
        audioFile: "/audio/voice/module_step3.mp3",
        whatItDoes: "Coordinates linting, building, neural voice synthesis, and testing across all subsystems.",
        narrationText: "Its core scripts coordinate linting, testing, and continuous deployment, ensuring seamless inter-operation across all decoupled subsystem packages.",
        tag: "Scripts",
        icon: "🛠️",
      },
      {
        num: 4,
        title: "Architectural Boundary Enforcement",
        subTitle: "Zero circular leak guarantee",
        fileName: "root architecture",
        audioFile: "/audio/voice/module_step4.mp3",
        whatItDoes: "Enforces decoupled module contracts to prevent circular imports and guarantee clean maintainability.",
        narrationText: "By centralizing shared infrastructure here, every tier of your application maintains strict boundaries, zero circular leaks, and high architectural maintainability.",
        tag: "Contracts",
        icon: "🏛️",
      },
    ],
  };
}

export function generateArchitectureHtml(analysis: RepoAnalysis, moduleId?: string): string {
  if (moduleId && moduleId !== "overview") {
    return generateModuleArchitectureHtml(analysis, moduleId);
  }
  return generateOverviewArchitectureHtml(analysis);
}

// ══════════════════════════════════════════════════════════════════
// 1. MODULE-SPECIFIC ARCHITECTURE BLUEPRINT
// ══════════════════════════════════════════════════════════════════
function generateModuleArchitectureHtml(analysis: RepoAnalysis, moduleId: string): string {
  const mod: ModuleCluster =
    analysis.modules.find((m) => m.id === moduleId) ||
    analysis.modules[0] || {
      id: moduleId,
      name: moduleId,
      path: moduleId,
      fileCount: 0,
      loc: 0,
      totalCommits: 0,
      primaryLanguage: "TypeScript",
      languages: {},
      inboundDependencies: [],
      outboundDependencies: [],
      files: [],
      color: "#00f3ff",
      churnScore: 0.5,
    };

  const meta = getSubsystemMeta(mod.id, mod.name);
  const moduleFiles = analysis.files.filter((f) => f.module === mod.id);
  const callers = analysis.modules.filter((m) => mod.inboundDependencies.includes(m.id));
  const deps = analysis.modules.filter((m) => mod.outboundDependencies.includes(m.id));

  const totalLinks = mod.inboundDependencies.length + mod.outboundDependencies.length;
  const couplingScore = totalLinks === 0 ? 0 : Number((mod.outboundDependencies.length / totalLinks).toFixed(2));

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>${mod.name} — Subsystem Architecture Blueprint</title>
<style>
  :root {
    --bg: #070a10; --panel: #0b1322; --panel-2: #101c30; --line: #1c2738; --line-2: #2a3b54;
    --ink: #f1f5f9; --ink-2: #94a3b8; --ink-3: #64748b;
    --cyan: #00f3ff; --indigo: #6366f1; --coral: #ff967d; --mint: #c4ff78; --amber: #ffd166;
  }
  body {
    margin: 0; background: var(--bg); color: var(--ink);
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    padding: 24px 32px 80px; -webkit-font-smoothing: antialiased;
  }
  .top-bar {
    max-width: 1560px; margin: 0 auto 20px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 14px;
  }
  .module-title-box { display: flex; align-items: center; gap: 14px; }
  .mod-badge-icon {
    width: 44px; height: 44px; border-radius: 12px; display: grid; place-items: center;
    background: linear-gradient(135deg, var(--cyan), var(--indigo)); color: #000; font-weight: 900; font-size: 16px;
  }
  h1 { font-size: 22px; margin: 0; font-weight: 800; color: #fff; letter-spacing: -0.02em; }
  .sub { font-size: 12.5px; color: var(--ink-2); margin-top: 3px; font-mono; }
  .pills { display: flex; gap: 8px; flex-wrap: wrap; }
  .pill {
    font-size: 11px; padding: 4px 10px; border-radius: 20px; font-weight: 700; text-decoration: none;
    background: var(--panel-2); border: 1px solid var(--line); color: var(--ink-2); transition: all .15s;
  }
  .pill:hover { border-color: var(--cyan); color: var(--cyan); }
  .pill.active { background: rgba(0, 243, 255, 0.15); border-color: var(--cyan); color: var(--cyan); }
  .pill.overview-btn { background: rgba(99, 102, 241, 0.2); border-color: var(--indigo); color: #fff; }

  .canvas-box {
    max-width: 1560px; margin: 0 auto 28px; background: var(--panel); border: 1px solid var(--line);
    border-radius: 20px; box-shadow: 0 20px 40px rgba(0,0,0,0.5); overflow: hidden; padding: 20px;
  }
  svg { width: 100%; height: auto; display: block; }

  /* Interactive Narration Walkthrough Section */
  .narration-section {
    max-width: 1560px; margin: 0 auto; background: var(--panel); border: 1px solid var(--line);
    border-radius: 20px; padding: 26px 30px; box-shadow: 0 20px 40px rgba(0,0,0,0.4);
  }
  .sec-header {
    display: flex; align-items: center; justify-content: space-between; margin-bottom: 22px;
    border-bottom: 1px solid var(--line); padding-bottom: 16px;
  }
  .sec-header h2 { font-size: 18px; margin: 0; font-weight: 800; color: #fff; display: flex; align-items: center; gap: 8px; }
  .sec-header p { font-size: 12.5px; color: var(--ink-2); margin: 3px 0 0; }

  .steps-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 18px; }
  @media(max-width: 1100px) { .steps-grid { grid-template-columns: 1fr 1fr; } }
  @media(max-width: 650px) { .steps-grid { grid-template-columns: 1fr; } }

  .step-card {
    background: var(--panel-2); border: 1px solid var(--line-2); border-radius: 14px;
    padding: 18px; display: flex; flex-col; justify-content: space-between; transition: all .2s;
  }
  .step-card:hover { border-color: var(--cyan); transform: translateY(-2px); }
  .step-card-head { display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 12px; }
  .step-idx {
    width: 28px; height: 28px; border-radius: 8px; display: grid; place-items: center;
    font-weight: 900; font-size: 13px; color: #000;
  }
  .step-tag { font-size: 10.5px; font-family: ui-monospace, monospace; text-transform: uppercase; padding: 2px 8px; border-radius: 12px; font-weight: 700; }
  .step-card h3 { font-size: 15px; margin: 0 0 4px; font-weight: 750; color: #fff; }
  .step-target { font-size: 11.5px; font-family: ui-monospace, monospace; color: var(--cyan); margin-bottom: 8px; word-break: break-all; }
  .step-desc { font-size: 12.5px; color: var(--ink-2); line-height: 1.55; margin-bottom: 14px; }

  /* Audio Narration Box */
  .narration-box {
    background: #070c17; border: 1px solid var(--line); border-radius: 10px; padding: 12px; margin-top: auto;
  }
  .narration-lbl { font-size: 10px; font-family: ui-monospace, monospace; text-transform: uppercase; letter-spacing: .06em; color: var(--ink-3); margin-bottom: 5px; font-weight: 700; display: flex; align-items: center; justify-content: space-between; }
  .narration-text { font-size: 12px; color: #cbd5e1; font-style: italic; line-height: 1.5; margin-bottom: 10px; }
  
  .audio-bar {
    display: flex; align-items: center; gap: 8px; background: rgba(0, 243, 255, 0.06);
    border: 1px solid rgba(0, 243, 255, 0.2); border-radius: 8px; padding: 6px 10px;
  }
  .play-btn {
    width: 26px; height: 26px; border-radius: 50%; background: var(--cyan); color: #000; border: none;
    cursor: pointer; display: grid; place-items: center; font-size: 11px; font-weight: 900; transition: all .15s; flex-shrink: 0;
  }
  .play-btn:hover { transform: scale(1.08); background: #fff; }
  .audio-status { font-size: 11px; font-family: ui-monospace, monospace; color: var(--cyan); flex-grow: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }

  /* Global audio player banner */
  .full-track-bar {
    background: linear-gradient(90deg, rgba(99, 102, 241, 0.15), rgba(0, 243, 255, 0.15));
    border: 1px solid var(--line-2); border-radius: 12px; padding: 12px 18px; margin-top: 20px;
    display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px;
  }
</style>
</head>
<body>

<div class="top-bar">
  <div class="module-title-box">
    <div class="mod-badge-icon">0${analysis.modules.findIndex((m) => m.id === mod.id) + 1 || 1}</div>
    <div>
      <h1>${mod.name} — Subsystem Execution Blueprint</h1>
      <div class="sub">
        <span>path: <b>${mod.path}</b></span> •
        <span>${meta.tierName}</span> •
        <span>${mod.fileCount} files</span> •
        <span>${mod.loc.toLocaleString()} LOC</span> •
        <span>Coupling: <b>${couplingScore}</b></span>
      </div>
    </div>
  </div>

  <div class="pills">
    <a href="/api/architecture.html" class="pill overview-btn">◂ Whole App System Map</a>
    ${analysis.modules
      .map(
        (m) =>
          `<a href="/api/architecture.html?module=${encodeURIComponent(m.id)}" class="pill ${
            m.id === mod.id ? "active" : ""
          }">${m.name}</a>`
      )
      .join("")}
  </div>
</div>

<div class="canvas-box">
  <svg viewBox="0 0 1620 540" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <marker id="ar-cyan" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto">
        <path d="M0,1 L9,5 L0,9 z" fill="#00f3ff" />
      </marker>
      <marker id="ar-indigo" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto">
        <path d="M0,1 L9,5 L0,9 z" fill="#6366f1" />
      </marker>
      <marker id="ar-mint" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto">
        <path d="M0,1 L9,5 L0,9 z" fill="#c4ff78" />
      </marker>
    </defs>

    <!-- LEFT: INBOUND CALLERS ZONE -->
    <rect x="20" y="40" width="230" height="460" rx="16" fill="rgba(99, 102, 241, 0.05)" stroke="#6366f1" stroke-width="1.5" stroke-dasharray="6 4" />
    <text x="35" y="68" fill="#6366f1" font-size="12" font-weight="800" font-family="monospace">INBOUND CALLERS (${callers.length})</text>
    <text x="35" y="86" fill="#94a3b8" font-size="11">Upstream callers invoking ${mod.name}</text>

    ${callers.length === 0
      ? `<rect x="35" y="110" width="200" height="70" rx="10" fill="#0d1726" stroke="#1e293b" />
         <text x="48" y="145" fill="#64748b" font-size="12">Root Entrypoint (No callers)</text>
         <text x="48" y="162" fill="#475569" font-size="10" font-family="monospace">Direct User / CLI invocation</text>`
      : callers
          .slice(0, 4)
          .map(
            (c, i) => `
      <g transform="translate(35, ${110 + i * 85})">
        <rect width="200" height="70" rx="10" fill="#0d1726" stroke="#6366f1" stroke-width="1.2" />
        <text x="14" y="28" fill="#ffffff" font-size="13" font-weight="700">${c.name}</text>
        <text x="14" y="46" fill="#6366f1" font-size="10.5" font-family="monospace">${c.path}</text>
        <text x="14" y="60" fill="#94a3b8" font-size="10">${c.fileCount} files • ${c.loc} LOC</text>
      </g>
    `
          )
          .join("")}

    <!-- CENTER: SUBSYSTEM BOUNDARY -->
    <rect x="290" y="40" width="1020" height="460" rx="18" fill="rgba(0, 243, 255, 0.04)" stroke="#00f3ff" stroke-width="2" />
    <text x="315" y="70" fill="#00f3ff" font-size="13" font-weight="900" font-family="monospace">SUB-SYSTEM BOUNDARY: [${mod.name}] · ${meta.badge}</text>
    <text x="315" y="90" fill="#94a3b8" font-size="12">${meta.role}</text>

    <!-- 4 Horizontal Pipeline Cards -->
    ${meta.steps
      .map((s, i) => {
        const x = 315 + i * 245;
        const color = ["#38bdf8", "#00f3ff", "#ff967d", "#c4ff78"][i];
        return `
      <g transform="translate(${x}, 125)">
        <rect width="230" height="340" rx="14" fill="#0d1829" stroke="${color}" stroke-width="1.3" />
        <rect x="12" y="14" width="28" height="28" rx="8" fill="${color}" />
        <text x="21" y="33" fill="#000" font-size="14" font-weight="900">${s.num}</text>
        <text x="50" y="32" fill="${color}" font-size="11" font-weight="800" font-family="monospace">${s.tag}</text>
        
        <text x="14" y="68" fill="#ffffff" font-size="14" font-weight="750">${s.title}</text>
        <text x="14" y="86" fill="${color}" font-size="11" font-family="monospace">${s.fileName.split("/").pop()}</text>
        
        <rect x="14" y="102" width="202" height="1" fill="#1e293b" />
        
        <text x="14" y="125" fill="#e2e8f0" font-size="11.5" font-weight="600">What It Does:</text>
        <foreignObject x="14" y="132" width="202" height="100">
          <p xmlns="http://www.w3.org/1999/xhtml" style="margin:0;font-size:11px;color:#94a3b8;line-height:1.5;">${s.whatItDoes}</p>
        </foreignObject>

        <rect x="14" y="240" width="202" height="85" rx="8" fill="#070d18" stroke="#1b283d" />
        <text x="22" y="258" fill="#64748b" font-size="9.5" font-family="monospace">STAGE ARTIFACT / OUTPUT</text>
        <text x="22" y="278" fill="#38bdf8" font-size="11" font-weight="600">✓ In-Memory Transition</text>
        <text x="22" y="296" fill="#94a3b8" font-size="10.5">Streams to Step ${i < 3 ? i + 2 : "Canvas"}</text>
      </g>
    `;
      })
      .join("")}

    <!-- SVG Pipeline Connectors between 4 internal cards -->
    <path d="M 545 295 L 560 295" stroke="#38bdf8" stroke-width="2.5" marker-end="url(#ar-cyan)" />
    <path d="M 790 295 L 805 295" stroke="#00f3ff" stroke-width="2.5" marker-end="url(#ar-cyan)" />
    <path d="M 1035 295 L 1050 295" stroke="#ff967d" stroke-width="2.5" marker-end="url(#ar-mint)" />

    <!-- Inbound Arrow from Callers into Subsystem -->
    <path d="M 250 270 L 290 270" stroke="#6366f1" stroke-width="2.5" marker-end="url(#ar-indigo)" />

    <!-- Outbound Arrow from Subsystem into Dependencies -->
    <path d="M 1310 270 L 1350 270" stroke="#c4ff78" stroke-width="2.5" marker-end="url(#ar-mint)" />

    <!-- RIGHT: OUTBOUND DEPENDENCIES ZONE -->
    <rect x="1350" y="40" width="240" height="460" rx="16" fill="rgba(196, 255, 120, 0.05)" stroke="#c4ff78" stroke-width="1.5" stroke-dasharray="6 4" />
    <text x="1365" y="68" fill="#c4ff78" font-size="12" font-weight="800" font-family="monospace">OUTBOUND DEPS (${deps.length})</text>
    <text x="1365" y="86" fill="#94a3b8" font-size="11">Libraries & services required</text>

    ${deps.length === 0
      ? `<rect x="1365" y="110" width="210" height="70" rx="10" fill="#0d1726" stroke="#1e293b" />
         <text x="1378" y="145" fill="#64748b" font-size="12">Terminal Leaf (No deps)</text>
         <text x="1378" y="162" fill="#475569" font-size="10" font-family="monospace">Self-contained presentation</text>`
      : deps
          .slice(0, 4)
          .map(
            (d, i) => `
      <g transform="translate(1365, ${110 + i * 85})">
        <rect width="210" height="70" rx="10" fill="#0d1726" stroke="#c4ff78" stroke-width="1.2" />
        <text x="14" y="28" fill="#ffffff" font-size="13" font-weight="700">${d.name}</text>
        <text x="14" y="46" fill="#c4ff78" font-size="10.5" font-family="monospace">${d.path}</text>
        <text x="14" y="60" fill="#94a3b8" font-size="10">${d.fileCount} files • ${d.loc} LOC</text>
      </g>
    `
          )
          .join("")}
  </svg>
</div>

<!-- SECTION NARRATION & AUDIO WALKTHROUGH -->
<div class="narration-section">
  <div class="sec-header">
    <div>
      <h2><span>🎧</span> Section Narration & Under-The-Hood Walkthrough</h2>
      <p>Listen to Kokoro neural voiceover for each architectural stage, or read the exact technical narration transcript.</p>
    </div>
    <div style="font-size:12px;color:var(--cyan);font-family:monospace;font-weight:700">
      Neural Model: af_heart · 100% On-Device
    </div>
  </div>

  <div class="steps-grid">
    ${meta.steps
      .map((s, idx) => {
        const color = ["#38bdf8", "#00f3ff", "#ff967d", "#c4ff78"][idx];
        return `
      <div class="step-card">
        <div>
          <div class="step-card-head">
            <div class="step-idx" style="background:${color}">0${s.num}</div>
            <span class="step-tag" style="background:rgba(0,243,255,0.1);color:${color};border:1px solid ${color}">${s.tag}</span>
          </div>
          <h3>${s.title}</h3>
          <div class="step-target">Target: ${s.fileName}</div>
          <div class="step-desc">${s.whatItDoes}</div>
        </div>

        <div class="narration-box">
          <div class="narration-lbl">
            <span>🎙️ AUDIO NARRATION</span>
            <span>STAGE 0${s.num}</span>
          </div>
          <div class="narration-text">"${s.narrationText}"</div>
          
          <div class="audio-bar">
            <button class="play-btn" onclick="playAudioClip('${s.audioFile}', this)" title="Play / Pause Audio">▶</button>
            <span class="audio-status">Click to listen</span>
          </div>
        </div>
      </div>
    `;
      })
      .join("")}
  </div>

  <div class="full-track-bar">
    <div>
      <b style="color:#fff;font-size:14px">Continuous Full Walkthrough:</b>
      <span style="color:var(--ink-2);font-size:12.5px;margin-left:8px">Listen to all 4 stages combined into a seamless uninterrupted audio stream.</span>
    </div>
    <div style="display:flex;align-items:center;gap:12px">
      <audio id="globalPlayer" controls style="height:36px;outline:none"></audio>
      <button onclick="playFullTrack('/audio/voice/${meta.storyKey}_full.mp3')" class="pill active" style="padding:8px 16px;cursor:pointer;font-size:12px">
        ▶ Play Full Subsystem Track
      </button>
    </div>
  </div>
</div>

<script>
  let currentAudio = null;
  let currentBtn = null;

  function playAudioClip(src, btn) {
    if (currentAudio && !currentAudio.paused && currentAudio.src.includes(src)) {
      currentAudio.pause();
      btn.innerText = "▶";
      return;
    }
    if (currentAudio) {
      currentAudio.pause();
      if (currentBtn) currentBtn.innerText = "▶";
    }

    currentAudio = new Audio(src);
    currentBtn = btn;
    btn.innerText = "⏸";

    currentAudio.play().catch(e => console.error("Playback error:", e));
    currentAudio.onended = () => {
      btn.innerText = "▶";
    };
  }

  function playFullTrack(src) {
    const player = document.getElementById("globalPlayer");
    player.src = src;
    player.play();
  }
</script>

</body>
</html>`;
}

// ══════════════════════════════════════════════════════════════════
// 2. WHOLE-REPOSITORY SYSTEM ARCHITECTURE BLUEPRINT
// ══════════════════════════════════════════════════════════════════
function generateOverviewArchitectureHtml(analysis: RepoAnalysis): string {
  const steps = [
    {
      num: 1,
      title: "Starting Point & Ingestion",
      file: "terminal & Express",
      audio: "/audio/voice/step1.mp3",
      desc: "Starts on your workstation without cloud dependencies. Boots local Express daemon on port 4321 and mounts the Vite studio.",
      text: "When git motion starts, it runs locally on your workstation with zero cloud dependencies. It boots an Express daemon on port 4321 and mounts the Vite studio interface for immediate architectural inspection.",
      color: "#38bdf8",
    },
    {
      num: 2,
      title: "AST Scanner & Git Churn",
      file: "src/server/analyzer.ts & git.ts",
      audio: "/audio/voice/step2.mp3",
      desc: "Traverses disk with multi-language AST parsers to map import edges, scoring commit frequency and line deltas.",
      text: "Next, the ingestion pipeline traverses your repository with multi language AST token parsers. It maps file import edges and calculates git churn scores using normalized commit frequency and line alterations.",
      color: "#00f3ff",
    },
    {
      num: 3,
      title: "4-Tier Architecture Core",
      file: "src/core/architecture.ts",
      audio: "/audio/voice/step3.mp3",
      desc: "Partitions modules into 4 clean tiers: Entrypoints, Transport Orchestration, Core Domain Models, and Presentation Leaves.",
      text: "Then, the core architecture engine partitions the codebase into four clean tiers: entry points, transport orchestration, foundational domain models, and presentation rendering leaves.",
      color: "#ff967d",
    },
    {
      num: 4,
      title: "60fps Canvas & Artifacts",
      file: "src/remotion & outputs/",
      audio: "/audio/voice/step4.mp3",
      desc: "Compiles interactive SVG blueprints and renders 60fps Remotion video with travelling light beams and Kokoro voiceover.",
      text: "Finally, it compiles an interactive SVG architectural blueprint and renders sixty frames per second motion graphics with traveling light beams and neural voiceover narration.",
      color: "#c4ff78",
    },
  ];

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>${analysis.name} — Whole System Architecture Blueprint</title>
<style>
  :root {
    --bg: #070a10; --panel: #0b1322; --panel-2: #101c30; --line: #1c2738; --line-2: #2a3b54;
    --ink: #f1f5f9; --ink-2: #94a3b8; --ink-3: #64748b;
    --cyan: #00f3ff; --indigo: #6366f1; --coral: #ff967d; --mint: #c4ff78; --amber: #ffd166;
  }
  body {
    margin: 0; background: var(--bg); color: var(--ink);
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    padding: 24px 32px 80px; -webkit-font-smoothing: antialiased;
  }
  .top-bar {
    max-width: 1560px; margin: 0 auto 20px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 14px;
  }
  h1 { font-size: 22px; margin: 0; font-weight: 800; color: #fff; letter-spacing: -0.02em; }
  .sub { font-size: 12.5px; color: var(--ink-2); margin-top: 3px; font-mono; }
  .pills { display: flex; gap: 8px; flex-wrap: wrap; }
  .pill {
    font-size: 11px; padding: 4px 10px; border-radius: 20px; font-weight: 700; text-decoration: none;
    background: var(--panel-2); border: 1px solid var(--line); color: var(--ink-2); transition: all .15s;
  }
  .pill:hover { border-color: var(--cyan); color: var(--cyan); }
  .pill.active { background: rgba(0, 243, 255, 0.15); border-color: var(--cyan); color: var(--cyan); }

  .canvas-box {
    max-width: 1560px; margin: 0 auto 28px; background: var(--panel); border: 1px solid var(--line);
    border-radius: 20px; box-shadow: 0 20px 40px rgba(0,0,0,0.5); overflow: hidden; padding: 20px;
  }
  svg { width: 100%; height: auto; display: block; }

  /* Interactive Narration Walkthrough Section */
  .narration-section {
    max-width: 1560px; margin: 0 auto; background: var(--panel); border: 1px solid var(--line);
    border-radius: 20px; padding: 26px 30px; box-shadow: 0 20px 40px rgba(0,0,0,0.4);
  }
  .sec-header {
    display: flex; align-items: center; justify-content: space-between; margin-bottom: 22px;
    border-bottom: 1px solid var(--line); padding-bottom: 16px;
  }
  .sec-header h2 { font-size: 18px; margin: 0; font-weight: 800; color: #fff; display: flex; align-items: center; gap: 8px; }
  .sec-header p { font-size: 12.5px; color: var(--ink-2); margin: 3px 0 0; }

  .steps-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 18px; }
  @media(max-width: 1100px) { .steps-grid { grid-template-columns: 1fr 1fr; } }
  @media(max-width: 650px) { .steps-grid { grid-template-columns: 1fr; } }

  .step-card {
    background: var(--panel-2); border: 1px solid var(--line-2); border-radius: 14px;
    padding: 18px; display: flex; flex-col; justify-content: space-between; transition: all .2s;
  }
  .step-card:hover { border-color: var(--cyan); transform: translateY(-2px); }
  .step-card-head { display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px; }
  .step-idx {
    width: 28px; height: 28px; border-radius: 8px; display: grid; place-items: center;
    font-weight: 900; font-size: 13px; color: #000;
  }
  .step-card h3 { font-size: 15px; margin: 0 0 4px; font-weight: 750; color: #fff; }
  .step-target { font-size: 11.5px; font-family: ui-monospace, monospace; color: var(--cyan); margin-bottom: 8px; }
  .step-desc { font-size: 12.5px; color: var(--ink-2); line-height: 1.55; margin-bottom: 14px; }

  .narration-box {
    background: #070c17; border: 1px solid var(--line); border-radius: 10px; padding: 12px; margin-top: auto;
  }
  .narration-lbl { font-size: 10px; font-family: ui-monospace, monospace; text-transform: uppercase; letter-spacing: .06em; color: var(--ink-3); margin-bottom: 5px; font-weight: 700; display: flex; align-items: center; justify-content: space-between; }
  .narration-text { font-size: 12px; color: #cbd5e1; font-style: italic; line-height: 1.5; margin-bottom: 10px; }
  
  .audio-bar {
    display: flex; align-items: center; gap: 8px; background: rgba(0, 243, 255, 0.06);
    border: 1px solid rgba(0, 243, 255, 0.2); border-radius: 8px; padding: 6px 10px;
  }
  .play-btn {
    width: 26px; height: 26px; border-radius: 50%; background: var(--cyan); color: #000; border: none;
    cursor: pointer; display: grid; place-items: center; font-size: 11px; font-weight: 900; transition: all .15s; flex-shrink: 0;
  }
  .play-btn:hover { transform: scale(1.08); background: #fff; }
  .audio-status { font-size: 11px; font-family: ui-monospace, monospace; color: var(--cyan); flex-grow: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }

  .full-track-bar {
    background: linear-gradient(90deg, rgba(99, 102, 241, 0.15), rgba(0, 243, 255, 0.15));
    border: 1px solid var(--line-2); border-radius: 12px; padding: 12px 18px; margin-top: 20px;
    display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px;
  }
</style>
</head>
<body>

<div class="top-bar">
  <div>
    <h1>${analysis.name} — System Architecture & Data Flow</h1>
    <div class="sub">
      <span>${analysis.totalFiles} files</span> •
      <span>${analysis.totalLOC.toLocaleString()} LOC</span> •
      <span>${analysis.modules.length} subsystems</span> •
      <span>${analysis.totalCommits} commits</span> •
      <span style="color:var(--mint)">100% On-Device Local First</span>
    </div>
  </div>

  <div class="pills">
    <a href="/api/architecture.html" class="pill active">Whole App Overview</a>
    ${analysis.modules
      .map(
        (m) =>
          `<a href="/api/architecture.html?module=${encodeURIComponent(m.id)}" class="pill">${m.name}</a>`
      )
      .join("")}
  </div>
</div>

<div class="canvas-box">
  <svg viewBox="0 0 1780 780" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <marker id="arr-blue" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="8" markerHeight="8" orient="auto">
        <path d="M0,1 L9,5 L0,9 z" fill="#38bdf8" />
      </marker>
      <marker id="arr-cyan" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="8" markerHeight="8" orient="auto">
        <path d="M0,1 L9,5 L0,9 z" fill="#00f3ff" />
      </marker>
      <marker id="arr-coral" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="8" markerHeight="8" orient="auto">
        <path d="M0,1 L9,5 L0,9 z" fill="#ff967d" />
      </marker>
      <marker id="arr-mint" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="8" markerHeight="8" orient="auto">
        <path d="M0,1 L9,5 L0,9 z" fill="#c4ff78" />
      </marker>
    </defs>

    <!-- 1. YOU / DEVELOPER ENTRYPOINT -->
    <rect x="30" y="50" width="220" height="130" rx="16" fill="#0f172a" stroke="#38bdf8" stroke-width="2" />
    <text x="50" y="86" fill="#38bdf8" font-size="13" font-weight="800" letter-spacing="0.08em">STARTING POINT</text>
    <text x="50" y="116" fill="#ffffff" font-size="20" font-weight="900">You (Developer)</text>
    <text x="50" y="142" fill="#94a3b8" font-size="13" font-family="monospace">terminal: npx git-motion</text>
    <text x="50" y="162" fill="#64748b" font-size="12">localhost:4321 • 100% Offline</text>

    <!-- LOCAL ENGINE BOUNDARY -->
    <rect x="280" y="35" width="1470" height="720" rx="22" fill="rgba(11, 22, 40, 0.75)" stroke="#334155" stroke-width="1.5" stroke-dasharray="8 6" />
    <text x="310" y="68" fill="#64748b" font-size="13" font-weight="800" letter-spacing="0.1em">LOCAL ENGINE BOUNDARY · 100% PRIVATE WORKSPACE</text>

    <!-- ZONE 1: ENTRYPOINTS -->
    <rect x="310" y="85" width="420" height="200" rx="18" fill="rgba(14, 165, 233, 0.08)" stroke="#38bdf8" stroke-width="2" />
    <text x="330" y="118" fill="#38bdf8" font-size="14" font-weight="800" letter-spacing="0.05em">1. ENTRYPOINTS & CLI</text>
    <rect x="330" y="132" width="180" height="75" rx="12" fill="#0b1329" stroke="#334155" stroke-width="1" />
    <text x="345" y="158" fill="#ffffff" font-size="15" font-weight="700">CLI Runner</text>
    <text x="345" y="178" fill="#38bdf8" font-size="12" font-family="monospace">src/cli/bin.ts</text>
    <text x="345" y="196" fill="#94a3b8" font-size="11">Starts studio or reel</text>

    <rect x="530" y="132" width="180" height="75" rx="12" fill="#0b1329" stroke="#334155" stroke-width="1" />
    <text x="545" y="158" fill="#ffffff" font-size="15" font-weight="700">Studio Web App</text>
    <text x="545" y="178" fill="#38bdf8" font-size="12" font-family="monospace">src/studio/App.tsx</text>
    <text x="545" y="196" fill="#94a3b8" font-size="11">Live preview cockpit</text>

    <text x="330" y="240" fill="#cbd5e1" font-size="13">Local Express server bridges browser controls directly to the video renderer.</text>
    <text x="330" y="260" fill="#64748b" font-size="12">No cloud cold starts. Instant feedback.</text>

    <!-- ZONE 2: FILE SCANNER & GIT -->
    <rect x="770" y="85" width="440" height="200" rx="18" fill="rgba(0, 243, 255, 0.08)" stroke="#00f3ff" stroke-width="2" />
    <text x="790" y="118" fill="#00f3ff" font-size="14" font-weight="800" letter-spacing="0.05em">2. INGESTION & AST SCANNER</text>
    <rect x="790" y="132" width="190" height="75" rx="12" fill="#0b1329" stroke="#334155" stroke-width="1" />
    <text x="805" y="158" fill="#ffffff" font-size="15" font-weight="700">Codebase Scanner</text>
    <text x="805" y="178" fill="#00f3ff" font-size="12" font-family="monospace">src/server/analyzer.ts</text>
    <text x="805" y="196" fill="#94a3b8" font-size="11">Extracts AST imports</text>

    <rect x="1000" y="132" width="190" height="75" rx="12" fill="#0b1329" stroke="#334155" stroke-width="1" />
    <text x="1015" y="158" fill="#ffffff" font-size="15" font-weight="700">Git Churn Parser</text>
    <text x="1015" y="178" fill="#00f3ff" font-size="12" font-family="monospace">src/server/git.ts</text>
    <text x="1015" y="196" fill="#94a3b8" font-size="11">Scores commit hotspots</text>

    <rect x="790" y="222" width="400" height="45" rx="10" fill="#09101d" stroke="#1e293b" />
    <text x="805" y="250" fill="#e2e8f0" font-size="13" font-weight="600">${analysis.totalFiles} files scanned • ${analysis.totalLOC.toLocaleString()} LOC • ${analysis.totalCommits} commits analyzed</text>

    <!-- ZONE 3: BLUEPRINT CORE -->
    <rect x="1250" y="85" width="460" height="200" rx="18" fill="rgba(255, 150, 125, 0.08)" stroke="#ff967d" stroke-width="2" />
    <text x="1270" y="118" fill="#ff967d" font-size="14" font-weight="800" letter-spacing="0.05em">3. BLUEPRINT CORE (The Architect)</text>
    <rect x="1270" y="132" width="200" height="75" rx="12" fill="#0b1329" stroke="#334155" stroke-width="1" />
    <text x="1285" y="158" fill="#ffffff" font-size="15" font-weight="700">4-Tier Classifier</text>
    <text x="1285" y="178" fill="#ff967d" font-size="12" font-family="monospace">src/core/architecture.ts</text>
    <text x="1285" y="196" fill="#94a3b8" font-size="11">Eliminates spaghetti</text>

    <rect x="1490" y="132" width="200" height="75" rx="12" fill="#0b1329" stroke="#334155" stroke-width="1" />
    <text x="1505" y="158" fill="#ffffff" font-size="15" font-weight="700">Flowchart Engine</text>
    <text x="1505" y="178" fill="#ff967d" font-size="12" font-family="monospace">src/core/mermaid.ts</text>
    <text x="1505" y="196" fill="#94a3b8" font-size="11">Builds Mermaid diagrams</text>

    <text x="1270" y="240" fill="#cbd5e1" font-size="13">Groups files into 4 clean tiers: Entrypoints, Processing, Core, & Render.</text>
    <text x="1270" y="260" fill="#64748b" font-size="12">Calculates coupling scores and caller boundaries for each module.</text>

    <!-- ZONE 4: REMOTION 60FPS VIDEO -->
    <rect x="310" y="340" width="550" height="210" rx="18" fill="rgba(196, 255, 120, 0.08)" stroke="#c4ff78" stroke-width="2" />
    <text x="330" y="372" fill="#c4ff78" font-size="14" font-weight="800" letter-spacing="0.05em">4. REMOTION VIDEO ENGINE (60fps Canvas)</text>
    <rect x="330" y="388" width="245" height="75" rx="12" fill="#0b1329" stroke="#334155" stroke-width="1" />
    <text x="345" y="414" fill="#ffffff" font-size="15" font-weight="700">Reel Compositions</text>
    <text x="345" y="434" fill="#c4ff78" font-size="12" font-family="monospace">src/remotion/RepoReel.tsx</text>
    <text x="345" y="452" fill="#94a3b8" font-size="11">RepoReel & ModuleReel 60fps</text>

    <rect x="595" y="388" width="245" height="75" rx="12" fill="#0b1329" stroke="#334155" stroke-width="1" />
    <text x="610" y="414" fill="#ffffff" font-size="15" font-weight="700">Kinetic Subtitles</text>
    <text x="610" y="434" fill="#c4ff78" font-size="12" font-family="monospace">src/remotion/KineticCaptionBar.tsx</text>
    <text x="610" y="452" fill="#94a3b8" font-size="11">Word highlights & HUD progress</text>

    <text x="330" y="495" fill="#cbd5e1" font-size="13">Renders smooth 60fps React code into high-fidelity video canvas.</text>
    <text x="330" y="515" fill="#64748b" font-size="12">No screen recording artifacts, zero mouse jitter, pixel-perfect layout.</text>

    <!-- ZONE 5: NEURAL VOICE -->
    <rect x="900" y="340" width="810" height="210" rx="18" fill="rgba(255, 209, 102, 0.08)" stroke="#ffd166" stroke-width="2" />
    <text x="920" y="372" fill="#ffd166" font-size="14" font-weight="800" letter-spacing="0.05em">5. KOKORO NEURAL SPEECH (Zero Robotic Drone)</text>
    <rect x="920" y="388" width="370" height="75" rx="12" fill="#0b1329" stroke="#334155" stroke-width="1" />
    <text x="935" y="414" fill="#ffffff" font-size="15" font-weight="700">Kokoro TTS af_heart Model</text>
    <text x="935" y="434" fill="#ffd166" font-size="12" font-family="monospace">af_heart model • 1.05x speed • MP3</text>
    <text x="935" y="452" fill="#94a3b8" font-size="11">Single-track unified audio, zero gaps or stutter</text>

    <rect x="1310" y="388" width="380" height="75" rx="12" fill="#0b1329" stroke="#334155" stroke-width="1" />
    <text x="1325" y="414" fill="#ffffff" font-size="15" font-weight="700">Developer Dark Presets</text>
    <text x="1325" y="434" fill="#ffd166" font-size="12" font-family="monospace">Tokyo Night • Cyberpunk • Catppuccin</text>
    <text x="1325" y="452" fill="#94a3b8" font-size="11">High-contrast developer palettes</text>

    <text x="920" y="495" fill="#cbd5e1" font-size="13">Narration words are timing-matched with KineticCaptionBar word highlights.</text>
    <text x="920" y="515" fill="#64748b" font-size="12">Sentences finish naturally before any scene transitions happen.</text>

    <!-- ARROWS -->
    <path d="M 250 115 L 305 115" stroke="#38bdf8" stroke-width="2.5" fill="none" marker-end="url(#arr-blue)" />
    <path d="M 730 185 L 765 185" stroke="#00f3ff" stroke-width="2.5" fill="none" marker-end="url(#arr-cyan)" />
    <path d="M 1210 185 L 1245 185" stroke="#ff967d" stroke-width="2.5" fill="none" marker-end="url(#arr-coral)" />
    <path d="M 1480 285 C 1480 320 600 300 600 335" stroke="#c4ff78" stroke-width="2" fill="none" marker-end="url(#arr-mint)" />
    <path d="M 1520 285 C 1520 320 1300 300 1300 335" stroke="#ffd166" stroke-width="2" fill="none" marker-end="url(#arr-mint)" />
  </svg>
</div>

<!-- SECTION NARRATION & AUDIO WALKTHROUGH -->
<div class="narration-section">
  <div class="sec-header">
    <div>
      <h2><span>🎧</span> Section Narration & Under-The-Hood Walkthrough</h2>
      <p>Listen to Kokoro neural voiceover for each architectural stage, or read the exact technical narration transcript.</p>
    </div>
    <div style="font-size:12px;color:var(--cyan);font-family:monospace;font-weight:700">
      Neural Model: af_heart · 100% On-Device
    </div>
  </div>

  <div class="steps-grid">
    ${steps
      .map(
        (s) => `
      <div class="step-card">
        <div>
          <div class="step-card-head">
            <div class="step-idx" style="background:${s.color}">0${s.num}</div>
            <span style="font-size:11px;font-family:monospace;font-weight:700;color:${s.color}">STAGE 0${s.num}</span>
          </div>
          <h3>${s.title}</h3>
          <div class="step-target">${s.file}</div>
          <div class="step-desc">${s.desc}</div>
        </div>

        <div class="narration-box">
          <div class="narration-lbl">
            <span>🎙️ AUDIO NARRATION</span>
            <span>0${s.num}</span>
          </div>
          <div class="narration-text">"${s.text}"</div>
          
          <div class="audio-bar">
            <button class="play-btn" onclick="playAudioClip('${s.audio}', this)" title="Play Audio">▶</button>
            <span class="audio-status">Click to listen</span>
          </div>
        </div>
      </div>
    `
      )
      .join("")}
  </div>

  <div class="full-track-bar">
    <div>
      <b style="color:#fff;font-size:14px">Continuous Full Walkthrough:</b>
      <span style="color:var(--ink-2);font-size:12.5px;margin-left:8px">Listen to the entire project walkthrough narrated continuously by Kokoro.</span>
    </div>
    <div style="display:flex;align-items:center;gap:12px">
      <audio id="globalPlayer" controls style="height:36px;outline:none"></audio>
      <button onclick="playFullTrack('/audio/voice/overview_full.mp3')" class="pill active" style="padding:8px 16px;cursor:pointer;font-size:12px">
        ▶ Play Full Repository Track
      </button>
    </div>
  </div>
</div>

<script>
  let currentAudio = null;
  let currentBtn = null;

  function playAudioClip(src, btn) {
    if (currentAudio && !currentAudio.paused && currentAudio.src.includes(src)) {
      currentAudio.pause();
      btn.innerText = "▶";
      return;
    }
    if (currentAudio) {
      currentAudio.pause();
      if (currentBtn) currentBtn.innerText = "▶";
    }

    currentAudio = new Audio(src);
    currentBtn = btn;
    btn.innerText = "⏸";

    currentAudio.play().catch(e => console.error("Playback error:", e));
    currentAudio.onended = () => {
      btn.innerText = "▶";
    };
  }

  function playFullTrack(src) {
    const player = document.getElementById("globalPlayer");
    player.src = src;
    player.play();
  }
</script>

</body>
</html>`;
}
