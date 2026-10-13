import { ModuleCluster, FileNode, DependencyLink } from "./types";

export type ArchitectureTierType = "interface" | "logic" | "data_engine" | "utility";

export interface ArchitectureTier {
  id: ArchitectureTierType;
  title: string;
  subtitle: string;
  icon: string;
  modules: ModuleCluster[];
}

export interface DataflowStep {
  stepNumber: number;
  title: string;
  description: string;
  sourceModule: string;
  targetModule: string;
  sourceFile: string;
  targetFile: string;
}

export interface StructuredArchitecture {
  tiers: ArchitectureTier[];
  flowSteps: DataflowStep[];
}

export function buildStructuredArchitecture(
  modules: ModuleCluster[],
  files: FileNode[],
  links: DependencyLink[]
): StructuredArchitecture {
  const tierBuckets: Record<ArchitectureTierType, ModuleCluster[]> = {
    interface: [],
    logic: [],
    data_engine: [],
    utility: [],
  };

  // Classify modules into tiers
  for (const mod of modules) {
    const id = mod.id.toLowerCase();
    if (
      id.includes("cli") ||
      id.includes("cmd") ||
      id.includes("studio") ||
      id.includes("ui") ||
      id.includes("web") ||
      id.includes("client") ||
      id.includes("app") ||
      id.includes("root")
    ) {
      tierBuckets.interface.push(mod);
    } else if (
      id.includes("server") ||
      id.includes("api") ||
      id.includes("route") ||
      id.includes("service") ||
      id.includes("controller") ||
      id.includes("handler")
    ) {
      tierBuckets.logic.push(mod);
    } else if (
      id.includes("remotion") ||
      id.includes("render") ||
      id.includes("db") ||
      id.includes("database") ||
      id.includes("storage") ||
      id.includes("cache") ||
      id.includes("export")
    ) {
      tierBuckets.data_engine.push(mod);
    } else {
      tierBuckets.utility.push(mod);
    }
  }

  // Ensure every tier has at least representation or fallback
  const tiers: ArchitectureTier[] = [
    {
      id: "interface",
      title: "1. Entrypoints & Interfaces",
      subtitle: "CLI triggers, user inputs & web studio",
      icon: "🖥️",
      modules: tierBuckets.interface.length > 0 ? tierBuckets.interface : [modules[0]],
    },
    {
      id: "logic",
      title: "2. Processing & Analysis",
      subtitle: "AST scanning, git history & orchestration",
      icon: "⚙️",
      modules:
        tierBuckets.logic.length > 0
          ? tierBuckets.logic
          : [modules[1] || modules[0]],
    },
    {
      id: "utility",
      title: "3. Core Architecture & Physics",
      subtitle: "Universal types, graph topology & layout models",
      icon: "🧠",
      modules:
        tierBuckets.utility.length > 0
          ? tierBuckets.utility
          : [modules[2] || modules[0]],
    },
    {
      id: "data_engine",
      title: "4. Video Canvas & Rendering",
      subtitle: "Remotion 60fps compositions & MP4 export",
      icon: "🎬",
      modules:
        tierBuckets.data_engine.length > 0
          ? tierBuckets.data_engine
          : [modules[3] || modules[0]],
    },
  ];

  // Derive concrete lifecycle flow steps
  const flowSteps: DataflowStep[] = [
    {
      stepNumber: 1,
      title: "Request Initiation",
      description: "User launches CLI or opens Web Studio interface",
      sourceModule: tiers[0].modules[0]?.name || "Interface",
      targetModule: tiers[1].modules[0]?.name || "Server",
      sourceFile: files.find((f) => f.path.includes("cli") || f.path.includes("bin"))?.name || "bin.ts",
      targetFile: files.find((f) => f.path.includes("server") || f.path.includes("index"))?.name || "server.ts",
    },
    {
      stepNumber: 2,
      title: "Repository Analysis",
      description: "AST scanner parses imports; git parser computes commit velocity & churn",
      sourceModule: tiers[1].modules[0]?.name || "Server",
      targetModule: tiers[2].modules[0]?.name || "Core",
      sourceFile: files.find((f) => f.path.includes("analyzer"))?.name || "analyzer.ts",
      targetFile: files.find((f) => f.path.includes("types"))?.name || "types.ts",
    },
    {
      stepNumber: 3,
      title: "Topological Layout Computation",
      description: "Physics simulation places modules into readable architectural constellations",
      sourceModule: tiers[2].modules[0]?.name || "Core",
      targetModule: tiers[3].modules[0]?.name || "Remotion",
      sourceFile: files.find((f) => f.path.includes("layout"))?.name || "layout.ts",
      targetFile: files.find((f) => f.path.includes("Root"))?.name || "Root.tsx",
    },
    {
      stepNumber: 4,
      title: "Remotion Video Synthesis",
      description: "Composes 60fps spring animations and compiles final MP4 artifact",
      sourceModule: tiers[3].modules[0]?.name || "Remotion",
      targetModule: tiers[0].modules[0]?.name || "Interface",
      sourceFile: files.find((f) => f.path.includes("Reel"))?.name || "RepoReel.tsx",
      targetFile: "output.mp4",
    },
  ];

  return { tiers, flowSteps };
}
