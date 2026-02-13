/**
 * ShootingStars — Occasional shooting stars across the night sky
 * ==============================================================
 * Randomly triggers a shooting star animation that trails across
 * the background at various angles and speeds.
 */

"use client";

import { useEffect, useState } from "react";

interface Star {
    id: number;
    left: string;
    top: string;
    angle: number;
    scale: number;
    delay: number;
    duration: number;
}

export default function ShootingStars() {
    const [stars, setStars] = useState<Star[]>([]);

    useEffect(() => {
        const createStar = () => {
            const newStar: Star = {
                id: Date.now(),
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 50}%`,
                angle: 120 + Math.random() * 45, // Diagonally down-right
                scale: 0.5 + Math.random(),
                delay: 0,
                duration: 1 + Math.random() * 1.5,
            };

            setStars(prev => [...prev, newStar]);

            // Remove star after animation
            setTimeout(() => {
                setStars(prev => prev.filter(s => s.id !== newStar.id));
            }, newStar.duration * 1000 + 100);

            // Schedule next star
            const nextTime = Math.random() * 3000 + 2000;
            setTimeout(createStar, nextTime);
        };

        const timer = setTimeout(createStar, 1000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
            {stars.map(star => (
                <div
                    key={star.id}
                    className="absolute w-[1px] h-[1px] bg-transparent"
                    style={{
                        left: star.left,
                        top: star.top,
                        transform: `rotate(${star.angle}deg) scale(${star.scale})`,
                    }}
                >
                    <div
                        className="h-[2px] w-[150px] bg-gradient-to-r from-transparent via-white to-transparent"
                        style={{
                            animation: `shooting-star ${star.duration}s linear forwards`,
                            boxShadow: "0 0 20px 1px rgba(255, 255, 255, 0.4)",
                        }}
                    />
                </div>
            ))}
        </div>
    );
}
