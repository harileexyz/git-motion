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
    stepStarts: [0, 287, 516, 733],
    steps: [
      {
        title: "1. Express HTTP Server: [src/server/index.ts]",
        caption: "Inside the server, index dot t s starts an Express web server on port 4321 to handle all requests and render jobs.",
        highlights: ["server", "index.ts", "Express", "4321", "requests", "render"],
      },
      {
        title: "2. AST File Scanner: [src/server/analyzer.ts]",
        caption: "Next, analyzer dot t s scans your project files, reading imports and exports to map out how each file connects.",
        highlights: ["analyzer.ts", "scans", "imports", "exports", "connects"],
      },
      {
        title: "3. Git Churn & Hotspots: [src/server/git.ts]",
        caption: "Then, git dot t s runs git commands in the background to count commits and highlight the most frequently edited files.",
        highlights: ["git.ts", "git", "commits", "frequently", "edited"],
      },
      {
        title: "4. Graph Cache & API Delivery: [src/server/index.ts]",
        caption: "Finally, it stores this complete project map in memory and serves it instantly to your web browser.",
        highlights: ["project", "map", "memory", "serves", "browser"],
      },
    ],
  },
  core: {
    audioFile: "audio/voice/core_full.mp3",
    stepStarts: [0, 234, 481, 679],
    steps: [
      {
        title: "1. Universal Type Models: [src/core/types.ts]",
        caption: "The core folder holds the main blueprints. In types dot t s, it defines what files, modules, and connections look like.",
        highlights: ["core", "blueprints", "types.ts", "files", "modules", "connections"],
      },
      {
        title: "2. 4-Tier Architecture Classifier: [src/core/architecture.ts]",
        caption: "Next, architecture dot t s sorts your code into four simple tiers, separating your entry points from deep processing logic.",
        highlights: ["architecture.ts", "sorts", "four", "tiers", "entry", "processing"],
      },
      {
        title: "3. Coupling Calculator: [src/core/architecture.ts]",
        caption: "Then, it calculates coupling scores to show which modules rely heavily on each other and which stand on their own.",
        highlights: ["calculates", "coupling", "scores", "modules", "rely"],
      },
      {
        title: "4. Flowcharts & Blueprints: [src/core/mermaid.ts]",
        caption: "Finally, mermaid dot t s builds visual flowcharts and interactive diagrams so anyone can understand your app at a glance.",
        highlights: ["mermaid.ts", "flowcharts", "interactive", "diagrams", "glance"],
      },
    ],
  },
  remotion: {
    audioFile: "audio/voice/remotion_full.mp3",
    stepStarts: [0, 281, 512, 703],
    steps: [
      {
        title: "1. 60fps Composition Registry: [src/remotion/Root.tsx]",
        caption: "The remotion folder handles video creation. In Root dot t s, it sets up widescreen and vertical video layouts at sixty frames per second.",
        highlights: ["remotion", "video", "Root.tsx", "widescreen", "vertical", "sixty", "frames"],
      },
      {
        title: "2. Animated Light Beams: [src/remotion/AnimatedArchitectureDiagram.tsx]",
        caption: "Next, the animated diagram draws glowing light pulses that travel across your code connections to show live data flow.",
        highlights: ["animated", "diagram", "glowing", "pulses", "connections", "data", "flow"],
      },
      {
        title: "3. Motion Camera & HUD Sync: [src/remotion/HUDOverlay.tsx]",
        caption: "Then, the camera pans smoothly across each section while a clean progress bar tracks the timeline at the top.",
        highlights: ["camera", "pans", "progress", "bar", "timeline", "top"],
      },
      {
        title: "4. Kinetic Captions & Audio: [src/remotion/KineticCaptionBar.tsx]",
        caption: "Finally, the captions bar plays natural voice narration and highlights each word in real time as it speaks.",
        highlights: ["captions", "voice", "narration", "highlights", "word", "real", "time"],
      },
    ],
  },
  cli: {
    audioFile: "audio/voice/cli_full.mp3",
    stepStarts: [0, 249, 417, 592],
    steps: [
      {
        title: "1. Command Line Entrypoint: [src/cli/bin.ts]",
        caption: "The c l i is your command line entry point. In bin dot t s, it understands commands like analyze, preview, and render.",
        highlights: ["c l i", "command", "line", "bin.ts", "commands", "analyze", "preview", "render"],
      },
      {
        title: "2. Git Workspace Detection: [src/cli/bin.ts]",
        caption: "Next, it checks that you are inside a git repository and prepares the project for scanning.",
        highlights: ["checks", "git", "repository", "prepares", "scanning"],
      },
      {
        title: "3. Local Studio Spawner: [src/cli/bin.ts]",
        caption: "Then, it launches the background server and automatically opens the studio dashboard in your browser.",
        highlights: ["launches", "server", "opens", "studio", "dashboard", "browser"],
      },
      {
        title: "4. Headless MP4 Renderer: [src/cli/bin.ts]",
        caption: "Finally, it can export high quality video walkthroughs directly from your terminal without opening a browser.",
        highlights: ["export", "high", "quality", "video", "terminal", "browser"],
      },
    ],
  },
  studio: {
    audioFile: "audio/voice/studio_full.mp3",
    stepStarts: [0, 199, 417, 620],
    steps: [
      {
        title: "1. React Vite Dashboard: [src/studio/main.tsx]",
        caption: "The studio is the interactive web dashboard. Built with React and Vite, it launches instantly in your browser.",
        highlights: ["studio", "dashboard", "React", "Vite", "browser"],
      },
      {
        title: "2. Video Player Controller: [src/studio/App.tsx]",
        caption: "In App dot t s x, it embeds the video player with easy controls to play, pause, and scrub through the timeline.",
        highlights: ["App.tsx", "embeds", "video", "player", "controls", "play", "pause", "scrub"],
      },
      {
        title: "3. Interactive Blueprint Viewer: [src/studio/components/MermaidViewer.tsx]",
        caption: "It also displays the full interactive architecture blueprint, letting you click on any subsystem to see how it works.",
        highlights: ["interactive", "architecture", "blueprint", "click", "subsystem"],
      },
      {
        title: "4. Walkthrough & Export Dispatcher: [src/studio/App.tsx]",
        caption: "From here, you can switch between the full project view and individual modules, or export a video with one click.",
        highlights: ["switch", "project", "view", "modules", "export", "video"],
      },
    ],
  },
  default: {
    audioFile: "audio/voice/module_full.mp3",
    stepStarts: [0, 192, 381, 538],
    steps: [
      {
        title: "1. Subsystem Foundation: [Configuration & Setup]",
        caption: "This module organizes the foundation of your project, including configuration files and build settings.",
        highlights: ["module", "foundation", "project", "configuration", "build"],
      },
      {
        title: "2. Pipeline & Compiler: [Dependencies & Build]",
        caption: "Inside, it sets up packages, compilation rules, and styling to keep your entire app running smoothly.",
        highlights: ["packages", "compilation", "rules", "styling", "running", "smoothly"],
      },
      {
        title: "3. Core Scripts: [Task Automation]",
        caption: "Its core scripts coordinate testing, building, and running all other subsystems together.",
        highlights: ["scripts", "testing", "building", "running", "subsystems"],
      },
      {
        title: "4. External Connections: [Ecosystem Integration]",
        caption: "By keeping these shared rules in one place, every part of your project stays reliable and easy to maintain.",
        highlights: ["shared", "rules", "reliable", "easy", "maintain"],
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

      {/* Futuristic HUD with top-edge progress bar (NO bottom overlap) */}
      <HUDOverlay
        theme={{ ...theme, accent: accentColor }}
        repoName={analysis.name}
        branch={analysis.branch}
        totalCommits={analysis.totalCommits}
        totalFiles={analysis.totalFiles}
        currentSceneTitle={currentStep.title}
        currentSceneSubtitle={`${moduleInfo.name} • ${moduleInfo.fileCount} files • ${moduleInfo.loc} LOC`}
        progress={progress}
      />
    </AbsoluteFill>
  );
};
