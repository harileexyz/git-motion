import { forceSimulation, forceLink, forceManyBody, forceCenter, forceCollide, SimulationNodeDatum, SimulationLinkDatum } from "d3-force";
import { FileNode, DependencyLink, ModuleCluster } from "./types";

export interface LayoutOptions {
  width: number;
  height: number;
  moduleId?: string; // If focusing on a specific module
}

export interface ComputedLayout {
  nodes: (FileNode & { x: number; y: number })[];
  links: (DependencyLink & { sourceNode: FileNode & { x: number; y: number }; targetNode: FileNode & { x: number; y: number } })[];
  moduleCenters: Map<string, { x: number; y: number; name: string; color: string; count: number }>;
}

interface SimNode extends SimulationNodeDatum {
  id: string;
  raw: FileNode;
}

interface SimLink extends SimulationLinkDatum<SimNode> {
  raw: DependencyLink;
}

export function computeGraphLayout(
  files: FileNode[],
  links: DependencyLink[],
  modules: ModuleCluster[],
  options: LayoutOptions
): ComputedLayout {
  const { width, height, moduleId } = options;

  // Filter if focusing on a module
  let targetFiles = files;
  if (moduleId) {
    const selectedMod = modules.find((m) => m.id === moduleId);
    if (selectedMod) {
      // Include internal files + immediate boundary callers/dependencies
      const internalIds = new Set(selectedMod.files);
      const boundaryIds = new Set<string>();

      for (const l of links) {
        if (internalIds.has(l.source)) boundaryIds.add(l.target);
        if (internalIds.has(l.target)) boundaryIds.add(l.source);
      }

      targetFiles = files.filter((f) => internalIds.has(f.id) || boundaryIds.has(f.id));
    }
  }

  // Cap nodes to prevent massive lag in huge repos (keep most relevant by LOC & commits)
  if (targetFiles.length > 120) {
    targetFiles = [...targetFiles]
      .sort((a, b) => b.commitCount * b.loc - a.commitCount * a.loc)
      .slice(0, 120);
  }

  const validIds = new Set(targetFiles.map((f) => f.id));
  const targetLinks = links.filter((l) => validIds.has(l.source) && validIds.has(l.target));

  // Initialize simulation nodes
  const simNodes: SimNode[] = targetFiles.map((f, i) => {
    // Spread initially around center
    const angle = (i / targetFiles.length) * Math.PI * 2;
    const r = Math.min(width, height) * 0.35 * Math.random();
    return {
      id: f.id,
      raw: f,
      x: width / 2 + Math.cos(angle) * r,
      y: height / 2 + Math.sin(angle) * r,
    };
  });

  const nodeMap = new Map<string, SimNode>();
  for (const n of simNodes) {
    nodeMap.set(n.id, n);
  }

  const simLinks: SimLink[] = targetLinks
    .map((l) => ({
      source: nodeMap.get(l.source)!,
      target: nodeMap.get(l.target)!,
      raw: l,
    }))
    .filter((l) => l.source && l.target);

  // Deterministic simulation
  const simulation = forceSimulation<SimNode>(simNodes)
    .force(
      "link",
      forceLink<SimNode, SimLink>(simLinks)
        .id((d) => d.id)
        .distance(70)
        .strength(0.3)
    )
    .force("charge", forceManyBody().strength(-160))
    .force("center", forceCenter(width / 2, height / 2))
    .force("collision", forceCollide().radius(28))
    .stop();

  // Run 120 ticks synchronously
  for (let i = 0; i < 120; ++i) {
    simulation.tick();
  }

  const computedNodes = simNodes.map((sn) => ({
    ...sn.raw,
    x: Math.round(sn.x || width / 2),
    y: Math.round(sn.y || height / 2),
  }));

  const computedNodeMap = new Map(computedNodes.map((n) => [n.id, n]));

  const computedLinks = simLinks.map((sl) => ({
    ...sl.raw,
    sourceNode: computedNodeMap.get((sl.source as SimNode).id)!,
    targetNode: computedNodeMap.get((sl.target as SimNode).id)!,
  })).filter((l) => l.sourceNode && l.targetNode);

  // Calculate cluster centers
  const moduleCenters = new Map<string, { x: number; y: number; name: string; color: string; count: number }>();

  for (const mod of modules) {
    const modNodes = computedNodes.filter((n) => n.module === mod.id);
    if (modNodes.length === 0) continue;

    const avgX = modNodes.reduce((acc, n) => acc + n.x, 0) / modNodes.length;
    const avgY = modNodes.reduce((acc, n) => acc + n.y, 0) / modNodes.length;

    moduleCenters.set(mod.id, {
      x: Math.round(avgX),
      y: Math.round(avgY),
      name: mod.name,
      color: mod.color,
      count: modNodes.length,
    });
  }

  return {
    nodes: computedNodes,
    links: computedLinks,
    moduleCenters,
  };
}
