import asyncio
import edge_tts
import os

SCRIPTS = [
    {
        "id": "step1.mp3",
        "text": "Welcome to git-motion. In Tier 1, user execution initiates from the command line interface and web studio entry points."
    },
    {
        "id": "step2.mp3",
        "text": "In Tier 2, the local processing engine analyzes the repository, parsing cross-language imports and git commit churn."
    },
    {
        "id": "step3.mp3",
        "text": "In Tier 3, the core layout engine constructs a unified topological model, calculating module relationships."
    },
    {
        "id": "step4.mp3",
        "text": "Finally, in Tier 4, the Remotion video engine synthesizes the 60 frames per second architecture walkthrough."
    },
    {
        "id": "module_step1.mp3",
        "text": "This is the subsystem boundary spotlight. On the left, we map all inbound consumers that import this module."
    },
    {
        "id": "module_step2.mp3",
        "text": "In the center, we inspect the module's internal file anatomy, language distribution, and total lines of code."
    },
    {
        "id": "module_step3.mp3",
        "text": "Here is the core handler implementation, orchestrating execution within this architectural boundary."
    },
    {
        "id": "module_step4.mp3",
        "text": "On the right, we track outbound dependencies required by this module to complete execution."
    }
]

VOICE = "en-US-ChristopherNeural"

async def generate():
    out_dir = os.path.join(os.path.dirname(__file__), "../public/audio/voice")
    os.makedirs(out_dir, exist_ok=True)

    print(f"🎙️ Generating neural human-like voiceover tracks using {VOICE}...")

    for s in SCRIPTS:
        out_path = os.path.join(out_dir, s["id"])
        communicate = edge_tts.Communicate(s["text"], VOICE, rate="-2%")
        await communicate.save(out_path)
        print(f"  ✓ Generated: {s['id']}")

    print("\n✓ All neural voiceover tracks generated successfully!")

if __name__ == "__main__":
    asyncio.run(generate())
