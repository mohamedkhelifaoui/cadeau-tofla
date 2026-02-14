/**
 * VoiceMessageSection — The Art of Listening
 * ==========================================
 * A premium audio player experience designed for maximum emotional impact.
 * Features a dynamic waveform visualizer, precise progress tracking,
 * and an immersive, glassmorphism-based UI.
 */

"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import GlassCard from "@/components/shared/GlassCard";
import { Play, Pause, Headphones } from "lucide-react";
import { useMediaUrl } from "@/components/shared/MediaContext";

export default function VoiceMessageSection() {
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const voiceUrl = useMediaUrl("/audio/voice.mp3");

    // Format time helper
    const formatTime = (time: number) => {
        if (isNaN(time)) return "0:00";
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds.toString().padStart(2, "0")}`;
    };

    const togglePlay = (e?: React.MouseEvent) => {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }

        if (!audioRef.current) return;

        if (isPlaying) {
            audioRef.current.pause();
            document.dispatchEvent(new Event("cadeaux:voice-ended"));
        } else {
            document.dispatchEvent(new Event("cadeaux:voice-started"));
            audioRef.current.play().catch((err) => {
                console.error("Audio play failed:", err);
                alert("Please ensure public/audio/voice.mp3 exists.");
            });
        }
        setIsPlaying(!isPlaying);
    };

    const handleTimeUpdate = () => {
        if (audioRef.current) {
            setCurrentTime(audioRef.current.currentTime);
            setProgress((audioRef.current.currentTime / audioRef.current.duration) * 100);
        }
    };

    // Set the preloaded blob URL as audio source (no fetch needed)
    useEffect(() => {
        if (audioRef.current && voiceUrl) {
            audioRef.current.src = voiceUrl;
            audioRef.current.load();
        }
    }, [voiceUrl]);

    const handleLoadedMetadata = () => {
        if (audioRef.current) {
            setDuration(audioRef.current.duration);
        }
    };

    const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
        const time = (parseFloat(e.target.value) / 100) * duration;
        if (audioRef.current) {
            audioRef.current.currentTime = time;
            setCurrentTime(time);
            setProgress(parseFloat(e.target.value));
        }
    };

    const handleAudioEnded = () => {
        setIsPlaying(false);
        setProgress(0);
        setCurrentTime(0);
        document.dispatchEvent(new Event("cadeaux:voice-ended"));
        if (audioRef.current) audioRef.current.currentTime = 0;
    };

    // Waveform bars configuration
    const bars = Array.from({ length: 40 });

    return (
        <section id="voice-message" className="relative z-20 py-24 px-4 overflow-hidden">
            <div className="max-w-3xl mx-auto">
                <GlassCard className="relative overflow-hidden p-8 md:p-12 border border-[#d4af37]/30 shadow-[0_0_50px_rgba(212,175,55,0.1)]">

                    {/* ─── Ambient Glow ─── */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-gradient-to-b from-[#d4af37]/5 to-transparent pointer-events-none" />

                    {/* ─── Header ─── */}
                    <div className="text-center mb-10 relative z-10">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            className="inline-flex items-center gap-2 text-[#d4af37]/60 text-sm tracking-widest uppercase mb-4"
                        >
                            <Headphones className="w-4 h-4" />
                            <span>Headphones Recommended</span>
                        </motion.div>
                        <h2 className="font-[var(--font-amiri)] text-3xl md:text-5xl text-[#d4af37] mb-4" dir="rtl">
                            💌 رسالة من القلب
                        </h2>
                        <p className="text-[#faf3e0]/70 font-light text-lg">
                            Close your eyes and listen...
                        </p>
                    </div>

                    {/* ─── Visualizer ─── */}
                    <div className="h-32 flex items-center justify-center gap-0.5 md:gap-[3px] mb-10 overflow-hidden px-4">
                        {bars.map((_, i) => (
                            <motion.div
                                key={i}
                                className="w-1 md:w-1.5 bg-gradient-to-t from-[#d4af37] to-[#fbf5e6] rounded-full opacity-80"
                                animate={{
                                    height: isPlaying
                                        ? [
                                            Math.max(10, Math.random() * 60),
                                            Math.max(10, Math.random() * 120),
                                            Math.max(10, Math.random() * 60)
                                        ]
                                        : [10, 10, 10],
                                }}
                                transition={{
                                    duration: 0.4,
                                    repeat: Infinity,
                                    repeatType: "reverse",
                                    delay: i * 0.05,
                                    ease: "easeInOut",
                                }}
                                style={{
                                    height: isPlaying ? undefined : `${Math.sin(i * 0.5) * 10 + 20}px`, // Static wave when paused
                                    opacity: isPlaying ? 0.9 : 0.3,
                                }}
                            />
                        ))}
                    </div>

                    {/* ─── Controls ─── */}
                    <div className="flex flex-col items-center gap-6 relative z-10 max-w-md mx-auto w-full">

                        {/* Play/Pause Button */}
                        <motion.button
                            onClick={togglePlay}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            className="w-20 h-20 rounded-full bg-gradient-to-br from-[#d4af37] to-[#8a6e18] flex items-center justify-center shadow-[0_0_30px_rgba(212,175,55,0.4)] hover:shadow-[0_0_50px_rgba(212,175,55,0.6)] transition-all duration-300 group"
                        >
                            {isPlaying ? (
                                <Pause className="w-8 h-8 text-[#0a0a2e] ml-0.5" />
                            ) : (
                                <Play className="w-8 h-8 text-[#0a0a2e] ml-1" />
                            )}
                        </motion.button>

                        {/* Progress Bar & Time */}
                        <div className="w-full space-y-2">
                            <div className="relative w-full h-1.5 bg-[#d4af37]/20 rounded-full overflow-hidden cursor-pointer group">
                                <input
                                    type="range"
                                    min="0"
                                    max="100"
                                    value={progress || 0}
                                    onChange={handleSeek}
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
                                />
                                <motion.div
                                    className="absolute top-0 left-0 h-full bg-[#d4af37] rounded-full z-10"
                                    style={{ width: `${progress}%` }}
                                    layoutId="progress-bar"
                                />
                            </div>
                            <div className="flex justify-between text-xs text-[#d4af37]/60 font-mono tracking-wider">
                                <span>{formatTime(currentTime)}</span>
                                <span>{formatTime(duration)}</span>
                            </div>
                        </div>
                    </div>

                    <audio
                        ref={audioRef}
                        onTimeUpdate={handleTimeUpdate}
                        onLoadedMetadata={handleLoadedMetadata}
                        onEnded={handleAudioEnded}
                        className="hidden"
                        preload="auto"
                    />

                </GlassCard>
            </div>
        </section>
    );
}

