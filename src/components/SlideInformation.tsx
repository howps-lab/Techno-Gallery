import React from "react";
import { PhotoSlide } from "../data/galleryData";
import { Camera, MapPin, Maximize2, Info } from "lucide-react";

interface SlideInformationProps {
  slide: PhotoSlide;
  onOpenViewer: () => void;
  onOpenAbout: () => void;
}

export const SlideInformation: React.FC<SlideInformationProps> = ({
  slide,
  onOpenViewer,
  onOpenAbout,
}) => {
  return (
    <div className="absolute left-1/2 -translate-x-1/2 w-[252px] sm:w-[315px] top-[447px] sm:top-[528px] md:top-auto md:bottom-28 md:left-12 md:translate-x-0 md:w-auto md:max-w-lg z-20 pointer-events-none text-left">
      {/* Editorial Number & Category with Unboxed Typography */}
      <div className="flex items-center gap-2 text-[11px] sm:text-xs font-mono tracking-[0.25em] text-cyan-400 mb-1.5 sm:mb-2">
        <span className="font-semibold">{slide.number}</span>
        <span className="text-slate-500">/</span>
        <span className="text-slate-300 uppercase">{slide.category}</span>
        <span className="text-slate-500">·</span>
        <span className="text-slate-400 font-normal">{slide.year}</span>
      </div>

      {/* Main Photographic Headline */}
      <h1 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white uppercase leading-[1.1] mb-2 sm:mb-2.5 drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)]">
        {slide.title}
      </h1>

      {/* Subtitle / Poetic Premise - Hidden on mobile landing screen */}
      <p className="hidden md:block text-xs sm:text-sm text-slate-300/90 leading-relaxed max-w-md mb-4 font-light italic drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
        "{slide.subtitle}"
      </p>

      {/* Technical Metadata Bar (Location & Camera EXIF details) - Hidden on mobile landing screen */}
      <div className="hidden md:flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[11px] font-mono text-slate-400 mb-4 pt-2 border-t border-white/10">
        <div className="flex items-center gap-1.5 text-slate-300">
          <MapPin className="w-3 h-3 text-cyan-400" />
          <span>{slide.location}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Camera className="w-3 h-3 text-slate-500" />
          <span>{slide.exif.lens}</span>
        </div>
        <div className="flex items-center gap-2 text-cyan-300/80">
          <span>{slide.exif.aperture}</span>
          <span>·</span>
          <span>{slide.exif.shutterSpeed}</span>
          <span>·</span>
          <span>ISO {slide.exif.iso}</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-2 sm:gap-3 pointer-events-auto mt-1">
        <button
          onClick={onOpenViewer}
          className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg bg-white/10 hover:bg-cyan-500/20 border border-white/20 hover:border-cyan-400/60 text-white text-[11px] sm:text-xs font-medium tracking-wider uppercase transition-all duration-200 flex items-center gap-1.5 cursor-pointer shadow-lg backdrop-blur-md"
        >
          <Maximize2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
          <span>Inspect Frame</span>
        </button>
        <button
          onClick={onOpenAbout}
          className="px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-lg bg-black/40 hover:bg-black/60 border border-white/10 text-slate-400 hover:text-slate-200 text-[11px] sm:text-xs font-mono tracking-wider transition-all duration-200 flex items-center gap-1.5 cursor-pointer backdrop-blur-md"
        >
          <Info className="w-3.5 h-3.5 shrink-0" />
          <span>Curator Note</span>
        </button>
      </div>
    </div>
  );
};
