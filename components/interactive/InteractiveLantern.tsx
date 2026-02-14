/**
 * InteractiveLantern — Clickable Ramadan lantern with refined glow
 * ===============================================================
 * A beautifully animated SVG lantern.
 * On click:
 * 1. The lantern body glows with a warm, gentle light.
 * 2. A subtle golden ambient light spreads slightly around it.
 */

"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function InteractiveLantern() {
    const [isLit, setIsLit] = useState(false);

    // PERSISTENCE: Load state on mount
    useEffect(() => {
        const saved = localStorage.getItem("dounia_lantern_lit");
        if (saved === "true") setIsLit(true);
    }, []);

    const toggleLantern = () => {
        const newState = !isLit;
        setIsLit(newState);
        localStorage.setItem("dounia_lantern_lit", String(newState));
    };

    return (
        <div className="relative z-30 inline-block pointer-events-auto group">
            {/* ─── Background Light Spread ─── */}
            <AnimatePresence>
                {isLit && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1.2 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 1.2, ease: "easeOut" }}
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] 
                                   bg-[radial-gradient(circle,rgba(255,215,0,0.1) 0%,transparent 70%)] 
                                   rounded-full blur-3xl pointer-events-none -z-10"
                    />
                )}
            </AnimatePresence>

            {/* ─── Lantern SVG ─── */}
            <motion.button
                onClick={toggleLantern}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                animate={{
                    y: [0, -8, 0],
                    rotate: isLit ? [0, 1, -1, 0] : 0,
                }}
                transition={{
                    y: { duration: 5, repeat: Infinity, ease: "easeInOut" },
                    rotate: { duration: 6, repeat: Infinity, ease: "easeInOut" },
                }}
                className="relative focus:outline-none"
                aria-label="Light the lantern"
            >
                {/* Subtle Glow Effect behind lantern */}
                <div
                    className={`absolute inset-0 bg-[#d4af37]/30 rounded-full blur-2xl transition-opacity duration-1000 ${isLit ? "opacity-40" : "opacity-0 group-hover:opacity-10"
                        }`}
                />

                <svg
                    width="100"
                    height="150"
                    viewBox="0 0 100 150"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="relative z-10"
                    style={{
                        filter: isLit ? "drop-shadow(0 0 12px rgba(255, 215, 0, 0.4))" : "none"
                    }}
                >
                    {/* Hanging String */}
                    <path d="M50 0V20" stroke="#d4af37" strokeWidth="1" strokeOpacity="0.6" />

                    {/* Top Dome */}
                    <path
                        d="M30 20H70L80 35H20L30 20Z"
                        fill="url(#lanternMetalGradient)"
                        stroke="#d4af37"
                        strokeWidth="0.5"
                    />

                    {/* Main Body - Glass */}
                    <rect
                        x="20"
                        y="35"
                        width="60"
                        height="85"
                        rx="4"
                        fill={isLit ? "url(#litGlassGradient)" : "url(#glassGradient)"}
                        stroke="#d4af37"
                        strokeWidth="1.5"
                        className="transition-all duration-1000"
                    />

                    {/* Decorative Patterns */}
                    <path d="M40 35V120M60 35V120" stroke="#d4af37" strokeWidth="0.5" strokeOpacity="0.3" />
                    <path d="M20 55H80M20 75H80M20 95H80" stroke="#d4af37" strokeWidth="0.5" strokeOpacity="0.3" />

                    {/* Bottom Base */}
                    <path
                        d="M25 120H75L70 135H30L25 120Z"
                        fill="url(#lanternMetalGradient)"
                        stroke="#d4af37"
                        strokeWidth="0.5"
                    />

                    {/* Inner LightSource */}
                    <motion.circle
                        cx="50"
                        cy="75"
                        r="15"
                        fill="url(#innerFlameGradient)"
                        animate={{
                            opacity: isLit ? [0.7, 1, 0.7] : 0,
                            scale: isLit ? [1, 1.1, 1] : 0.8,
                        }}
                        transition={{ duration: 3, repeat: Infinity }}
                    />

                    {/* Gradients & Filters */}
                    <defs>
                        <linearGradient id="lanternMetalGradient" x1="0" y1="0" x2="1" y2="1">
                            <stop offset="0%" stopColor="#d4af37" />
                            <stop offset="100%" stopColor="#8a6d1d" />
                        </linearGradient>

                        <linearGradient id="glassGradient" x1="0" y1="0" x2="1" y2="1">
                            <stop offset="0%" stopColor="rgba(255, 255, 255, 0.05)" />
                            <stop offset="100%" stopColor="rgba(255, 215, 0, 0.05)" />
                        </linearGradient>

                        <radialGradient id="litGlassGradient" cx="50%" cy="50%" r="50%">
                            <stop offset="0%" stopColor="rgba(255, 245, 180, 0.4)" />
                            <stop offset="100%" stopColor="rgba(255, 215, 0, 0.1)" />
                        </radialGradient>

                        <radialGradient id="innerFlameGradient" cx="50%" cy="50%" r="50%">
                            <stop offset="0%" stopColor="rgba(255, 255, 255, 0.9)" />
                            <stop offset="40%" stopColor="rgba(255, 230, 100, 0.6)" />
                            <stop offset="100%" stopColor="transparent" />
                        </radialGradient>
                    </defs>
                </svg>

                {/* "Click Me" hint when unlit */}
                {!isLit && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0, 1, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-[#d4af37]/40 text-[10px] tracking-widest uppercase"
                    >
                        Tap to light
                    </motion.div>
                )}
            </motion.button>
        </div>
    );
}
