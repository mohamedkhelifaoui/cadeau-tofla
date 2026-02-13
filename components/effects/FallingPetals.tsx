/**
 * FallingPetals — Animated rose petals falling across the viewport
 * =================================================================
 * Creates an array of petal elements with randomized positions,
 * sizes, durations, and delays using CSS keyframe animation.
 *
 * Random values are generated in useEffect to avoid SSR hydration mismatch.
 */

"use client";

import { useState, useEffect } from "react";

/** Number of petals to render */
const PETAL_COUNT = 18;

interface PetalData {
    id: number;
    left: string;
    size: number;
    duration: number;
    delay: number;
    opacity: number;
}

function generatePetals(): PetalData[] {
    return Array.from({ length: PETAL_COUNT }, (_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        size: Math.random() * 14 + 8,
        duration: Math.random() * 8 + 10,
        delay: Math.random() * 12,
        opacity: Math.random() * 0.4 + 0.15,
    }));
}

export default function FallingPetals() {
    /** Generate random values only on the client to avoid hydration mismatch */
    const [petals, setPetals] = useState<PetalData[]>([]);

    useEffect(() => {
        setPetals(generatePetals());
    }, []);

    // Don't render until client-side values are ready
    if (petals.length === 0) return null;

    return (
        <div className="fixed inset-0 z-10 pointer-events-none overflow-hidden" aria-hidden="true">
            {petals.map((petal) => (
                <div
                    key={petal.id}
                    className="absolute"
                    style={{
                        left: petal.left,
                        top: "-5%",
                        width: petal.size,
                        height: petal.size,
                        opacity: petal.opacity,
                        animation: `petal-fall ${petal.duration}s linear ${petal.delay}s infinite`,
                    }}
                >
                    {/* Rose petal SVG shape */}
                    <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        className="w-full h-full"
                        style={{
                            filter: `drop-shadow(0 0 3px rgba(232, 160, 191, 0.4))`,
                        }}
                    >
                        <path
                            d="M12 2C12 2 4 8 4 14C4 18.4 7.6 22 12 22C16.4 22 20 18.4 20 14C20 8 12 2 12 2Z"
                            fill="rgba(232, 160, 191, 0.8)"
                        />
                        <path
                            d="M12 2C12 2 8 8 8 14C8 18 10 20 12 22"
                            stroke="rgba(200, 100, 140, 0.5)"
                            strokeWidth="0.5"
                            fill="none"
                        />
                    </svg>
                </div>
            ))}
        </div>
    );
}
