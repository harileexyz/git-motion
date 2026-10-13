import { RepoAnalysis, ModuleCluster } from "./types";

interface SubsystemDocInfo {
  storyKey: string;
  badge: string;
  tier: string;
  role: string;
  inboundCallers: string[];
  outboundDeps: string[];
  stages: Array<{
    num: number;
    title: string;
    targetFile: string;
    action: string;
    narrationText: string;
    audioFile: string;
  }>;
  codeSnippet: string;
  mechanicsNote: string;
}

const SUBSYSTEM_DOCS: Record<string, SubsystemDocInfo> = {
  server: {
    storyKey: "server",
    badge: "src/server",
    tier: "Tier 2: Transport & Orchestration",
    role: "Local Express HTTP daemon, AST import parser, and git commit history analyzer",
    inboundCallers: ["src/cli (bin.ts)", "Browser Client (HTTP /api)"],
    outboundDeps: ["src/core (types.ts, architecture.ts)"],
    stages: [
      {
        num: 1,
        title: "Express HTTP Server",
        targetFile: "src/server/index.ts",
        action: "Bootstraps local HTTP daemon on port 4321, binds CORS policies, and registers analytical endpoints.",
        narrationText: "Inside the server subsystem, index dot t s bootstraps an Express HTTP daemon on port 4321, binding CORS policies and registering REST endpoints for analytical queries and headless video rendering.",
        audioFile: "/audio/voice/server_step1.mp3",
      },
      {
        num: 2,
        title: "Multi-Language AST Scanner",
        targetFile: "src/server/analyzer.ts",
        action: "Recursively scans repository, ignores node_modules/git, extracts imports across TS, JS, Python, Go, and Rust.",
        narrationText: "Next, analyzer dot t s performs recursive directory scans while ignoring node modules and git. It uses language-specific regex tokenizers to extract imports across TypeScript, Python, Go, and Rust, resolving relative paths into concrete edges.",
        audioFile: "/audio/voice/server_step2.mp3",
      },
      {
        num: 3,
        title: "Git Churn Normalization",
        targetFile: "src/server/git.ts",
        action: "Executes git log --numstat to score file churn velocity: Cf = 0.65*commits + 0.35*deltas.",
        narrationText: "Then, git dot t s spawns a child process to execute git log with numstat. It scores file velocity using the normalized formula sixty-five percent commit frequency plus thirty-five percent line deltas to spotlight critical code hotspots.",
        audioFile: "/audio/voice/server_step3.mp3",
      },
      {
        num: 4,
        title: "In-Memory Graph Cache",
        targetFile: "src/server/index.ts",
        action: "Assembles universal RepoAnalysis schema and caches in memory to feed Studio & Remotion renderer.",
        narrationText: "Finally, it constructs the universal RepoAnalysis data model, caching file nodes and dependency links in memory to instantly feed both the web studio and the Remotion video engine.",
        audioFile: "/audio/voice/server_step4.mp3",
      },
    ],
    codeSnippet: `// Git Churn normalization in src/server/git.ts
const commitWeight = Math.min(1.0, commitCount / maxCommits);
const lineDeltaWeight = Math.min(1.0, (linesAdded + linesDeleted) / maxLinesChanged);
const churnScore = Number((0.65 * commitWeight + 0.35 * lineDeltaWeight).toFixed(3));

// Multi-Language AST Regex Extraction in src/server/analyzer.ts
const TS_IMPORT_REGEX = /(?:import\\s+(?:(?:\\{[^}]*\\}|\\*\\s+as\\s+[^,]+|[^,]+)\\s+from\\s+)?['"]([^'"]+)['"]|require\\(['"]([^'"]+)['"]\\))/g;`,
    mechanicsNote: "Treating LOC as complexity is naive. A 2,000-line generated boilerplate file is trivial; a 150-line state machine with 28 imports and 90 commits is a critical architectural bottleneck. The normalized churn formula spotlights real refactoring risks.",
  },
  core: {
    storyKey: "core",
    badge: "src/core",
    tier: "Tier 3: Core Domain Foundation",
    role: "Universal architectural schemas, 4-tier classifier, coupling calculator, and blueprint compilers",
    inboundCallers: ["src/server", "src/remotion", "src/studio"],
    outboundDeps: ["None (Foundational Domain)"],
    stages: [
      {
        num: 1,
        title: "Universal Type Contracts",
        targetFile: "src/core/types.ts",
        action: "Declares FileNode, ModuleCluster, and DependencyLink schemas for cross-language consistency.",
        narrationText: "The core subsystem defines the architectural schema in types dot t s, establishing strongly typed contracts for FileNode, ModuleCluster, and DependencyLink with zero external dependencies.",
        audioFile: "/audio/voice/core_step1.mp3",
      },
      {
        num: 2,
        title: "4-Tier Classifier",
        targetFile: "src/core/architecture.ts",
        action: "Classifies modules into Entrypoints, Transport Orchestration, Core Domain, and Video Presentation.",
        narrationText: "Next, architecture dot t s groups files into four hierarchical tiers: entry points with high outbound calls, orchestration servers, foundational domain data models, and output rendering leaves.",
        audioFile: "/audio/voice/core_step2.mp3",
      },
      {
        num: 3,
        title: "Coupling Calculator",
        targetFile: "src/core/architecture.ts",
        action: "Calculates coupling ratio: C = outbound / (inbound + outbound) to quantify architectural stability.",
        narrationText: "Then, it calculates module coupling ratios by dividing outbound dependencies by total connections, identifying tightly coupled orchestration layers versus independent foundational libraries.",
        audioFile: "/audio/voice/core_step3.mp3",
      },
      {
        num: 4,
        title: "Blueprint Compiler",
        targetFile: "src/core/htmlBlueprint.ts",
        action: "Compiles standalone interactive SVG system blueprints with animated pulses and voiceover narration.",
        narrationText: "Finally, htmlBlueprint dot t s compiles interactive standalone SVG system blueprints with themed zone boundaries, data lanes, and travelling photon pulse animations.",
        audioFile: "/audio/voice/core_step4.mp3",
      },
    ],
    codeSnippet: `// Coupling Metric in src/core/architecture.ts
const totalLinks = inboundCount + outboundCount;
const couplingScore = totalLinks === 0 ? 0 : Number((outboundCount / totalLinks).toFixed(3));

// 4-Tier Subsystem Assignment Logic
if (inboundCount === 0 && outboundCount > 0) return "Tier 1: Entry Points";
if (outboundCount > inboundCount) return "Tier 2: Transport & Orchestration";
if (inboundCount > outboundCount) return "Tier 3: Core Domain Models";
return "Tier 4: Rendering Leaves";`,
    mechanicsNote: "Pure functions with zero external dependencies. The core modeling engine produces immutable data structures used interchangeably by CLI daemons, browser frontends, and Remotion rendering processes.",
  },
  remotion: {
    storyKey: "remotion",
    badge: "src/remotion",
    tier: "Tier 4: Rendering Presentation Leaves",
    role: "60fps cinematic video compositions, travelling Bezier pulses, and kinetic subtitles",
    inboundCallers: ["src/studio (Live Player)", "src/cli (Headless MP4)"],
    outboundDeps: ["src/core (types.ts, themes.ts)"],
    stages: [
      {
        num: 1,
        title: "60fps Composition Registry",
        targetFile: "src/remotion/Root.tsx",
        action: "Declares RepoOverview (1920x1080) and VerticalOverview (1080x1920) compositions at 60fps.",
        narrationText: "The remotion subsystem houses sixty frames per second video compositions in Root dot t s, configuring landscape nineteen-twenty by ten-eighty and vertical ten-eighty by nineteen-twenty viewports.",
        audioFile: "/audio/voice/remotion_step1.mp3",
      },
      {
        num: 2,
        title: "Cubic Bezier Light Beams",
        targetFile: "src/remotion/AnimatedArchitectureDiagram.tsx",
        action: "Interpolates photon light pulses along SVG cubic bezier curves as a pure function of frame.",
        narrationText: "Next, AnimatedArchitectureDiagram dot t s x computes SVG cubic bezier paths between modules, interpolating photon light pulses across connection curves as a pure mathematical function of the current frame.",
        audioFile: "/audio/voice/remotion_step2.mp3",
      },
      {
        num: 3,
        title: "Kinetic Subtitle Typography",
        targetFile: "src/remotion/KineticCaptionBar.tsx",
        action: "Renders word-by-word subtitles with dynamic glowing highlights synchronized to voiceover.",
        narrationText: "Then, KineticCaptionBar dot t s x renders word-by-word subtitles with dynamic glowing backgrounds, highlighting critical technical keywords in real time as the neural voiceover speaks.",
        audioFile: "/audio/voice/remotion_step3.mp3",
      },
      {
        num: 4,
        title: "Motion Camera & Sync",
        targetFile: "src/remotion/HUDOverlay.tsx",
        action: "Pans and scales camera into active subsystem boundaries while keeping clean progress indicators.",
        narrationText: "Finally, spring and interpolate hooks smoothly pan and zoom the camera into active subsystem boundaries, synchronized with a top glowing progress bar and zero audio stutter.",
        audioFile: "/audio/voice/remotion_step4.mp3",
      },
    ],
    codeSnippet: `// Deterministic Frame Interpolation in Remotion
const frame = useCurrentFrame();
const progress = frame / durationInFrames;

// 1.5-second travelling photon loop
const pulseLoop = (frame % 45) / 45;
const photonX = interpolate(pulseLoop, [0, 1], [startX, endX]);
const photonY = interpolate(pulseLoop, [0, 1], [startY, endY]);`,
    mechanicsNote: "Unlike traditional video editing suites with static keyframes, git-motion treats video as pure mathematical React state. Frame composition is 100% deterministic, enabling instant browser previewing and headless server rendering.",
  },
  cli: {
    storyKey: "cli",
    badge: "src/cli",
    tier: "Tier 1: Entry Points & Triggers",
    role: "Command line interface, workspace scanner bootstrapping, and CI/CD video exports",
    inboundCallers: ["Terminal Developer", "GitHub Actions CI/CD"],
    outboundDeps: ["src/server", "src/remotion"],
    stages: [
      {
        num: 1,
        title: "Commander Entrypoint",
        targetFile: "src/cli/bin.ts",
        action: "Parses CLI flags (--port, --theme, --render), validates current directory, and locates git root.",
        narrationText: "In bin dot t s, the commander CLI handles flags like port, theme, and headless render, validating the working tree and locating the root git repository marker.",
        audioFile: "/audio/voice/cli_step1.mp3",
      },
      {
        num: 2,
        title: "Repository Validation",
        targetFile: "src/cli/bin.ts",
        action: "Verifies git repo presence, builds server/client bundles, and checks directory permissions.",
        narrationText: "Next, it verifies local repository integrity, builds the server and client bundles, and spawns the background Express daemon on an available local port.",
        audioFile: "/audio/voice/cli_step2.mp3",
      },
      {
        num: 3,
        title: "Local Studio Spawner",
        targetFile: "src/cli/bin.ts",
        action: "Spawns background Express server on port 4321 and opens the browser studio automatically.",
        narrationText: "Then, it automatically opens your default web browser to localhost 4321, connecting you directly to the interactive studio cockpit.",
        audioFile: "/audio/voice/cli_step3.mp3",
      },
      {
        num: 4,
        title: "Headless MP4 Rendering",
        targetFile: "src/cli/bin.ts",
        action: "Dispatches headless Remotion render job directly from CI/CD without opening a browser.",
        narrationText: "Finally, it supports headless batch rendering, compiling sixty frames per second MP4 architecture walkthroughs directly from CI/CD without requiring a browser window.",
        audioFile: "/audio/voice/cli_step4.mp3",
      },
    ],
    codeSnippet: `// CLI Command Router in src/cli/bin.ts
program
  .command('studio')
  .description('Launch interactive architecture cockpit')
  .option('-p, --port <number>', 'Server port', '4321')
  .action(async (opts) => {
    await startStudio(process.cwd(), Number(opts.port));
  });`,
    mechanicsNote: "Strict headless separation allows git-motion to run in serverless CI pipelines to automatically generate animated PR walkthroughs and architecture badges on every main merge.",
  },
  studio: {
    storyKey: "studio",
    badge: "src/studio",
    tier: "Tier 2: Transport & Orchestration",
    role: "Interactive React Vite developer cockpit, RAF video scrubber, and blueprint inspector",
    inboundCallers: ["Browser Client"],
    outboundDeps: ["src/core", "src/remotion"],
    stages: [
      {
        num: 1,
        title: "React Vite Dashboard",
        targetFile: "src/studio/main.tsx",
        action: "Initializes React 18, Vite HMR, and Tailwind styling for instantaneous browser interaction.",
        narrationText: "The studio plane provides an interactive developer cockpit built with React and Vite, featuring zero-lag responsive layout and hot module reloading.",
        audioFile: "/audio/voice/studio_step1.mp3",
      },
      {
        num: 2,
        title: "Isolated 60fps Scrubber Loop",
        targetFile: "src/studio/components/VideoControlsBar.tsx",
        action: "Polls player.getCurrentFrame() via RAF in an isolated sub-component, preventing parent re-render storms.",
        narrationText: "In VideoControlsBar dot t s x, player state is strictly isolated from parent components, using a sixty frames per second animation frame loop to guarantee butter-smooth scrubbing without re-render storms.",
        audioFile: "/audio/voice/studio_step2.mp3",
      },
      {
        num: 3,
        title: "Multi-View Architecture Tabs",
        targetFile: "src/studio/App.tsx",
        action: "Seamlessly switches between Video Reel, System Blueprint, Technical Design, and Mermaid diagrams.",
        narrationText: "Next, App dot t s x lets engineers switch instantly between the cinematic video walkthrough, the interactive SVG blueprint, the production technical design document, and raw Mermaid diagrams.",
        audioFile: "/audio/voice/studio_step3.mp3",
      },
      {
        num: 4,
        title: "Subsystem Inspector & Export",
        targetFile: "src/studio/App.tsx",
        action: "Inspects inbound/outbound links, churn hotspots, and triggers one-click high-res video exports.",
        narrationText: "Finally, engineers can filter subsystems, inspect inbound callers and outbound dependencies, customize visual themes, and export high-definition video walkthroughs with one click.",
        audioFile: "/audio/voice/studio_step4.mp3",
      },
    ],
    codeSnippet: `// 60fps RAF Loop in src/studio/components/VideoControlsBar.tsx
useEffect(() => {
  if (!player || !isPlaying) return;
  let animId: number;
  const tick = () => {
    if (!isDraggingRef.current) {
      setCurrentFrame(player.getCurrentFrame());
    }
    animId = requestAnimationFrame(tick);
  };
  animId = requestAnimationFrame(tick);
  return () => cancelAnimationFrame(animId);
}, [player, isPlaying]);`,
    mechanicsNote: "Isolating playback state inside VideoControlsBar prevents App.tsx from re-rendering 30-60 times a second. Remotion's Web Audio pipeline is preserved without memory leaks or stutter.",
  },
};

