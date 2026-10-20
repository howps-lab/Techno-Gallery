import React, { useState } from "react";
import { X, Mail, Check, Copy, Send } from "lucide-react";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    inquiryType: "Print Acquisition",
    message: "",
  });

  if (!isOpen) return null;

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("curator@noirvisuals.studio");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2500);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-xl p-4 sm:p-8 animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-label="Contact NOIR VISUALS"
    >
      <div className="relative w-full max-w-xl bg-[#07090e]/95 border border-white/15 rounded-2xl p-6 sm:p-8 flex flex-col shadow-2xl text-left">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-5 mb-6 shrink-0">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 tracking-widest uppercase mb-1">
              <span>COMMISSIONS & INQUIRIES</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white uppercase">
              CONTACT GALLERY
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg border border-white/15 bg-white/5 hover:bg-white/15 text-slate-300 hover:text-white transition-colors cursor-pointer"
            aria-label="Close contact modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="py-12 flex flex-col items-center justify-center text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-cyan-500/20 border border-cyan-400/50 flex items-center justify-center text-cyan-400">
              <Check className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-semibold text-white">Transmission Received</h3>
            <p className="text-xs text-slate-400 max-w-xs font-mono">
              Our studio curator will respond to {formData.email} within 24 standard hours.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs font-mono">
            <div>
              <label className="block text-slate-300 uppercase tracking-wider mb-1.5">
                Full Name / Organization
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Elena Rostova / Lumina Gallery"
                className="w-full px-3.5 py-2.5 rounded-lg bg-white/5 border border-white/15 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
              />
            </div>

            <div>
              <label className="block text-slate-300 uppercase tracking-wider mb-1.5">
                Contact Email
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="collector@domain.com"
                className="w-full px-3.5 py-2.5 rounded-lg bg-white/5 border border-white/15 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
              />
            </div>

            <div>
              <label className="block text-slate-300 uppercase tracking-wider mb-1.5">
                Inquiry Type
              </label>
              <select
                value={formData.inquiryType}
                onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg bg-[#0e131d] border border-white/15 text-white focus:outline-none focus:border-cyan-400 transition-colors cursor-pointer"
              >
                <option value="Print Acquisition">Fine Art Archival Print Acquisition</option>
                <option value="Commercial Shoot">Architectural / Brand Commission</option>
                <option value="Exhibition Loan">Museum / Exhibition Loan Request</option>
                <option value="Editorial Press">Editorial Licensing & Press Feature</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-300 uppercase tracking-wider mb-1.5">
                Specification / Message
              </label>
              <textarea
                rows={3}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Detail preferred frame numbers, dimensions, or project timeline..."
                className="w-full px-3.5 py-2.5 rounded-lg bg-white/5 border border-white/15 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors resize-none"
              />
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
              <button
                type="button"
                onClick={handleCopyEmail}
                className="w-full sm:w-auto px-3.5 py-2 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white flex items-center justify-center gap-2 cursor-pointer transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-cyan-400" />
                <span>curator@noirvisuals.studio</span>
                {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5 text-slate-500" />}
              </button>

              <button
                type="submit"
                className="w-full sm:w-auto px-5 py-2.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-[0_0_20px_rgba(6,182,212,0.4)]"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Send Inquiry</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
