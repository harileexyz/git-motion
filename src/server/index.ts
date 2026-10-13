import express from "express";
import cors from "cors";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { scanRepository } from "./analyzer";
import { analyzeGitRepo, enrichFilesWithGit } from "./git";
import { renderVideoToFile } from "./renderer";
import { RepoAnalysis } from "../core/types";
import { generateArchitectureHtml } from "../core/htmlBlueprint";
import { generateTechnicalDesignHtml } from "../core/technicalDesign";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export interface ServerOptions {
  port?: number;
  repoPath?: string;
}

export function createServer(options: ServerOptions = {}) {
  const app = express();
  const port = options.port || 4322;
  const repoPath = path.resolve(options.repoPath || process.cwd());

  app.use(cors());
  app.use(express.json());

  // Cached analysis
  let cachedAnalysis: RepoAnalysis | null = null;

  function getOrComputeAnalysis(): RepoAnalysis {
    if (cachedAnalysis) return cachedAnalysis;

    const repoName = path.basename(repoPath);
    const scan = scanRepository(repoPath);
    const git = analyzeGitRepo(repoPath);
    const { files, hotspots } = enrichFilesWithGit(scan.files, git);

    const totalLOC = files.reduce((acc: number, f: any) => acc + f.loc, 0);

    cachedAnalysis = {
      name: repoName,
      rootPath: repoPath,
      branch: git.branch,
      totalFiles: files.length,
      totalLOC,
      totalCommits: git.totalCommits || files.length,
      contributors: git.contributors,
      modules: scan.modules,
      files,
      links: scan.links,
      hotspots,
      timeline: git.timeline,
    };

    return cachedAnalysis;
  }

  // API Endpoints
  app.get("/api/analysis", (req, res) => {
    try {
      const analysis = getOrComputeAnalysis();
      res.json(analysis);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  app.post("/api/refresh", (req, res) => {
    cachedAnalysis = null;
    const analysis = getOrComputeAnalysis();
    res.json(analysis);
  });

  app.get("/api/modules", (req, res) => {
    try {
      const analysis = getOrComputeAnalysis();
      res.json(analysis.modules);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  // Static audio assets for neural narration
  const publicAudioPath = path.resolve(repoPath, "public/audio");
  if (fs.existsSync(publicAudioPath)) {
    app.use("/audio", express.static(publicAudioPath));
  }

  app.get("/api/architecture.html", (req, res) => {
    try {
      const analysis = getOrComputeAnalysis();
      const moduleId = req.query.module as string | undefined;
      const html = generateArchitectureHtml(analysis, moduleId);
      res.setHeader("Content-Type", "text/html");
      res.send(html);
    } catch (err: any) {
      res.status(500).send(`Error generating architecture: ${err.message}`);
    }
  });

  app.get("/api/technical-design.html", (req, res) => {
    try {
      const analysis = getOrComputeAnalysis();
      const moduleId = req.query.module as string | undefined;
      const html = generateTechnicalDesignHtml(analysis, moduleId);
      res.setHeader("Content-Type", "text/html");
      res.send(html);
    } catch (err: any) {
      res.status(500).send(`Error generating technical design: ${err.message}`);
    }
  });

  app.post("/api/render", async (req, res) => {
    try {
      const {
        compositionId = "RepoOverview",
        outputFile = `./outputs/${path.basename(repoPath)}-motion.mp4`,
        moduleId,
        themePreset = "tokyo-night",
      } = req.body;

      const analysis = getOrComputeAnalysis();

      console.log(`[git-motion] Rendering ${compositionId} to ${outputFile}...`);

      const finalPath = await renderVideoToFile({
        compositionId,
        outputFile,
        analysis,
        moduleId,
        themePreset,
      });

      res.json({ success: true, outputPath: finalPath });
    } catch (err: any) {
      console.error("[git-motion] Render failed:", err);
      res.status(500).json({ error: err.message });
    }
  });

  // Serve static Studio frontend if built
  const candidateDists = [
    path.resolve(process.cwd(), "dist"),
    path.resolve(__dirname, "../../dist"),
    path.resolve(__dirname, ".."),
  ];
  const distPath = candidateDists.find((p) => fs.existsSync(path.join(p, "index.html")));
  if (distPath) {
    app.use(express.static(distPath));
    app.get("*", (req, res, next) => {
      if (req.path.startsWith("/api")) return next();
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  return { app, port, repoPath };
}

if (process.env.STANDALONE_SERVER) {
  const { app, port } = createServer();
  app.listen(port, () => {
    console.log(`[git-motion server] Running on http://localhost:${port}`);
  });
}
