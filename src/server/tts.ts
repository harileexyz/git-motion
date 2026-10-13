import { execSync } from "child_process";
import fs from "fs";
import path from "path";

export interface NarrationScript {
  id: string;
  text: string;
}

export function generateSpeechWav(text: string, outputPath: string, voice = "Samantha"): boolean {
  try {
    const dir = path.dirname(outputPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    const tempAiff = outputPath.replace(/\.wav$/, ".aiff");

    // macOS say command
    execSync(`say -v "${voice}" "${text.replace(/"/g, '\\"')}" -o "${tempAiff}"`);

    // Convert AIFF to standard 16-bit 44.1kHz WAV
    execSync(`afconvert -f WAVE -d LEI16 "${tempAiff}" "${outputPath}"`);

    // Clean up temporary AIFF
    if (fs.existsSync(tempAiff)) {
      fs.unlinkSync(tempAiff);
    }

    return true;
  } catch (err) {
    console.warn("[git-motion TTS] Speech synthesis warning:", err);
    return false;
  }
}

export function generateAllNarrations(publicDir: string): void {
  const voiceDir = path.join(publicDir, "audio/voice");

  const scripts: NarrationScript[] = [
    {
      id: "step1.wav",
      text: "Welcome to git-motion. In Tier 1, user execution initiates from the command line interface and web studio entry points.",
    },
    {
      id: "step2.wav",
      text: "In Tier 2, the local processing engine analyzes the repository, parsing cross-language imports and git commit churn.",
    },
    {
      id: "step3.wav",
      text: "In Tier 3, the core layout engine constructs a unified topological model, calculating module relationships.",
    },
    {
      id: "step4.wav",
      text: "Finally, in Tier 4, the Remotion video engine synthesizes the 60 frames per second architecture walkthrough.",
    },
    {
      id: "module_step1.wav",
      text: "This is the subsystem boundary spotlight. On the left, we map all inbound consumers that import this module.",
    },
    {
      id: "module_step2.wav",
      text: "In the center, we inspect the module's internal file anatomy, language distribution, and total lines of code.",
    },
    {
      id: "module_step3.wav",
      text: "Here is the core handler implementation, orchestrating execution within this architectural boundary.",
    },
    {
      id: "module_step4.wav",
      text: "On the right, we track outbound dependencies required by this module to complete execution.",
    },
  ];

  for (const s of scripts) {
    const outPath = path.join(voiceDir, s.id);
    generateSpeechWav(s.text, outPath);
  }

  console.log(`✓ Generated ${scripts.length} voiceover narration tracks in ${voiceDir}`);
}
