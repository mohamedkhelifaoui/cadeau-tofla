/**
 * MusicPlayer — Floating play/pause button for background music
 * ===============================================================
 * Renders a fixed-position button that toggles background audio.
 * Uses an HTML5 Audio element with loop enabled.
 * Falls back gracefully if no audio file is provided.
 */

"use client";

import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function MusicPlayer() {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    /** Toggle play/pause state */
    const toggleMusic = useCallback(() => {
        if (!audioRef.current) {
            // Create audio element on first interaction (avoids autoplay restrictions)
            const audio = new Audio("/music/background.mp3");
            audio.loop = true;
            audio.volume = 0.3;
            audioRef.current = audio;
        }

        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play().catch(() => {
                // Browser blocked autoplay — silently ignore
            });
        }
        setIsPlaying(!isPlaying);
    }, [isPlaying]);

    return (
        <motion.button
            onClick={toggleMusic}
            className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full 
                 glass-strong flex items-center justify-center
                 cursor-pointer group glow-gold-hover
                 border border-[rgba(212,175,55,0.3)]"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2, duration: 0.6 }}
            aria-label={isPlaying ? "Pause music" : "Play music"}
            title={isPlaying ? "Pause music" : "Play music"}
        >
            <AnimatePresence mode="wait">
                {isPlaying ? (
                    <motion.span
                        key="pause"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        className="text-[#d4af37] text-xl"
                    >
                        ⏸
                    </motion.span>
                ) : (
                    <motion.span
                        key="play"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        className="text-[#d4af37] text-xl"
                    >
                        🎵
                    </motion.span>
                )}
            </AnimatePresence>

            {/* Pulsing ring when playing */}
            {isPlaying && (
                <motion.div
                    className="absolute inset-0 rounded-full border-2 border-[rgba(212,175,55,0.4)]"
                    animate={{ scale: [1, 1.3, 1], opacity: [0.6, 0, 0.6] }}
                    transition={{ duration: 2, repeat: Infinity }}
                />
            )}
        </motion.button>
    );
}
