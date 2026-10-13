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

SCRIPTS = [
    {
        "id": "step1.wav",
        "text": "When you run git-motion, execution begins right at your terminal or browser, reading your local workspace without sending any code to the cloud."
    },
    {
        "id": "step2.wav",
        "text": "The local engine instantly inspects your files, mapping import statements across TypeScript, Python, and Go, while calculating your Git commit churn."
    },
    {
        "id": "step3.wav",
        "text": "Next, the layout engine clusters your files into four architectural tiers, tracing inbound consumers and outbound dependencies."
    },
    {
        "id": "step4.wav",
        "text": "Finally, Remotion composes the timeline at sixty frames per second, exporting a verified video ready to embed directly in your documentation."
    },
    {
        "id": "module_step1.wav",
        "text": "This is the subsystem boundary spotlight. On the left, we map all inbound consumers that import this module."
    },
    {
        "id": "module_step2.wav",
        "text": "In the center, we inspect the module's internal file anatomy, language breakdown, and total lines of verified code."
    },
    {
        "id": "module_step3.wav",
        "text": "Here is the core handler logic, orchestrating state transformations within this architectural boundary."
    },
    {
        "id": "module_step4.wav",
        "text": "On the right, we track outbound dependencies required by this module to complete execution."
    }
]

def main():
    print("🎙️ Generating studio-quality narration using Kokoro af_heart at speed 1.12...")
    onnx_path = os.path.join(MODEL_DIR, "kokoro-v1.0.onnx")
    voices_path = os.path.join(MODEL_DIR, "voices-v1.0.bin")

    engine = Kokoro(onnx_path, voices_path)
    engine.sess = FloatSpeedSession(engine.sess, 1.12)

    for item in SCRIPTS:
        text = item["text"]
        out_wav = os.path.join(OUT_DIR, item["id"])
        samples, rate = engine.create(text, voice="af_heart", speed=1.12, lang="en-us")
        sf.write(out_wav, samples, rate)
        print(f"  ✓ {item['id']} generated ({len(samples)} samples @ {rate}Hz)")

    print("\n✓ All Kokoro af_heart narration files successfully generated!")

if __name__ == "__main__":
    main()
