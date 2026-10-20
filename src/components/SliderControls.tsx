import React from "react";
import { ChevronLeft, ChevronRight, Play, Pause, Grid, MoveHorizontal } from "lucide-react";

interface SliderControlsProps {
  currentIndex: number;
  totalSlides: number;
  onPrev: () => void;
  onNext: () => void;
  onSelectIndex: (index: number) => void;
  autoplay: boolean;
  onToggleAutoplay: () => void;
  autoplayProgress: number; // 0 to 100
  onOpenArchive: () => void;
}

export const SliderControls: React.FC<SliderControlsProps> = ({
  currentIndex,
  totalSlides,
  onPrev,
  onNext,
  onSelectIndex,
  autoplay,
  onToggleAutoplay,
  autoplayProgress,
  onOpenArchive,
}) => {
  const currentFormatted = String(currentIndex + 1).padStart(2, "0");
  const totalFormatted = String(totalSlides).padStart(2, "0");

  return (
    <footer className="fixed bottom-0 left-0 right-0 z-40 px-4 sm:px-6 md:px-12 py-2.5 sm:py-4 border-t border-white/[0.08] backdrop-blur-md bg-black/45 flex items-center justify-between gap-2 sm:gap-4">
      {/* Left Zone: Slide Index Indicator & Autoplay Status */}
      <div className="flex items-center gap-6 text-xs font-mono tracking-widest">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-cyan-400 tabular-nums">
            {currentFormatted}
          </span>
          <span className="text-slate-600">/</span>
          <span className="text-slate-400 tabular-nums">{totalFormatted}</span>
        </div>

        {/* Minimal Autoplay Indicator & Toggle Button */}
        <button
          onClick={onToggleAutoplay}
          className="flex items-center gap-2 px-2.5 py-1 rounded-md border border-white/10 hover:border-cyan-400/40 bg-white/5 text-slate-300 hover:text-white transition-colors cursor-pointer"
          title={autoplay ? "Pause Autoplay" : "Start Autoplay"}
          aria-label={autoplay ? "Pause Autoplay" : "Start Autoplay"}
        >
          {autoplay ? (
            <Pause className="w-3 h-3 text-cyan-400" />
          ) : (
            <Play className="w-3 h-3 text-slate-400" />
          )}
          <span className="text-[11px] text-slate-300">
            {autoplay ? "AUTO" : "MANUAL"}
          </span>
          {autoplay && (
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-cyan-500"></span>
            </span>
          )}
        </button>

        {/* Drag/Swipe hint */}
        <div className="hidden lg:flex items-center gap-1.5 text-slate-500 text-[11px]">
          <MoveHorizontal className="w-3.5 h-3.5" />
          <span>DRAG OR USE ARROWS</span>
        </div>
      </div>

      {/* Center Zone: Segmented Progress Bar & Direct Slide Bullets */}
      <div className="hidden sm:flex flex-col items-center gap-1.5 w-auto max-w-xs md:max-w-md">
        {/* Continuous Autoplay Progress Bar */}
        <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden relative">
          <div
            className="h-full bg-gradient-to-r from-cyan-500 to-sky-400 transition-all duration-100 ease-linear"
            style={{ width: `${autoplayProgress}%` }}
          />
        </div>

        {/* Segmented Dots */}
        <div className="flex items-center gap-2">
          {Array.from({ length: totalSlides }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => onSelectIndex(idx)}
              className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                idx === currentIndex
                  ? "w-8 bg-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.8)]"
                  : "w-2 bg-white/20 hover:bg-white/50"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Right Zone: Navigation Buttons & Archive Quick Toggle */}
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenArchive}
          className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white text-xs font-mono transition-colors cursor-pointer"
        >
          <Grid className="w-3.5 h-3.5 text-cyan-400" />
          <span>GRID</span>
        </button>

        {/* Previous Button */}
        <button
          onClick={onPrev}
          className="w-10 h-10 rounded-lg border border-white/15 bg-white/5 hover:bg-white/15 hover:border-cyan-400/50 text-slate-200 hover:text-white flex items-center justify-center transition-all cursor-pointer shadow-lg active:scale-95"
          aria-label="Previous photograph"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Next Button */}
        <button
          onClick={onNext}
          className="w-10 h-10 rounded-lg border border-white/15 bg-white/5 hover:bg-white/15 hover:border-cyan-400/50 text-slate-200 hover:text-white flex items-center justify-center transition-all cursor-pointer shadow-lg active:scale-95"
          aria-label="Next photograph"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </footer>
  );
};
