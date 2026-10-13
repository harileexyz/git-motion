import React from "react";
import { StructuredArchitecture } from "../../core/architecture";
import { ThemeColors } from "../../core/types";

interface MermaidFlowCanvasProps {
  architecture: StructuredArchitecture;
  theme: ThemeColors;
  activeStepIndex: number;
  progress: number;
}

export const MermaidFlowCanvas: React.FC<MermaidFlowCanvasProps> = ({
  architecture,
  theme,
  activeStepIndex,
  progress,
}) => {
  const { tiers, flowSteps } = architecture;

  // 4 Horizontal Tiers positioned across screen
  // Canvas size: 1920 x 1080
  const nodeCoords = [
    { x: 180, y: 320, width: 320, height: 260 }, // Tier 1: Client/CLI
    { x: 580, y: 320, width: 320, height: 260 }, // Tier 2: Server/API
    { x: 980, y: 320, width: 320, height: 260 }, // Tier 3: Core Logic
    { x: 1380, y: 320, width: 320, height: 260 }, // Tier 4: Renderer
  ];

  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 1920 1080">
      <defs>
        {/* Glow Filter */}
        <filter id="flow-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="8" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Arrowhead Markers */}
        <marker
          id="mermaid-arrow-active"
          viewBox="0 0 10 10"
          refX="8"
          refY="5"
          markerWidth="7"
          markerHeight="7"
          orient="auto-start-reverse"
        >
          <path d="M 0 1 L 10 5 L 0 9 z" fill={theme.accent} />
        </marker>
        <marker
          id="mermaid-arrow-idle"
          viewBox="0 0 10 10"
          refX="8"
          refY="5"
          markerWidth="6"
          markerHeight="6"
          orient="auto-start-reverse"
        >
          <path d="M 0 1 L 10 5 L 0 9 z" fill="rgba(255, 255, 255, 0.25)" />
        </marker>
      </defs>

      {/* Grid Pattern */}
      <pattern id="arch-grid" width="60" height="60" patternUnits="userSpaceOnUse">
        <path d="M 60 0 L 0 0 0 60" fill="none" stroke="rgba(255, 255, 255, 0.03)" strokeWidth="1" />
      </pattern>
      <rect width="1920" height="1080" fill="url(#arch-grid)" />

      {/* Mermaid Flowchart Connecting Arrows */}
      {flowSteps.map((step, idx) => {
        const fromCoord = nodeCoords[idx] || nodeCoords[0];
        const toCoord = nodeCoords[idx + 1] || nodeCoords[0];

        const startX = fromCoord.x + fromCoord.width;
        const startY = fromCoord.y + fromCoord.height / 2;
        const endX = toCoord.x;
        const endY = toCoord.y + toCoord.height / 2;

        const isCurrentStep = idx === activeStepIndex;
        const strokeColor = isCurrentStep ? theme.accent : "rgba(255, 255, 255, 0.2)";
        const marker = isCurrentStep ? "url(#mermaid-arrow-active)" : "url(#mermaid-arrow-idle)";

        // Animated pulse packet along arrow
        const pulseRatio = (progress * 8 + idx * 0.25) % 1;
        const packetX = startX + (endX - startX) * pulseRatio;
        const packetY = startY;

        return (
          <g key={`arrow-${idx}`}>
            {/* The Directed Pipeline Arrow */}
            <line
              x1={startX}
              y1={startY}
              x2={endX - 8}
              y2={endY}
              stroke={strokeColor}
              strokeWidth={isCurrentStep ? 3.5 : 2}
              markerEnd={marker}
              strokeDasharray={isCurrentStep ? "none" : "6 4"}
              className="transition-all"
            />

            {/* Pipeline Label Badge (e.g. |HTTP /api/analysis|) */}
            <g transform={`translate(${(startX + endX) / 2}, ${startY - 16})`}>
              <rect
                x="-45"
                y="-12"
                width="90"
                height="22"
                rx="6"
                fill={isCurrentStep ? theme.canvasCard : "#090d16"}
                stroke={isCurrentStep ? theme.accent : "rgba(255, 255, 255, 0.15)"}
                strokeWidth="1"
              />
              <text
                x="0"
                y="3"
                textAnchor="middle"
                fill={isCurrentStep ? theme.accent : "rgba(255, 255, 255, 0.6)"}
                fontSize="10"
                fontFamily="JetBrains Mono, monospace"
                fontWeight="700"
              >
                |step 0{idx + 1}|
              </text>
            </g>

            {/* Glowing Moving Data Packet */}
            {isCurrentStep && (
              <circle
                cx={packetX}
                cy={packetY}
                r="6"
                fill={theme.accent}
                filter="url(#flow-glow)"
              />
            )}
          </g>
        );
      })}

      {/* Mermaid Flowchart Node Boxes */}
      {tiers.map((tier, idx) => {
        const coord = nodeCoords[idx];
        const isCurrent = idx === activeStepIndex;

        return (
          <g key={tier.id} transform={`translate(${coord.x}, ${coord.y})`}>
            {/* Box Outer Shadow & Container */}
            <rect
              width={coord.width}
              height={coord.height}
              rx="16"
              fill={isCurrent ? "#0f1626" : "#090d16"}
              stroke={isCurrent ? theme.accent : "rgba(255, 255, 255, 0.12)"}
              strokeWidth={isCurrent ? 3 : 1.5}
              filter={isCurrent ? "url(#flow-glow)" : undefined}
            />

            {/* Header Box */}
            <rect
              width={coord.width}
              height="54"
              rx="16"
              fill={isCurrent ? "rgba(0, 243, 255, 0.08)" : "rgba(255, 255, 255, 0.03)"}
            />

            {/* Icon + Tier Title */}
            <text
              x="18"
              y="35"
              fill="#ffffff"
              fontSize="14"
              fontFamily="JetBrains Mono, monospace"
              fontWeight="800"
            >
              {tier.icon} {tier.title}
            </text>

            {/* Subtitle */}
            <text
              x="18"
              y="78"
              fill="rgba(255, 255, 255, 0.5)"
              fontSize="10"
              fontFamily="JetBrains Mono, monospace"
            >
              {tier.subtitle}
            </text>

            {/* Modules list inside box */}
            {tier.modules.slice(0, 3).map((mod, mIdx) => (
              <g key={mod.id} transform={`translate(16, ${95 + mIdx * 45})`}>
                <rect
                  width={coord.width - 32}
                  height="36"
                  rx="8"
                  fill="rgba(255, 255, 255, 0.04)"
                  stroke="rgba(255, 255, 255, 0.08)"
                  strokeWidth="1"
                />
                <circle cx="16" cy="18" r="4" fill={mod.color} />
                <text
                  x="28"
                  y="22"
                  fill="#ffffff"
                  fontSize="12"
                  fontFamily="JetBrains Mono, monospace"
                  fontWeight="600"
                >
                  {mod.name}
                </text>
                <text
                  x={coord.width - 48}
                  y="22"
                  textAnchor="end"
                  fill="rgba(255, 255, 255, 0.4)"
                  fontSize="10"
                  fontFamily="JetBrains Mono, monospace"
                >
                  {mod.fileCount} files
                </text>
              </g>
            ))}
          </g>
        );
      })}
    </svg>
  );
};
