import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { PhotoSlide } from "../data/galleryData";
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Camera, MapPin, Calendar, Aperture } from "lucide-react";

interface ImageViewerProps {
  isOpen: boolean;
  slide: PhotoSlide;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export const ImageViewer: React.FC<ImageViewerProps> = ({
  isOpen,
  slide,
  onClose,
  onPrev,
  onNext,
}) => {
  const [isZoomed, setIsZoomed] = useState(false);
  const [showMetadata, setShowMetadata] = useState(false);

  // Keyboard navigation & lock scroll
  useEffect(() => {
    if (!isOpen) {
      setIsZoomed(false);
      setShowMetadata(false);
      return;
    }
    // Ensure metadata starts hidden whenever opened
    setShowMetadata(false);


    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowLeft") {
        onPrev();
      } else if (e.key === "ArrowRight") {
        onNext();
      } else if (e.key === "z" || e.key === "Z") {
        setIsZoomed((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose, onPrev, onNext]);

  if (!isOpen) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 backdrop-blur-2xl transition-all duration-200"
      role="dialog"
      aria-modal="true"
      aria-label={`Detailed viewer for ${slide.title}`}
    >
      {/* 1. Top Action Bar with slide title and controls */}
      <div className="absolute top-0 left-0 right-0 z-30 flex items-center justify-between px-6 md:px-12 py-4 border-b border-white/10 bg-[#07090e]/90 backdrop-blur-md">
        <div className="flex items-center gap-3 sm:gap-4 text-xs font-mono tracking-widest text-slate-300">
          <span className="text-cyan-400 font-bold">{slide.number}</span>
          <span>/</span>
          <span className="uppercase text-white font-medium truncate max-w-[140px] sm:max-w-xs">{slide.title}</span>
          <span className="hidden sm:inline text-slate-500">·</span>
          <span className="hidden sm:inline text-slate-400">{slide.location}</span>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          {/* Zoom toggle button */}
          <button
            onClick={() => setIsZoomed(!isZoomed)}
            className="p-2 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors cursor-pointer"
            title={isZoomed ? "Zoom Out (Z)" : "Zoom In (Z)"}
            aria-label="Toggle zoom"
          >
            {isZoomed ? <ZoomOut className="w-4 h-4 text-cyan-400" /> : <ZoomIn className="w-4 h-4" />}
          </button>

          {/* Metadata toggle button */}
          <button
            onClick={() => setShowMetadata(!showMetadata)}
            className={`px-3 py-1.5 rounded-lg border text-xs font-mono transition-colors cursor-pointer ${
              showMetadata
                ? "border-cyan-400/50 bg-cyan-500/10 text-cyan-300"
                : "border-white/10 bg-white/5 text-slate-400 hover:text-white"
            }`}
          >
            EXIF DATA
          </button>
        </div>
      </div>

      {/* 2. Main Image Stage - Clicking backdrop closes viewer, clicking image zooms */}
      <div
        className="relative w-full h-full flex items-center justify-center p-6 sm:p-12 overflow-auto cursor-default"
        onClick={onClose}
      >
        <div
          onClick={(e) => {
            e.stopPropagation();
            setIsZoomed(!isZoomed);
          }}
          className={`relative max-w-full max-h-[85vh] transition-transform duration-300 select-none ${
            isZoomed ? "scale-150 cursor-zoom-out" : "scale-100 cursor-zoom-in"
          }`}
          title={isZoomed ? "Click image to Zoom Out" : "Click image to Zoom In"}
        >
          {/* Close ✕ Button positioned directly at the top right of the card */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            className="absolute top-3 right-3 sm:top-4 sm:right-4 z-40 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-black/80 hover:bg-black border border-white/30 hover:border-cyan-400 text-white hover:text-cyan-400 flex items-center justify-center transition-all duration-200 cursor-pointer shadow-[0_4px_25px_rgba(0,0,0,0.9)] backdrop-blur-md active:scale-90 group"
            title="Close"
            aria-label="Close"
          >
            <X className="w-5 h-5 stroke-[2.5] group-hover:rotate-90 transition-transform duration-200" />
          </button>

          <img
            src={slide.src}
            alt={slide.title}
            referrerPolicy="no-referrer"
            className="max-w-full max-h-[80vh] object-contain rounded-xl shadow-[0_25px_70px_rgba(0,0,0,0.9),0_0_40px_rgba(6,182,212,0.25)] border border-white/20"
          />
        </div>
      </div>

      {/* 3. Floating Navigation Controls */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onPrev();
        }}
        className="absolute left-6 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full border border-white/20 bg-black/80 hover:bg-black hover:border-cyan-400 text-slate-200 hover:text-white flex items-center justify-center transition-all cursor-pointer backdrop-blur-md shadow-2xl active:scale-95"
        aria-label="Previous photograph"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={(e) => {
          e.stopPropagation();
          onNext();
        }}
        className="absolute right-6 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full border border-white/20 bg-black/80 hover:bg-black hover:border-cyan-400 text-slate-200 hover:text-white flex items-center justify-center transition-all cursor-pointer backdrop-blur-md shadow-2xl active:scale-95"
        aria-label="Next photograph"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* 4. Bottom Left Dismissal Hint */}
      <div className="absolute bottom-6 left-6 md:left-12 z-30 pointer-events-none text-[11px] font-mono text-slate-400/80 bg-black/60 px-3 py-1.5 rounded-lg border border-white/10 backdrop-blur-md">
        <span>Click ✕ or anywhere outside image to close</span>
      </div>

      {/* 5. Expandable EXIF Metadata Drawer */}
      {showMetadata && (
        <div
          onClick={(e) => e.stopPropagation()}
          className="absolute bottom-6 right-6 md:right-12 z-30 max-w-sm rounded-xl border border-white/20 bg-[#07090e]/95 backdrop-blur-2xl p-5 shadow-2xl text-left pointer-events-auto"
        >
          <div className="flex items-center justify-between border-b border-white/10 pb-2.5 mb-3">
            <span className="text-xs font-mono tracking-widest text-cyan-400 uppercase font-semibold">
              EXIF & SPECIFICATIONS
            </span>
            <span className="text-[10px] font-mono text-slate-400">{slide.year}</span>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed mb-4 italic font-light">
            {slide.curatorNote}
          </p>

          <div className="grid grid-cols-2 gap-2 text-[11px] font-mono text-slate-300">
            <div className="flex items-center gap-1.5 text-slate-300">
              <Camera className="w-3 h-3 text-cyan-400 shrink-0" />
              <span className="truncate">{slide.exif.camera}</span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-300">
              <Aperture className="w-3 h-3 text-cyan-400 shrink-0" />
              <span>{slide.exif.aperture} · {slide.exif.shutterSpeed}</span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-300">
              <MapPin className="w-3 h-3 text-cyan-400 shrink-0" />
              <span className="truncate">{slide.location}</span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-300">
              <Calendar className="w-3 h-3 text-cyan-400 shrink-0" />
              <span>ISO {slide.exif.iso}</span>
            </div>
          </div>
        </div>
      )}
    </div>,
    document.body
  );
};
