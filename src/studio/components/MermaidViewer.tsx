import React, { useEffect, useState, useRef } from "react";
import mermaid from "mermaid";
import { Copy, Check, Code, Eye, RefreshCw } from "lucide-react";

interface MermaidViewerProps {
  chartText: string;
  title: string;
  subtitle: string;
}

export const MermaidViewer: React.FC<MermaidViewerProps> = ({
  chartText,
  title,
  subtitle,
}) => {
  const [svgHtml, setSvgHtml] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [mode, setMode] = useState<"diagram" | "code">("diagram");
  const [copied, setCopied] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Clean raw markdown fences
  const cleanChart = React.useMemo(() => {
    return chartText.replace(/```mermaid\n?/, "").replace(/```\n?$/, "").trim();
  }, [chartText]);

  useEffect(() => {
    mermaid.initialize({
      startOnLoad: false,
      theme: "dark",
      themeVariables: {
        darkMode: true,
        background: "#0b1628",
        primaryColor: "#1e293b",
        primaryTextColor: "#ffffff",
        primaryBorderColor: "#7aa2f7",
        lineColor: "#00f3ff",
        secondaryColor: "#161b26",
        tertiaryColor: "#0f172a",
      },
      securityLevel: "loose",
      fontFamily: "Roboto, monospace",
    });

    let isMounted = true;

    async function renderChart() {
      try {
        setError(null);
        const uniqueId = `mermaid-${Math.random().toString(36).substr(2, 9)}`;
        const { svg } = await mermaid.render(uniqueId, cleanChart);
        if (isMounted) {
          setSvgHtml(svg);
        }
      } catch (err: any) {
        if (isMounted) {
          console.error("Mermaid render error:", err);
          setError(err.message || "Failed to render visual diagram");
        }
      }
    }

    renderChart();

    return () => {
      isMounted = false;
    };
  }, [cleanChart]);

  const handleCopy = () => {
    navigator.clipboard.writeText(chartText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full h-full flex flex-col justify-between py-2">
      {/* Top Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2 font-['Roboto',sans-serif]">
            <span>📊</span>
            {title}
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">{subtitle}</p>
        </div>

        {/* View Controls */}
        <div className="flex items-center gap-3">
          <div className="flex items-center bg-slate-900 border border-slate-800 rounded-xl p-1 text-xs">
            <button
              onClick={() => setMode("diagram")}
              className={`px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 transition ${
                mode === "diagram"
                  ? "bg-cyan-500 text-black shadow-md shadow-cyan-500/20"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Visual Diagram</span>
            </button>
            <button
              onClick={() => setMode("code")}
              className={`px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 transition ${
                mode === "code"
                  ? "bg-cyan-500 text-black shadow-md shadow-cyan-500/20"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Code className="w-3.5 h-3.5" />
              <span>Raw Code</span>
            </button>
          </div>

          <button
            onClick={handleCopy}
            className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-semibold text-white flex items-center gap-1.5 shadow-lg transition"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-300">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-cyan-400" />
                <span>Copy Markdown</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Diagram Canvas or Code View */}
      <div className="flex-1 bg-[#0b1628] border border-slate-800 rounded-2xl p-6 overflow-auto shadow-2xl relative flex items-center justify-center">
        {mode === "diagram" ? (
          error ? (
            <div className="text-center text-xs text-rose-400 font-mono">
              <p>Could not render visual graph: {error}</p>
              <button
                onClick={() => setMode("code")}
                className="mt-3 px-3 py-1 bg-slate-800 rounded text-slate-300 hover:text-white"
              >
                View raw markdown code
              </button>
            </div>
          ) : svgHtml ? (
            <div
              ref={containerRef}
              className="w-full h-full flex items-center justify-center overflow-auto [&>svg]:max-w-full [&>svg]:max-h-full [&>svg]:w-auto [&>svg]:h-auto"
              dangerouslySetInnerHTML={{ __html: svgHtml }}
            />
          ) : (
            <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
              <RefreshCw className="w-4 h-4 animate-spin text-cyan-400" />
              <span>Drawing visual flowchart...</span>
            </div>
          )
        ) : (
          <pre className="w-full h-full font-mono text-xs text-slate-300 selection:bg-cyan-500/30 overflow-auto whitespace-pre">
            {chartText}
          </pre>
        )}
      </div>

      {/* Footer Info */}
      <div className="mt-3 p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-400 flex items-center justify-between">
        <span>💡 Paste this diagram into your GitHub README or PR:</span>
        <code className="text-cyan-400 font-mono text-[11px]">```mermaid ... ```</code>
      </div>
    </div>
  );
};
