import React from "react";
import { X, Aperture, Eye, Compass, Shield } from "lucide-react";

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AboutModal: React.FC<AboutModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-xl p-4 sm:p-8 animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-label="About NOIR VISUALS"
    >
      <div className="relative w-full max-w-2xl max-h-[90vh] bg-[#07090e]/95 border border-white/15 rounded-2xl p-6 sm:p-8 flex flex-col shadow-2xl overflow-y-auto text-left">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-5 mb-6 shrink-0">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 tracking-widest uppercase mb-1">
              <span>MANIFESTO</span>
              <span>·</span>
              <span>CURATORIAL STATEMENT</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white uppercase">
              NOIR / VISUALS
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg border border-white/15 bg-white/5 hover:bg-white/15 text-slate-300 hover:text-white transition-colors cursor-pointer"
            aria-label="Close manifesto modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="space-y-6 text-sm text-slate-300 leading-relaxed font-light">
          <p className="text-base text-slate-100 font-normal">
            <strong className="text-cyan-400 font-medium">NOIR / VISUALS</strong> is a fine art photography studio and exhibition platform investigating the convergence of brutalist architecture, cybernetic urbanism, and deep chiaroscuro lighting.
          </p>

          <p>
            Operating across Tokyo, Chongqing, Berlin, and Reykjavik, our visual practice rejects sanitized digital homogeny in favor of atmospheric depth, raking shadows, and authentic optical character. Every frame is captured on medium-format digital sensors and master prime lenses, calibrated for extreme dynamic range in ultra-low luminance conditions.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-white/10">
            <div className="p-4 rounded-xl border border-white/10 bg-white/5">
              <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs tracking-wider mb-2">
                <Aperture className="w-4 h-4" />
                <span>OPTICAL RIGOR</span>
              </div>
              <p className="text-xs text-slate-400">
                100MP+ medium format sensors with custom lens profiles, resolving sub-millimeter architectural textures and nuanced shadow gradients.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-white/10 bg-white/5">
              <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs tracking-wider mb-2">
                <Compass className="w-4 h-4" />
                <span>EXPEDITIONARY ESSAYS</span>
              </div>
              <p className="text-xs text-slate-400">
                Site-specific nocturnal excursions across global megacities and remote volcanic terrains, captured during heavy precipitation and extreme twilight.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-white/10 bg-white/5">
              <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs tracking-wider mb-2">
                <Eye className="w-4 h-4" />
                <span>SPATIAL EXHIBITION</span>
              </div>
              <p className="text-xs text-slate-400">
                A digital gallery engineered with 3D perspective geometry and kinetic ambient video, offering immersive dimensional perception.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-white/10 bg-white/5">
              <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs tracking-wider mb-2">
                <Shield className="w-4 h-4" />
                <span>ARCHIVAL PRINTS</span>
              </div>
              <p className="text-xs text-slate-400">
                Limited edition pigment prints on Hahnemühle Photo Rag Baryta 315gsm, signed, numbered, and accompanied by physical cryptographic certificates.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-5 border-t border-white/10 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-400/50 text-cyan-300 text-xs font-mono tracking-widest uppercase transition-colors cursor-pointer"
          >
            RETURN TO EXHIBITION
          </button>
        </div>
      </div>
    </div>
  );
};
