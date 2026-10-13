import { exec } from "child_process";
import path from "path";
import fs from "fs";
import { RepoAnalysis, ThemePreset } from "../core/types";

export interface RenderOptions {
  compositionId: "RepoOverview" | "ModuleSpotlight" | "VerticalOverview" | "VerticalModule";
  outputFile: string;
  analysis: RepoAnalysis;
  moduleId?: string;
  themePreset?: ThemePreset;
  onProgress?: (percent: number) => void;
}

export async function renderVideoToFile(options: RenderOptions): Promise<string> {
  const { compositionId, outputFile, analysis, moduleId, themePreset = "tokyo-night" } = options;

  const tempPropsFile = path.resolve("./.git-motion-props.json");
  const propsPayload = {
    analysis,
    moduleId: moduleId || analysis.modules[0]?.id || "core",
    themePreset,
  };

  fs.writeFileSync(tempPropsFile, JSON.stringify(propsPayload, null, 2));

  // Ensure output directory exists
  const outDir = path.dirname(path.resolve(outputFile));
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  const rootEntry = path.resolve("./src/remotion/Root.tsx");
  const cmd = `npx remotion render "${rootEntry}" ${compositionId} "${path.resolve(outputFile)}" --props="${tempPropsFile}" --overwrite --gl=angle`;

  return new Promise((resolve, reject) => {
    exec(cmd, { maxBuffer: 50 * 1024 * 1024 }, (error, stdout, stderr) => {
      // Clean up temp props
      try {
        if (fs.existsSync(tempPropsFile)) fs.unlinkSync(tempPropsFile);
      } catch {}

      if (error) {
        console.error("Remotion render error:", stderr || stdout);
        return reject(new Error(stderr || stdout || error.message));
      }

      resolve(path.resolve(outputFile));
    });
  });
}
