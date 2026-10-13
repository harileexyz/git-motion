import os
import sys
import subprocess
import numpy as np
import soundfile as sf
from kokoro_onnx import Kokoro

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "../.."))
MODEL_DIR = os.path.join(ROOT, "work/shorts-models")
OUT_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "../public/audio/voice"))
os.makedirs(OUT_DIR, exist_ok=True)

class FloatSpeedSession:
    """Preserve fractional speed despite kokoro-onnx 0.4.9's integer cast."""
    def __init__(self, session, speed):
        self.session, self.speed = session, speed
    def get_inputs(self):
        return self.session.get_inputs()
    def run(self, outputs, inputs):
        inputs = dict(inputs)
        inputs['speed'] = np.array([self.speed], dtype=np.float32)
        return self.session.run(outputs, inputs)

# Deep, production-grade engineering explanations directly drawn from git-motion-technical-design.html
SCRIPTS = [
    # --- Whole Repository Walkthrough ---
    {
        "id": "step1",
        "text": "When git motion starts, it runs locally on your workstation with zero cloud dependencies. It boots an Express daemon on port 4321 and mounts the Vite studio interface for immediate architectural inspection."
    },
    {
        "id": "step2",
        "text": "Next, the ingestion pipeline traverses your repository with multi language AST token parsers. It maps file import edges and calculates git churn scores using normalized commit frequency and line alterations."
    },
    {
        "id": "step3",
        "text": "Then, the core architecture engine partitions the codebase into four clean tiers: entry points, transport orchestration, foundational domain models, and presentation rendering leaves."
    },
    {
        "id": "step4",
        "text": "Finally, it compiles an interactive SVG architectural blueprint and renders sixty frames per second motion graphics with traveling light beams and neural voiceover narration."
    },

    # --- Server Subsystem (src/server) ---
    {
        "id": "server_step1",
        "text": "Inside the server subsystem, index dot t s bootstraps an Express HTTP daemon on port 4321, binding CORS policies and registering REST endpoints for analytical queries and headless video rendering."
    },
    {
        "id": "server_step2",
        "text": "Next, analyzer dot t s performs recursive directory scans while ignoring node modules and git. It uses language-specific regex tokenizers to extract imports across TypeScript, Python, Go, and Rust, resolving relative paths into concrete edges."
    },
    {
        "id": "server_step3",
        "text": "Then, git dot t s spawns a child process to execute git log with numstat. It scores file velocity using the normalized formula sixty-five percent commit frequency plus thirty-five percent line deltas to spotlight critical code hotspots."
    },
    {
        "id": "server_step4",
        "text": "Finally, it constructs the universal RepoAnalysis data model, caching file nodes and dependency links in memory to instantly feed both the web studio and the Remotion video engine."
    },

    # --- Core Subsystem (src/core) ---
    {
        "id": "core_step1",
        "text": "The core subsystem defines the architectural schema in types dot t s, establishing strongly typed contracts for FileNode, ModuleCluster, and DependencyLink with zero external dependencies."
    },
    {
        "id": "core_step2",
        "text": "Next, architecture dot t s groups files into four hierarchical tiers: entry points with high outbound calls, orchestration servers, foundational domain data models, and output rendering leaves."
    },
    {
        "id": "core_step3",
        "text": "Then, it calculates module coupling ratios by dividing outbound dependencies by total connections, identifying tightly coupled orchestration layers versus independent foundational libraries."
    },
    {
        "id": "core_step4",
        "text": "Finally, htmlBlueprint dot t s compiles interactive standalone SVG system blueprints with themed zone boundaries, data lanes, and travelling photon pulse animations."
    },

    # --- Remotion Subsystem (src/remotion) ---
    {
        "id": "remotion_step1",
        "text": "The remotion subsystem houses sixty frames per second video compositions in Root dot t s, configuring landscape nineteen-twenty by ten-eighty and vertical ten-eighty by nineteen-twenty viewports."
    },
    {
        "id": "remotion_step2",
        "text": "Next, AnimatedArchitectureDiagram dot t s x computes SVG cubic bezier paths between modules, interpolating photon light pulses across connection curves as a pure mathematical function of the current frame."
    },
    {
        "id": "remotion_step3",
        "text": "Then, KineticCaptionBar dot t s x renders word-by-word subtitles with dynamic glowing backgrounds, highlighting critical technical keywords in real time as the neural voiceover speaks."
    },
    {
        "id": "remotion_step4",
        "text": "Finally, spring and interpolate hooks smoothly pan and zoom the camera into active subsystem boundaries, synchronized with a top glowing progress bar and zero audio stutter."
    },

    # --- CLI Subsystem (src/cli) ---
    {
        "id": "cli_step1",
        "text": "In bin dot t s, the commander CLI handles flags like port, theme, and headless render, validating the working tree and locating the root git repository marker."
    },
    {
        "id": "cli_step2",
        "text": "Next, it verifies local repository integrity, builds the server and client bundles, and spawns the background Express daemon on an available local port."
    },
    {
        "id": "cli_step3",
        "text": "Then, it automatically opens your default web browser to localhost 4321, connecting you directly to the interactive studio cockpit."
    },
    {
        "id": "cli_step4",
        "text": "Finally, it supports headless batch rendering, compiling sixty frames per second MP4 architecture walkthroughs directly from CI/CD without requiring a browser window."
    },

    # --- Studio Subsystem (src/studio) ---
    {
        "id": "studio_step1",
        "text": "The studio plane provides an interactive developer cockpit built with React and Vite, featuring zero-lag responsive layout and hot module reloading."
    },
    {
        "id": "studio_step2",
        "text": "In VideoControlsBar dot t s x, player state is strictly isolated from parent components, using a sixty frames per second animation frame loop to guarantee butter-smooth scrubbing without re-render storms."
    },
    {
        "id": "studio_step3",
        "text": "Next, App dot t s x lets engineers switch instantly between the cinematic video walkthrough, the interactive SVG blueprint, the production technical design document, and raw Mermaid diagrams."
    },
    {
        "id": "studio_step4",
        "text": "Finally, engineers can filter subsystems, inspect inbound callers and outbound dependencies, customize visual themes, and export high-definition video walkthroughs with one click."
    },

    # --- Root / Generic Module Fallback ---
    {
        "id": "module_step1",
        "text": "This module organizes the foundation of your project workspace, declaring environment configuration, root dependency manifests, and build automation pipelines."
    },
    {
        "id": "module_step2",
        "text": "Inside, TypeScript compilation targets and bundler configurations ensure strict type safety across both frontend and backend compilation boundaries."
    },
    {
        "id": "module_step3",
        "text": "Its core scripts coordinate linting, testing, and continuous deployment, ensuring seamless inter-operation across all decoupled subsystem packages."
    },
    {
        "id": "module_step4",
        "text": "By centralizing shared infrastructure here, every tier of your application maintains strict boundaries, zero circular leaks, and high architectural maintainability."
    }
]

