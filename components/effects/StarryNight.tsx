/**
 * StarryNight — Canvas-based animated starry sky with crescent moon
 * ==================================================================
 * Renders a full-viewport canvas with:
 *   - Twinkling stars of varying sizes and brightness
 *   - A glowing crescent moon in the upper-right area
 * Uses requestAnimationFrame for smooth 60fps animation.
 */

"use client";

import { useEffect, useRef, useCallback } from "react";

/** Single star data */
interface Star {
    x: number;
    y: number;
    radius: number;
    opacity: number;
    speed: number;       // Twinkle speed
    direction: number;   // 1 = brightening, -1 = dimming
}

export default function StarryNight() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const starsRef = useRef<Star[]>([]);
    const animFrameRef = useRef<number>(0);

    /** Create initial stars array based on viewport size */
    const initStars = useCallback((width: number, height: number) => {
        const count = Math.floor((width * height) / 3000); // density based on screen size
        const stars: Star[] = [];
        for (let i = 0; i < count; i++) {
            stars.push({
                x: Math.random() * width,
                y: Math.random() * height,
                radius: Math.random() * 1.8 + 0.3,
                opacity: Math.random() * 0.8 + 0.2,
                speed: Math.random() * 0.008 + 0.002,
                direction: Math.random() > 0.5 ? 1 : -1,
            });
        }
        return stars;
    }, []);

    /** Draw the crescent moon */
    const drawMoon = useCallback(
        (ctx: CanvasRenderingContext2D, width: number, time: number) => {
            const moonX = width * 0.82;
            const moonY = 100;
            const moonRadius = 40;

            // Outer glow
            const glowIntensity = 0.25 + Math.sin(time * 0.001) * 0.1;
            const outerGlow = ctx.createRadialGradient(
                moonX, moonY, moonRadius * 0.5,
                moonX, moonY, moonRadius * 3
            );
            outerGlow.addColorStop(0, `rgba(244, 196, 48, ${glowIntensity})`);
            outerGlow.addColorStop(1, "rgba(244, 196, 48, 0)");
            ctx.fillStyle = outerGlow;
            ctx.beginPath();
            ctx.arc(moonX, moonY, moonRadius * 3, 0, Math.PI * 2);
            ctx.fill();

            // Main crescent — draw full circle then cut out a smaller circle
            ctx.save();
            ctx.beginPath();
            ctx.arc(moonX, moonY, moonRadius, 0, Math.PI * 2);
            ctx.fillStyle = "#f4c430";
            ctx.shadowColor = "rgba(244, 196, 48, 0.6)";
            ctx.shadowBlur = 30;
            ctx.fill();

            // Cut-out to make crescent shape
            ctx.globalCompositeOperation = "destination-out";
            ctx.beginPath();
            ctx.arc(moonX + moonRadius * 0.45, moonY - moonRadius * 0.1, moonRadius * 0.85, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        },
        []
    );

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        /** Resize handler */
        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            starsRef.current = initStars(canvas.width, canvas.height);
        };

        resize();
        window.addEventListener("resize", resize);

        /** Main animation loop */
        const animate = (time: number) => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Draw each star
            for (const star of starsRef.current) {
                // Twinkle: oscillate opacity
                star.opacity += star.speed * star.direction;
                if (star.opacity >= 1) {
                    star.opacity = 1;
                    star.direction = -1;
                } else if (star.opacity <= 0.2) {
                    star.opacity = 0.2;
                    star.direction = 1;
                }

                ctx.beginPath();
                ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(250, 243, 224, ${star.opacity})`;
                ctx.fill();
            }

            // Draw the crescent moon
            drawMoon(ctx, canvas.width, time);

            animFrameRef.current = requestAnimationFrame(animate);
        };

        animFrameRef.current = requestAnimationFrame(animate);

        return () => {
            cancelAnimationFrame(animFrameRef.current);
            window.removeEventListener("resize", resize);
        };
    }, [initStars, drawMoon]);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 z-0 pointer-events-none"
            aria-hidden="true"
        />
    );
}
