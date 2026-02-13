/**
 * VoiceMessageSection — Play a personal audio message
 * ====================================================
 * An interactive section featuring a stylized audio player.
 * Plays the user's voice message when clicked.
 *
 * Uses HTML5 Audio API.
 * Requires an audio file at: /audio/voice.mp3 (to be added by user)
 */

"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import GlassCard from "@/components/shared/GlassCard";

export default function VoiceMessageSection() {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    const togglePlay = () => {
        if (!audioRef.current) return;

        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play().catch((err) => {
                console.error("Audio play failed:", err);
                alert("Please add your audio file to public/audio/voice.mp3");
            });
        }
        setIsPlaying(!isPlaying);
    };

    return (
        <section id="voice-message" className="relative z-20 py-20 px-4">
            <div className="max-w-2xl mx-auto text-center">
                <GlassCard className="relative overflow-hidden py-12 px-6">
                    {/* ─── Animated Sound Waves Background ─── */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
                        {[1, 2, 3].map((i) => (
                            <motion.div
                                key={i}
                                className="absolute rounded-full border border-[#d4af37]"
                                animate={{
                                    scale: isPlaying ? [1, 1.5, 2] : 1,
                                    opacity: isPlaying ? [1, 0] : 0,
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    delay: i * 0.6,
                                    ease: "easeOut",
                                }}
                                style={{
                                    width: `${i * 100}px`,
                                    height: `${i * 100}px`,
                                }}
                            />
                        ))}
                    </div>

                    <h2
                        className="font-[var(--font-amiri)] text-2xl md:text-3xl text-[#d4af37] mb-8 relative z-10"
                        dir="rtl"
                    >
                        💌 رسالة صوتية خاصة
                    </h2>

                    {/* ─── Play Button ─── */}
                    <motion.button
                        onClick={togglePlay}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="relative z-10 w-24 h-24 rounded-full bg-gradient-to-br from-[#d4af37] to-[#b8860b] flex items-center justify-center shadow-[0_0_30px_rgba(212,175,55,0.4)] hover:shadow-[0_0_50px_rgba(212,175,55,0.6)] transition-shadow duration-300"
                    >
                        {isPlaying ? (
                            <svg className="w-10 h-10 text-[#0a0a2e]" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M6 4h4v16H6zm8 0h4v16h-4z" />
                            </svg>
                        ) : (
                            <svg className="w-10 h-10 text-[#0a0a2e] ml-1" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M8 5v14l11-7z" />
                            </svg>
                        )}
                    </motion.button>

                    <p className="mt-6 text-[#faf3e0]/60 text-sm">
                        {isPlaying ? "Listening..." : "Click to listen to my voice"}
                    </p>

                    {/* Hidden Audio Element */}
                    <audio
                        ref={audioRef}
                        src="/audio/voice.mp3"
                        onEnded={() => setIsPlaying(false)}
                        className="hidden"
                    />
                </GlassCard>
            </div>
        </section>
    );
}
