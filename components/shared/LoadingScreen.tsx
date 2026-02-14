/**
 * LoadingScreen — Fixed hydration mismatch and optimized for returning users
 * =========================================================================
 */

"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ALL_ASSETS = [
    "/images/1.jpeg", "/images/2.jpeg", "/images/3.jpeg", "/images/4.jpeg",
    "/images/5.jpeg", "/images/6.jpeg",
];

// Audio files are loaded lazily to avoid memory issues
const AUDIO_ASSETS = [
    "/audio/voice.mp3",
    "/music/background.mp3",
];

export default function LoadingScreen({ onLoaded }: { onLoaded: (urls: Record<string, string>) => void }) {
    const [progress, setProgress] = useState(0);
    const [assetsLoaded, setAssetsLoaded] = useState(false);
    const [isExiting, setIsExiting] = useState(false);
    const [blobUrls, setBlobUrls] = useState<Record<string, string>>({});
    const [isReturningUser, setIsReturningUser] = useState<boolean | null>(null);
    const [starStyles, setStarStyles] = useState<{ left: string; top: string; delay: string }[]>([]);
    const loadingTriggered = useRef(false);

    useEffect(() => {
        if (loadingTriggered.current) return;
        loadingTriggered.current = true;

        // Check if user has visited before
        const hasVisited = typeof window !== 'undefined' ? localStorage.getItem("dounia_has_visited") : null;
        setIsReturningUser(!!hasVisited);

        // Generate star positions only on client to avoid hydration mismatch
        const stars = [...Array(15)].map(() => ({
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            delay: `${Math.random() * 5}s`
        }));
        setStarStyles(stars);

        const preload = async () => {
            const urls: Record<string, string> = {};
            let loadedCount = 0;

            // Preload images as blobs for faster loading
            const imageTasks = ALL_ASSETS.map(async (path) => {
                const controller = new AbortController();
                const timeoutId = window.setTimeout(() => controller.abort(), 8000);
                try {
                    const res = await fetch(path, { signal: controller.signal });
                    if (!res.ok) throw new Error();
                    const blob = await res.blob();
                    urls[path] = URL.createObjectURL(blob);
                } catch (e) {
                    urls[path] = path; // Fallback to original path if fetch fails
                } finally {
                    window.clearTimeout(timeoutId);
                    loadedCount++;
                    const pct = Math.round((loadedCount / ALL_ASSETS.length) * 100);
                    setProgress(pct);
                }
            });

            await Promise.allSettled(imageTasks);

            // Use regular URLs for audio (lazy load)
            for (const path of AUDIO_ASSETS) {
                urls[path] = path;
            }

            setBlobUrls(urls);
            setAssetsLoaded(true);
        };

        preload();
    }, []);

    const handleStart = () => {
        if (isExiting) return;
        if (typeof window !== 'undefined') {
            localStorage.setItem("dounia_has_visited", "true");
        }
        setIsExiting(true);
        setTimeout(() => onLoaded(blobUrls), 800);
    };

    return (
        <AnimatePresence>
            {!isExiting && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8 }}
                    className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-[#0a0a2e] overflow-hidden"
                >
                    {/* Ambient Background Glow */}
                    <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_50%,rgba(212,175,55,0.08)_0%,transparent_70%)]" />

                    {/* Animated Moon Logo */}
                    <motion.div
                        animate={{ rotate: [0, 5, -5, 0], scale: [1, 1.1, 1] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        className="relative mb-8 text-7xl drop-shadow-[0_0_30px_rgba(212,175,55,0.4)] pointer-events-none"
                    >
                        🌙
                    </motion.div>

                    <div className="relative z-10 pointer-events-auto flex flex-col items-center">
                    <AnimatePresence mode="wait">
                        {!assetsLoaded ? (
                            <motion.div
                                key="preloader"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="flex flex-col items-center"
                            >
                                <h1 className="font-[var(--font-amiri)] text-2xl md:text-3xl text-[#d4af37] mb-2" dir="rtl">
                                    {isReturningUser ? "توحشتيني؟ 🥰" : "لحظة من فضلك..."}
                                </h1>

                                {/* Only show progress bar for new users to keep returning user UI clean */}
                                {!isReturningUser && (
                                    <div className="w-64 h-1 bg-white/10 rounded-full mt-6 overflow-hidden">
                                        <motion.div
                                            className="h-full bg-[#d4af37]"
                                            initial={{ width: 0 }}
                                            animate={{ width: `${progress}%` }}
                                        />
                                    </div>
                                )}

                                <p className="mt-4 text-[#faf3e0]/30 text-[10px] tracking-[0.3em] uppercase">
                                    {isReturningUser ? "Magic is Loading..." : "Preparing your surprise"}
                                </p>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="ready"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-center flex flex-col items-center"
                            >
                                <h1 className="font-[var(--font-amiri)] text-4xl text-[#d4af37] mb-6 drop-shadow-lg" dir="rtl">
                                    {isReturningUser ? "توحشتك دنيا 🤍" : "كل شيء جاهز"}
                                </h1>

                                <motion.button
                                    onClick={handleStart}
                                    whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(212,175,55,0.4)" }}
                                    whileTap={{ scale: 0.95 }}
                                    className="relative z-20 cursor-pointer px-12 py-4 bg-[#d4af37] text-[#0a0a2e] rounded-full font-bold text-lg shadow-2xl transition-all"
                                >
                                    {isReturningUser ? "دخول سريع ✨" : "اضغطي هنا 🤍"}
                                </motion.button>

                                <p className="mt-4 text-[#faf3e0]/40 text-xs tracking-[0.2em] uppercase">
                                    Tap to start the magic
                                </p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                    </div>

                    {/* Decorative stars - styles generated on client only to fix hydration mismatch */}
                    {starStyles.map((star, i) => (
                        <div
                            key={i}
                            className="absolute w-0.5 h-0.5 bg-white rounded-full opacity-20 animate-pulse pointer-events-none"
                            style={{
                                left: star.left,
                                top: star.top,
                                animationDelay: star.delay
                            }}
                        />
                    ))}
                </motion.div>
            )}
        </AnimatePresence>
    );
}
