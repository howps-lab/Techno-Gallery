/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { VideoBackground } from "./components/VideoBackground";
import { TopNavigation } from "./components/TopNavigation";
import { CinematicSlider } from "./components/CinematicSlider";
import { ArchiveDrawer } from "./components/ArchiveDrawer";
import { AboutModal } from "./components/AboutModal";
import { ContactModal } from "./components/ContactModal";

export default function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isArchiveOpen, setIsArchiveOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <div className="relative w-screen h-screen overflow-hidden text-slate-100 flex flex-col justify-between font-sans select-none">
      {/* 1. Full-Screen Looping Video Background at z-0 */}
      <VideoBackground />

      {/* 2. Minimalist Top Navigation Bar */}
      <TopNavigation
        onOpenAbout={() => setIsAboutOpen(true)}
        onOpenContact={() => setIsContactOpen(true)}
        onOpenArchive={() => setIsArchiveOpen(true)}
      />

      {/* 3. Main 3D Image Slider Stage & Foreground Controls at z-10 */}
      <main className="relative z-10 flex-1 w-full h-full pt-16 pb-20">
        <CinematicSlider
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
          onOpenAbout={() => setIsAboutOpen(true)}
          onOpenContact={() => setIsContactOpen(true)}
          onOpenArchive={() => setIsArchiveOpen(true)}
        />
      </main>

      {/* 4. Exhibition Archive Index Modal / Drawer */}
      <ArchiveDrawer
        isOpen={isArchiveOpen}
        onClose={() => setIsArchiveOpen(false)}
        currentIndex={currentIndex}
        onSelectIndex={(idx) => setCurrentIndex(idx)}
      />

      {/* 5. About / Curatorial Manifesto Modal */}
      <AboutModal
        isOpen={isAboutOpen}
        onClose={() => setIsAboutOpen(false)}
      />

      {/* 6. Contact & Print Acquisition Modal */}
      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />
    </div>
  );
}
