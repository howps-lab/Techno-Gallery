import React, { useState } from "react";
import { Grid, Menu, X, Maximize, Minimize } from "lucide-react";

interface TopNavigationProps {
  onOpenAbout: () => void;
  onOpenContact: () => void;
  onOpenArchive: () => void;
  activeSection?: string;
}

export const TopNavigation: React.FC<TopNavigationProps> = ({
  onOpenAbout,
  onOpenContact,
  onOpenArchive,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between gap-8 px-6 md:px-12 py-5 border-b border-white/[0.08] backdrop-blur-md bg-black/25">
      {/* Zone 1: Brand Wordmark */}
      <div className="flex items-center gap-3 shrink-0">
        <a
          href="/"
          className="text-sm md:text-base tracking-[0.28em] font-semibold text-white uppercase whitespace-nowrap hover:text-cyan-400 transition-colors flex items-center gap-2"
        >
          <span className="w-2 h-2 bg-cyan-400 rounded-xs shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
          <span>NOIR / VISUALS</span>
        </a>
      </div>

      {/* Zone 2: Navigation Links */}
      <nav className="hidden md:flex items-center gap-8 text-xs font-medium tracking-[0.2em] text-slate-300 uppercase">
        <button
          onClick={onOpenArchive}
          className="hover:text-white transition-colors cursor-pointer py-1 whitespace-nowrap hover:border-b hover:border-cyan-400"
        >
          GALLERY
        </button>
        <button
          onClick={onOpenAbout}
          className="hover:text-white transition-colors cursor-pointer py-1 whitespace-nowrap hover:border-b hover:border-cyan-400"
        >
          ABOUT
        </button>
        <button
          onClick={onOpenContact}
          className="hover:text-white transition-colors cursor-pointer py-1 whitespace-nowrap hover:border-b hover:border-cyan-400"
        >
          CONTACT
        </button>
      </nav>

      {/* Zone 3: 1 Primary Action */}
      <div className="flex items-center gap-3 shrink-0">
        <button
          onClick={toggleFullscreen}
          title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
          className="hidden sm:inline-flex items-center justify-center w-8 h-8 rounded-lg border border-white/10 bg-white/5 text-slate-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          aria-label={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
        >
          {isFullscreen ? <Minimize className="w-3.5 h-3.5" /> : <Maximize className="w-3.5 h-3.5" />}
        </button>

        <button
          onClick={onOpenArchive}
          className="px-3.5 py-1.5 text-xs font-medium tracking-wider text-slate-100 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg transition-all flex items-center gap-2 cursor-pointer shadow-[0_0_20px_-3px_rgba(6,182,212,0.25)] hover:border-cyan-500/50 whitespace-nowrap shrink-0"
        >
          <Grid className="w-3.5 h-3.5 text-cyan-400" />
          <span>INDEX ARCHIVE</span>
        </button>

        {/* Mobile menu hamburger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-slate-300 hover:text-white rounded-lg border border-white/10 bg-white/5 cursor-pointer"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 border-b border-white/10 bg-[#07090e]/95 backdrop-blur-xl p-6 flex flex-col gap-4 md:hidden shadow-2xl animate-in fade-in slide-in-from-top-2 duration-200">
          <button
            onClick={() => {
              onOpenArchive();
              setMobileMenuOpen(false);
            }}
            className="text-left text-sm font-medium tracking-widest text-slate-200 hover:text-cyan-400 py-2 border-b border-white/5"
          >
            GALLERY ARCHIVE
          </button>
          <button
            onClick={() => {
              onOpenAbout();
              setMobileMenuOpen(false);
            }}
            className="text-left text-sm font-medium tracking-widest text-slate-200 hover:text-cyan-400 py-2 border-b border-white/5"
          >
            ABOUT / CURATORIAL
          </button>
          <button
            onClick={() => {
              onOpenContact();
              setMobileMenuOpen(false);
            }}
            className="text-left text-sm font-medium tracking-widest text-slate-200 hover:text-cyan-400 py-2"
          >
            CONTACT & ACQUISITION
          </button>
        </div>
      )}
    </header>
  );
};
