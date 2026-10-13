import React, { useEffect, useState, useMemo, useRef } from "react";
import { PlayerRef } from "@remotion/player";
import {
  Play,
  Pause,
  RotateCcw,
  FastForward,
  Rewind,
  Volume2,
  VolumeX,
  Maximize2,
  Minimize2,
} from "lucide-react";

interface VideoControlsBarProps {
  player: PlayerRef | null;
  durationFrames: number;
  mode: "overview" | "module";
  aspectRatio: "16:9" | "9:16";
  setAspectRatio: (ar: "16:9" | "9:16") => void;
  theaterMode: boolean;
  setTheaterMode: (t: boolean) => void;
  setShowLeftSidebar: (s: boolean) => void;
  setShowRightSidebar: (s: boolean) => void;
  onPlayStateChange?: (playing: boolean) => void;
}

export const VideoControlsBar: React.FC<VideoControlsBarProps> = ({
  player,
  durationFrames,
  mode,
  aspectRatio,
  setAspectRatio,
  theaterMode,
  setTheaterMode,
  setShowLeftSidebar,
  setShowRightSidebar,
  onPlayStateChange,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentFrame, setCurrentFrame] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const isDraggingRef = useRef(false);

  // Bind player events when player instance is available
  useEffect(() => {
    if (!player) return;

    const onPlay = () => {
      setIsPlaying(true);
      onPlayStateChange?.(true);
    };
    const onPause = () => {
      setIsPlaying(false);
      onPlayStateChange?.(false);
    };
    const onFrame = (e: any) => {
      if (!isDraggingRef.current) {
        setCurrentFrame(e.detail.frame);
      }
    };
    const onVolume = (e: any) => {
      setVolume(e.detail.volume);
      setIsMuted(e.detail.isMuted);
    };

    player.addEventListener("play", onPlay);
    player.addEventListener("pause", onPause);
    player.addEventListener("frameupdate", onFrame);
    player.addEventListener("volumechange", onVolume);

    // Initial sync
    try {
      setIsPlaying(player.isPlaying());
      setCurrentFrame(player.getCurrentFrame());
    } catch {}

    return () => {
      player.removeEventListener("play", onPlay);
      player.removeEventListener("pause", onPause);
      player.removeEventListener("frameupdate", onFrame);
      player.removeEventListener("volumechange", onVolume);
    };
  }, [player, onPlayStateChange]);

  // High-performance requestAnimationFrame loop to guarantee 60fps scrubber sync
  useEffect(() => {
    if (!player || !isPlaying) return;
    let animId: number;

    const tick = () => {
      if (!isDraggingRef.current) {
        try {
          const f = player.getCurrentFrame();
          setCurrentFrame(f);
        } catch {}
      }
      animId = requestAnimationFrame(tick);
    };

    animId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animId);
  }, [player, isPlaying]);

  const togglePlay = () => {
    if (!player) return;
    try {
      if (player.isPlaying()) {
        player.pause();
        setIsPlaying(false);
        onPlayStateChange?.(false);
      } else {
        player.play();
        setIsPlaying(true);
        onPlayStateChange?.(true);
      }
    } catch {}
  };

  const handleSeek = (targetFrame: number) => {
    if (!player) return;
    const clamped = Math.max(0, Math.min(durationFrames - 1, targetFrame));
    try {
      player.seekTo(clamped);
    } catch {}
    setCurrentFrame(clamped);
  };

  const skipFrames = (delta: number) => {
    handleSeek(currentFrame + delta);
  };

  const toggleMute = () => {
    if (!player) return;
    try {
      if (isMuted) {
        player.unmute();
        setIsMuted(false);
      } else {
        player.mute();
        setIsMuted(true);
      }
    } catch {}
  };

  const handleVolumeChange = (newVol: number) => {
    if (!player) return;
    try {
      player.setVolume(newVol);
      setVolume(newVol);
      if (newVol > 0 && isMuted) {
        player.unmute();
        setIsMuted(false);
      }
    } catch {}
  };

  const handleRateChange = (rate: number) => {
    if (!player) return;
    try {
      player.setPlaybackRate(rate);
      setPlaybackRate(rate);
    } catch {}
  };

  const formatTime = (frameNum: number, fps: number = 30) => {
    const totalSec = Math.floor(frameNum / fps);
    const m = Math.floor(totalSec / 60);
    const s = totalSec % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  // Chapter markers based on Kokoro neural audio frame points
  const chapterSteps = useMemo(() => {
    if (mode === "overview") {
      return [
        { label: "1. Boot", frame: 0 },
        { label: "2. AST Scan", frame: 443 },
        { label: "3. 4 Tiers", frame: 884 },
        { label: "4. 60fps Reel", frame: 1238 },
      ];
    }
    return [
      { label: "1. Setup", frame: 0 },
      { label: "2. AST Scanner", frame: Math.round(durationFrames * 0.25) },
      { label: "3. Under The Hood", frame: Math.round(durationFrames * 0.52) },
      { label: "4. Outputs & Cache", frame: Math.round(durationFrames * 0.78) },
    ];
  }, [mode, durationFrames]);

  return (
    <div className="w-full bg-[#0c111c]/95 border border-slate-800/90 rounded-2xl p-3 sm:px-4 shadow-xl backdrop-blur-md flex flex-col gap-2.5">
      {/* Top row: Scrubber Timeline & Chapter Markers */}
      <div className="flex flex-col gap-1.5 w-full">
        <div className="relative flex items-center group">
          <input
            type="range"
            min={0}
            max={durationFrames - 1}
            value={currentFrame}
            onMouseDown={() => {
              isDraggingRef.current = true;
            }}
            onMouseUp={() => {
              isDraggingRef.current = false;
            }}
            onTouchStart={() => {
              isDraggingRef.current = true;
            }}
            onTouchEnd={() => {
              isDraggingRef.current = false;
            }}
            onChange={(e) => handleSeek(Number(e.target.value))}
            className="w-full h-2.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400 focus:outline-none transition-all hover:h-3"
            style={{
              background: `linear-gradient(to right, #06b6d4 0%, #06b6d4 ${(currentFrame / Math.max(1, durationFrames - 1)) * 100}%, #1e293b ${(currentFrame / Math.max(1, durationFrames - 1)) * 100}%, #1e293b 100%)`,
            }}
          />
        </div>

        {/* Chapter Step Markers */}
        <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 px-1">
          <div className="flex items-center gap-2">
            {chapterSteps.map((step, idx) => (
              <button
                key={idx}
                onClick={() => handleSeek(step.frame)}
                className={`px-2 py-0.5 rounded border transition flex items-center gap-1 ${
                  currentFrame >= step.frame &&
                  (idx === chapterSteps.length - 1 || currentFrame < chapterSteps[idx + 1].frame)
                    ? "bg-cyan-500/20 text-cyan-300 border-cyan-500/40 font-semibold shadow-sm"
                    : "bg-slate-900/60 text-slate-400 border-slate-800 hover:text-white hover:border-slate-700"
                }`}
              >
                <span>{step.label}</span>
              </button>
            ))}
          </div>

          {/* Time display */}
          <div className="flex items-center gap-2 font-mono text-xs text-slate-300 bg-slate-900/80 px-2.5 py-1 rounded-lg border border-slate-800">
            <span className="text-cyan-400 font-bold">{formatTime(currentFrame)}</span>
            <span className="text-slate-600">/</span>
            <span>{formatTime(durationFrames)}</span>
            <span className="text-[10px] text-slate-500">({currentFrame}f)</span>
          </div>
        </div>
      </div>

      {/* Bottom row: Playback Buttons, Volume, Speed, and View Toggles */}
      <div className="flex items-center justify-between pt-1 border-t border-slate-800/60">
        {/* Left: Playback Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={togglePlay}
            className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-black font-bold text-xs flex items-center gap-1.5 shadow-md shadow-cyan-500/20 transition active:scale-95"
            title={isPlaying ? "Pause (Space)" : "Play (Space)"}
          >
            {isPlaying ? <Pause className="w-4 h-4 fill-black" /> : <Play className="w-4 h-4 fill-black" />}
            <span>{isPlaying ? "Pause" : "Play"}</span>
          </button>

          <button
            onClick={() => skipFrames(-150)}
            className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white transition"
            title="Rewind 5 seconds"
          >
            <Rewind className="w-4 h-4" />
          </button>

          <button
            onClick={() => skipFrames(150)}
            className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white transition"
            title="Fast forward 5 seconds"
          >
            <FastForward className="w-4 h-4" />
          </button>

          <button
            onClick={() => handleSeek(0)}
            className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white transition"
            title="Restart from beginning"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          <div className="h-4 w-px bg-slate-800 mx-1" />

          {/* Volume Slider */}
          <div className="flex items-center gap-2 bg-slate-900/60 px-2 py-1 rounded-xl border border-slate-800">
            <button
              onClick={toggleMute}
              className="text-slate-400 hover:text-white transition"
              title={isMuted ? "Unmute" : "Mute"}
            >
              {isMuted || volume === 0 ? (
                <VolumeX className="w-4 h-4 text-red-400" />
              ) : (
                <Volume2 className="w-4 h-4 text-cyan-400" />
              )}
            </button>
            <input
              type="range"
              min={0}
              max={1}
              step={0.05}
              value={isMuted ? 0 : volume}
              onChange={(e) => handleVolumeChange(Number(e.target.value))}
              className="w-16 h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
            />
          </div>
        </div>

        {/* Right: Playback Speed, Aspect Ratio, Theater Mode */}
        <div className="flex items-center gap-2">
          {/* Playback speed selector */}
          <div className="flex items-center bg-slate-900/80 border border-slate-800 rounded-xl p-0.5 text-xs font-mono">
            {[0.75, 1.0, 1.25, 1.5].map((rate) => (
              <button
                key={rate}
                onClick={() => handleRateChange(rate)}
                className={`px-2 py-1 rounded-lg transition ${
                  playbackRate === rate
                    ? "bg-cyan-500 text-black font-bold"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                {rate}x
              </button>
            ))}
          </div>

          <div className="h-4 w-px bg-slate-800 mx-1" />

          {/* Aspect Ratio Toggle */}
          <button
            onClick={() => setAspectRatio(aspectRatio === "16:9" ? "9:16" : "16:9")}
            className="px-2.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-mono text-slate-300 hover:text-white transition flex items-center gap-1.5"
            title="Toggle Aspect Ratio"
          >
            <span>{aspectRatio}</span>
          </button>

          {/* Theater Mode Toggle */}
          <button
            onClick={() => {
              if (theaterMode) {
                setTheaterMode(false);
                setShowLeftSidebar(true);
                setShowRightSidebar(true);
              } else {
                setTheaterMode(true);
                setShowLeftSidebar(false);
                setShowRightSidebar(false);
              }
            }}
            className={`px-2.5 py-1.5 rounded-xl border text-xs font-semibold flex items-center gap-1 transition ${
              theaterMode
                ? "bg-cyan-500 text-black border-cyan-400 shadow-sm"
                : "bg-slate-900 hover:bg-slate-800 border-slate-800 text-slate-300 hover:text-white"
            }`}
            title="Toggle Theater Mode (expands screen)"
          >
            {theaterMode ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
            <span>{theaterMode ? "Standard" : "Theater"}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
