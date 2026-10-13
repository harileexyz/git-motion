import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { RepoAnalysis, ThemeColors } from "../../core/types";

interface AnimatedArchitectureDiagramProps {
  analysis: RepoAnalysis;
  theme: ThemeColors;
  activeStep: number; // 0, 1, 2, 3
}

export const AnimatedArchitectureDiagram: React.FC<AnimatedArchitectureDiagramProps> = ({
  analysis,
  theme,
  activeStep,
}) => {
  const frame = useCurrentFrame();

  // Pulse animation for signals travelling along arrows (looping every 45 frames)
  const pulseLoop = (frame % 45) / 45;

  return (
    <div className="absolute inset-0 px-12 pt-20 pb-28 flex flex-col justify-between font-['Roboto',sans-serif] pointer-events-none select-none">
      <svg
        viewBox="0 0 1780 820"
        className="w-full h-full filter drop-shadow-2xl"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Arrow markers */}
          <marker
            id="arr-blue"
            viewBox="0 0 10 10"
            refX="8"
            refY="5"
            markerWidth="8"
            markerHeight="8"
            orient="auto"
          >
            <path d="M0,1 L9,5 L0,9 z" fill="#38bdf8" />
          </marker>
          <marker
            id="arr-cyan"
            viewBox="0 0 10 10"
            refX="8"
            refY="5"
            markerWidth="8"
            markerHeight="8"
            orient="auto"
          >
            <path d="M0,1 L9,5 L0,9 z" fill="#00f3ff" />
          </marker>
          <marker
            id="arr-coral"
            viewBox="0 0 10 10"
            refX="8"
            refY="5"
            markerWidth="8"
            markerHeight="8"
            orient="auto"
          >
            <path d="M0,1 L9,5 L0,9 z" fill="#ff967d" />
          </marker>
          <marker
            id="arr-mint"
            viewBox="0 0 10 10"
            refX="8"
            refY="5"
            markerWidth="8"
            markerHeight="8"
            orient="auto"
          >
            <path d="M0,1 L9,5 L0,9 z" fill="#c4ff78" />
          </marker>
          <marker
            id="arr-purple"
            viewBox="0 0 10 10"
            refX="8"
            refY="5"
            markerWidth="8"
            markerHeight="8"
            orient="auto"
          >
            <path d="M0,1 L9,5 L0,9 z" fill="#bd93f9" />
          </marker>

          {/* Glow filters */}
          <filter id="glow-active" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* ----------------- 1. YOU / LOCAL ENTRYPOINT (LEFT) ----------------- */}
        <g opacity={activeStep === 0 ? 1 : 0.75} className="transition-all duration-300">
          <rect
            x="30"
            y="50"
            width="220"
            height="130"
            rx="16"
            fill="#0f172a"
            stroke={activeStep === 0 ? "#38bdf8" : "#334155"}
            strokeWidth={activeStep === 0 ? "3" : "1.5"}
            filter={activeStep === 0 ? "url(#glow-active)" : undefined}
          />
          <text x="50" y="86" fill="#38bdf8" fontSize="13" fontWeight="800" letterSpacing="0.08em">
            STARTING POINT
          </text>
          <text x="50" y="116" fill="#ffffff" fontSize="20" fontWeight="900">
            You (Developer)
          </text>
          <text x="50" y="142" fill="#94a3b8" fontSize="13" fontFamily="monospace">
            terminal: npx git-motion
          </text>
          <text x="50" y="162" fill="#64748b" fontSize="12">
            localhost:4321 • 100% Offline
          </text>
        </g>

        {/* ----------------- SYSTEM BOUNDARY CONTAINER (MAIN) ----------------- */}
        <rect
          x="280"
          y="35"
          width="1470"
          height="760"
          rx="22"
          fill="rgba(11, 22, 40, 0.75)"
          stroke="#334155"
          strokeWidth="1.5"
          strokeDasharray="8 6"
        />
        <text x="310" y="68" fill="#64748b" fontSize="13" fontWeight="800" letterSpacing="0.1em">
          GIT-MOTION ENGINE BOUNDARY · 100% LOCAL EXECUTION (ZERO CLOUD)
        </text>

        {/* ----------------- ZONE 1: ENTRYPOINTS (Top Left) ----------------- */}
        <g opacity={activeStep === 0 ? 1 : 0.65} className="transition-all duration-300">
          <rect
            x="310"
            y="85"
            width="420"
            height="200"
            rx="18"
            fill={activeStep === 0 ? "rgba(14, 165, 233, 0.12)" : "rgba(15, 23, 42, 0.85)"}
            stroke={activeStep === 0 ? "#38bdf8" : "#1e293b"}
            strokeWidth={activeStep === 0 ? "2.5" : "1.5"}
          />
          <text x="330" y="118" fill="#38bdf8" fontSize="14" fontWeight="800" letterSpacing="0.05em">
            1. ENTRYPOINTS (What you run)
          </text>
          {/* Subcard A: CLI */}
          <rect x="330" y="132" width="180" height="75" rx="12" fill="#0b1329" stroke="#334155" strokeWidth="1" />
          <text x="345" y="158" fill="#ffffff" fontSize="15" fontWeight="700">
            CLI Runner
          </text>
          <text x="345" y="178" fill="#38bdf8" fontSize="12" fontFamily="monospace">
            src/cli/bin.ts
          </text>
          <text x="345" y="196" fill="#94a3b8" fontSize="11">
            Starts studio or reel
          </text>

          {/* Subcard B: Studio UI */}
          <rect x="530" y="132" width="180" height="75" rx="12" fill="#0b1329" stroke="#334155" strokeWidth="1" />
          <text x="545" y="158" fill="#ffffff" fontSize="15" fontWeight="700">
            Studio Web App
          </text>
          <text x="545" y="178" fill="#38bdf8" fontSize="12" fontFamily="monospace">
            src/studio/App.tsx
          </text>
          <text x="545" y="196" fill="#94a3b8" fontSize="11">
            Live preview player
          </text>

          {/* Note */}
          <text x="330" y="240" fill="#cbd5e1" fontSize="13">
            Local Express server bridges browser controls directly to the video renderer.
          </text>
          <text x="330" y="260" fill="#64748b" fontSize="12">
            No serverless cold starts. Instant feedback.
          </text>
        </g>

        {/* ----------------- ZONE 2: FILE SCANNER & GIT (Top Middle) ----------------- */}
        <g opacity={activeStep === 1 ? 1 : 0.65} className="transition-all duration-300">
          <rect
            x="770"
            y="85"
            width="440"
            height="200"
            rx="18"
            fill={activeStep === 1 ? "rgba(0, 243, 255, 0.12)" : "rgba(15, 23, 42, 0.85)"}
            stroke={activeStep === 1 ? "#00f3ff" : "#1e293b"}
            strokeWidth={activeStep === 1 ? "2.5" : "1.5"}
          />
          <text x="790" y="118" fill="#00f3ff" fontSize="14" fontWeight="800" letterSpacing="0.05em">
            2. FILE SCANNER & GIT CHURN (The Eyes)
          </text>

          {/* Subcard: Analyzer */}
          <rect x="790" y="132" width="190" height="75" rx="12" fill="#0b1329" stroke="#334155" strokeWidth="1" />
          <text x="805" y="158" fill="#ffffff" fontSize="15" fontWeight="700">
            Codebase Scanner
          </text>
          <text x="805" y="178" fill="#00f3ff" fontSize="12" fontFamily="monospace">
            src/server/analyzer.ts
          </text>
          <text x="805" y="196" fill="#94a3b8" fontSize="11">
            Extracts AST imports
          </text>

          {/* Subcard: Git History */}
          <rect x="1000" y="132" width="190" height="75" rx="12" fill="#0b1329" stroke="#334155" strokeWidth="1" />
          <text x="1015" y="158" fill="#ffffff" fontSize="15" fontWeight="700">
            Git Churn Parser
          </text>
          <text x="1015" y="178" fill="#00f3ff" fontSize="12" fontFamily="monospace">
            src/server/git.ts
          </text>
          <text x="1015" y="196" fill="#94a3b8" fontSize="11">
            Scores commit hotspots
          </text>

          {/* Stats Bar */}
          <rect x="790" y="222" width="400" height="45" rx="10" fill="#09101d" stroke="#1e293b" />
          <text x="805" y="250" fill="#e2e8f0" fontSize="13" fontWeight="600">
            {analysis.totalFiles} files scanned • {analysis.totalLOC.toLocaleString()} LOC • {analysis.totalCommits} commits analyzed
          </text>
        </g>

        {/* ----------------- ZONE 3: BLUEPRINT CORE (Top Right) ----------------- */}
        <g opacity={activeStep === 2 ? 1 : 0.65} className="transition-all duration-300">
          <rect
            x="1250"
            y="85"
            width="460"
            height="200"
            rx="18"
            fill={activeStep === 2 ? "rgba(255, 150, 125, 0.12)" : "rgba(15, 23, 42, 0.85)"}
            stroke={activeStep === 2 ? "#ff967d" : "#1e293b"}
            strokeWidth={activeStep === 2 ? "2.5" : "1.5"}
          />
          <text x="1270" y="118" fill="#ff967d" fontSize="14" fontWeight="800" letterSpacing="0.05em">
            3. BLUEPRINT CORE (The Architect)
          </text>

          {/* Subcard: 4-Tier Classifier */}
          <rect x="1270" y="132" width="200" height="75" rx="12" fill="#0b1329" stroke="#334155" strokeWidth="1" />
          <text x="1285" y="158" fill="#ffffff" fontSize="15" fontWeight="700">
            4-Tier Classifier
          </text>
          <text x="1285" y="178" fill="#ff967d" fontSize="12" fontFamily="monospace">
            src/core/architecture.ts
          </text>
          <text x="1285" y="196" fill="#94a3b8" fontSize="11">
            Eliminates messy spaghetti
          </text>

          {/* Subcard: Mermaid & Graph */}
          <rect x="1490" y="132" width="200" height="75" rx="12" fill="#0b1329" stroke="#334155" strokeWidth="1" />
          <text x="1505" y="158" fill="#ffffff" fontSize="15" fontWeight="700">
            Flowchart Engine
          </text>
          <text x="1505" y="178" fill="#ff967d" fontSize="12" fontFamily="monospace">
            src/core/mermaid.ts
          </text>
          <text x="1505" y="196" fill="#94a3b8" fontSize="11">
            Builds Mermaid diagrams
          </text>

          {/* Details */}
          <text x="1270" y="240" fill="#cbd5e1" fontSize="13">
            Groups raw files into 4 logical tiers: Entrypoints, Processing, Core, & Render.
          </text>
          <text x="1270" y="260" fill="#64748b" fontSize="12">
            Calculates inbound callers and outbound dependencies for each module.
          </text>
        </g>

        {/* ----------------- ZONE 4: REMOTION 60FPS VIDEO (Middle Left) ----------------- */}
        <g opacity={activeStep === 3 ? 1 : 0.65} className="transition-all duration-300">
          <rect
            x="310"
            y="340"
            width="550"
            height="210"
            rx="18"
            fill={activeStep === 3 ? "rgba(196, 255, 120, 0.12)" : "rgba(15, 23, 42, 0.85)"}
            stroke={activeStep === 3 ? "#c4ff78" : "#1e293b"}
            strokeWidth={activeStep === 3 ? "2.5" : "1.5"}
          />
          <text x="330" y="372" fill="#c4ff78" fontSize="14" fontWeight="800" letterSpacing="0.05em">
            4. REMOTION VIDEO ENGINE (60fps Canvas)
          </text>

          {/* Subcard: Compositions */}
          <rect x="330" y="388" width="245" height="75" rx="12" fill="#0b1329" stroke="#334155" strokeWidth="1" />
          <text x="345" y="414" fill="#ffffff" fontSize="15" fontWeight="700">
            Reel Compositions
          </text>
          <text x="345" y="434" fill="#c4ff78" fontSize="12" fontFamily="monospace">
            src/remotion/RepoReel.tsx
          </text>
          <text x="345" y="452" fill="#94a3b8" fontSize="11">
            RepoReel & ModuleReel 60fps
          </text>

          {/* Subcard: HUD & Captions */}
          <rect x="595" y="388" width="245" height="75" rx="12" fill="#0b1329" stroke="#334155" strokeWidth="1" />
          <text x="610" y="414" fill="#ffffff" fontSize="15" fontWeight="700">
            Kinetic HUD & Captions
          </text>
          <text x="610" y="434" fill="#c4ff78" fontSize="12" fontFamily="monospace">
            src/remotion/HUDOverlay.tsx
          </text>
          <text x="610" y="452" fill="#94a3b8" fontSize="11">
            Top progress bar & word highlights
          </text>

          <text x="330" y="495" fill="#cbd5e1" fontSize="13">
            Renders smooth 60fps React code into high-fidelity video canvas.
          </text>
          <text x="330" y="515" fill="#64748b" fontSize="12">
            No screen recording artifacts, zero mouse jitter, pixel-perfect layout.
          </text>
        </g>

        {/* ----------------- ZONE 5: NEURAL VOICE & THEMES (Middle Right) ----------------- */}
        <g opacity={activeStep === 3 ? 1 : 0.65} className="transition-all duration-300">
          <rect
            x="900"
            y="340"
            width="810"
            height="210"
            rx="18"
            fill={activeStep === 3 ? "rgba(255, 209, 102, 0.12)" : "rgba(15, 23, 42, 0.85)"}
            stroke={activeStep === 3 ? "#ffd166" : "#1e293b"}
            strokeWidth={activeStep === 3 ? "2.5" : "1.5"}
          />
          <text x="920" y="372" fill="#ffd166" fontSize="14" fontWeight="800" letterSpacing="0.05em">
            5. NEURAL VOICE & THEMES (Human Narration)
          </text>

          {/* Subcard: Kokoro Voice */}
          <rect x="920" y="388" width="370" height="75" rx="12" fill="#0b1329" stroke="#334155" strokeWidth="1" />
          <text x="935" y="414" fill="#ffffff" fontSize="15" fontWeight="700">
            Kokoro TTS Neural Voiceover
          </text>
          <text x="935" y="434" fill="#ffd166" fontSize="12" fontFamily="monospace">
            af_heart model • 1.12x speed • MP3
          </text>
          <text x="935" y="452" fill="#94a3b8" fontSize="11">
            Plain-English explanation without robotic drone
          </text>

          {/* Subcard: Themes */}
          <rect x="1310" y="388" width="380" height="75" rx="12" fill="#0b1329" stroke="#334155" strokeWidth="1" />
          <text x="1325" y="414" fill="#ffffff" fontSize="15" fontWeight="700">
            Styling Presets & Themes
          </text>
          <text x="1325" y="434" fill="#ffd166" fontSize="12" fontFamily="monospace">
            Tokyo Night • Cyberpunk • Catppuccin
          </text>
          <text x="1325" y="452" fill="#94a3b8" fontSize="11">
            High-contrast dark developer palettes
          </text>

          <text x="920" y="495" fill="#cbd5e1" fontSize="13">
            Narration words are timing-matched with KineticCaptionBar word highlights.
          </text>
          <text x="920" y="515" fill="#64748b" fontSize="12">
            Sentences finish naturally before any scene transitions happen.
          </text>
        </g>

        {/* ----------------- ZONE 6: OUTPUT ARTIFACTS (Bottom) ----------------- */}
        <g opacity={activeStep === 3 ? 1 : 0.65} className="transition-all duration-300">
          <rect
            x="310"
            y="590"
            width="1400"
            height="180"
            rx="18"
            fill="rgba(15, 23, 42, 0.85)"
            stroke="#475569"
            strokeWidth="1.5"
          />
          <text x="330" y="622" fill="#94a3b8" fontSize="14" fontWeight="800" letterSpacing="0.05em">
            6. ARTIFACT EXPORTS (Ready for your GitHub README)
          </text>

          {/* Artifact 1: MP4 */}
          <rect x="330" y="640" width="310" height="105" rx="12" fill="#0b1329" stroke="#334155" strokeWidth="1" />
          <text x="345" y="668" fill="#ffffff" fontSize="16" fontWeight="700">
            🎬 1080p Cinematic MP4
          </text>
          <text x="345" y="692" fill="#c4ff78" fontSize="12" fontFamily="monospace">
            ./outputs/{analysis.name}-reel.mp4
          </text>
          <text x="345" y="714" fill="#94a3b8" fontSize="12">
            Ready to attach to GitHub releases & PRs
          </text>

          {/* Artifact 2: SVG/HTML Diagram */}
          <rect x="660" y="640" width="350" height="105" rx="12" fill="#0b1329" stroke="#334155" strokeWidth="1" />
          <text x="675" y="668" fill="#ffffff" fontSize="16" fontWeight="700">
            📊 Interactive Architecture SVG
          </text>
          <text x="675" y="692" fill="#00f3ff" fontSize="12" fontFamily="monospace">
            ./outputs/{analysis.name}-architecture.html
          </text>
          <text x="675" y="714" fill="#94a3b8" fontSize="12">
            Standalone interactive vector map
          </text>

          {/* Artifact 3: README Markdown */}
          <rect x="1030" y="640" width="660" height="105" rx="12" fill="#0b1329" stroke="#334155" strokeWidth="1" />
          <text x="1045" y="668" fill="#ffffff" fontSize="16" fontWeight="700">
            ⚡ One-Line README Embed
          </text>
          <text x="1045" y="694" fill="#ffd166" fontSize="12" fontFamily="monospace">
            {`![Architecture Walkthrough](./docs/${analysis.name}-reel.gif)`}
          </text>
          <text x="1045" y="720" fill="#94a3b8" fontSize="12">
            Paste right at top of your repository README.md for instant wow-factor
          </text>
        </g>

        {/* ----------------- CONNECTING ARROWS & TRAVELLING SIGNAL PULSES ----------------- */}
        {/* Arrow 1: You -> Entrypoints */}
        <g stroke="#38bdf8" strokeWidth="2.5" fill="none" markerEnd="url(#arr-blue)">
          <path d="M 250 115 L 305 115" />
        </g>
        {activeStep === 0 && (
          <circle
            cx={interpolate(pulseLoop, [0, 1], [250, 305])}
            cy="115"
            r="5"
            fill="#38bdf8"
            filter="url(#glow-active)"
          />
        )}

        {/* Arrow 2: Entrypoints -> File Scanner */}
        <g stroke="#00f3ff" strokeWidth="2.5" fill="none" markerEnd="url(#arr-cyan)">
          <path d="M 730 185 L 765 185" />
        </g>
        {activeStep === 1 && (
          <circle
            cx={interpolate(pulseLoop, [0, 1], [730, 765])}
            cy="185"
            r="5"
            fill="#00f3ff"
            filter="url(#glow-active)"
          />
        )}

        {/* Arrow 3: File Scanner -> Blueprint Core */}
        <g stroke="#ff967d" strokeWidth="2.5" fill="none" markerEnd="url(#arr-coral)">
          <path d="M 1210 185 L 1245 185" />
        </g>
        {activeStep === 2 && (
          <circle
            cx={interpolate(pulseLoop, [0, 1], [1210, 1245])}
            cy="185"
            r="5"
            fill="#ff967d"
            filter="url(#glow-active)"
          />
        )}

        {/* Arrow 4: Blueprint Core -> Video Engine & Voiceover */}
        <g stroke="#c4ff78" strokeWidth="2" fill="none" markerEnd="url(#arr-mint)">
          <path d="M 1480 285 C 1480 320 600 300 600 335" />
          <path d="M 1520 285 C 1520 320 1300 300 1300 335" />
        </g>

        {/* Arrow 5: Video Engine -> Outputs */}
        <g stroke="#94a3b8" strokeWidth="2" strokeDasharray="6 4" fill="none" markerEnd="url(#arr-mint)">
          <path d="M 585 550 L 585 585" />
          <path d="M 1305 550 L 1305 585" />
        </g>

        {/* ----------------- NUMBERED STEP BADGES (Exactly like reference) ----------------- */}
        {/* Badge 1 */}
        <circle cx="277" cy="115" r="14" fill="#38bdf8" />
        <text x="272" y="121" fill="#0b1628" fontSize="15" fontWeight="900">
          1
        </text>

        {/* Badge 2 */}
        <circle cx="747" cy="185" r="14" fill="#00f3ff" />
        <text x="742" y="191" fill="#0b1628" fontSize="15" fontWeight="900">
          2
        </text>

        {/* Badge 3 */}
        <circle cx="1227" cy="185" r="14" fill="#ff967d" />
        <text x="1222" y="191" fill="#0b1628" fontSize="15" fontWeight="900">
          3
        </text>

        {/* Badge 4 */}
        <circle cx="600" cy="315" r="14" fill="#c4ff78" />
        <text x="595" y="321" fill="#0b1628" fontSize="15" fontWeight="900">
          4
        </text>

        {/* Badge 5 */}
        <circle cx="1300" cy="315" r="14" fill="#ffd166" />
        <text x="1295" y="321" fill="#0b1628" fontSize="15" fontWeight="900">
          5
        </text>

        {/* Badge 6 */}
        <circle cx="945" cy="568" r="14" fill="#94a3b8" />
        <text x="940" y="574" fill="#0b1628" fontSize="15" fontWeight="900">
          6
        </text>
      </svg>
    </div>
  );
};