function getSubsystemDoc(moduleId: string): SubsystemDocInfo {
  const id = (moduleId || "").toLowerCase();
  for (const key of Object.keys(SUBSYSTEM_DOCS)) {
    if (id.includes(key)) return SUBSYSTEM_DOCS[key];
  }
  return {
    storyKey: "module",
    badge: moduleId,
    tier: "Tier 1: Foundation & Infrastructure",
    role: "Project workspace foundation, root manifests & build automation",
    inboundCallers: ["All Subsystems"],
    outboundDeps: ["External Node Modules / OS"],
    stages: [
      {
        num: 1,
        title: "Workspace Manifest & Setup",
        targetFile: "package.json / tsconfig.json",
        action: "Declares environment configuration, root dependency manifests, and build automation pipelines.",
        narrationText: "This module organizes the foundation of your project workspace, declaring environment configuration, root dependency manifests, and build automation pipelines.",
        audioFile: "/audio/voice/module_step1.mp3",
      },
      {
        num: 2,
        title: "Type Safety & Bundler Rules",
        targetFile: "vite.config.ts / tsconfig.json",
        action: "Ensures strict type checking across frontend and backend compilation boundaries.",
        narrationText: "Inside, TypeScript compilation targets and bundler configurations ensure strict type safety across both frontend and backend compilation boundaries.",
        audioFile: "/audio/voice/module_step2.mp3",
      },
      {
        num: 3,
        title: "Task Automation Scripts",
        targetFile: "scripts / package scripts",
        action: "Coordinates linting, building, neural voice synthesis, and testing across all subsystems.",
        narrationText: "Its core scripts coordinate linting, testing, and continuous deployment, ensuring seamless inter-operation across all decoupled subsystem packages.",
        audioFile: "/audio/voice/module_step3.mp3",
      },
      {
        num: 4,
        title: "Architectural Boundary Enforcement",
        targetFile: "root architecture",
        action: "Enforces decoupled module contracts to prevent circular imports and guarantee clean maintainability.",
        narrationText: "By centralizing shared infrastructure here, every tier of your application maintains strict boundaries, zero circular leaks, and high architectural maintainability.",
        audioFile: "/audio/voice/module_step4.mp3",
      },
    ],
    codeSnippet: `// Monorepo / Subsystem Boundaries
{
  "name": "git-motion",
  "version": "0.1.0",
  "scripts": {
    "dev": "vite",
    "build": "pnpm build:client && pnpm build:server"
  }
}`,
    mechanicsNote: "Centralizes root configuration and strict TypeScript compiler options, preventing circular dependency leaks between decoupled subsystems.",
  };
}

