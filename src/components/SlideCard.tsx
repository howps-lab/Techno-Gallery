import React, { useState } from "react";
import { PhotoSlide } from "../data/galleryData";
import { Expand, Eye } from "lucide-react";

interface SlideCardProps {
  slide: PhotoSlide;
  delta: number;
  isActive: boolean;
  onSelect: () => void;
  onOpenViewer: () => void;
  mousePosition: { x: number; y: number };
}

export const SlideCard: React.FC<SlideCardProps> = ({
  slide,
  delta,
  isActive,
  onSelect,
  onOpenViewer,
  mousePosition,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  // If slide is too far in background, don't render to keep performance pristine
  if (Math.abs(delta) > 2.5) {
    return null;
  }

  const absDelta = Math.abs(delta);
  const sign = Math.sign(delta);

  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
  const xOffset = isMobile ? 170 : 315;
  const translateX = delta * xOffset;
  const translateZ = isActive ? 25 : -absDelta * (isMobile ? 100 : 145);
  const rotateY = -sign * Math.min(absDelta * 26, 45);
  const scale = Math.max(1 - absDelta * 0.16, 0.65);
  const opacity = Math.max(1 - absDelta * 0.35, 0.2);
  const zIndex = isActive ? 35 : (isHovered && !isActive ? 25 : Math.round(20 - absDelta * 5));
  const blur = absDelta > 0.8 ? `${(absDelta - 0.5) * 1.5}px` : "0px";
  
  // When side card is rolled over (hovered), brighten it
  const baseBrightness = isActive ? 1.05 : 0.65;
  const currentBrightness = isHovered && !isActive ? 0.95 : baseBrightness;

  // Active card mouse tilt
  const activeTiltX = isActive ? -mousePosition.y * 6 : 0;
  const activeTiltY = isActive ? mousePosition.x * 8 : 0;

  const cardStyle: React.CSSProperties = {
    transform: `translate3d(calc(-50% + ${translateX}px), -50%, ${translateZ}px) rotateY(${rotateY + activeTiltY}deg) rotateX(${activeTiltX}deg) scale(${scale})`,
    opacity: isHovered && !isActive ? 0.9 : opacity,
    zIndex,
    filter: `brightness(${currentBrightness}) blur(${isHovered ? "0px" : blur})`,
    transition: "transform 0.55s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease, filter 0.3s ease",
  };

  return (
    <div
      style={cardStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={() => {
        if (!isHovered) setIsHovered(true);
      }}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => {
        if (isActive) {
          onOpenViewer();
        } else {
          onSelect();
        }
      }}
      className={`absolute left-1/2 top-1/2
        w-[252px] sm:w-[315px] md:w-[360px] lg:w-[396px] 
        h-[351px] sm:h-[432px] md:h-[495px] lg:h-[540px] 
        rounded-2xl overflow-hidden cursor-pointer select-none
        border transition-colors duration-300
        ${
          isActive
            ? "border-cyan-400/50 shadow-[0_20px_60px_rgba(0,0,0,0.85),0_0_35px_rgba(6,182,212,0.3)]"
            : isHovered
            ? "border-cyan-400/70 shadow-[0_15px_40px_rgba(0,0,0,0.7),0_0_20px_rgba(6,182,212,0.25)]"
            : "border-white/20 shadow-2xl hover:border-white/40"
        }
        bg-[#090d14] group
      `}
      role="button"
      tabIndex={isActive ? 0 : -1}
      aria-label={`${slide.title} by NOIR VISUALS`}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          if (isActive) onOpenViewer();
          else onSelect();
        }
      }}
    >
      {/* Real High-Resolution Photographic Image */}
      <img
        src={slide.src}
        alt={slide.title}
        referrerPolicy="no-referrer"
        className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105 pointer-events-none"
      />

      {/* Elegant Cinematic Gradients (preserving photo legibility) */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />

      {/* Active Card Interactive Light Reflection following mouse */}
      {isActive && (
        <div
          className="absolute inset-0 pointer-events-none opacity-40 mix-blend-overlay transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle at ${50 + mousePosition.x * 40}% ${
              50 + mousePosition.y * 40
            }%, rgba(255,255,255,0.45) 0%, transparent 60%)`,
          }}
        />
      )}

      {/* Cinematic Viewfinder Corner Crosshairs */}
      <div className="absolute top-3 left-3 w-3 h-3 border-t border-l border-white/50 pointer-events-none" />
      <div className="absolute top-3 right-3 w-3 h-3 border-t border-r border-white/50 pointer-events-none" />
      <div className="absolute bottom-3 left-3 w-3 h-3 border-b border-l border-white/50 pointer-events-none" />
      <div className="absolute bottom-3 right-3 w-3 h-3 border-b border-r border-white/50 pointer-events-none" />

      {/* Card Header Tag */}
      <div className="absolute top-4 left-5 right-5 flex items-center justify-between pointer-events-none text-[11px] font-mono tracking-widest text-slate-300">
        <span className="text-cyan-400 font-semibold">{slide.number}</span>
        <span className="uppercase text-slate-200">{slide.category}</span>
      </div>

      {/* Roll-over Hover Action Badge */}
      {isActive ? (
        <div
          className={`absolute inset-0 flex items-center justify-center transition-all duration-200 pointer-events-none ${
            isHovered ? "opacity-100 scale-100" : "opacity-0 scale-95"
          } group-hover:opacity-100 group-hover:scale-100`}
        >
          <div className="px-5 py-2.5 rounded-full bg-black/85 backdrop-blur-md border border-cyan-400 text-cyan-300 text-xs font-medium tracking-wider flex items-center gap-2 shadow-[0_0_25px_rgba(6,182,212,0.6)]">
            <Expand className="w-4 h-4 text-cyan-400" />
            <span className="font-semibold tracking-wider">EXPAND FULLSCREEN</span>
          </div>
        </div>
      ) : (
        <div
          className={`absolute inset-0 flex items-center justify-center transition-all duration-200 pointer-events-none ${
            isHovered ? "opacity-100 scale-100" : "opacity-0 scale-95"
          } group-hover:opacity-100 group-hover:scale-100`}
        >
          <div className="px-3.5 py-1.5 rounded-full bg-black/80 backdrop-blur-md border border-white/40 text-white text-xs font-mono tracking-wider flex items-center gap-1.5 shadow-lg">
            <Eye className="w-3.5 h-3.5 text-cyan-400" />
            <span>SWITCH TO FRAME</span>
          </div>
        </div>
      )}

      {/* Card Footer Metadata */}
      <div className="absolute bottom-4 left-5 right-5 flex items-center justify-between pointer-events-none text-[10px] font-mono text-slate-300">
        <span className="tracking-wider">{slide.location}</span>
        <span className="tracking-wider text-slate-400">{slide.exif.focalLength} · {slide.exif.aperture}</span>
      </div>
    </div>
  );
};
