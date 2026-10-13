#!/usr/bin/env node
import { Command } from "commander";
import pc from "picocolors";
import open from "open";
import path from "path";
import { createServer } from "../server/index";
import { renderVideoToFile } from "../server/renderer";
import { scanRepository } from "../server/analyzer";
import { analyzeGitRepo, enrichFilesWithGit } from "../server/git";

const program = new Command();

program
  .name("git-motion")
  .description("Cinematic architecture walkthroughs and module reels generated directly from your codebase.")
  .version("0.1.0");

// Default action: launch interactive Studio
program
  .command("studio", { isDefault: true })
  .description("Launch the interactive local web studio")
  .option("-p, --port <number>", "Port for web studio", "4321")
  .option("--no-open", "Do not open browser automatically")
  .action(async (options) => {
    console.log();
    console.log(pc.bold(pc.cyan("  ╔════════════════════════════════════════╗")));
    console.log(pc.bold(pc.cyan("  ║              git-motion                ║")));
    console.log(pc.bold(pc.cyan("  ║    Codebase to Cinematic Reel Engine   ║")));
    console.log(pc.bold(pc.cyan("  ╚════════════════════════════════════════╝")));
    console.log();

    const cwd = process.cwd();
    console.log(pc.gray(`  Scanning repository at: ${pc.white(cwd)}`));

    // Spin up local API server
    const apiPort = 4322;
    const { app } = createServer({ port: apiPort, repoPath: cwd });
    app.listen(apiPort, () => {
      console.log(pc.green(`  ✓ Analysis API running at http://localhost:${apiPort}`));
    });

    const studioUrl = `http://localhost:${options.port}`;
    console.log(pc.cyan(`  ✓ Studio preview ready at ${pc.bold(pc.underline(studioUrl))}`));
    console.log();
    console.log(pc.gray("  Press Ctrl+C to stop.\n"));

    if (options.open !== false) {
      try {
        await open(studioUrl);
      } catch {}
    }
  });

// Headless Render command
program
  .command("render")
  .description("Render an architecture reel directly to MP4 without UI")
  .option("-m, --module <name>", "Render a specific module instead of the full overview")
  .option("-o, --output <path>", "Output MP4 path", "./outputs/git-motion-reel.mp4")
  .option("-t, --theme <theme>", "Theme: tokyo-night | cyberpunk | catppuccin | monokai", "tokyo-night")
  .option("-v, --vertical", "Render 9:16 vertical reel for Shorts/Reels")
  .action(async (options) => {
    const cwd = process.cwd();
    console.log(pc.cyan(`\n[git-motion] Analyzing repository at ${cwd}...`));

    const scan = scanRepository(cwd);
    const git = analyzeGitRepo(cwd);
    const { files, hotspots } = enrichFilesWithGit(scan.files, git);

    const analysis = {
      name: path.basename(cwd),
      rootPath: cwd,
      branch: git.branch,
      totalFiles: files.length,
      totalLOC: files.reduce((acc: number, f: any) => acc + f.loc, 0),
      totalCommits: git.totalCommits || files.length,
      contributors: git.contributors,
      modules: scan.modules,
      files,
      links: scan.links,
      hotspots,
      timeline: git.timeline,
    };

    const isModule = !!options.module;
    const isVertical = !!options.vertical;

    const compId = isModule
      ? isVertical
        ? "VerticalModule"
        : "ModuleSpotlight"
      : isVertical
      ? "VerticalOverview"
      : "RepoOverview";

    console.log(pc.green(`[git-motion] Rendering ${compId} to ${options.output}...`));

    try {
      const outPath = await renderVideoToFile({
        compositionId: compId as any,
        outputFile: options.output,
        analysis,
        moduleId: options.module,
        themePreset: options.theme,
      });

      console.log(pc.bold(pc.green(`\n✓ Video rendered successfully: ${outPath}\n`)));
    } catch (err: any) {
      console.error(pc.red(`\n✗ Render failed: ${err.message}\n`));
      process.exit(1);
    }
  });

program.parse(process.argv);