export function generateTechnicalDesignHtml(analysis: RepoAnalysis, moduleId?: string): string {
  if (moduleId && moduleId !== "overview") {
    return generateModuleTechnicalDesignHtml(analysis, moduleId);
  }
  return generateOverviewTechnicalDesignHtml(analysis);
}

// ══════════════════════════════════════════════════════════════════
// 1. MODULE-SPECIFIC TECHNICAL DESIGN DOCUMENT
// ══════════════════════════════════════════════════════════════════
function generateModuleTechnicalDesignHtml(analysis: RepoAnalysis, moduleId: string): string {
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

  const doc = getSubsystemDoc(mod.id);
  const moduleFiles = analysis.files.filter((f) => f.module === mod.id);
  const callers = analysis.modules.filter((m) => mod.inboundDependencies.includes(m.id));
  const deps = analysis.modules.filter((m) => mod.outboundDependencies.includes(m.id));

  const totalLinks = mod.inboundDependencies.length + mod.outboundDependencies.length;
  const couplingScore = totalLinks === 0 ? 0 : Number((mod.outboundDependencies.length / totalLinks).toFixed(3));

  return `<!DOCTYPE html>
<html lang="en" data-theme="dark">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${mod.name} — Technical Design (As Built)</title>
<style>
  :root{
    --bg:#070a10; --panel:#0d121f; --panel-2:#131a2b; --ink:#e9ecf2; --ink-2:#9ba5b7; --ink-3:#647087;
    --line:#1c2436; --line-2:#29354d;
    --cyan:#00f3ff; --indigo:#6366f1; --purple:#a855f7; --emerald:#10b981; --coral:#ff967d; --mint:#c4ff78;
    --code-bg:#161d2d; --shadow:0 2px 4px rgba(0,0,0,.4), 0 12px 32px rgba(0,0,0,.5);
  }
  html[data-theme="light"]{
    --bg:#f8fafc; --panel:#ffffff; --panel-2:#f1f5f9; --ink:#0f172a; --ink-2:#334155; --ink-3:#64748b;
    --line:#e2e8f0; --line-2:#cbd5e1;
    --cyan:#0284c7; --indigo:#4f46e5; --purple:#9333ea; --emerald:#059669; --coral:#ea580c; --mint:#16a34a;
    --code-bg:#f1f5f9; --shadow:0 1px 3px rgba(0,0,0,.1), 0 10px 25px rgba(0,0,0,.08);
  }
  *{box-sizing:border-box}
  body{margin:0; background:var(--bg); color:var(--ink); font:15px/1.65 ui-sans-serif,-apple-system,"Segoe UI",Roboto,sans-serif;-webkit-font-smoothing:antialiased;}
  code,pre,.mono{font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace}
  code{background:var(--code-bg); padding:2px 6px; border-radius:5px; font-size:.88em; border:1px solid var(--line)}
  pre code{background:transparent; padding:0; border:none}
  pre{background:var(--panel-2); border:1px solid var(--line); border-radius:10px; padding:16px; overflow-x:auto; font-size:13px}
  a{color:var(--cyan); text-decoration:none}
  a:hover{text-decoration:underline}
  .top{
    display:flex; align-items:center; gap:16px; padding:16px 36px; border-bottom:1px solid var(--line);
    background:var(--panel); position:sticky; top:0; z-index:50; box-shadow:var(--shadow); flex-wrap:wrap;
  }
  .mark{
    width:34px;height:34px;border-radius:10px;display:grid;place-items:center;
    background:linear-gradient(135deg,var(--cyan),var(--indigo));color:#000;font-weight:900;font-size:14px;
  }
  .top h1{font-size:16px;margin:0;font-weight:700;}
  .top h1 small{display:block;font-weight:400;color:var(--ink-3);font-size:12px;}
  .sp{flex:1}
  .chip{font-size:11px;font-weight:700;letter-spacing:.04em;text-transform:uppercase;border:1px solid var(--line-2);color:var(--ink-2);padding:4px 12px;border-radius:20px;}
  .chip.built{border-color:var(--mint);color:var(--mint);background:rgba(196,255,120,.08)}
  .module-pills{display:flex;gap:6px;align-items:center;flex-wrap:wrap;}
  .mod-pill{
    font-size:11.5px;padding:4px 10px;border-radius:14px;background:var(--panel-2);border:1px solid var(--line);
    color:var(--ink-2);text-decoration:none;transition:all .15s;
  }
  .mod-pill:hover{border-color:var(--cyan);color:var(--cyan);}
  .mod-pill.active{background:rgba(0,243,255,0.15);border-color:var(--cyan);color:var(--cyan);font-weight:700;}
  .theme-btn{cursor:pointer;background:var(--panel-2);border:1px solid var(--line-2);color:var(--ink-2);border-radius:20px;padding:5px 14px;font-size:12px;}

  .wrap{max-width:1160px;margin:0 auto;padding:0 36px 120px}
  .toc{border-bottom:1px solid var(--line);background:var(--panel);position:sticky;top:67px;z-index:40}
  .toc .row{max-width:1160px;margin:0 auto;padding:10px 36px;display:flex;gap:6px;flex-wrap:wrap;align-items:center}
  .toc a{font-size:12px;color:var(--ink-2);padding:4px 8px;border-radius:6px;text-decoration:none}
  .toc a:hover{background:var(--panel-2);color:var(--cyan)}
  header.hero{padding:40px 0 24px}
  header.hero h2{font-size:32px;line-height:1.2;margin:0 0 12px;font-weight:800}
  .lede{font-size:17px;color:var(--ink-2);max-width:82ch;margin:0 0 12px;line-height:1.6}
  section{padding:34px 0;border-top:1px solid var(--line)}
  h3.sec{font-size:12px;letter-spacing:.1em;text-transform:uppercase;color:var(--cyan);margin:0 0 8px;font-weight:750;font-family:ui-monospace,monospace}
  h4{font-size:23px;margin:0 0 14px;font-weight:750}
  h5{font-size:16px;margin:24px 0 10px;font-weight:650;color:var(--ink)}
  p{max-width:84ch;color:var(--ink-2);line-height:1.7}
  table{border-collapse:collapse;width:100%;font-size:13.5px;margin:22px 0}
  th,td{border:1px solid var(--line);padding:10px 14px;text-align:left;vertical-align:top}
  th{background:var(--panel-2);font-weight:650;font-size:12.5px;color:var(--ink)}
  td{color:var(--ink-2)}
  .grid2{display:grid;grid-template-columns:1fr 1fr;gap:20px;margin:22px 0}
  .card{background:var(--panel);border:1px solid var(--line);border-radius:12px;padding:20px;box-shadow:var(--shadow)}
  .card h6{margin:0 0 8px;font-size:15px;font-weight:700;color:var(--ink)}

  /* Audio Narration Container */
  .narration-box {
    background: #090e18; border: 1px solid var(--line-2); border-radius: 12px;
    padding: 14px 18px; margin: 16px 0 22px; display: flex; flex-direction: column; gap: 8px;
  }
  .narration-head { display: flex; align-items: center; justify-content: space-between; font-size: 11px; font-family: ui-monospace, monospace; color: var(--cyan); font-weight: 700; }
  .narration-quote { font-size: 13.5px; color: var(--ink); font-style: italic; line-height: 1.6; }
  .audio-ctrl { display: flex; align-items: center; gap: 10px; }
  .play-pill {
    background: var(--cyan); color: #000; border: none; border-radius: 16px; padding: 5px 14px;
    font-size: 12px; font-weight: 800; cursor: pointer; display: flex; align-items: center; gap: 6px; transition: all .15s;
  }
  .play-pill:hover { background: #fff; }
</style>
</head>
<body>

<div class="top">
  <div class="mark">0${analysis.modules.findIndex((m) => m.id === mod.id) + 1 || 1}</div>
  <div>
    <h1>${mod.name} — Technical Design (As Built)<small>${doc.tier} · ${mod.path}</small></h1>
  </div>
  <div class="sp"></div>
  <div class="module-pills">
    <a href="/api/technical-design.html" class="mod-pill">◂ Whole App System Design</a>
    ${analysis.modules
      .map(
        (m) =>
          `<a href="/api/technical-design.html?module=${encodeURIComponent(m.id)}" class="mod-pill ${
            m.id === mod.id ? "active" : ""
          }">${m.name}</a>`
      )
      .join("")}
  </div>
  <span class="chip built">Built & Deployed · v0.1.0</span>
  <button id="themeBtn" class="theme-btn" type="button">◐ Theme</button>
