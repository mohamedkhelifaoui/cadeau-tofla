/**
 * FooterSection — Romantic closing footer
 * =========================================
 * Displays the heartfelt closing message with
 * a soft glowing animation and decorative elements.
 */

"use client";

import { motion } from "framer-motion";

export default function FooterSection() {
    return (
        <footer id="footer" className="relative z-20 py-16 md:py-24 px-4">
            <div className="max-w-4xl mx-auto text-center">
                {/* ─── Decorative Divider ─── */}
                <motion.div
                    className="flex items-center justify-center gap-4 mb-12"
                    initial={{ opacity: 0, scaleX: 0 }}
                    whileInView={{ opacity: 1, scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="h-px w-20 sm:w-32 bg-gradient-to-r from-transparent to-[#d4af37]/60" />
                    <span className="text-[#d4af37] text-2xl">🤍</span>
                    <div className="h-px w-20 sm:w-32 bg-gradient-to-l from-transparent to-[#d4af37]/60" />
                </motion.div>

                {/* ─── Romantic Closing ─── */}
                <motion.p
                    className="text-2xl sm:text-3xl md:text-4xl text-[#d4af37] font-[var(--font-amiri)]
                     text-glow-gold animate-glow-pulse leading-relaxed"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1 }}
                >
                    Forever Yours, With All My Love.
                </motion.p>

                {/* ─── Arabic Closing ─── */}
                <motion.p
                    className="mt-6 text-xl sm:text-2xl text-[#faf3e0]/60 font-[var(--font-amiri)]"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    dir="rtl"
                >
                    إلى الأبد، بكل حبي 🤍
                </motion.p>

                {/* ─── Signature ─── */}
                <motion.div
                    className="mt-12"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.8, duration: 0.6 }}
                >
                    <p
                        className="text-[#d4af37]/50 text-base font-[var(--font-amiri)]"
                        dir="rtl"
                    >
                        زوجك الذي يحبك دائمًا 🤍
                    </p>
                </motion.div>

                {/* ─── Bottom Decorative Hearts ─── */}
                <motion.div
                    className="mt-16 flex justify-center gap-3"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 1, duration: 0.8 }}
                >
                    {["✦", "🤍", "✦"].map((icon, i) => (
                        <motion.span
                            key={i}
                            className="text-[#d4af37]/40 text-lg"
                            animate={{ y: [0, -5, 0] }}
                            transition={{
                                duration: 2,
                                delay: i * 0.3,
                                repeat: Infinity,
                            }}
                        >
                            {icon}
                        </motion.span>
                    ))}
                </motion.div>

                {/* ─── Copyright ─── */}
                <p className="mt-8 text-[#faf3e0]/20 text-xs tracking-widest uppercase">
                    Made with love — 2026
                </p>
            </div>
        </footer>
    );
}
