<div align="center">

# 🎬 git-motion

### Turn any codebase into cinematic architecture walkthroughs & module reels.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Powered by Remotion](https://img.shields.io/badge/Rendered%20with-Remotion-red.svg)](https://www.remotion.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue.svg)](https://www.typescriptlang.org/)
[![Language Agnostic](https://img.shields.io/badge/Language-Agnostic-emerald.svg)](#language-agnostic-engine)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/harileexyz/git-motion/pulls)

<br />

`git-motion` parses your repository topology, AST dependency graph, and Git churn history to generate **silky 60fps animated walkthrough videos** of your entire architecture or individual subsystems.

Embed them directly at the top of your `README.md` or PRs to onboard new engineers in 60 seconds.

<br />

```bash
npx git-motion
```

</div>

---

## ✨ Key Features

### 🌐 1. Macro Repository Reel
* **Scene 1: Genesis & Bloom** — Watch your codebase sprout from its initial commit into a glowing constellation of files.
* **Scene 2: Subsystem Constellation** — Automatically clusters files into architectural modules (`auth`, `api`, `storage`, `core`).
* **Scene 3: Churn Thermal Scan** — Heatmap visualizer showing the highest-traffic files and critical architectural pillars.
* **Scene 4: Contributor Lifeline** — Commits, lines of code, and maintainer scorecard.

### 📁 2. Module Spotlight Mode
* **Deep-Dive Subsystem Walkthrough:** Pick any folder (e.g. `src/auth`, `lib/billing`, `internal/engine`).
* **Ingress & Egress Ports:** Shows inbound callers (who imports this module) and outbound dependencies (what this module imports).
* **Internal Component Anatomy:** Explodes internal files, interfaces, and LOC distribution.
* **Request Lifecycle Trace:** Glowing photon pulses tracing execution paths between components.

### ⚡ 3. 100% Language-Agnostic
Zero setup required. Works seamlessly out-of-the-box on:
* **TypeScript & JavaScript** (`import`, `require`)
* **Python** (`import`, `from ... import`)
* **Go** (`import (...)`)
* **Rust** (`use crate::...`, `mod ...`)
* **Java & Kotlin** (`import com.pkg.*`)
* **C / C++** (`#include "..."`)

### 🎛️ 4. Interactive Local Web Studio
Launch the local visual studio powered by `@remotion/player`:
* **Zero Cloud Uploads:** 100% private, runs entirely on your local machine.
* **Live 60fps Preview:** Instant scrubbing, play/pause, and real-time spring physics without waiting for FFmpeg.
* **Theme Engine:** Tokyo Night, Cyberpunk Neon, Catppuccin Macchiato, and Monokai Pro.
* **Multi-Format:** 16:9 Landscape (Docs/YouTube) & 9:16 Vertical (Shorts/Reels/TikTok).

---

## 🚀 Quickstart

### Option A: Launch Interactive Studio (Recommended)

Run inside any Git repository:

```bash
npx git-motion
```

This starts the local analyzer and opens `http://localhost:4321` in your browser.

---

### Option B: Headless Terminal Render (CI/CD / Scripting)

Render the full repository overview:
```bash
npx git-motion render --output ./docs/architecture.mp4
```

Render a dedicated **Module Spotlight** reel:
```bash
npx git-motion render --module src/auth --output ./docs/auth-spotlight.mp4
```

Render a **9:16 Vertical Reel** for social media:
```bash
npx git-motion render --module internal/engine --vertical --theme cyberpunk --output ./docs/engine-short.mp4
```

---

## 🖼️ Embed into your `README.md`

Add a cinematic hero banner right at the top of your project:

```markdown
# My Awesome Project

![Architecture Walkthrough](./docs/architecture.gif)

> 💡 Built with [git-motion](https://github.com/harileexyz/git-motion)
```

---

## 🛠️ Architecture

```
git-motion/
├── src/
│   ├── core/                  # Language-agnostic types & D3 force simulation
│   │   ├── types.ts           # Unified FileNode, Link, and Module interfaces
│   │   └── layout.ts          # Deterministic 60fps physics layout engine
│   ├── server/                # Local API and AST/Git analyzer
│   │   ├── analyzer.ts        # Universal multi-language file & import parser
│   │   ├── git.ts             # Git log, churn velocity, and contributor metrics
│   │   ├── renderer.ts        # Remotion headless render bridge
│   │   └── index.ts           # Express local API server
│   ├── remotion/              # Video composition & spring animation components
│   │   ├── Root.tsx           # Remotion Root composition registrations
│   │   ├── compositions/
│   │   │   ├── RepoReel.tsx   # Global Overview video composition
│   │   │   └── ModuleReel.tsx # Module Spotlight deep-dive composition
│   │   ├── components/        # GraphCanvas, HUDOverlay, PulseBeams
│   │   └── themes.ts          # Theme color palettes
│   └── studio/                # Interactive React + Remotion Player web UI
│       ├── App.tsx            # Module selector, inspector & preview stage
│       └── main.tsx           # Studio client entrypoint
└── package.json
```

---

## 🎨 Themes

| Theme | Vibe |
| :--- | :--- |
| **Tokyo Night** | Deep midnight navy with soft cyan & lavender highlights |
| **Cyberpunk Neon** | Dark obsidian with high-voltage magenta and neon cyan glow |
| **Catppuccin** | Smooth pastel macchiato palette |
| **Monokai Pro** | High-contrast hacker aesthetic with emerald and amber accents |

---

## 🤝 Contributing

Contributions are welcome! Please open an issue or submit a PR:
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

MIT License © 2026 [harileexyz](https://github.com/harileexyz)
