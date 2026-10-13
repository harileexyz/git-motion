import os
import sys
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

# Simple, friendly, plain-English scripts (no sophisticated jargon)
SCRIPTS = [
    {
        "id": "step1.wav",
        "text": "When you run git-motion, it starts right on your computer. You can use your terminal or open the web studio. Nothing is uploaded to the cloud."
    },
    {
        "id": "step2.wav",
        "text": "Next, it quickly looks through all the files in your project. It sees which files connect to each other, and checks your Git history to find the most active files."
    },
    {
        "id": "step3.wav",
        "text": "Then, it organizes your code into four simple parts: your entry points, your backend server, the core engine, and the video renderer."
    },
    {
        "id": "step4.wav",
        "text": "Finally, it turns this blueprint into a smooth video that shows how your project works. You can save it and put it right on your GitHub page."
    },
    {
        "id": "module_step1.wav",
        "text": "This shows just one part of your project. On the left, you can see which other folders use this code."
    },
    {
        "id": "module_step2.wav",
        "text": "Here in the middle are all the files inside this folder, so you can see where everything lives."
    },
    {
        "id": "module_step3.wav",
        "text": "Here is the main code file that actually does the work for this part of your app."
    },
    {
        "id": "module_step4.wav",
        "text": "And on the right, you see what outside tools and libraries this folder needs to run."
    }
]

def main():
    print("🎙️ Generating simple plain-English Kokoro af_heart narration...")
    onnx_path = os.path.join(MODEL_DIR, "kokoro-v1.0.onnx")
    voices_path = os.path.join(MODEL_DIR, "voices-v1.0.bin")

    engine = Kokoro(onnx_path, voices_path)
    engine.sess = FloatSpeedSession(engine.sess, 1.12)

    for item in SCRIPTS:
        text = item["text"]
        out_wav = os.path.join(OUT_DIR, item["id"])
        samples, rate = engine.create(text, voice="af_heart", speed=1.12, lang="en-us")
        sf.write(out_wav, samples, rate)
        duration = len(samples) / rate
        frames = int(round(duration * 30))
        print(f"  ✓ {item['id']}: {duration:.2f}s ({frames} frames @ 30fps)")

    print("\n✓ All simple narration files successfully generated!")

if __name__ == "__main__":
    main()
