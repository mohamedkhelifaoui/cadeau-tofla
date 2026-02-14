/**
 * GoldenParticles — Upward-drifting golden sparkle particles
 * ===========================================================
 * Creates small golden dots that float upward with a gentle
 * horizontal drift, creating a magical atmosphere.
 *
 * Random values are generated in useEffect to avoid SSR hydration mismatch.
 */

"use client";

import { useState, useEffect } from "react";

/** Number of particles - reduced for performance */
const PARTICLE_COUNT = 12;

interface ParticleData {
    id: number;
    left: string;
    size: number;
    duration: number;
    delay: number;
    driftX: number;
    opacity: number;
}

function generateParticles(): ParticleData[] {
    return Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        size: Math.random() * 4 + 2,
        duration: Math.random() * 10 + 8,
        delay: Math.random() * 15,
        driftX: (Math.random() - 0.5) * 100,
        opacity: Math.random() * 0.5 + 0.2,
    }));
}

export default function GoldenParticles() {
    /** Generate random values only on the client to avoid hydration mismatch */
    const [particles, setParticles] = useState<ParticleData[]>([]);

    useEffect(() => {
        setParticles(generateParticles());
    }, []);

    // Don't render until client-side values are ready
    if (particles.length === 0) return null;

    return (
        <div className="fixed inset-0 z-[5] pointer-events-none overflow-hidden" aria-hidden="true">
            {particles.map((p) => (
                <div
                    key={p.id}
                    className="absolute rounded-full"
                    style={
                        {
                            left: p.left,
                            bottom: "-5%",
                            width: p.size,
                            height: p.size,
                            backgroundColor: `rgba(244, 196, 48, ${p.opacity})`,
                            boxShadow: `0 0 ${p.size * 2}px rgba(244, 196, 48, ${p.opacity * 0.6})`,
                            "--drift-x": `${p.driftX}px`,
                            animation: `particle-drift ${p.duration}s ease-in-out ${p.delay}s infinite`,
                        } as React.CSSProperties
                    }
                />
            ))}
        </div>
    );
}
