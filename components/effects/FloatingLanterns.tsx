/**
 * FloatingLanterns — Animated Ramadan lanterns floating in the background
 * =======================================================================
 * Renders decorative lantern SVGs that gently float and glow.
 * Positioned at various points across the viewport with CSS animations.
 *
 * Random values are generated in useEffect to avoid SSR hydration mismatch.
 */

"use client";

import { useState, useEffect } from "react";

/** Number of lanterns */
const LANTERN_COUNT = 7;

/** Fixed positions for lanterns (no randomness here) */
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
            size: Math.random() * 20 + 30,
            duration: Math.random() * 4 + 5,
            delay: Math.random() * 3,
            glowDelay: Math.random() * 2,
        };
    });
}

export default function FloatingLanterns() {
    /** Generate random values only on the client to avoid hydration mismatch */
    const [lanterns, setLanterns] = useState<LanternData[]>([]);

    useEffect(() => {
        setLanterns(generateLanterns());
    }, []);

    // Don't render anything until client-side values are ready
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
                        animation: `lantern-float ${lantern.duration}s ease-in-out ${lantern.delay}s infinite,
                        lantern-glow ${lantern.duration * 0.7}s ease-in-out ${lantern.glowDelay}s infinite`,
                    }}
                >
                    {/* Lantern SVG */}
                    <svg viewBox="0 0 40 60" className="w-full h-full" fill="none">
                        {/* Top hook */}
                        <path d="M18 4 Q20 0 22 4" stroke="#d4af37" strokeWidth="1.5" fill="none" />
                        {/* Top cap */}
                        <rect x="14" y="4" width="12" height="3" rx="1" fill="#d4af37" />
                        {/* Main body */}
                        <path
                            d="M14 7 Q10 20 12 35 Q14 42 20 44 Q26 42 28 35 Q30 20 26 7 Z"
                            fill="rgba(244, 196, 48, 0.25)"
                            stroke="#d4af37"
                            strokeWidth="1"
                        />
                        {/* Inner glow */}
                        <ellipse cx="20" cy="24" rx="6" ry="12" fill="rgba(244, 196, 48, 0.15)" />
                        {/* Decorative bands */}
                        <line x1="14" y1="15" x2="26" y2="15" stroke="#d4af37" strokeWidth="0.5" opacity="0.6" />
                        <line x1="13" y1="25" x2="27" y2="25" stroke="#d4af37" strokeWidth="0.5" opacity="0.6" />
                        <line x1="14" y1="35" x2="26" y2="35" stroke="#d4af37" strokeWidth="0.5" opacity="0.6" />
                        {/* Bottom tassel */}
                        <path d="M18 44 Q20 50 22 44" stroke="#d4af37" strokeWidth="1" fill="none" />
                        <circle cx="20" cy="52" r="1.5" fill="#d4af37" opacity="0.7" />
                    </svg>
                </div>
            ))}
        </div>
    );
}
