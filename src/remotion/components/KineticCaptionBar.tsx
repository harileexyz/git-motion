import React from "react";

interface KineticCaptionBarProps {
  stepNumber: number;
  title: string;
  captionText: string;
  highlightWords: string[];
  accentColor?: string;
}

export const KineticCaptionBar: React.FC<KineticCaptionBarProps> = ({
  stepNumber,
  title,
  captionText,
  highlightWords,
  accentColor = "#c4ff78", // Semicolon Mint
}) => {
  // Render caption with selective word emphasis
  const renderHighlightedWords = () => {
    const words = captionText.split(" ");
    return words.map((word, idx) => {
      const cleanWord = word.replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, "").toLowerCase();
      const isHighlighted = highlightWords.some(
        (hw) => hw.toLowerCase() === cleanWord || cleanWord.includes(hw.toLowerCase())
      );

      return (
        <span
          key={idx}
          className={`inline-block mr-1.5 transition-all ${
            isHighlighted ? "font-black scale-105" : "font-medium text-white/90"
          }`}
          style={{
            color: isHighlighted ? accentColor : undefined,
            textShadow: isHighlighted ? `0 0 16px ${accentColor}66` : undefined,
          }}
        >
          {word}
        </span>
      );
    });
  };

  return (
    <div className="absolute bottom-12 left-16 right-16 z-30 pointer-events-none flex flex-col items-center">
      <div
        className="w-full max-w-4xl rounded-2xl p-5 border shadow-2xl backdrop-blur-2xl flex items-center gap-5 transition-all duration-300"
        style={{
          backgroundColor: "rgba(11, 22, 40, 0.92)", // Semicolon Charcoal
          borderColor: "rgba(196, 255, 120, 0.3)", // Semicolon Mint outline
          boxShadow: "0 0 40px rgba(0, 0, 0, 0.8), 0 0 25px rgba(196, 255, 120, 0.15)",
        }}
      >
        {/* Step Indicator Badge */}
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-black text-[#0b1628] shrink-0 shadow-xl font-['Roboto',sans-serif]"
          style={{ backgroundColor: accentColor }}
        >
          0{stepNumber}
        </div>

        {/* Dynamic Caption Body */}
        <div className="flex-1 font-['Roboto',sans-serif]">
          <div className="flex items-center gap-2 mb-1.5">
            <span
              className="text-xs font-black uppercase tracking-widest px-3 py-1 rounded-full"
              style={{
                backgroundColor: `${accentColor}25`,
                color: accentColor,
                border: `1px solid ${accentColor}50`,
              }}
            >
              {title}
            </span>
          </div>

          <p className="text-2xl font-bold leading-snug tracking-tight">
            {renderHighlightedWords()}
          </p>
        </div>
      </div>
    </div>
  );
};
