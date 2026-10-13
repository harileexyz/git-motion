import React from "react";

interface SimpleFlowCanvasProps {
  activeStepIndex: number;
  progress: number;
  accentColor: string;
}

export const SimpleFlowCanvas: React.FC<SimpleFlowCanvasProps> = ({
  activeStepIndex,
  progress,
  accentColor,
}) => {
  const steps = [
    {
      num: 1,
      icon: "🖥️",
      title: "1. Start on Your Computer",
      detail: "Run the CLI or open the studio in your browser",
      badge: "No cloud needed",
    },
    {
      num: 2,
      icon: "🔍",
      title: "2. Scan Your Files",
      detail: "Checks which files connect and finds busy files",
      badge: "TypeScript • Python • Go",
    },
    {
      num: 3,
      icon: "🧩",
      title: "3. Organize 4 Main Groups",
      detail: "Sorts entry points, backend, engine & video maker",
      badge: "Clear structure",
    },
    {
      num: 4,
      icon: "🎬",
      title: "4. Create Smooth Video",
      detail: "Renders a clean video ready for your GitHub page",
      badge: "60 frames/sec",
    },
  ];

  return (
    <div className="flex-1 h-[520px] rounded-2xl border p-6 flex flex-col justify-between font-['Roboto',sans-serif] backdrop-blur-xl shadow-2xl bg-[rgba(11,22,40,0.92)] border-white/10">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-white/10">
        <div className="flex items-center gap-2">
          <span className="text-base">⚡</span>
          <span className="text-xs font-bold uppercase tracking-wider text-white">
            How Data Moves Through The App
          </span>
        </div>
        <span className="text-[10px] text-white/40 font-mono">step-by-step pipeline</span>
      </div>

      {/* 4 Pipeline Step Cards in Vertical Chain */}
      <div className="space-y-3.5 my-2">
        {steps.map((s, idx) => {
          const isActive = idx === activeStepIndex;
          const isPassed = idx < activeStepIndex;

          return (
            <div key={s.num} className="relative">
              <div
                className={`p-4 rounded-xl border flex items-center justify-between transition-all duration-300 ${
                  isActive
                    ? "bg-slate-900/95 shadow-xl scale-[1.02]"
                    : isPassed
                    ? "bg-white/[0.04] border-emerald-500/30 opacity-80"
                    : "bg-white/[0.02] border-white/5 opacity-50"
                }`}
                style={{
                  borderColor: isActive
                    ? accentColor
                    : isPassed
                    ? "rgba(16, 185, 129, 0.4)"
                    : "rgba(255, 255, 255, 0.08)",
                  boxShadow: isActive ? `0 0 30px ${accentColor}30` : "none",
                }}
              >
                <div className="flex items-center gap-3.5">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-lg shadow-md shrink-0"
                    style={{
                      backgroundColor: isActive ? accentColor : "rgba(255, 255, 255, 0.08)",
                    }}
                  >
                    <span>{s.icon}</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-bold text-white tracking-tight">
                        {s.title}
                      </h4>
                      {isPassed && (
                        <span className="text-emerald-400 text-xs font-bold">✓ done</span>
                      )}
                    </div>
                    <p className="text-xs text-white/60 mt-0.5">{s.detail}</p>
                  </div>
                </div>

                <span className="text-[10px] px-2.5 py-1 rounded-full bg-white/5 text-white/50 border border-white/5 font-mono">
                  {s.badge}
                </span>
              </div>

              {/* Connecting Downward Flow Arrow */}
              {idx < steps.length - 1 && (
                <div className="flex justify-center -my-1 relative z-10">
                  <span
                    className={`text-xs font-bold transition-all ${
                      idx < activeStepIndex ? "text-emerald-400" : "text-white/20"
                    }`}
                  >
                    ▼
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Footer Status */}
      <div className="pt-2.5 border-t border-white/5 flex items-center justify-between text-[11px]">
        <span className="text-white/40">Step {activeStepIndex + 1} of 4</span>
        <span className="font-bold" style={{ color: accentColor }}>
          {steps[activeStepIndex]?.title}
        </span>
      </div>
    </div>
  );
};
