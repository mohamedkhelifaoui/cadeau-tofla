/**
 * Main Page — Dounia's Birthday & Ramadan Gift Website
 * =====================================================
 * This is the root page that composes all sections and effects
 * into the final experience. It orchestrates:
 *
 *   1. Background effects (StarryNight, FallingPetals, FloatingLanterns, GoldenParticles)
 *   2. Music player (fixed position)
 *   3. Hero section with the love letter modal trigger
 *   4. Countdown to Ramadan & Birthday
 *   5. Interactive Lantern & Voice Message
 *   6. Photo gallery & Memory Sky
 *   7. Reasons & Quiz
 *   8. Wishes to Stars & Dua
 *   9. Romantic footer
 *
 * This component manages the love letter modal open/close state.
 */

"use client";

import { useState } from "react";

/* ─── Background Effects ─── */
import StarryNight from "@/components/effects/StarryNight";
import FallingPetals from "@/components/effects/FallingPetals";
import FloatingLanterns from "@/components/effects/FloatingLanterns";
import GoldenParticles from "@/components/effects/GoldenParticles";
import AuroraBackground from "@/components/effects/AuroraBackground";
import ShootingStars from "@/components/effects/ShootingStars";

/* ─── Shared Components ─── */
import MusicPlayer from "@/components/shared/MusicPlayer";

/* ─── Page Sections ─── */
import HeroSection from "@/components/sections/HeroSection";
import CountdownSection from "@/components/sections/CountdownSection";
import GallerySection from "@/components/sections/GallerySection";
import ReasonsSection from "@/components/sections/ReasonsSection";
import QuizSection from "@/components/sections/QuizSection";
import DuaSection from "@/components/sections/DuaSection";
import FooterSection from "@/components/sections/FooterSection";

/* ─── New Interactive Sections ─── */
import VoiceMessageSection from "@/components/sections/VoiceMessageSection";
import MemorySkySection from "@/components/sections/MemorySkySection";
import WishesToStarsSection from "@/components/sections/WishesToStarsSection";
import InteractiveLantern from "@/components/interactive/InteractiveLantern";

/* ─── Modals ─── */
import LoveLetterModal from "@/components/modals/LoveLetterModal";

export default function HomePage() {
  /** Controls the love letter modal visibility */
  const [isLetterOpen, setIsLetterOpen] = useState(false);

  return (
    <>
      {/* ═══════════════════════════════════════════
          BACKGROUND EFFECTS LAYER
          These render behind all content (z-0 to z-10)
          ═══════════════════════════════════════════ */}
      <AuroraBackground />
      <ShootingStars />
      <StarryNight />
      <FloatingLanterns />
      <GoldenParticles />
      <FallingPetals />

      {/* ═══════════════════════════════════════════
          FLOATING UI ELEMENTS
          Music player button (fixed z-50)
          ═══════════════════════════════════════════ */}
      <MusicPlayer />

      {/* ═══════════════════════════════════════════
          PAGE CONTENT
          All sections render above effects (z-20+)
          ═══════════════════════════════════════════ */}
      <main className="relative">
        {/* 1. Hero — Grand entrance with greeting */}
        <HeroSection onOpenLetter={() => setIsLetterOpen(true)} />

        {/* Section Divider with Interactive Lantern */}
        <div className="relative z-20 flex flex-col items-center justify-center py-10">
          <InteractiveLantern />
          <SectionDivider />
        </div>

        {/* 2. Countdown — Days until Ramadan & Birthday */}
        <CountdownSection />

        <SectionDivider />

        {/* 3. Voice Message — Audio player */}
        <VoiceMessageSection />

        <SectionDivider />

        {/* 4. Gallery — Photo memories */}
        <GallerySection />

        {/* 5. Memory Sky — Hidden messages */}
        <MemorySkySection />

        <SectionDivider />

        {/* 6. Reasons — Why I Love You */}
        <ReasonsSection />

        <SectionDivider />

        {/* 7. Love Quiz — Interactive game */}
        <QuizSection />

        <SectionDivider />

        {/* 8. Wishes to Stars — User makes a wish */}
        <WishesToStarsSection />

        <SectionDivider />

        {/* 9. Dua — Prayer for Dounia */}
        <DuaSection />

        <SectionDivider />

        {/* 10. Footer — Romantic closing */}
        <FooterSection />
      </main>

      {/* ═══════════════════════════════════════════
          MODALS LAYER (z-100)
          ═══════════════════════════════════════════ */}
      <LoveLetterModal
        isOpen={isLetterOpen}
        onClose={() => setIsLetterOpen(false)}
      />
    </>
  );
}

/**
 * SectionDivider — Decorative divider between sections
 * A subtle gold line with a diamond shape in the center
 */
function SectionDivider() {
  return (
    <div className="relative z-20 flex items-center justify-center py-8 px-8 opacity-60">
      <div className="h-px flex-1 max-w-xs bg-gradient-to-r from-transparent to-[#d4af37]/30" />
      <div className="mx-4 w-2 h-2 rotate-45 bg-[#d4af37]/40" />
      <div className="h-px flex-1 max-w-xs bg-gradient-to-l from-transparent to-[#d4af37]/30" />
    </div>
  );
}
