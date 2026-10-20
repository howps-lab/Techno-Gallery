import React from "react";
import { GALLERY_DATA } from "../data/galleryData";
import { X, ArrowRight } from "lucide-react";

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
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-xl p-4 sm:p-8 animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-label="Photography Archive Index"
    >
      <div className="relative w-full max-w-5xl max-h-[90vh] bg-[#07090e]/95 border border-white/15 rounded-2xl p-6 sm:p-8 flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-5 mb-6 shrink-0">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 tracking-widest uppercase mb-1">
              <span>CATALOGUE 2026</span>
              <span>·</span>
              <span>8 FRAMES</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white uppercase">
              EXHIBITION ARCHIVE
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg border border-white/15 bg-white/5 hover:bg-white/15 text-slate-300 hover:text-white transition-colors cursor-pointer"
            aria-label="Close archive"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Grid of All Photos */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 overflow-y-auto pr-1">
          {GALLERY_DATA.map((item, idx) => {
            const isSelected = idx === currentIndex;
            return (
              <div
                key={item.id}
                onClick={() => {
                  onSelectIndex(idx);
                  onClose();
                }}
                className={`group relative rounded-xl overflow-hidden border cursor-pointer transition-all duration-300 aspect-[3/4] bg-[#0b0f17] ${
                  isSelected
                    ? "border-cyan-400 ring-2 ring-cyan-400/40 shadow-[0_0_20px_rgba(6,182,212,0.4)]"
                    : "border-white/10 hover:border-white/40"
                }`}
              >
                <img
                  src={item.src}
                  alt={item.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

                <div className="absolute top-2.5 left-2.5 text-[10px] font-mono text-cyan-400 tracking-widest font-semibold">
                  {item.number}
                </div>

                <div className="absolute bottom-3 left-3 right-3 text-left">
                  <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider mb-0.5">
                    {item.category}
                  </div>
                  <div className="text-xs font-semibold text-white truncate">
                    {item.title}
                  </div>
                  <div className="text-[10px] text-slate-400 truncate mt-0.5">
                    {item.location}
                  </div>
                </div>

                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="px-3 py-1.5 rounded-full bg-cyan-500/90 text-black text-xs font-semibold tracking-wider flex items-center gap-1 shadow-lg">
                    <span>SELECT</span>
                    <ArrowRight className="w-3 h-3" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
