import os
import subprocess
import soundfile as sf
import numpy as np

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
AUDIO_DIR = os.path.join(ROOT, "public/audio/voice")

GROUPS = {
    "overview": ["step1.wav", "step2.wav", "step3.wav", "step4.wav"],
    "server": ["server_step1.wav", "server_step2.wav", "server_step3.wav", "server_step4.wav"],
    "core": ["core_step1.wav", "core_step2.wav", "core_step3.wav", "core_step4.wav"],
    "remotion": ["remotion_step1.wav", "remotion_step2.wav", "remotion_step3.wav", "remotion_step4.wav"],
    "cli": ["cli_step1.wav", "cli_step2.wav", "cli_step3.wav", "cli_step4.wav"],
    "studio": ["studio_step1.wav", "studio_step2.wav", "studio_step3.wav", "studio_step4.wav"],
    "module": ["module_step1.wav", "module_step2.wav", "module_step3.wav", "module_step4.wav"],
}

GAP_SECONDS = 0.35  # Natural pause between explanation steps

def main():
    print("🎧 Stitching clean unified single-track voiceovers for all modules...")
    results = {}

    for name, files in GROUPS.items():
        sample_list = []
        rate = 24000
        step_starts = []
        current_sample_count = 0

        for i, fname in enumerate(files):
            fpath = os.path.join(AUDIO_DIR, fname)
            samples, r = sf.read(fpath)
            rate = r

            # Frame start
            start_frame = int(round(current_sample_count / rate * 30))
            step_starts.append(start_frame)

            sample_list.append(samples)
            current_sample_count += len(samples)

            # Add gap between sentences (not after the last one)
            if i < len(files) - 1:
                gap = np.zeros(int(round(rate * GAP_SECONDS)), dtype=samples.dtype)
                sample_list.append(gap)
                current_sample_count += len(gap)

        full_samples = np.concatenate(sample_list)
        total_duration = len(full_samples) / rate
        total_frames = int(round(total_duration * 30))

        out_wav = os.path.join(AUDIO_DIR, f"{name}_full.wav")
        out_mp3 = os.path.join(AUDIO_DIR, f"{name}_full.mp3")

        sf.write(out_wav, full_samples, rate)

        # Transcode to high quality MP3
        subprocess.run(
            ["ffmpeg", "-y", "-i", out_wav, "-codec:a", "libmp3lame", "-b:a", "192k", out_mp3],
            stdout=subprocess.DEVNULL,
            stderr=subprocess.DEVNULL,
            check=True
        )

        results[name] = {
            "duration": total_duration,
            "total_frames": total_frames,
            "step_starts": step_starts,
        }

        print(f"  ✓ {name}_full.mp3: {total_duration:.2f}s ({total_frames} frames)")
        print(f"      Step Starts: {step_starts}")

    print("\n✓ Configuration code for React compositions:")
    for name, data in results.items():
        print(f"  {name}: {{ file: 'audio/voice/{name}_full.mp3', totalFrames: {data['total_frames']}, steps: {data['step_starts']} }}")

if __name__ == "__main__":
    main()