def main():
    print("🎙️ Generating deep engineering Kokoro af_heart narration...")
    onnx_path = os.path.join(MODEL_DIR, "kokoro-v1.0.onnx")
    voices_path = os.path.join(MODEL_DIR, "voices-v1.0.bin")

    engine = Kokoro(onnx_path, voices_path)
    engine.sess = FloatSpeedSession(engine.sess, 1.05)

    stats = []

    for item in SCRIPTS:
        text = item["text"]
        stem = item["id"]
        out_wav = os.path.join(OUT_DIR, f"{stem}.wav")
        out_mp3 = os.path.join(OUT_DIR, f"{stem}.mp3")

        samples, rate = engine.create(text, voice="af_heart", speed=1.05, lang="en-us")
        sf.write(out_wav, samples, rate)
        duration = len(samples) / rate
        frames = int(round(duration * 30))

        # Transcode to MP3 with libmp3lame
        subprocess.run(
            ["ffmpeg", "-y", "-i", out_wav, "-codec:a", "libmp3lame", "-b:a", "192k", out_mp3],
            stdout=subprocess.DEVNULL,
            stderr=subprocess.DEVNULL,
            check=True
        )

        stats.append((stem, duration, frames))
        print(f"  ✓ {stem}.mp3: {duration:.2f}s ({frames} frames @ 30fps)")

    print("\n✓ Summary of generated voice clips:")
    for stem, duration, frames in stats:
        print(f"    - {stem}: {duration:.2f}s ({frames} frames)")

if __name__ == "__main__":
    main()
