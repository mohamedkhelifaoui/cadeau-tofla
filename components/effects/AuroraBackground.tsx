/**
 * AuroraBackground — Animated aurora borealis / nebula background
 * ================================================================
 * Adds beautiful, slow-moving colorful nebula blurs behind all content
 * for a magical, premium cosmic atmosphere.
 */

"use client";

import { useEffect, useState } from "react";

interface OrbData {
    id: number;
    x: string;
    y: string;
    size: number;
    color: string;
    duration: number;
    delay: number;
    moveX: number;
    moveY: number;
}

const COLORS = [
    "rgba(100, 50, 180, 0.12)",   // deep purple
    "rgba(30, 60, 150, 0.10)",    // rich blue
    "rgba(212, 175, 55, 0.06)",   // warm gold
    "rgba(232, 160, 191, 0.08)",  // rose pink
    "rgba(50, 120, 200, 0.08)",   // sapphire
    "rgba(80, 40, 120, 0.10)",    // violet
    "rgba(20, 80, 130, 0.07)",    // teal blue
    "rgba(180, 100, 60, 0.05)",   // warm amber
];

function generateOrbs(): OrbData[] {
    return Array.from({ length: 8 }, (_, i) => ({
        id: i,
        x: `${10 + Math.random() * 80}%`,
        y: `${5 + Math.random() * 90}%`,
        size: 250 + Math.random() * 400,
        color: COLORS[i % COLORS.length],
        duration: 15 + Math.random() * 25,
        delay: Math.random() * 10,
        moveX: (Math.random() - 0.5) * 200,
        moveY: (Math.random() - 0.5) * 150,
    }));
}

export default function AuroraBackground() {
    const [orbs, setOrbs] = useState<OrbData[]>([]);

    useEffect(() => {
        setOrbs(generateOrbs());
    }, []);

    if (orbs.length === 0) return null;

    return (
        <div
            className="fixed inset-0 z-[1] pointer-events-none overflow-hidden"
            aria-hidden="true"
        >
            {orbs.map((orb) => (
                <div
                    key={orb.id}
                    className="absolute rounded-full"
                    style={{
                        left: orb.x,
                        top: orb.y,
                        width: orb.size,
                        height: orb.size,
                        background: `radial-gradient(circle, ${orb.color} 0%, transparent 70%)`,
                        filter: `blur(${60 + orb.size * 0.15}px)`,
                        animation: `aurora-drift ${orb.duration}s ease-in-out ${orb.delay}s infinite alternate`,
                        "--aurora-x": `${orb.moveX}px`,
                        "--aurora-y": `${orb.moveY}px`,
                        transform: "translate(-50%, -50%)",
                    } as React.CSSProperties}
                />
            ))}
        </div>
    );
}
