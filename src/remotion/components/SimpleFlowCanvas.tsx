import React from "react";

interface SimpleFlowCanvasProps {
  activeStepIndex: number;
  progress: number;
  accentColor: string;
}

export const SimpleFlowCanvas: React.FC<SimpleFlowCanvasProps> = ({
  activeStepIndex,
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
      badge: "Clean architecture",
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
    <div className="flex-1 h-[680px] rounded-3xl border p-8 flex flex-col justify-between font-['Roboto',sans-serif] backdrop-blur-2xl shadow-2xl bg-[rgba(11,22,40,0.95)] border-white/15">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-white/10">
        <div className="flex items-center gap-3">
          <span className="text-2xl">⚡</span>
          <span className="text-lg font-black uppercase tracking-wider text-white">
            How Data Moves Through The App
          </span>
        </div>
        <span className="text-xs text-white/50 font-mono">step-by-step pipeline</span>
      </div>

      {/* 4 Pipeline Step Cards in Vertical Chain */}
      <div className="space-y-4 my-2">
        {steps.map((s, idx) => {
          const isActive = idx === activeStepIndex;
          const isPassed = idx < activeStepIndex;

          return (
            <div key={s.num} className="relative">
              <div
                className={`p-5 rounded-2xl border flex items-center justify-between transition-all duration-300 ${
                  isActive
                    ? "bg-slate-900/98 shadow-2xl scale-[1.02]"
                    : isPassed
                    ? "bg-white/[0.04] border-emerald-500/30 opacity-75"
                    : "bg-white/[0.02] border-white/5 opacity-45"
                }`}
                style={{
                  borderColor: isActive
                    ? accentColor
                    : isPassed
                    ? "rgba(16, 185, 129, 0.4)"
                    : "rgba(255, 255, 255, 0.08)",
                  boxShadow: isActive ? `0 0 35px ${accentColor}35` : "none",
                }}
              >
                <div className="flex items-center gap-5">
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl shadow-md shrink-0"
                    style={{
                      backgroundColor: isActive ? accentColor : "rgba(255, 255, 255, 0.08)",
                    }}
                  >
                    <span>{s.icon}</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-3">
                      <h4 className="text-2xl font-black text-white tracking-tight">
                        {s.title}
                      </h4>
                      {isPassed && (
                        <span className="text-emerald-400 text-sm font-bold font-mono">✓ done</span>
                      )}
                    </div>
                    <p className="text-base text-white/80 mt-1 leading-snug">{s.detail}</p>
                  </div>
                </div>

                <span className="text-sm px-4 py-2 rounded-full bg-white/5 text-white/70 border border-white/10 font-mono font-medium shrink-0">
                  {s.badge}
                </span>
              </div>

              {/* Connecting Downward Flow Arrow */}
              {idx < steps.length - 1 && (
                <div className="flex justify-center -my-1 relative z-10">
                  <span
                    className={`text-lg font-bold transition-all ${
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
      <div className="pt-3 border-t border-white/10 flex items-center justify-between text-sm">
        <span className="text-white/50">Step {activeStepIndex + 1} of 4</span>
        <span className="font-bold text-base" style={{ color: accentColor }}>
          {steps[activeStepIndex]?.title}
        </span>
      </div>
    </div>
  );
};
