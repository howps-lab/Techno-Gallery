import React, { useState, useEffect, useRef, useCallback } from "react";
import { GALLERY_DATA } from "../data/galleryData";
import { SlideCard } from "./SlideCard";
import { SlideInformation } from "./SlideInformation";
import { SliderControls } from "./SliderControls";
import { ImageViewer } from "./ImageViewer";

interface CinematicSliderProps {
  onOpenAbout: () => void;
  onOpenContact: () => void;
  onOpenArchive: () => void;
  currentIndex: number;
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
}

export const CinematicSlider: React.FC<CinematicSliderProps> = ({
  onOpenAbout,
  onOpenArchive,
  currentIndex,
  setCurrentIndex,
}) => {
  const totalSlides = GALLERY_DATA.length;
  const [autoplay, setAutoplay] = useState(true);
  const [autoplayProgress, setAutoplayProgress] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [isInteracting, setIsInteracting] = useState(false);

  // Mouse Parallax coordinates (-1 to 1)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Drag / Swipe State
  const dragStartX = useRef<number | null>(null);
  const [dragOffset, setDragOffset] = useState(0);
  const isDragging = useRef(false);

  // Wheel Throttle timestamp
  const lastWheelTime = useRef(0);

  // Preload neighboring images
  useEffect(() => {
    const prevIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    const nextIndex = (currentIndex + 1) % totalSlides;
    const preloadList = [GALLERY_DATA[currentIndex].src, GALLERY_DATA[prevIndex].src, GALLERY_DATA[nextIndex].src];

    preloadList.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, [currentIndex, totalSlides]);

  // Navigate functions
  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
    setAutoplayProgress(0);
  }, [totalSlides, setCurrentIndex]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
    setAutoplayProgress(0);
  }, [totalSlides, setCurrentIndex]);

  const handleSelectIndex = useCallback((index: number) => {
    setCurrentIndex(index);
    setAutoplayProgress(0);
  }, [setCurrentIndex]);

  // Stop autoplay when entering fullscreen (browser fullscreen or full-screen image viewer)
  useEffect(() => {
    const handleFullscreenChange = () => {
      if (document.fullscreenElement) {
        setAutoplay(false);
        setAutoplayProgress(0);
      }
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener("webkitfullscreenchange", handleFullscreenChange);
    };
  }, []);

  // When full-screen image viewer opens, stop autoplay
  useEffect(() => {
    if (isViewerOpen) {
      setAutoplay(false);
      setAutoplayProgress(0);
    }
  }, [isViewerOpen]);

  // Autoplay ticker (6 seconds interval)
  const AUTOPLAY_DURATION = 6000;
  useEffect(() => {
    if (!autoplay || isViewerOpen || isInteracting || Boolean(document.fullscreenElement)) {
      return;
    }

    const intervalStep = 50;
    const startTime = Date.now();

    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min((elapsed / AUTOPLAY_DURATION) * 100, 100);
      setAutoplayProgress(progress);

      if (elapsed >= AUTOPLAY_DURATION) {
        clearInterval(timer);
        handleNext();
      }
    }, intervalStep);

    return () => clearInterval(timer);
  }, [autoplay, isViewerOpen, isInteracting, handleNext, currentIndex]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isViewerOpen) return;
      if (e.key === "ArrowLeft") {
        handlePrev();
      } else if (e.key === "ArrowRight") {
        handleNext();
      } else if (e.key === " ") {
        // Spacebar toggles autoplay
        e.preventDefault();
        setAutoplay((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isViewerOpen, handlePrev, handleNext]);

  // Mouse Parallax Move
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e;
    const width = window.innerWidth;
    const height = window.innerHeight;
    const normX = (clientX / width - 0.5) * 2;
    const normY = (clientY / height - 0.5) * 2;
    setMousePosition({ x: normX, y: normY });
  };

  // Wheel scroll navigation with 380ms throttling
  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    if (isViewerOpen) return;
    const now = Date.now();
    if (now - lastWheelTime.current < 380) return;

    if (Math.abs(e.deltaX) > 15 || Math.abs(e.deltaY) > 15) {
      lastWheelTime.current = now;
      if (e.deltaX > 15 || e.deltaY > 15) {
        handleNext();
      } else {
        handlePrev();
      }
    }
  };

  // Pointer Drag handlers (supports mouse & touch)
  const hasDraggedRef = useRef(false);

  const handlePointerDown = (e: React.PointerEvent) => {
    if (isViewerOpen) return;
    dragStartX.current = e.clientX;
    isDragging.current = true;
    hasDraggedRef.current = false;
    setIsInteracting(true);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current || dragStartX.current === null) return;
    const diff = e.clientX - dragStartX.current;
    if (Math.abs(diff) > 8) {
      hasDraggedRef.current = true;
    }
    setDragOffset(diff);
  };

  const handlePointerUp = () => {
    if (!isDragging.current) return;
    isDragging.current = false;
    setIsInteracting(false);

    if (dragOffset > 60) {
      handlePrev();
    } else if (dragOffset < -60) {
      handleNext();
    }

    setDragOffset(0);
    dragStartX.current = null;
    setTimeout(() => {
      hasDraggedRef.current = false;
    }, 60);
  };

  const handleCardClick = (idx: number, isActive: boolean) => {
    if (hasDraggedRef.current) return;
    if (isActive) {
      setAutoplay(false);
      setAutoplayProgress(0);
      setIsViewerOpen(true);
    } else {
      handleSelectIndex(idx);
    }
  };

  const activeSlide = GALLERY_DATA[currentIndex];

  return (
    <div
      className="relative w-full h-full overflow-hidden select-none"
      onMouseMove={handleMouseMove}
      onWheel={handleWheel}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onMouseEnter={() => setIsInteracting(true)}
      onMouseLeave={() => {
        setIsInteracting(false);
        setMousePosition({ x: 0, y: 0 });
      }}
    >
      {/* 3D Perspective Stage */}
      <div
        className="w-full h-full flex items-center justify-center perspective-container preserve-3d"
        style={{
          perspectiveOrigin: `${50 + mousePosition.x * 6}% ${50 + mousePosition.y * 6}%`,
        }}
      >
        <div className="relative w-full h-full preserve-3d flex items-center justify-center">
          {GALLERY_DATA.map((slide, idx) => {
            // Compute shortest circular distance
            let rawDelta = idx - currentIndex;
            if (rawDelta > totalSlides / 2) rawDelta -= totalSlides;
            if (rawDelta < -totalSlides / 2) rawDelta += totalSlides;

            // Include continuous drag offset feedback
            const dynamicDelta = rawDelta + dragOffset / 500;
            const isActive = idx === currentIndex;

            return (
              <SlideCard
                key={slide.id}
                slide={slide}
                delta={dynamicDelta}
                isActive={isActive}
                onSelect={() => handleCardClick(idx, false)}
                onOpenViewer={() => handleCardClick(idx, true)}
                mousePosition={mousePosition}
              />
            );
          })}
        </div>
      </div>

      {/* Slide Information in Lower-Left Area */}
      <SlideInformation
        slide={activeSlide}
        onOpenViewer={() => setIsViewerOpen(true)}
        onOpenAbout={onOpenAbout}
      />

      {/* Slider Controls in Bottom Bar */}
      <SliderControls
        currentIndex={currentIndex}
        totalSlides={totalSlides}
        onPrev={handlePrev}
        onNext={handleNext}
        onSelectIndex={handleSelectIndex}
        autoplay={autoplay}
        onToggleAutoplay={() => setAutoplay(!autoplay)}
        autoplayProgress={autoplayProgress}
        onOpenArchive={onOpenArchive}
      />

      {/* Lightbox Fullscreen Viewer */}
      <ImageViewer
        isOpen={isViewerOpen}
        slide={activeSlide}
        onClose={() => setIsViewerOpen(false)}
        onPrev={handlePrev}
        onNext={handleNext}
      />
    </div>
  );
};
