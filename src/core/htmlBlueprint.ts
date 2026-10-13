import { RepoAnalysis } from "./types";

export function generateArchitectureHtml(analysis: RepoAnalysis): string {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>${analysis.name} — System Architecture Blueprint</title>
<style>
body {
  margin: 0;
  background: #090e17;
  color: #f1f5f9;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Inter, sans-serif;
  padding: 24px;
}
.header {
  max-width: 1560px;
  margin: 0 auto 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
h1 {
  font-size: 22px;
  margin: 0 0 6px 0;
  font-weight: 800;
  color: #ffffff;
}
.subtitle {
  font-size: 13px;
  color: #94a3b8;
  margin: 0;
}
.badge {
  font-size: 11px;
  font-mono;
  padding: 4px 10px;
  border-radius: 9999px;
  background: rgba(56, 189, 248, 0.15);
  border: 1px solid rgba(56, 189, 248, 0.35);
  color: #38bdf8;
  font-weight: 700;
}
.canvas-wrap {
  max-width: 1560px;
  margin: 0 auto;
  background: #0b1322;
  border: 1px solid #1e293b;
  border-radius: 20px;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
  overflow: hidden;
  padding: 16px;
}
svg {
  width: 100%;
  height: auto;
  display: block;
}
.legend-bar {
  max-width: 1560px;
  margin: 20px auto 0;
  background: #0b1322;
  border: 1px solid #1e293b;
  border-radius: 16px;
  padding: 18px 24px;
  font-size: 13px;
  line-height: 1.8;
  color: #cbd5e1;
}
.step-num {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  font-size: 12px;
  font-weight: 900;
  color: #0b1322;
  margin-right: 6px;
  vertical-align: middle;
}
.num-1 { background: #38bdf8; }
.num-2 { background: #00f3ff; }
.num-3 { background: #ff967d; }
.num-4 { background: #c4ff78; }
.num-5 { background: #ffd166; }
.num-6 { background: #cbd5e1; }
</style>
</head>
<body>

<div class="header">
  <div>
    <h1>${analysis.name} — System Architecture & Data Flow</h1>
    <p class="subtitle">Numbers follow one complete local run. Blue = Entrypoints, Cyan = Scanner & Git, Coral = Blueprint Core, Mint = Video Engine, Gold = Neural Speech.</p>
  </div>
  <div class="badge">100% OFFLINE • ZERO CLOUD</div>
</div>

<div class="canvas-wrap">
  <svg viewBox="0 0 1780 820" xmlns="http://www.w3.org/2000/svg">
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
    <rect x="280" y="35" width="1470" height="760" rx="22" fill="rgba(11, 22, 40, 0.75)" stroke="#334155" stroke-width="1.5" stroke-dasharray="8 6" />
    <text x="310" y="68" fill="#64748b" font-size="13" font-weight="800" letter-spacing="0.1em">LOCAL ENGINE BOUNDARY · 100% PRIVATE RUNTIME</text>

    <!-- ZONE 1: ENTRYPOINTS -->
    <rect x="310" y="85" width="420" height="200" rx="18" fill="rgba(14, 165, 233, 0.08)" stroke="#38bdf8" stroke-width="2" />
    <text x="330" y="118" fill="#38bdf8" font-size="14" font-weight="800" letter-spacing="0.05em">1. ENTRYPOINTS (What you run)</text>
    <rect x="330" y="132" width="180" height="75" rx="12" fill="#0b1329" stroke="#334155" stroke-width="1" />
    <text x="345" y="158" fill="#ffffff" font-size="15" font-weight="700">CLI Runner</text>
    <text x="345" y="178" fill="#38bdf8" font-size="12" font-family="monospace">src/cli/bin.ts</text>
    <text x="345" y="196" fill="#94a3b8" font-size="11">Starts studio or reel</text>

    <rect x="530" y="132" width="180" height="75" rx="12" fill="#0b1329" stroke="#334155" stroke-width="1" />
    <text x="545" y="158" fill="#ffffff" font-size="15" font-weight="700">Studio Web App</text>
    <text x="545" y="178" fill="#38bdf8" font-size="12" font-family="monospace">src/studio/App.tsx</text>
    <text x="545" y="196" fill="#94a3b8" font-size="11">Live preview player</text>

    <text x="330" y="240" fill="#cbd5e1" font-size="13">Local Express server bridges browser controls directly to the video renderer.</text>
    <text x="330" y="260" fill="#64748b" font-size="12">No cloud cold starts. Instant local feedback.</text>

    <!-- ZONE 2: FILE SCANNER & GIT -->
    <rect x="770" y="85" width="440" height="200" rx="18" fill="rgba(0, 243, 255, 0.08)" stroke="#00f3ff" stroke-width="2" />
    <text x="790" y="118" fill="#00f3ff" font-size="14" font-weight="800" letter-spacing="0.05em">2. FILE SCANNER & GIT (The Eyes)</text>
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
    <text x="1285" y="196" fill="#94a3b8" font-size="11">Eliminates messy spaghetti</text>

    <rect x="1490" y="132" width="200" height="75" rx="12" fill="#0b1329" stroke="#334155" stroke-width="1" />
    <text x="1505" y="158" fill="#ffffff" font-size="15" font-weight="700">Flowchart Engine</text>
    <text x="1505" y="178" fill="#ff967d" font-size="12" font-family="monospace">src/core/mermaid.ts</text>
    <text x="1505" y="196" fill="#94a3b8" font-size="11">Builds Mermaid diagrams</text>

    <text x="1270" y="240" fill="#cbd5e1" font-size="13">Groups raw files into 4 clean tiers: Entrypoints, Processing, Core, & Render.</text>
    <text x="1270" y="260" fill="#64748b" font-size="12">Calculates inbound callers and outbound dependencies for each module.</text>

    <!-- ZONE 4: REMOTION 60FPS VIDEO -->
    <rect x="310" y="340" width="550" height="210" rx="18" fill="rgba(196, 255, 120, 0.08)" stroke="#c4ff78" stroke-width="2" />
    <text x="330" y="372" fill="#c4ff78" font-size="14" font-weight="800" letter-spacing="0.05em">4. REMOTION VIDEO ENGINE (60fps Canvas)</text>
    <rect x="330" y="388" width="245" height="75" rx="12" fill="#0b1329" stroke="#334155" stroke-width="1" />
    <text x="345" y="414" fill="#ffffff" font-size="15" font-weight="700">Reel Compositions</text>
    <text x="345" y="434" fill="#c4ff78" font-size="12" font-family="monospace">src/remotion/RepoReel.tsx</text>
    <text x="345" y="452" fill="#94a3b8" font-size="11">RepoReel & ModuleReel 60fps</text>

    <rect x="595" y="388" width="245" height="75" rx="12" fill="#0b1329" stroke="#334155" stroke-width="1" />
    <text x="610" y="414" fill="#ffffff" font-size="15" font-weight="700">Kinetic HUD & Captions</text>
    <text x="610" y="434" fill="#c4ff78" font-size="12" font-family="monospace">src/remotion/HUDOverlay.tsx</text>
    <text x="610" y="452" fill="#94a3b8" font-size="11">Top progress bar & word highlights</text>

    <text x="330" y="495" fill="#cbd5e1" font-size="13">Renders smooth 60fps React code into high-fidelity video canvas.</text>
    <text x="330" y="515" fill="#64748b" font-size="12">No screen recording artifacts, zero mouse jitter, pixel-perfect layout.</text>

    <!-- ZONE 5: NEURAL VOICE -->
    <rect x="900" y="340" width="810" height="210" rx="18" fill="rgba(255, 209, 102, 0.08)" stroke="#ffd166" stroke-width="2" />
    <text x="920" y="372" fill="#ffd166" font-size="14" font-weight="800" letter-spacing="0.05em">5. NEURAL VOICE & THEMES (Human Narration)</text>
    <rect x="920" y="388" width="370" height="75" rx="12" fill="#0b1329" stroke="#334155" stroke-width="1" />
    <text x="935" y="414" fill="#ffffff" font-size="15" font-weight="700">Kokoro TTS Neural Voiceover</text>
    <text x="935" y="434" fill="#ffd166" font-size="12" font-family="monospace">af_heart model • 1.12x speed • MP3</text>
    <text x="935" y="452" fill="#94a3b8" font-size="11">Plain-English explanation without robotic drone</text>

    <rect x="1310" y="388" width="380" height="75" rx="12" fill="#0b1329" stroke="#334155" stroke-width="1" />
    <text x="1325" y="414" fill="#ffffff" font-size="15" font-weight="700">Styling Presets & Themes</text>
    <text x="1325" y="434" fill="#ffd166" font-size="12" font-family="monospace">Tokyo Night • Cyberpunk • Catppuccin</text>
    <text x="1325" y="452" fill="#94a3b8" font-size="11">High-contrast dark developer palettes</text>

    <text x="920" y="495" fill="#cbd5e1" font-size="13">Narration words are timing-matched with KineticCaptionBar word highlights.</text>
    <text x="920" y="515" fill="#64748b" font-size="12">Sentences finish naturally before any scene transitions happen.</text>

    <!-- ZONE 6: OUTPUT ARTIFACTS -->
    <rect x="310" y="590" width="1400" height="180" rx="18" fill="rgba(15, 23, 42, 0.85)" stroke="#475569" stroke-width="1.5" />
    <text x="330" y="622" fill="#94a3b8" font-size="14" font-weight="800" letter-spacing="0.05em">6. ARTIFACT EXPORTS (Ready for your GitHub README)</text>

    <rect x="330" y="640" width="310" height="105" rx="12" fill="#0b1329" stroke="#334155" stroke-width="1" />
    <text x="345" y="668" fill="#ffffff" font-size="16" font-weight="700">🎬 1080p Cinematic MP4</text>
    <text x="345" y="692" fill="#c4ff78" font-size="12" font-family="monospace">./outputs/${analysis.name}-reel.mp4</text>
    <text x="345" y="714" fill="#94a3b8" font-size="12">Ready to attach to GitHub releases & PRs</text>

    <rect x="660" y="640" width="350" height="105" rx="12" fill="#0b1329" stroke="#334155" stroke-width="1" />
    <text x="675" y="668" fill="#ffffff" font-size="16" font-weight="700">📊 Interactive Architecture SVG</text>
    <text x="675" y="692" fill="#00f3ff" font-size="12" font-family="monospace">./outputs/${analysis.name}-architecture.html</text>
    <text x="675" y="714" fill="#94a3b8" font-size="12">Standalone interactive vector map</text>

    <rect x="1030" y="640" width="660" height="105" rx="12" fill="#0b1329" stroke="#334155" stroke-width="1" />
    <text x="1045" y="668" fill="#ffffff" font-size="16" font-weight="700">⚡ One-Line README Embed</text>
    <text x="1045" y="694" fill="#ffd166" font-size="12" font-family="monospace">![Architecture Walkthrough](./docs/${analysis.name}-reel.gif)</text>
    <text x="1045" y="720" fill="#94a3b8" font-size="12">Paste right at top of your repository README.md for instant wow-factor</text>

    <!-- ARROWS -->
    <path d="M 250 115 L 305 115" stroke="#38bdf8" stroke-width="2.5" fill="none" marker-end="url(#arr-blue)" />
    <path d="M 730 185 L 765 185" stroke="#00f3ff" stroke-width="2.5" fill="none" marker-end="url(#arr-cyan)" />
    <path d="M 1210 185 L 1245 185" stroke="#ff967d" stroke-width="2.5" fill="none" marker-end="url(#arr-coral)" />
    <path d="M 1480 285 C 1480 320 600 300 600 335" stroke="#c4ff78" stroke-width="2" fill="none" marker-end="url(#arr-mint)" />
    <path d="M 1520 285 C 1520 320 1300 300 1300 335" stroke="#ffd166" stroke-width="2" fill="none" marker-end="url(#arr-mint)" />
    <path d="M 585 550 L 585 585" stroke="#94a3b8" stroke-width="2" stroke-dasharray="6 4" fill="none" marker-end="url(#arr-mint)" />
    <path d="M 1305 550 L 1305 585" stroke="#94a3b8" stroke-width="2" stroke-dasharray="6 4" fill="none" marker-end="url(#arr-mint)" />

    <!-- NUMBER BADGES -->
    <circle cx="277" cy="115" r="14" fill="#38bdf8" /><text x="272" y="121" fill="#0b1628" font-size="15" font-weight="900">1</text>
    <circle cx="747" cy="185" r="14" fill="#00f3ff" /><text x="742" y="191" fill="#0b1628" font-size="15" font-weight="900">2</text>
    <circle cx="1227" cy="185" r="14" fill="#ff967d" /><text x="1222" y="191" fill="#0b1628" font-size="15" font-weight="900">3</text>
    <circle cx="600" cy="315" r="14" fill="#c4ff78" /><text x="595" y="321" fill="#0b1628" font-size="15" font-weight="900">4</text>
    <circle cx="1300" cy="315" r="14" fill="#ffd166" /><text x="1295" y="321" fill="#0b1628" font-size="15" font-weight="900">5</text>
    <circle cx="945" cy="568" r="14" fill="#94a3b8" /><text x="940" y="574" fill="#0b1628" font-size="15" font-weight="900">6</text>
  </svg>
</div>

<div class="legend-bar">
  <span class="step-num num-1">1</span> <b>You run git-motion</b> locally on your machine via terminal or browser cockpit. &nbsp;
  <span class="step-num num-2">2</span> <b>Scanner reads your files</b> and parses imports across TypeScript, Python, Go, and Git churn. &nbsp;
  <span class="step-num num-3">3</span> <b>Core organizes the blueprint</b> into clean architectural tiers without spaghetti. &nbsp;
  <span class="step-num num-4">4</span> <b>Remotion creates the 60fps canvas</b> with HUD overlays and responsive typography. &nbsp;
  <span class="step-num num-5">5</span> <b>Neural voice narrates</b> in plain English with word-synchronized captions. &nbsp;
  <span class="step-num num-6">6</span> <b>Artifacts export</b> as 1080p MP4 and interactive SVG, ready to embed in your GitHub README!
</div>

</body>
</html>
`;
}