</div>

<nav class="toc">
  <div class="row">
    <span style="font-size:11px;font-family:monospace;color:var(--ink-3);margin-right:6px">SECTIONS:</span>
    <a href="#role">1. Role & Coupling</a>
    <a href="#pipeline">2. Execution Spine</a>
    <a href="#mechanics">3. Under The Hood</a>
    <a href="#callers">4. Callers & Deps</a>
    <a href="#files">5. File Inventory</a>
    <a href="#fullaudio">6. Full Audio Track</a>
  </div>
</nav>

<div class="wrap">
  <header class="hero">
    <h2>Subsystem Technical Design: ${mod.name}</h2>
    <p class="lede">
      ${doc.role}. Part of the <code>git-motion</code> local architecture pipeline with zero cloud dependencies.
    </p>
    <div style="font-size:12.5px;color:var(--ink-3);font-family:monospace">
      Primary Language: <b>${mod.primaryLanguage}</b> • Files: <b>${mod.fileCount}</b> • LOC: <b>${mod.loc.toLocaleString()}</b> • Churn Score: <b>${mod.churnScore}</b> • Coupling: <b>${couplingScore}</b>
    </div>
  </header>

  <!-- SECTION 1: ROLE & COUPLING -->
  <section id="role">
    <h3 class="sec">1 · Role & Architectural Coupling</h3>
    <h4>Classification Tier & Stability Metrics</h4>
    <p>
      In <code>src/core/architecture.ts</code>, <code>${mod.name}</code> is assigned to <b>${doc.tier}</b> based on its inbound-to-outbound dependency ratio.
    </p>

    <div class="grid2">
      <div class="card">
        <h6>Coupling Metric Formula</h6>
        <p>Measured as outbound calls divided by total architectural connections:</p>
        <pre><code>C = outbound / (inbound + outbound)
