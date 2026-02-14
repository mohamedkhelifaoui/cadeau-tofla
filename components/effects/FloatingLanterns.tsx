/**
 * FloatingLanterns — Animated Ramadan lanterns with refined, elegant light
 * ========================================================================
 * Renders decorative lantern SVGs that gently float and emit a subtle, 
 * romantic warm glow. The light is focused more "inside" the lantern 
 * to feel premium and magical.
 */

"use client";

import { useState, useEffect } from "react";

/** Number of lanterns - reduced for performance */
const LANTERN_COUNT = 4;

/** Fixed positions for lanterns */
const POSITIONS = [
    { left: "5%", top: "15%" },
    { left: "88%", top: "25%" },
    { left: "15%", top: "55%" },
    { left: "78%", top: "65%" },
    { left: "45%", top: "10%" },
    { left: "60%", top: "45%" },
    { left: "30%", top: "80%" },
];

/** Lantern configuration data */
interface LanternData {
    id: number;
    left: string;
    top: string;
    size: number;
    duration: number;
    delay: number;
    glowDelay: number;
}

function generateLanterns(): LanternData[] {
    return Array.from({ length: LANTERN_COUNT }, (_, i) => {
        const pos = POSITIONS[i % POSITIONS.length];
        return {
            id: i,
            ...pos,
            size: Math.random() * 10 + 30, // Slightly smaller for elegance
            duration: Math.random() * 4 + 7, // Slower float
            delay: Math.random() * 5,
            glowDelay: Math.random() * 2,
        };
    });
}

export default function FloatingLanterns() {
    const [lanterns, setLanterns] = useState<LanternData[]>([]);

    useEffect(() => {
        setLanterns(generateLanterns());
    }, []);

    if (lanterns.length === 0) return null;

    return (
        <div className="fixed inset-0 z-[5] pointer-events-none overflow-hidden" aria-hidden="true">
            {lanterns.map((lantern) => (
                <div
                    key={lantern.id}
                    className="absolute"
                    style={{
                        left: lantern.left,
                        top: lantern.top,
                        width: lantern.size,
                        height: lantern.size * 1.5,
                        animation: `lantern-float ${lantern.duration}s ease-in-out ${lantern.delay}s infinite`,
                    }}
                >
                    {/* ─── Subtle Ambient Glow ─── */}
                    <div
                        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
                        style={{
                            width: lantern.size * 3.5,
                            height: lantern.size * 3.5,
                            background: `radial-gradient(circle,
                                rgba(255, 215, 0, 0.15) 0%,
                                rgba(244, 196, 48, 0.05) 40%,
                                transparent 75%
                            )`,
                            animation: `lantern-light-pulse ${lantern.duration * 0.8}s ease-in-out ${lantern.glowDelay}s infinite`,
                        }}
                    />

                    {/* ─── Lantern SVG ─── */}
                    <svg
                        viewBox="0 0 40 60"
                        className="w-full h-full relative z-10"
                        fill="none"
                        style={{
                            filter: `drop-shadow(0 0 8px rgba(255, 215, 0, 0.4))`,
                        }}
                    >
                        <defs>
                            <radialGradient id={`flame-${lantern.id}`} cx="50%" cy="40%" r="55%">
                                <stop offset="0%" stopColor="rgba(255, 255, 240, 0.95)" />
                                <stop offset="40%" stopColor="rgba(255, 215, 0, 0.6)" />
                                <stop offset="100%" stopColor="rgba(244, 196, 48, 0.1)" />
                            </radialGradient>
                            <linearGradient id={`body-${lantern.id}`} x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="rgba(255, 245, 200, 0.5)" />
                                <stop offset="50%" stopColor="rgba(255, 215, 0, 0.3)" />
                                <stop offset="100%" stopColor="rgba(212, 175, 55, 0.1)" />
                            </linearGradient>
                        </defs>

                        {/* Top hook */}
                        <path d="M18 4 Q20 0 22 4" stroke="#d4af37" strokeWidth="1.2" fill="none" />

                        {/* Top cap */}
                        <path d="M12 4 L28 4 L26 7 L14 7 Z" fill="#b08d23" />
                        <rect x="14" y="4" width="12" height="1.5" rx="0.5" fill="#d4af37" />

                        {/* Main body — glass architecture */}
                        <path
                            d="M14 7 Q10 20 12 35 Q14 42 20 44 Q26 42 28 35 Q30 20 26 7 Z"
                            fill={`url(#body-${lantern.id})`}
                            stroke="#d4af37"
                            strokeWidth="0.6"
                            opacity="0.9"
                        />

                        {/* Elegance: Internal Candle Glow */}
                        <ellipse cx="20" cy="24" rx="7" ry="14" fill={`url(#flame-${lantern.id})`} />

                        {/* Hot point of the candle */}
                        <ellipse cx="20" cy="20" rx="3" ry="5" fill="rgba(255, 255, 255, 0.8)" />
                        <ellipse cx="20" cy="20" rx="1.5" ry="3" fill="#fff" />

                        {/* Delicate patterns */}
                        <line x1="14" y1="18" x2="26" y2="18" stroke="#d4af37" strokeWidth="0.3" opacity="0.4" />
                        <line x1="13" y1="28" x2="27" y2="28" stroke="#d4af37" strokeWidth="0.3" opacity="0.4" />

                        {/* Bottom tassel detail */}
                        <circle cx="20" cy="46" r="1" fill="#d4af37" />
                        <path d="M20 47 L20 54" stroke="#d4af37" strokeWidth="0.8" opacity="0.6" />
                        <circle cx="20" cy="55" r="1.5" fill="#d4af37" />
                    </svg>
                </div>
            ))}
        </div>
    );
}
