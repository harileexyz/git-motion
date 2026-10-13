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

# Plain English, under-the-hood explanations for overview and every subsystem
SCRIPTS = [
    # --- Whole Repository Walkthrough ---
    {
        "id": "step1",
        "text": "When you run git motion, it starts right on your computer. It opens a local web server and studio so you can see your project immediately."
    },
    {
        "id": "step2",
        "text": "Next, git motion reads your code files to see how they connect, and checks your git history to find the most active files."
    },
    {
        "id": "step3",
        "text": "Then, it organizes your codebase into four simple layers: your entry points, the server, the core engine, and the video renderer."
    },
    {
        "id": "step4",
        "text": "Finally, it turns this blueprint into a smooth video that shows how your project works from start to finish."
    },

    # --- Server Subsystem ---
    {
        "id": "server_step1",
        "text": "Inside the server, index dot t s starts an Express web server on port 4321 to handle all requests and render jobs."
    },
    {
        "id": "server_step2",
        "text": "Next, analyzer dot t s scans your project files, reading imports and exports to map out how each file connects."
    },
    {
        "id": "server_step3",
        "text": "Then, git dot t s runs git commands in the background to count commits and highlight the most frequently edited files."
    },
    {
        "id": "server_step4",
        "text": "Finally, it stores this complete project map in memory and serves it instantly to your web browser."
    },

    # --- Core Subsystem ---
    {
        "id": "core_step1",
        "text": "The core folder holds the main blueprints. In types dot t s, it defines what files, modules, and connections look like."
    },
    {
        "id": "core_step2",
        "text": "Next, architecture dot t s sorts your code into four simple tiers, separating your entry points from deep processing logic."
    },
    {
        "id": "core_step3",
        "text": "Then, it calculates coupling scores to show which modules rely heavily on each other and which stand on their own."
    },
    {
        "id": "core_step4",
        "text": "Finally, mermaid dot t s builds visual flowcharts and interactive diagrams so anyone can understand your app at a glance."
    },

    # --- Remotion Subsystem ---
    {
        "id": "remotion_step1",
        "text": "The remotion folder handles video creation. In Root dot t s, it sets up widescreen and vertical video layouts at sixty frames per second."
    },
    {
        "id": "remotion_step2",
        "text": "Next, the animated diagram draws glowing light pulses that travel across your code connections to show live data flow."
    },
    {
        "id": "remotion_step3",
        "text": "Then, the camera pans smoothly across each section while a clean progress bar tracks the timeline at the top."
    },
    {
        "id": "remotion_step4",
        "text": "Finally, the captions bar plays natural voice narration and highlights each word in real time as it speaks."
    },

    # --- CLI Subsystem ---
    {
        "id": "cli_step1",
        "text": "The c l i is your command line entry point. In bin dot t s, it understands commands like analyze, preview, and render."
    },
    {
        "id": "cli_step2",
        "text": "Next, it checks that you are inside a git repository and prepares the project for scanning."
    },
    {
        "id": "cli_step3",
        "text": "Then, it launches the background server and automatically opens the studio dashboard in your browser."
    },
    {
        "id": "cli_step4",
        "text": "Finally, it can export high quality video walkthroughs directly from your terminal without opening a browser."
    },

    # --- Studio Subsystem ---
    {
        "id": "studio_step1",
        "text": "The studio is the interactive web dashboard. Built with React and Vite, it launches instantly in your browser."
    },
    {
        "id": "studio_step2",
        "text": "In App dot t s x, it embeds the video player with easy controls to play, pause, and scrub through the timeline."
    },
    {
        "id": "studio_step3",
        "text": "It also displays the full interactive architecture blueprint, letting you click on any subsystem to see how it works."
    },
    {
        "id": "studio_step4",
        "text": "From here, you can switch between the full project view and individual modules, or export a video with one click."
    },

    # --- Root / Generic Module Fallback ---
    {
        "id": "module_step1",
        "text": "This module organizes the foundation of your project, including configuration files and build settings."
    },
    {
        "id": "module_step2",
        "text": "Inside, it sets up packages, compilation rules, and styling to keep your entire app running smoothly."
    },
    {
        "id": "module_step3",
        "text": "Its core scripts coordinate testing, building, and running all other subsystems together."
    },
    {
        "id": "module_step4",
        "text": "By keeping these shared rules in one place, every part of your project stays reliable and easy to maintain."
    }
]

def main():
    print("🎙️ Generating Kokoro af_heart under-the-hood narration...")
    onnx_path = os.path.join(MODEL_DIR, "kokoro-v1.0.onnx")
    voices_path = os.path.join(MODEL_DIR, "voices-v1.0.bin")

    engine = Kokoro(onnx_path, voices_path)
    engine.sess = FloatSpeedSession(engine.sess, 1.10)

    stats = []

    for item in SCRIPTS:
        text = item["text"]
        stem = item["id"]
        out_wav = os.path.join(OUT_DIR, f"{stem}.wav")
        out_mp3 = os.path.join(OUT_DIR, f"{stem}.mp3")

        samples, rate = engine.create(text, voice="af_heart", speed=1.10, lang="en-us")
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
