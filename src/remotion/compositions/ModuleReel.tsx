import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, Audio, staticFile } from "remotion";
import { RepoAnalysis, ThemePreset } from "../../core/types";
import { THEMES } from "../themes";
import { ModuleBoundaryView } from "../components/ModuleBoundaryView";
import { KineticCaptionBar } from "../components/KineticCaptionBar";
import { HUDOverlay } from "../components/HUDOverlay";

export interface ModuleReelProps {
  analysis: RepoAnalysis;
  moduleId: string;
  themePreset?: ThemePreset;
}

interface StepInfo {
  title: string;
  caption: string;
  highlights: string[];
}

interface SubsystemStory {
  audioFile: string;
  stepStarts: [number, number, number, number];
  steps: [StepInfo, StepInfo, StepInfo, StepInfo];
}

const SUBSYSTEM_STORIES: Record<string, SubsystemStory> = {
  server: {
    audioFile: "audio/voice/server_full.mp3",
    stepStarts: [0, 461, 991, 1483],
    steps: [
      {
        title: "1. Express HTTP Server: [src/server/index.ts]",
        caption: "Inside the server subsystem, index dot t s bootstraps an Express HTTP daemon on port 4321, binding CORS policies and registering REST endpoints for analytical queries and headless video rendering.",
        highlights: ["server", "index.ts", "Express", "daemon", "4321", "CORS", "REST", "endpoints", "rendering"],
      },
      {
        title: "2. Multi-Language AST Scanner: [src/server/analyzer.ts]",
        caption: "Next, analyzer dot t s performs recursive directory scans while ignoring node modules and git. It uses language-specific regex tokenizers to extract imports across TypeScript, Python, Go, and Rust, resolving relative paths into concrete edges.",
        highlights: ["analyzer.ts", "directory", "scans", "tokenizers", "imports", "TypeScript", "Python", "Go", "Rust", "edges"],
      },
      {
        title: "3. Git Churn Normalization: [src/server/git.ts]",
        caption: "Then, git dot t s spawns a child process to execute git log with numstat. It scores file velocity using the normalized formula sixty-five percent commit frequency plus thirty-five percent line deltas to spotlight critical code hotspots.",
        highlights: ["git.ts", "git", "log", "numstat", "velocity", "normalized", "commit", "frequency", "deltas", "hotspots"],
      },
      {
        title: "4. In-Memory Graph Cache: [src/server/index.ts]",
        caption: "Finally, it constructs the universal RepoAnalysis data model, caching file nodes and dependency links in memory to instantly feed both the web studio and the Remotion video engine.",
        highlights: ["RepoAnalysis", "model", "file", "nodes", "dependency", "links", "memory", "studio", "Remotion"],
      },
    ],
  },
  core: {
    audioFile: "audio/voice/core_full.mp3",
    stepStarts: [0, 394, 794, 1185],
    steps: [
      {
        title: "1. Universal Type Contracts: [src/core/types.ts]",
        caption: "The core subsystem defines the architectural schema in types dot t s, establishing strongly typed contracts for FileNode, ModuleCluster, and DependencyLink with zero external dependencies.",
        highlights: ["core", "types.ts", "FileNode", "ModuleCluster", "DependencyLink", "zero", "dependencies"],
      },
      {
        title: "2. 4-Tier Hierarchical Classifier: [src/core/architecture.ts]",
        caption: "Next, architecture dot t s groups files into four hierarchical tiers: entry points with high outbound calls, orchestration servers, foundational domain data models, and output rendering leaves.",
        highlights: ["architecture.ts", "four", "hierarchical", "tiers", "entry", "points", "servers", "domain", "rendering"],
      },
      {
        title: "3. Coupling & Volatility Scoring: [src/core/architecture.ts]",
        caption: "Then, it calculates module coupling ratios by dividing outbound dependencies by total connections, identifying tightly coupled orchestration layers versus independent foundational libraries.",
        highlights: ["coupling", "ratios", "outbound", "dependencies", "orchestration", "independent", "libraries"],
      },
      {
        title: "4. SVG Blueprint Compiler: [src/core/htmlBlueprint.ts]",
        caption: "Finally, htmlBlueprint dot t s compiles interactive standalone SVG system blueprints with themed zone boundaries, data lanes, and travelling photon pulse animations.",
        highlights: ["htmlBlueprint.ts", "interactive", "SVG", "blueprints", "boundaries", "photon", "animations"],
      },
    ],
  },
  remotion: {
    audioFile: "audio/voice/remotion_full.mp3",
    stepStarts: [0, 391, 838, 1218],
    steps: [
      {
        title: "1. 60fps Composition Registry: [src/remotion/Root.tsx]",
        caption: "The remotion subsystem houses sixty frames per second video compositions in Root dot t s, configuring landscape nineteen-twenty by ten-eighty and vertical ten-eighty by nineteen-twenty viewports.",
        highlights: ["remotion", "sixty", "frames", "Root.tsx", "landscape", "vertical", "viewports"],
      },
      {
        title: "2. Cubic Bezier Light Beams: [src/remotion/AnimatedArchitectureDiagram.tsx]",
        caption: "Next, AnimatedArchitectureDiagram dot t s x computes SVG cubic bezier paths between modules, interpolating photon light pulses across connection curves as a pure mathematical function of the current frame.",
        highlights: ["AnimatedArchitectureDiagram.tsx", "cubic", "bezier", "photon", "pulses", "mathematical", "frame"],
      },
      {
        title: "3. Kinetic Subtitle Typography: [src/remotion/KineticCaptionBar.tsx]",
        caption: "Then, KineticCaptionBar dot t s x renders word-by-word subtitles with dynamic glowing backgrounds, highlighting critical technical keywords in real time as the neural voiceover speaks.",
        highlights: ["KineticCaptionBar.tsx", "subtitles", "glowing", "backgrounds", "keywords", "real", "time", "voiceover"],
      },
      {
        title: "4. Motion Camera & HUD Sync: [src/remotion/HUDOverlay.tsx]",
        caption: "Finally, spring and interpolate hooks smoothly pan and zoom the camera into active subsystem boundaries, synchronized with a top glowing progress bar and zero audio stutter.",
        highlights: ["spring", "interpolate", "camera", "subsystem", "boundaries", "progress", "bar", "audio"],
      },
    ],
  },
  cli: {
    audioFile: "audio/voice/cli_full.mp3",
    stepStarts: [0, 327, 626, 935],
    steps: [
      {
        title: "1. Commander CLI Entrypoint: [src/cli/bin.ts]",
        caption: "In bin dot t s, the commander CLI handles flags like port, theme, and headless render, validating the working tree and locating the root git repository marker.",
        highlights: ["bin.ts", "commander", "CLI", "flags", "port", "theme", "render", "repository"],
      },
      {
        title: "2. Repository Validation: [src/cli/bin.ts]",
        caption: "Next, it verifies local repository integrity, builds the server and client bundles, and spawns the background Express daemon on an available local port.",
        highlights: ["verifies", "integrity", "bundles", "spawns", "Express", "daemon", "port"],
      },
      {
        title: "3. Browser Cockpit Launch: [src/cli/bin.ts]",
        caption: "Then, it automatically opens your default web browser to localhost 4321, connecting you directly to the interactive studio cockpit.",
        highlights: ["browser", "localhost", "4321", "interactive", "studio", "cockpit"],
      },
      {
        title: "4. Headless CI/CD Rendering: [src/cli/bin.ts]",
        caption: "Finally, it supports headless batch rendering, compiling sixty frames per second MP4 architecture walkthroughs directly from CI/CD without requiring a browser window.",
        highlights: ["headless", "rendering", "sixty", "frames", "MP4", "CI/CD", "walkthroughs"],
      },
    ],
  },
  studio: {
    audioFile: "audio/voice/studio_full.mp3",
    stepStarts: [0, 282, 693, 1074],
    steps: [
      {
        title: "1. React Vite Dashboard: [src/studio/main.tsx]",
        caption: "The studio plane provides an interactive developer cockpit built with React and Vite, featuring zero-lag responsive layout and hot module reloading.",
        highlights: ["studio", "developer", "cockpit", "React", "Vite", "layout", "reloading"],
      },
      {
        title: "2. Isolated 60fps Scrubber: [src/studio/components/VideoControlsBar.tsx]",
        caption: "In VideoControlsBar dot t s x, player state is strictly isolated from parent components, using a sixty frames per second animation frame loop to guarantee butter-smooth scrubbing without re-render storms.",
        highlights: ["VideoControlsBar.tsx", "isolated", "sixty", "frames", "loop", "scrubbing", "re-render"],
      },
      {
        title: "3. Multi-View Architecture Tabs: [src/studio/App.tsx]",
        caption: "Next, App dot t s x lets engineers switch instantly between the cinematic video walkthrough, the interactive SVG blueprint, the production technical design document, and raw Mermaid diagrams.",
        highlights: ["App.tsx", "cinematic", "video", "interactive", "SVG", "blueprint", "technical", "design", "Mermaid"],
      },
      {
        title: "4. Subsystem Inspector & Export: [src/studio/App.tsx]",
        caption: "Finally, engineers can filter subsystems, inspect inbound callers and outbound dependencies, customize visual themes, and export high-definition video walkthroughs with one click.",
        highlights: ["filter", "subsystems", "inbound", "outbound", "dependencies", "themes", "export"],
      },
    ],
  },
  default: {
    audioFile: "audio/voice/module_full.mp3",
    stepStarts: [0, 304, 609, 904],
    steps: [
      {
        title: "1. Workspace Manifest: [package.json & tsconfig.json]",
        caption: "This module organizes the foundation of your project workspace, declaring environment configuration, root dependency manifests, and build automation pipelines.",
        highlights: ["foundation", "workspace", "configuration", "dependency", "manifests", "pipelines"],
      },
      {
        title: "2. Type Safety & Compiler: [tsconfig.json & vite.config.ts]",
        caption: "Inside, TypeScript compilation targets and bundler configurations ensure strict type safety across both frontend and backend compilation boundaries.",
        highlights: ["TypeScript", "compilation", "bundler", "strict", "safety", "boundaries"],
      },
      {
        title: "3. Automation Scripts: [scripts/ & build automation]",
        caption: "Its core scripts coordinate linting, testing, and continuous deployment, ensuring seamless inter-operation across all decoupled subsystem packages.",
        highlights: ["scripts", "linting", "testing", "deployment", "seamless", "subsystem"],
      },
      {
        title: "4. Boundary Enforcement: [Universal Data Contracts]",
        caption: "By centralizing shared infrastructure here, every tier of your application maintains strict boundaries, zero circular leaks, and high architectural maintainability.",
        highlights: ["centralizing", "infrastructure", "strict", "boundaries", "zero", "leaks", "maintainability"],
      },
    ],
  },
};

