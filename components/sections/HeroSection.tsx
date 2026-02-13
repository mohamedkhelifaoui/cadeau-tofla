/**
 * HeroSection — The grand opening of the website
 * =================================================
 * Displays the animated birthday/Ramadan greeting title,
 * Dounia's name in glowing gold, the romantic subtitle,
 * and the "Love Letter" button trigger.
 *
 * Uses Framer Motion for cinematic fade-in/slide-up animations.
 */

"use client";

import { motion } from "framer-motion";

interface HeroSectionProps {
    /** Callback to open the love letter modal */
    onOpenLetter: () => void;
}

export default function HeroSection({ onOpenLetter }: HeroSectionProps) {
    return (
        <section
            id="hero"
            className="relative z-20 min-h-screen flex flex-col items-center justify-center px-4 text-center"
        >
            {/* ─── Main Title (Arabic) ─── */}
            <motion.h1
                className="font-[var(--font-amiri)] text-3xl sm:text-4xl md:text-6xl lg:text-7xl
                   font-bold leading-relaxed text-gold-gradient animate-glow-pulse mb-4"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                dir="rtl"
            >
                عيد ميلاد سعيد يا دنيا 🤍
                <br />
                ورمضان مبارك
            </motion.h1>

            {/* ─── Her Name ─── */}
            <motion.h2
                className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold mt-6
                   text-gold-gradient text-glow-gold tracking-wide"
                style={{ fontFamily: "'Amiri', serif" }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.4, delay: 0.5, ease: "easeOut" }}
            >
                Dounia Mecili
            </motion.h2>

            {/* ─── Romantic Subtitle ─── */}
            <motion.p
                className="mt-8 max-w-2xl text-base sm:text-lg md:text-xl
                   text-[#faf3e0]/80 leading-relaxed italic"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 1, ease: "easeOut" }}
            >
                &ldquo;You are my Dunya and my Jannah. May this Ramadan bring you peace
                and your birthday bring you endless happiness.&rdquo;
            </motion.p>

            {/* ─── Decorative Divider ─── */}
            <motion.div
                className="mt-10 flex items-center gap-4"
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: 1, scaleX: 1 }}
                transition={{ duration: 0.8, delay: 1.5 }}
            >
                <div className="h-px w-16 sm:w-24 bg-gradient-to-r from-transparent to-[#d4af37]" />
                <span className="text-[#d4af37] text-2xl">✦</span>
                <div className="h-px w-16 sm:w-24 bg-gradient-to-l from-transparent to-[#d4af37]" />
            </motion.div>

            {/* ─── Love Letter Button ─── */}
            <motion.button
                onClick={onOpenLetter}
                className="mt-10 px-8 py-4 rounded-full glass-strong
                   text-[#d4af37] font-[var(--font-amiri)] text-xl sm:text-2xl
                   border border-[rgba(212,175,55,0.3)]
                   cursor-pointer
                   hover:border-[rgba(212,175,55,0.6)]
                   transition-all duration-500
                   glow-gold-hover"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.8 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                dir="rtl"
            >
                💌 رسالة من قلبي
            </motion.button>

            {/* ─── Scroll Indicator ─── */}
            <motion.div
                className="absolute bottom-10 flex flex-col items-center gap-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.5, duration: 1 }}
            >
                <span className="text-[#d4af37]/60 text-sm">Scroll Down</span>
                <motion.div
                    className="w-5 h-8 rounded-full border-2 border-[#d4af37]/40 flex justify-center pt-1"
                    animate={{ y: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                >
                    <div className="w-1.5 h-1.5 rounded-full bg-[#d4af37]/60" />
                </motion.div>
            </motion.div>
        </section>
    );
}