C = ${mod.outboundDependencies.length} / (${mod.inboundDependencies.length} + ${mod.outboundDependencies.length}) = ${couplingScore}</code></pre>
        <p style="font-size:12.5px;color:var(--ink-3);margin-top:8px">
          ${couplingScore < 0.3 ? "Low coupling (<0.3) indicates a foundational domain module relied upon by many callers." : couplingScore > 0.7 ? "High coupling (>0.7) indicates an orchestration coordinator delegating to downstream services." : "Balanced coupling represents an intermediate processing layer."}
        </p>
      </div>

      <div class="card">
        <h6>Subsystem Responsibilities</h6>
        <ul style="padding-left:18px;margin:0;font-size:13px;line-height:1.7;color:var(--ink-2)">
          <li><b>Target Path:</b> <code>${mod.path}</code></li>
          <li><b>Inbound Upstream Callers:</b> ${callers.length > 0 ? callers.map(c => `<code>${c.name}</code>`).join(", ") : "Root Entrypoint (Direct user invocation)"}</li>
          <li><b>Outbound Downstream Dependencies:</b> ${deps.length > 0 ? deps.map(d => `<code>${d.name}</code>`).join(", ") : "Terminal Leaf (Self-contained presentation)"}</li>
          <li><b>Total Source LOC:</b> ${mod.loc.toLocaleString()} lines across ${mod.fileCount} files</li>
        </ul>
      </div>
    </div>
  </section>

  <!-- SECTION 2: 4-STAGE EXECUTION SPINE WITH NARRATION -->
  <section id="pipeline">
    <h3 class="sec">2 · Execution Spine</h3>
    <h4>Four-Stage Sequential Pipeline & Neural Audio Walkthrough</h4>
    <p>
      When this subsystem is invoked, execution passes deterministically through four internal stages. Click the narration buttons below to hear the voiceover explanation for each stage:
    </p>

    <table>
      <thead>
        <tr>
          <th style="width:60px">Stage</th>
          <th style="width:160px">Stage Name</th>
          <th style="width:200px">Target Source File</th>
          <th>Under-The-Hood Action</th>
        </tr>
      </thead>
      <tbody>
        ${doc.stages
          .map(
            (s) => `
          <tr>
            <td><b>0${s.num}</b></td>
            <td><b>${s.title}</b></td>
            <td><code>${s.targetFile}</code></td>
            <td>${s.action}</td>
          </tr>
        `
          )
          .join("")}
      </tbody>
    </table>

    ${doc.stages
      .map(
        (s) => `
      <div class="narration-box">
        <div class="narration-head">
          <span>STAGE 0${s.num}: ${s.title.toUpperCase()}</span>
          <span>TARGET: ${s.targetFile}</span>
        </div>
        <div class="narration-quote">"${s.narrationText}"</div>
        <div class="audio-ctrl">
          <button class="play-pill" onclick="playAudio('${s.audioFile}', this)">▶ Listen to Stage 0${s.num} Narration</button>
          <span style="font-size:11px;font-family:monospace;color:var(--ink-3)">Neural voice af_heart</span>
        </div>
      </div>
    `
      )
      .join("")}
  </section>

  <!-- SECTION 3: UNDER THE HOOD MECHANICS -->
  <section id="mechanics">
    <h3 class="sec">3 · Code Mechanics</h3>
    <h4>Algorithms, AST Extraction & Formulas</h4>
    <p>${doc.mechanicsNote}</p>
    <pre><code>${doc.codeSnippet}</code></pre>
  </section>

  <!-- SECTION 4: CALLERS & DEPENDENCIES -->
  <section id="callers">
    <h3 class="sec">4 · Architectural Boundaries</h3>
    <h4>Inbound Callers & Outbound Contracts</h4>
    <div class="grid2">
      <div class="card">
        <h6>Inbound Callers (${callers.length})</h6>
        ${callers.length === 0
          ? "<p>None. This module is an external entry point invoked directly from the CLI or HTTP client.</p>"
          : `<table><thead><tr><th>Subsystem</th><th>Path</th><th>LOC</th></tr></thead><tbody>${callers.map(c => `<tr><td><code>${c.name}</code></td><td>${c.path}</td><td>${c.loc}</td></tr>`).join("")}</tbody></table>`}
      </div>

      <div class="card">
        <h6>Outbound Dependencies (${deps.length})</h6>
        ${deps.length === 0
          ? "<p>None. This module is a self-contained foundational or presentation leaf.</p>"
          : `<table><thead><tr><th>Subsystem</th><th>Path</th><th>LOC</th></tr></thead><tbody>${deps.map(d => `<tr><td><code>${d.name}</code></td><td>${d.path}</td><td>${d.loc}</td></tr>`).join("")}</tbody></table>`}
      </div>
    </div>
  </section>

  <!-- SECTION 5: FILE INVENTORY -->
  <section id="files">
    <h3 class="sec">5 · File Breakdown</h3>
    <h4>Files Belonging to ${mod.name} (${moduleFiles.length})</h4>
    <table>
      <thead>
        <tr>
          <th>File Path</th>
          <th>Lines of Code</th>
          <th>Churn Score (Cf)</th>
          <th>Classification</th>
        </tr>
      </thead>
      <tbody>
        ${moduleFiles
          .map(
            (f) => `
          <tr>
            <td><code>${f.path}</code></td>
            <td>${f.loc}</td>
            <td><b>${f.churnScore?.toFixed(2) || "0.00"}</b></td>
            <td><span style="font-size:11px;padding:2px 8px;border-radius:10px;background:var(--panel-2);border:1px solid var(--line-2)">${(f.churnScore || 0) >= 0.7 ? "🔥 Hotspot" : "Standard"}</span></td>
          </tr>
        `
          )
          .join("")}
      </tbody>
    </table>
  </section>

  <!-- SECTION 6: FULL AUDIO TRACK -->
  <section id="fullaudio">
    <h3 class="sec">6 · Voiceover Track</h3>
    <h4>Complete Continuous Narration Track</h4>
    <p>
      Stitched Kokoro ONNX <code>af_heart</code> audio stream with zero playback gaps:
    </p>
    <div style="background:var(--panel-2);border:1px solid var(--line-2);border-radius:12px;padding:16px 20px;display:flex;align-items:center;justify-content:space-between;gap:16px;flex-wrap:wrap">
      <div>
        <b style="color:#fff;font-size:14px">Continuous Narration Stream:</b>
        <span style="color:var(--ink-2);font-size:12.5px;margin-left:8px">/audio/voice/${doc.storyKey}_full.mp3</span>
      </div>
      <audio controls src="/audio/voice/${doc.storyKey}_full.mp3" style="outline:none"></audio>
    </div>
  </section>
