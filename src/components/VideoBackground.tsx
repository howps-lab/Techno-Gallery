import React, { useEffect, useRef } from "react";

interface VideoBackgroundProps {
  isPlaying?: boolean;
}

export const VideoBackground: React.FC<VideoBackgroundProps> = ({ isPlaying = true }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  const startPlayback = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = true;
    video.defaultMuted = true;
    const p = video.play();
    if (p !== undefined) {
      p.catch(() => {
        // Retry on any user gesture
        const onFirstInteraction = () => {
          video.play().catch(() => {});
          window.removeEventListener("pointerdown", onFirstInteraction);
          window.removeEventListener("keydown", onFirstInteraction);
        };
        window.addEventListener("pointerdown", onFirstInteraction, { once: true });
        window.addEventListener("keydown", onFirstInteraction, { once: true });
      });
    }
  };

  useEffect(() => {
    if (isPlaying) {
      startPlayback();
    } else if (videoRef.current) {
      videoRef.current.pause();
    }
  }, [isPlaying]);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none select-none">
      {/* Looping Ambient HD Video - Vibrant & Visible */}
      <video
        ref={videoRef}
        src="/assets/aistudio/background-hd_1280_720_30fps_d5fed95d.mp4"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        onCanPlay={(e) => {
          const el = e.currentTarget;
          el.muted = true;
          el.play().catch(() => {});
        }}
        className="w-full h-full object-cover object-center"
        aria-hidden="true"
      />

      {/* Gentle Contrast Scrim - Subtle so particle animations remain vivid and prominent */}
      <div className="absolute inset-0 bg-black/20 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/50 pointer-events-none" />

      {/* Subtle Vignette at Viewport Edges */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, transparent 50%, rgba(5, 6, 8, 0.5) 85%, rgba(5, 6, 8, 0.8) 100%)",
        }}
      />
    </div>
  );
};