export const ModuleReel: React.FC<ModuleReelProps> = ({
  analysis,
  moduleId,
  themePreset = "tokyo-night",
}) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const theme = THEMES[themePreset] || THEMES["tokyo-night"];

  const moduleInfo = React.useMemo(() => {
    return (
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
        color: "#c4ff78",
        churnScore: 0.5,
      }
    );
  }, [analysis, moduleId]);

  const progress = frame / durationInFrames;

  // Select subsystem story
  const storyKey = React.useMemo(() => {
    const id = (moduleId || "").toLowerCase();
    if (id.includes("server")) return "server";
    if (id.includes("core")) return "core";
    if (id.includes("remotion")) return "remotion";
    if (id.includes("cli")) return "cli";
    if (id.includes("studio")) return "studio";
    return "default";
  }, [moduleId]);

  const story = SUBSYSTEM_STORIES[storyKey] || SUBSYSTEM_STORIES.default;

  // Determine active phase based on exact frame boundaries
  let activePhase = 0;
  if (frame >= story.stepStarts[3]) {
    activePhase = 3;
  } else if (frame >= story.stepStarts[2]) {
    activePhase = 2;
  } else if (frame >= story.stepStarts[1]) {
    activePhase = 1;
  }

  const currentStep = story.steps[activePhase];

  const phaseColors = ["#38bdf8", "#00f3ff", "#ff967d", "#c4ff78"];
  const accentColor = phaseColors[activePhase] || "#00f3ff";

  return (
    <AbsoluteFill style={{ backgroundColor: "#0b1628" }}>
      {/* Semicolon Kokoro af_heart Voice Narration - Single continuous audio track, zero stutter */}
      <Audio src={staticFile(story.audioFile)} volume={1.0} />

      {/* Background radial beacon */}
      <div
        className="absolute w-[800px] h-[600px] rounded-full blur-[160px] pointer-events-none opacity-20"
        style={{
          backgroundColor: accentColor,
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />

      {/* Structured 4-Stage Horizontal Pipeline View */}
      <ModuleBoundaryView
        module={moduleInfo}
        allFiles={analysis.files}
        theme={{ ...theme, accent: accentColor }}
        activePhase={activePhase}
      />

      {/* Semicolon Kinetic Captions Bar */}
      <KineticCaptionBar
        stepNumber={activePhase + 1}
        title={currentStep.title}
        captionText={currentStep.caption}
        highlightWords={currentStep.highlights}
        accentColor={accentColor}
      />

      {/* Top glowing progress bar (Clean edge without colliding header badges) */}
      <div className="absolute top-0 left-0 right-0 h-2 bg-white/10 overflow-hidden z-50 pointer-events-none">
        <div
          className="h-full transition-all duration-75"
          style={{
            width: `${Math.min(100, Math.max(0, progress * 100))}%`,
            backgroundColor: accentColor,
            boxShadow: `0 0 20px ${accentColor}`,
          }}
        />
      </div>
    </AbsoluteFill>
  );
};