</div>

<script>
  let activeAudio = null;
  let activeBtn = null;

  function playAudio(src, btn) {
    if (activeAudio && !activeAudio.paused && activeAudio.src.includes(src)) {
      activeAudio.pause();
      btn.innerText = "▶ Listen to Narration";
      return;
    }
    if (activeAudio) {
      activeAudio.pause();
      if (activeBtn) activeBtn.innerText = "▶ Listen to Narration";
    }
    activeAudio = new Audio(src);
    activeBtn = btn;
    btn.innerText = "⏸ Pausing...";
    activeAudio.play();
    activeAudio.onended = () => { btn.innerText = "▶ Listen to Narration"; };
  }

  const themeBtn = document.getElementById('themeBtn');
  themeBtn.addEventListener('click', () => {
    const cur = document.documentElement.getAttribute('data-theme');
    document.documentElement.setAttribute('data-theme', cur === 'dark' ? 'light' : 'dark');
  });
</script>

</body>
</html>`;
}

// ══════════════════════════════════════════════════════════════════
// 2. WHOLE-REPOSITORY TECHNICAL DESIGN DOCUMENT (WITH SECTION AUDIO)
// ══════════════════════════════════════════════════════════════════
function generateOverviewTechnicalDesignHtml(analysis: RepoAnalysis): string {
  const stages = [
    {
      num: 1,
      name: "CLI Entrypoint & Workspace Init",
      file: "src/cli/bin.ts",
      audio: "/audio/voice/step1.mp3",
      narration: "When git motion starts, it runs locally on your workstation with zero cloud dependencies. It boots an Express daemon on port 4321 and mounts the Vite studio interface for immediate architectural inspection.",
      action: "Parses CLI flags (--port, --theme), validates working directory, and locates root .git repository marker.",
    },
    {
      num: 2,
      name: "AST Import Parsing & Git Churn",
      file: "src/server/analyzer.ts & git.ts",
      audio: "/audio/voice/step2.mp3",
      narration: "Next, the ingestion pipeline traverses your repository with multi language AST token parsers. It maps file import edges and calculates git churn scores using normalized commit frequency and line alterations.",
      action: "Extracts imports across TS, Python, Go, and Rust. Runs git log --numstat to score file churn velocity.",
    },
    {
      num: 3,
      name: "4-Tier Architectural Classifier",
      file: "src/core/architecture.ts",
      audio: "/audio/voice/step3.mp3",
      narration: "Then, the core architecture engine partitions the codebase into four clean tiers: entry points, transport orchestration, foundational domain models, and presentation rendering leaves.",
      action: "Clusters files into cohesive modules and assigns tiers: Entrypoints, Orchestration, Core Domain, and Presentation Leaves.",
    },
    {
      num: 4,
      name: "60fps Remotion Canvas & Narration",
      file: "src/remotion/RepoReel.tsx & outputs/",
      audio: "/audio/voice/step4.mp3",
      narration: "Finally, it compiles an interactive SVG architectural blueprint and renders sixty frames per second motion graphics with traveling light beams and neural voiceover narration.",
      action: "Renders 60fps React motion canvas with travelling light beams, kinetic captions, and exports 1080p MP4.",
    },
  ];

  return `<!DOCTYPE html>
