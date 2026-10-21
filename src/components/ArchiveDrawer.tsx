import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import { GALLERY_DATA } from "../data/galleryData";
import { X, ArrowRight, Check, ChevronDown } from "lucide-react";

interface ArchiveDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  currentIndex: number;
  onSelectIndex: (index: number) => void;
}

export const ArchiveDrawer: React.FC<ArchiveDrawerProps> = ({
  isOpen,
  onClose,
  currentIndex,
  onSelectIndex,
}) => {
  // Close on Escape key press
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/85 backdrop-blur-xl p-3 sm:p-6 md:p-8 animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-label="Photography Archive Index"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-5xl h-[90dvh] sm:h-[88vh] max-h-[92vh] bg-[#07090e]/95 border border-white/15 rounded-2xl p-4 sm:p-7 md:p-8 flex flex-col shadow-2xl overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-3 sm:pb-5 sm:mb-6 shrink-0">
          <div>
            <div className="flex items-center gap-2 text-[11px] sm:text-xs font-mono text-cyan-400 tracking-widest uppercase mb-1">
              <span>CATALOGUE 2026</span>
              <span>·</span>
              <span>8 FRAMES</span>
            </div>
            <h2 className="text-lg sm:text-2xl font-bold tracking-tight text-white uppercase">
              EXHIBITION ARCHIVE
            </h2>
            <div className="flex items-center gap-1.5 text-[11px] text-slate-400 font-mono mt-0.5 md:hidden">
              <ChevronDown className="w-3.5 h-3.5 text-cyan-400 animate-bounce" />
              <span>Scroll down to see all cards · Tap to open</span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 sm:p-2.5 rounded-lg border border-white/15 bg-white/5 hover:bg-white/15 text-slate-300 hover:text-white transition-colors cursor-pointer"
            aria-label="Close archive"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Container:
            - min-h-0 is essential so flex child shrinks and triggers vertical scroll
            - flex-col on mobile so cards are listed one after another sequentially
            - md:grid on desktop for gallery grid layout
        */}
        <div
          className="flex-1 min-h-0 overflow-y-auto overscroll-contain archive-scrollbar pr-1 sm:pr-2 pb-10 touch-pan-y"
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          <div className="flex flex-col gap-4 sm:gap-5 md:grid md:grid-cols-3 lg:grid-cols-4 md:gap-5">
            {GALLERY_DATA.map((item, idx) => {
              const isSelected = idx === currentIndex;
              return (
                <div
                  key={item.id}
                  onClick={() => {
                    onSelectIndex(idx);
                    onClose();
                  }}
                  className={`group relative rounded-xl overflow-hidden border cursor-pointer transition-all duration-300 w-full aspect-[16/10] sm:aspect-[4/3] md:aspect-[3/4] bg-[#0b0f17] shrink-0 select-none ${
                    isSelected
                      ? "border-cyan-400 ring-2 ring-cyan-400/50 shadow-[0_0_25px_rgba(6,182,212,0.45)]"
                      : "border-white/10 hover:border-white/40 active:border-cyan-400/60"
                  }`}
                >
                  {/* Photo Image */}
                  <img
                    src={item.src}
                    alt={item.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 pointer-events-none"
                  />

                  {/* Dark Contrast Gradient Scrim */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/45 to-black/20 pointer-events-none" />

                  {/* Top Badges: Number, Active status, Location/Year */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                    <span className="text-xs font-mono font-bold text-cyan-400 bg-black/70 backdrop-blur-md px-2 py-0.5 rounded border border-cyan-400/30">
                      {item.number}
                    </span>

                    {isSelected ? (
                      <span className="flex items-center gap-1 text-[10px] font-mono font-semibold text-cyan-300 bg-cyan-950/85 border border-cyan-400/60 px-2 py-0.5 rounded-full shadow-md">
                        <Check className="w-3 h-3 text-cyan-400 stroke-[3]" />
                        <span>VIEWING</span>
                      </span>
                    ) : (
                      <span className="text-[10px] font-mono text-slate-300 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded border border-white/10">
                        {item.location}
                      </span>
                    )}
                  </div>

                  {/* Bottom Card Information */}
                  <div className="absolute bottom-3 left-3 right-3 text-left pointer-events-none">
                    <div className="text-[10px] sm:text-[11px] font-mono text-cyan-400/90 uppercase tracking-widest mb-0.5">
                      {item.category}
                    </div>
                    <div className="text-base sm:text-sm font-bold text-white truncate drop-shadow-md">
                      {item.title}
                    </div>
                    <div className="text-xs sm:text-[11px] text-slate-300 truncate mt-0.5 font-sans font-light">
                      {item.subtitle}
                    </div>
                  </div>

                  {/* Desktop Hover / Select Prompt */}
                  <div className="absolute inset-0 hidden sm:flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/35 pointer-events-none">
                    <div className="px-3.5 py-1.5 rounded-full bg-cyan-400 text-slate-950 text-xs font-bold tracking-wider flex items-center gap-1.5 shadow-xl">
                      <span>SELECT FRAME</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};
