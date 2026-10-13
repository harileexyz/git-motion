import React from "react";
import { ComputedLayout } from "../../core/layout";
import { ThemeColors } from "../../core/types";

interface GraphCanvasProps {
  layout: ComputedLayout;
  theme: ThemeColors;
  width: number;
  height: number;
  cameraScale: number;
  cameraX: number;
  cameraY: number;
  nodeEnterProgress: number; // 0 to 1 (blooming animation)
  isHeatmapMode: boolean;
  highlightedModuleId?: string;
  activePulseProgress: number; // 0 to 1 for photon pulses
}

export const GraphCanvas: React.FC<GraphCanvasProps> = ({
  layout,
  theme,
  width,
  height,
  cameraScale,
  cameraX,
  cameraY,
  nodeEnterProgress,
  isHeatmapMode,
  highlightedModuleId,
  activePulseProgress,
}) => {
  const { nodes, links, moduleCenters } = layout;

  return (
    <svg
      width={width}
      height={height}
      className="absolute inset-0 overflow-visible"
      style={{
        transform: `translate(${cameraX}px, ${cameraY}px) scale(${cameraScale})`,
        transformOrigin: "center center",
      }}
    >
      <defs>
        {/* Glow filters */}
        <filter id="neon-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="6" result="blur1" />
          <feGaussianBlur stdDeviation="14" result="blur2" />
          <feMerge>
            <feMergeNode in="blur2" />
            <feMergeNode in="blur1" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="soft-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Module Cluster Background Halos */}
      {Array.from(moduleCenters.entries()).map(([modId, center]) => {
        const isHighlight = !highlightedModuleId || highlightedModuleId === modId;
        const opacity = isHighlight ? 0.15 : 0.03;

        return (
          <g key={`cluster-${modId}`}>
            <circle
              cx={center.x}
              cy={center.y}
              r={Math.max(60, center.count * 16)}
              fill={center.color}
              opacity={opacity}
              filter="url(#neon-glow)"
            />
            {isHighlight && (
              <text
                x={center.x}
                y={center.y - Math.max(70, center.count * 16) - 10}
                textAnchor="middle"
                fill={center.color}
                fontSize="18"
                fontWeight="700"
                fontFamily="JetBrains Mono, monospace"
                opacity={0.8}
                letterSpacing="1.5px"
              >
                [{center.name.toUpperCase()}]
              </text>
            )}
          </g>
        );
      })}

      {/* Dependency Links */}
      {links.map((link, idx) => {
        const isInternal =
          !highlightedModuleId ||
          link.sourceNode.module === highlightedModuleId ||
          link.targetNode.module === highlightedModuleId;

        const strokeColor = isInternal ? theme.edgeActive : theme.edge;
        const strokeOpacity = isInternal ? 0.6 : 0.15;

        // Midpoint curve calculation
        const dx = link.targetNode.x - link.sourceNode.x;
        const dy = link.targetNode.y - link.sourceNode.y;
        const cx = (link.sourceNode.x + link.targetNode.x) / 2 - dy * 0.15;
        const cy = (link.sourceNode.y + link.targetNode.y) / 2 + dx * 0.15;

        // Pulse position along link
        const pulseT = (activePulseProgress + idx * 0.1) % 1;
        // Quadratic bezier point
        const px = (1 - pulseT) * (1 - pulseT) * link.sourceNode.x + 2 * (1 - pulseT) * pulseT * cx + pulseT * pulseT * link.targetNode.x;
        const py = (1 - pulseT) * (1 - pulseT) * link.sourceNode.y + 2 * (1 - pulseT) * pulseT * cy + pulseT * pulseT * link.targetNode.y;

        return (
          <g key={`link-${idx}`}>
            <path
              d={`M ${link.sourceNode.x} ${link.sourceNode.y} Q ${cx} ${cy} ${link.targetNode.x} ${link.targetNode.y}`}
              fill="none"
              stroke={strokeColor}
              strokeWidth={isInternal ? 1.8 : 0.8}
              strokeOpacity={strokeOpacity * nodeEnterProgress}
            />
            {/* Photon pulse traveling along edge */}
            {isInternal && nodeEnterProgress > 0.5 && (
              <circle
                cx={px}
                cy={py}
                r="3"
                fill={theme.accent}
                filter="url(#soft-glow)"
                opacity={0.9}
              />
            )}
          </g>
        );
      })}

      {/* File Nodes */}
      {nodes.map((node, i) => {
        // Staggered node reveal
        const staggerDelay = (i / nodes.length) * 0.6;
        const enterScale = Math.max(0, Math.min(1, (nodeEnterProgress - staggerDelay) / 0.4));
        if (enterScale <= 0) return null;

        const isDimmed = highlightedModuleId && node.module !== highlightedModuleId;

        // Color based on heatmap or language
        let nodeFill = node.color;
        if (isHeatmapMode) {
          if (node.churnScore > 0.6) nodeFill = theme.heatmapHot;
          else if (node.churnScore > 0.3) nodeFill = theme.heatmapWarm;
          else nodeFill = theme.heatmapCold;
        }

        const radius = Math.min(18, Math.max(7, Math.sqrt(node.loc) * 0.7));

        return (
          <g
            key={node.id}
            transform={`translate(${node.x}, ${node.y}) scale(${enterScale})`}
            opacity={isDimmed ? 0.2 : 1}
          >
            {/* Pulsing outer aura for high churn files */}
            {node.churnScore > 0.5 && !isDimmed && (
              <circle
                r={radius + 8}
                fill="none"
                stroke={nodeFill}
                strokeWidth="1.5"
                opacity="0.4"
                strokeDasharray="3 3"
              />
            )}

            {/* Core Node Circle */}
            <circle
              r={radius}
              fill={nodeFill}
              filter={!isDimmed ? "url(#soft-glow)" : undefined}
              className="transition-all"
            />

            {/* File Label */}
            {!isDimmed && (
              <text
                x={radius + 8}
                y={4}
                fill="#ffffff"
                fontSize="11"
                fontFamily="JetBrains Mono, monospace"
                fontWeight="500"
                opacity="0.9"
              >
                {node.name}
              </text>
            )}
          </g>
        );
      })}
    </svg>
  );
};