<html lang="en" data-theme="dark">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${analysis.name} — Technical Design Document (As Built)</title>
<style>
  :root{
    --bg:#070a10; --panel:#0d121f; --panel-2:#131a2b; --ink:#e9ecf2; --ink-2:#9ba5b7; --ink-3:#647087;
    --line:#1c2436; --line-2:#29354d;
    --cyan:#00f3ff; --indigo:#6366f1; --purple:#a855f7; --emerald:#10b981; --coral:#ff967d; --mint:#c4ff78;
    --code-bg:#161d2d; --shadow:0 2px 4px rgba(0,0,0,.4), 0 12px 32px rgba(0,0,0,.5);
  }
  html[data-theme="light"]{
    --bg:#f8fafc; --panel:#ffffff; --panel-2:#f1f5f9; --ink:#0f172a; --ink-2:#334155; --ink-3:#64748b;
    --line:#e2e8f0; --line-2:#cbd5e1;
    --cyan:#0284c7; --indigo:#4f46e5; --purple:#9333ea; --emerald:#059669; --coral:#ea580c; --mint:#16a34a;
    --code-bg:#f1f5f9; --shadow:0 1px 3px rgba(0,0,0,.1), 0 10px 25px rgba(0,0,0,.08);
  }
  *{box-sizing:border-box}
  body{margin:0; background:var(--bg); color:var(--ink); font:15px/1.65 ui-sans-serif,-apple-system,"Segoe UI",Roboto,sans-serif;-webkit-font-smoothing:antialiased;}
  code,pre,.mono{font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace}
  code{background:var(--code-bg); padding:2px 6px; border-radius:5px; font-size:.88em; border:1px solid var(--line)}
  pre code{background:transparent; padding:0; border:none}
  pre{background:var(--panel-2); border:1px solid var(--line); border-radius:10px; padding:16px; overflow-x:auto; font-size:13px}
  a{color:var(--cyan); text-decoration:none}
  a:hover{text-decoration:underline}
  .top{
    display:flex; align-items:center; gap:16px; padding:16px 36px; border-bottom:1px solid var(--line);
    background:var(--panel); position:sticky; top:0; z-index:50; box-shadow:var(--shadow); flex-wrap:wrap;
  }
  .mark{
    width:34px;height:34px;border-radius:10px;display:grid;place-items:center;
    background:linear-gradient(135deg,var(--cyan),var(--indigo));color:#000;font-weight:900;font-size:14px;
  }
  .top h1{font-size:16px;margin:0;font-weight:700;}
  .top h1 small{display:block;font-weight:400;color:var(--ink-3);font-size:12px;}
  .sp{flex:1}
  .chip{font-size:11px;font-weight:700;letter-spacing:.04em;text-transform:uppercase;border:1px solid var(--line-2);color:var(--ink-2);padding:4px 12px;border-radius:20px;}
  .chip.built{border-color:var(--mint);color:var(--mint);background:rgba(196,255,120,.08)}
  .module-pills{display:flex;gap:6px;align-items:center;flex-wrap:wrap;}
  .mod-pill{
    font-size:11.5px;padding:4px 10px;border-radius:14px;background:var(--panel-2);border:1px solid var(--line);
    color:var(--ink-2);text-decoration:none;transition:all .15s;
  }
  .mod-pill:hover{border-color:var(--cyan);color:var(--cyan);}
  .mod-pill.active{background:rgba(0,243,255,0.15);border-color:var(--cyan);color:var(--cyan);font-weight:700;}
  .theme-btn{cursor:pointer;background:var(--panel-2);border:1px solid var(--line-2);color:var(--ink-2);border-radius:20px;padding:5px 14px;font-size:12px;}

  .wrap{max-width:1160px;margin:0 auto;padding:0 36px 120px}
  .toc{border-bottom:1px solid var(--line);background:var(--panel);position:sticky;top:67px;z-index:40}
  .toc .row{max-width:1160px;margin:0 auto;padding:10px 36px;display:flex;gap:6px;flex-wrap:wrap;align-items:center}
  .toc a{font-size:12px;color:var(--ink-2);padding:4px 8px;border-radius:6px;text-decoration:none}
  .toc a:hover{background:var(--panel-2);color:var(--cyan)}
  header.hero{padding:40px 0 24px}
  header.hero h2{font-size:32px;line-height:1.2;margin:0 0 12px;font-weight:800}
  .lede{font-size:17px;color:var(--ink-2);max-width:82ch;margin:0 0 12px;line-height:1.6}
  section{padding:34px 0;border-top:1px solid var(--line)}
  h3.sec{font-size:12px;letter-spacing:.1em;text-transform:uppercase;color:var(--cyan);margin:0 0 8px;font-weight:750;font-family:ui-monospace,monospace}
  h4{font-size:23px;margin:0 0 14px;font-weight:750}
  p{max-width:84ch;color:var(--ink-2);line-height:1.7}
  table{border-collapse:collapse;width:100%;font-size:13.5px;margin:22px 0}
  th,td{border:1px solid var(--line);padding:10px 14px;text-align:left;vertical-align:top}
  th{background:var(--panel-2);font-weight:650;font-size:12.5px;color:var(--ink)}
  td{color:var(--ink-2)}
  .grid2{display:grid;grid-template-columns:1fr 1fr;gap:20px;margin:22px 0}
  .card{background:var(--panel);border:1px solid var(--line);border-radius:12px;padding:20px;box-shadow:var(--shadow)}
  .card h6{margin:0 0 8px;font-size:15px;font-weight:700;color:var(--ink)}

  .narration-box {
    background: #090e18; border: 1px solid var(--line-2); border-radius: 12px;
    padding: 14px 18px; margin: 16px 0 22px; display: flex; flex-direction: column; gap: 8px;
  }
  .narration-head { display: flex; align-items: center; justify-content: space-between; font-size: 11px; font-family: ui-monospace, monospace; color: var(--cyan); font-weight: 700; }
  .narration-quote { font-size: 13.5px; color: var(--ink); font-style: italic; line-height: 1.6; }
  .audio-ctrl { display: flex; align-items: center; gap: 10px; }
  .play-pill {
    background: var(--cyan); color: #000; border: none; border-radius: 16px; padding: 5px 14px;
    font-size: 12px; font-weight: 800; cursor: pointer; display: flex; align-items: center; gap: 6px; transition: all .15s;
  }
  .play-pill:hover { background: #fff; }
</style>
</head>
<body>

<div class="top">
  <div class="mark">GM</div>
  <div>
    <h1>${analysis.name} — Technical Design Document (As Built)<small>Codebase AST Analysis to 60fps Cinematic Architecture Reels</small></h1>
  </div>
  <div class="sp"></div>
  <div class="module-pills">
    <a href="/api/technical-design.html" class="mod-pill active">Whole App System Design</a>
    ${analysis.modules
      .map(
        (m) =>
          `<a href="/api/technical-design.html?module=${encodeURIComponent(m.id)}" class="mod-pill">${m.name}</a>`
      )
      .join("")}
  </div>
  <span class="chip built">Built & Deployed · v0.1.0</span>
  <button id="themeBtn" class="theme-btn" type="button">◐ Theme</button>
</div>

<nav class="toc">
  <div class="row">
    <span style="font-size:11px;font-family:monospace;color:var(--ink-3);margin-right:6px">SECTIONS:</span>
    <a href="#planes">1. Architecture Planes</a>
    <a href="#spine">2. Execution Spine</a>
    <a href="#ast">3. AST & Churn</a>
    <a href="#subsystems">4. Subsystems Breakdown</a>
    <a href="#fullaudio">5. Audio Narration</a>
  </div>
</nav>

<div class="wrap">
  <header class="hero">
    <h2>System Architecture Technical Design</h2>
    <p class="lede">
      Production engineering architecture: 4 decoupled planes, AST import extraction, Git churn mechanics, and Remotion 60fps canvas.
    </p>
    <div style="font-size:12.5px;color:var(--ink-3);font-family:monospace">
      Total Files: <b>${analysis.totalFiles}</b> • LOC: <b>${analysis.totalLOC.toLocaleString()}</b> • Subsystems: <b>${analysis.modules.length}</b> • Commits: <b>${analysis.totalCommits}</b>
    </div>
  </header>

  <!-- 1. PLANES -->
  <section id="planes">
    <h3 class="sec">1 · Separation of Concerns</h3>
    <h4>Four Decoupled Architecture Planes</h4>
    <div class="grid2">
      <div class="card">
        <h6>1. Ingestion & Analysis Plane (<code>src/server</code>)</h6>
        <p>Node.js & Express daemon on port 4321. Runs recursive disk scanner, AST import extractor, and git log numstat parser. Serves cached JSON.</p>
      </div>
      <div class="card">
        <h6>2. Core Modeling Plane (<code>src/core</code>)</h6>
        <p>Pure TypeScript types, 4-tier classifier, coupling score calculator, and standalone SVG HTML blueprint compiler. Zero side effects.</p>
      </div>
      <div class="card">
        <h6>3. Motion Video Canvas Plane (<code>src/remotion</code>)</h6>
        <p>Remotion 60fps compositions, SVG Bezier light pulses, kinetic subtitle typography, and single-track Kokoro neural audio embedding.</p>
      </div>
      <div class="card">
        <h6>4. Human Cockpit Plane (<code>src/studio + src/cli</code>)</h6>
        <p>React Vite SPA with isolated 60fps RAF scrubber loop, multi-view blueprint & design tabs, and headless CI/CD batch renderer.</p>
      </div>
    </div>
  </section>

  <!-- 2. EXECUTION SPINE -->
  <section id="spine">
    <h3 class="sec">2 · Execution Spine</h3>
    <h4>Eight-Stage Pipeline & Neural Narration Audio</h4>
    <p>Click any narration button below to listen to the neural voiceover for that stage:</p>

    <table>
      <thead>
        <tr>
          <th>Stage</th>
          <th>Component</th>
          <th>Target File</th>
          <th>Under-The-Hood Action</th>
        </tr>
      </thead>
      <tbody>
        ${stages
          .map(
            (s) => `
          <tr>
            <td><b>0${s.num}</b></td>
            <td><b>${s.name}</b></td>
            <td><code>${s.file}</code></td>
            <td>${s.action}</td>
          </tr>
        `
          )
          .join("")}
      </tbody>
    </table>

    ${stages
      .map(
        (s) => `
      <div class="narration-box">
        <div class="narration-head">
          <span>STAGE 0${s.num}: ${s.name.toUpperCase()}</span>
          <span>${s.file}</span>
        </div>
        <div class="narration-quote">"${s.narration}"</div>
        <div class="audio-ctrl">
          <button class="play-pill" onclick="playAudio('${s.audio}', this)">▶ Listen to Stage 0${s.num} Narration</button>
          <span style="font-size:11px;font-family:monospace;color:var(--ink-3)">Model: af_heart</span>
        </div>
      </div>
    `
      )
      .join("")}
  </section>

  <!-- 3. AST & CHURN -->
  <section id="ast">
    <h3 class="sec">3 · Analysis Mechanics</h3>
    <h4>AST Import Parsing & Git Churn Formulas</h4>
    <p>Normalized Git churn score $C_f$ weights commit velocity against line delta churn:</p>
    <pre><code>// Churn score formula in src/server/git.ts
const commitWeight = Math.min(1.0, commitCount / maxCommits);
const lineDeltaWeight = Math.min(1.0, (linesAdded + linesDeleted) / maxLinesChanged);
const churnScore = Number((0.65 * commitWeight + 0.35 * lineDeltaWeight).toFixed(3));</code></pre>
  </section>

  <!-- 4. SUBSYSTEMS -->
  <section id="subsystems">
    <h3 class="sec">4 · Subsystems Inventory</h3>
    <h4>Detected Architectural Subsystems (${analysis.modules.length})</h4>
    <table>
      <thead>
        <tr>
          <th>Subsystem</th>
          <th>Path</th>
          <th>Files</th>
          <th>LOC</th>
          <th>Coupling Ratio</th>
          <th>Deep Dive</th>
        </tr>
      </thead>
      <tbody>
        ${analysis.modules
          .map((m) => {
            const tot = m.inboundDependencies.length + m.outboundDependencies.length;
            const c = tot === 0 ? 0 : Number((m.outboundDependencies.length / tot).toFixed(2));
            return `
          <tr>
            <td><b>${m.name}</b></td>
            <td><code>${m.path}</code></td>
            <td>${m.fileCount}</td>
            <td>${m.loc.toLocaleString()}</td>
            <td><b>${c}</b></td>
            <td><a href="/api/technical-design.html?module=${encodeURIComponent(m.id)}" class="mod-pill active" style="font-size:11px">Inspect Subsystem Design ➔</a></td>
          </tr>
        `;
          })
          .join("")}
      </tbody>
    </table>
  </section>

  <!-- 5. FULL AUDIO -->
  <section id="fullaudio">
    <h3 class="sec">5 · Audio Narration</h3>
    <h4>Complete Continuous Repository Narration</h4>
    <div style="background:var(--panel-2);border:1px solid var(--line-2);border-radius:12px;padding:16px 20px;display:flex;align-items:center;justify-content:space-between;gap:16px;flex-wrap:wrap">
      <div>
        <b style="color:#fff;font-size:14px">Continuous Narration Stream:</b>
        <span style="color:var(--ink-2);font-size:12.5px;margin-left:8px">/audio/voice/overview_full.mp3</span>
      </div>
      <audio controls src="/audio/voice/overview_full.mp3" style="outline:none"></audio>
    </div>
  </section>
</div>

<script>
  let activeAudio = null;
  let activeBtn = null;

  function playAudio(src, btn) {
    if (activeAudio && !activeAudio.paused && activeAudio.src.includes(src)) {
      activeAudio.pause();
      btn.innerText = "▶ Listen to Narration";
      return;
    }
    if (activeAudio) {
      activeAudio.pause();
      if (activeBtn) activeBtn.innerText = "▶ Listen to Narration";
    }
    activeAudio = new Audio(src);
    activeBtn = btn;
    btn.innerText = "⏸ Pausing...";
    activeAudio.play();
    activeAudio.onended = () => { btn.innerText = "▶ Listen to Narration"; };
  }

  const themeBtn = document.getElementById('themeBtn');
  themeBtn.addEventListener('click', () => {
    const cur = document.documentElement.getAttribute('data-theme');
    document.documentElement.setAttribute('data-theme', cur === 'dark' ? 'light' : 'dark');
  });
</script>

</body>
</html>`;
}
