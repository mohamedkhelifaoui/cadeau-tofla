/**
 * InteractiveLantern — Clickable Ramadan lantern
 * ===============================================
 * A beautifully animated SVG lantern.
 * On click:
 * 1. The lantern glows intensely.
 * 2. A golden light spreads across the background (via a large radial gradient).
 * 3. Plays a subtle "ding" or magical sound (optional/visual only for now).
 */

"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function InteractiveLantern() {
    const [isLit, setIsLit] = useState(false);

    return (
        <div className="relative z-30 inline-block pointer-events-auto group">
            {/* ─── Background Light Spread ─── */}
            <AnimatePresence>
                {isLit && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1.5 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(255,215,0,0.15)_0%,transparent_70%)] rounded-full blur-3xl pointer-events-none -z-10"
                    />
                )}
            </AnimatePresence>

            {/* ─── Lantern SVG ─── */}
            <motion.button
                onClick={() => setIsLit(!isLit)}
                whileHover={{ scale: 1.05, rotate: 2 }}
                whileTap={{ scale: 0.95 }}
                animate={{
                    y: [0, -10, 0],
                    rotate: isLit ? [0, 2, -2, 0] : 0,
                }}
                transition={{
                    y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                    rotate: { duration: 5, repeat: Infinity, ease: "easeInOut" },
                }}
                className="relative focus:outline-none"
                aria-label="Light the lantern"
            >
                {/* Glow Effect behind lantern */}
                <div
                    className={`absolute inset-0 bg-[#d4af37] rounded-full blur-xl transition-opacity duration-1000 ${isLit ? "opacity-60" : "opacity-0 group-hover:opacity-20"
                        }`}
                />

                <svg
                    width="120"
                    height="180"
                    viewBox="0 0 100 150"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="relative z-10 drop-shadow-2xl"
                >
                    {/* Hanging String */}
                    <path d="M50 0V20" stroke="#d4af37" strokeWidth="2" />

                    {/* Top Dome */}
                    <path
                        d="M30 20H70L80 40H20L30 20Z"
                        fill="url(#lanternGradient)"
                        stroke="#d4af37"
                        strokeWidth="1"
                    />

                    {/* Main Body */}
                    <rect
                        x="20"
                        y="40"
                        width="60"
                        height="80"
                        rx="5"
                        fill="url(#glassGradient)"
                        stroke="#d4af37"
                        strokeWidth="2"
                    />

                    {/* Decorative Patterns */}
                    <path d="M30 40V120M50 40V120M70 40V120" stroke="#d4af37" strokeWidth="1" strokeOpacity="0.5" />
                    <path d="M20 60H80M20 80H80M20 100H80" stroke="#d4af37" strokeWidth="1" strokeOpacity="0.5" />

                    {/* Bottom Base */}
                    <path
                        d="M25 120H75L70 135H30L25 120Z"
                        fill="url(#lanternGradient)"
                        stroke="#d4af37"
                        strokeWidth="1"
                    />

                    {/* Hanging Tassel */}
                    <path d="M50 135V150" stroke="#d4af37" strokeWidth="1" />
                    <circle cx="50" cy="150" r="3" fill="#d4af37" />

                    {/* Inner Light Source */}
                    <motion.circle
                        cx="50"
                        cy="80"
                        r="12"
                        fill="#fff"
                        filter="url(#glowBlur)"
                        animate={{
                            opacity: isLit ? [0.6, 1, 0.6] : 0.1,
                            scale: isLit ? [1, 1.2, 1] : 1,
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                    />

                    {/* Gradients & Filters */}
                    <defs>
                        <linearGradient id="lanternGradient" x1="0" y1="0" x2="1" y2="1">
                            <stop offset="0%" stopColor="#d4af37" />
                            <stop offset="50%" stopColor="#f4c430" />
                            <stop offset="100%" stopColor="#b8860b" />
                        </linearGradient>

                        <linearGradient id="glassGradient" x1="0" y1="0" x2="1" y2="1">
                            <stop offset="0%" stopColor="rgba(255, 255, 255, 0.1)" />
                            <stop offset="100%" stopColor="rgba(255, 215, 0, 0.1)" />
                        </linearGradient>

                        <filter id="glowBlur">
                            <feGaussianBlur stdDeviation="4" />
                        </filter>
                    </defs>
                </svg>
            </motion.button>
        </div>
    );
}
