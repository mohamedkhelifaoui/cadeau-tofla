/**
 * StarryNight — Canvas-based animated starry sky with crescent moon
 * ==================================================================
 * Renders a full-viewport canvas with:
 *   - Twinkling stars of varying sizes and brightness
 *   - A beautiful glowing crescent moon (drawn on offscreen canvas
 *     to avoid compositing artifacts)
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
    speed: number;
    direction: number;
}

export default function StarryNight() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const starsRef = useRef<Star[]>([]);
    const animFrameRef = useRef<number>(0);
    const moonCanvasRef = useRef<HTMLCanvasElement | null>(null);

    /** Create initial stars array based on viewport size */
    const initStars = useCallback((width: number, height: number) => {
        // Reduced star count for better performance - max 80 stars
        const baseCount = Math.min(Math.floor((width * height) / 8000), 80);
        const stars: Star[] = [];
        for (let i = 0; i < baseCount; i++) {
            stars.push({
                x: Math.random() * width,
                y: Math.random() * height,
                radius: Math.random() * 1.5 + 0.5,
                opacity: Math.random() * 0.6 + 0.3,
                speed: Math.random() * 0.006 + 0.002,
                direction: Math.random() > 0.5 ? 1 : -1,
            });
        }
        return stars;
    }, []);

    /** Pre-render the crescent moon onto an offscreen canvas */
    const createMoonCanvas = useCallback((moonRadius: number) => {
        const size = moonRadius * 3;
        const offscreen = document.createElement("canvas");
        offscreen.width = size;
        offscreen.height = size;
        const ctx = offscreen.getContext("2d");
        if (!ctx) return offscreen;

        const cx = size / 2;
        const cy = size / 2;

        // Moon body — full golden circle
        ctx.beginPath();
        ctx.arc(cx, cy, moonRadius, 0, Math.PI * 2);
        const moonGrad = ctx.createRadialGradient(
            cx - moonRadius * 0.25, cy - moonRadius * 0.25, 0,
            cx, cy, moonRadius
        );
        moonGrad.addColorStop(0, "#fff5c0");
        moonGrad.addColorStop(0.4, "#ffe680");
        moonGrad.addColorStop(0.8, "#f4c430");
        moonGrad.addColorStop(1, "#d4af37");
        ctx.fillStyle = moonGrad;
        ctx.fill();

        // Cut out to create crescent shape
        ctx.globalCompositeOperation = "destination-out";
        ctx.beginPath();
        ctx.arc(cx + moonRadius * 0.48, cy - moonRadius * 0.1, moonRadius * 0.8, 0, Math.PI * 2);
        ctx.fill();

        // Reset compositing
        ctx.globalCompositeOperation = "source-over";

        moonCanvasRef.current = offscreen;
        return offscreen;
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const moonRadius = 42;

        /** Resize handler */
        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            starsRef.current = initStars(canvas.width, canvas.height);
            createMoonCanvas(moonRadius);
        };

        resize();
        window.addEventListener("resize", resize);

        /** Main animation loop */
        const animate = (time: number) => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Draw each star
            for (const star of starsRef.current) {
                star.opacity += star.speed * star.direction;
                if (star.opacity >= 1) {
                    star.opacity = 1;
                    star.direction = -1;
                } else if (star.opacity <= 0.2) {
                    star.opacity = 0.2;
                    star.direction = 1;
                }

                // Skip glow for small/faint stars for performance
                if (star.radius > 1.0 && star.opacity > 0.5) {
                    ctx.beginPath();
                    ctx.arc(star.x, star.y, star.radius * 2, 0, Math.PI * 2);
                    ctx.fillStyle = `rgba(250, 243, 224, ${star.opacity * 0.05})`;
                    ctx.fill();
                }

                ctx.beginPath();
                ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(250, 243, 224, ${star.opacity})`;
                ctx.fill();
            }

            // ── Draw the moon with glow layers ──
            const moonX = canvas.width * 0.82;
            const moonY = 110;
            const moonSize = moonRadius * 3;

            // Layer 1: Large soft ambient glow
            const pulse1 = 0.08 + Math.sin(time * 0.0005) * 0.03;
            const glow1 = ctx.createRadialGradient(moonX, moonY, 0, moonX, moonY, moonRadius * 7);
            glow1.addColorStop(0, `rgba(255, 230, 100, ${pulse1})`);
            glow1.addColorStop(0.4, `rgba(244, 196, 48, ${pulse1 * 0.4})`);
            glow1.addColorStop(1, "rgba(244, 196, 48, 0)");
            ctx.fillStyle = glow1;
            ctx.beginPath();
            ctx.arc(moonX, moonY, moonRadius * 7, 0, Math.PI * 2);
            ctx.fill();

            // Layer 2: Medium warm glow
            const pulse2 = 0.15 + Math.sin(time * 0.0008) * 0.06;
            const glow2 = ctx.createRadialGradient(moonX, moonY, moonRadius * 0.2, moonX, moonY, moonRadius * 3.5);
            glow2.addColorStop(0, `rgba(255, 235, 150, ${pulse2})`);
            glow2.addColorStop(0.5, `rgba(244, 196, 48, ${pulse2 * 0.3})`);
            glow2.addColorStop(1, "rgba(244, 196, 48, 0)");
            ctx.fillStyle = glow2;
            ctx.beginPath();
            ctx.arc(moonX, moonY, moonRadius * 3.5, 0, Math.PI * 2);
            ctx.fill();

            // Layer 3: Close bright glow
            const pulse3 = 0.25 + Math.sin(time * 0.001) * 0.08;
            const glow3 = ctx.createRadialGradient(moonX, moonY, moonRadius * 0.5, moonX, moonY, moonRadius * 1.8);
            glow3.addColorStop(0, `rgba(255, 245, 180, ${pulse3})`);
            glow3.addColorStop(1, "rgba(244, 196, 48, 0)");
            ctx.fillStyle = glow3;
            ctx.beginPath();
            ctx.arc(moonX, moonY, moonRadius * 1.8, 0, Math.PI * 2);
            ctx.fill();

            // Draw the pre-rendered crescent moon (offscreen canvas)
            if (moonCanvasRef.current) {
                ctx.save();
                ctx.shadowColor = "rgba(255, 220, 100, 0.7)";
                ctx.shadowBlur = 35;
                ctx.drawImage(
                    moonCanvasRef.current,
                    moonX - moonSize / 2,
                    moonY - moonSize / 2,
                    moonSize,
                    moonSize
                );
                // Second pass for extra glow
                ctx.shadowBlur = 60;
                ctx.shadowColor = "rgba(244, 196, 48, 0.3)";
                ctx.drawImage(
                    moonCanvasRef.current,
                    moonX - moonSize / 2,
                    moonY - moonSize / 2,
                    moonSize,
                    moonSize
                );
                ctx.restore();
            }

            animFrameRef.current = requestAnimationFrame(animate);
        };

        animFrameRef.current = requestAnimationFrame(animate);

        return () => {
            cancelAnimationFrame(animFrameRef.current);
            window.removeEventListener("resize", resize);
        };
    }, [initStars, createMoonCanvas]);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 z-0 pointer-events-none"
            aria-hidden="true"
        />
    );
}
