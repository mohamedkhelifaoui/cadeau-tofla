/**
 * MusicPlayer — Floating play/pause button for background music
 * ===============================================================
 * Renders a fixed-position button that toggles background audio.
 * Uses an HTML5 Audio element with loop enabled.
 * Falls back gracefully if no audio file is provided.
 */

"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useMediaUrl } from "@/components/shared/MediaContext";

export default function MusicPlayer() {
    const [isPlaying, setIsPlaying] = useState(true);
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const fallbackCleanupRef = useRef<(() => void) | null>(null);
    const isVoicePlayingRef = useRef(false);
    const musicUrl = useMediaUrl("/music/background.mp3");

    /** Toggle play/pause state */
    const toggleMusic = useCallback((e?: React.MouseEvent) => {
        if (e) e.stopPropagation();

        // If user manually toggles, cancel the fallback listener if it exists
        if (fallbackCleanupRef.current) {
            fallbackCleanupRef.current();
            fallbackCleanupRef.current = null;
        }

        if (!audioRef.current) return;

        if (isPlaying) {
            audioRef.current.pause();
        } else {
            // Only play if voice is NOT playing
            if (!isVoicePlayingRef.current) {
                audioRef.current.play().catch(() => {
                    // Browser blocked autoplay — silently ignore
                });
            }
        }
        setIsPlaying(!isPlaying);
    }, [isPlaying]);

    // Handle Voice Message Events
    useEffect(() => {
        const handleVoiceStart = () => {
            isVoicePlayingRef.current = true;
            if (audioRef.current && isPlaying) {
                audioRef.current.pause();
            }
        };

        const handleVoiceEnd = () => {
            isVoicePlayingRef.current = false;
            // Only resume if music is supposed to be ON
            if (audioRef.current && isPlaying) {
                audioRef.current.play().catch(() => { });
            }
        };

        document.addEventListener("cadeaux:voice-started", handleVoiceStart);
        document.addEventListener("cadeaux:voice-ended", handleVoiceEnd);

        return () => {
            document.removeEventListener("cadeaux:voice-started", handleVoiceStart);
            document.removeEventListener("cadeaux:voice-ended", handleVoiceEnd);
        };
    }, [isPlaying]);

    useEffect(() => {
        let isMounted = true;

        // Use preloaded blob URL from MediaContext (no fetch needed)
        const audio = new Audio(musicUrl);
        audio.loop = true;
        audio.volume = 0.3;
        audioRef.current = audio;

        // Try to autoplay once loaded
        const playPromise = audio.play();

        if (playPromise !== undefined) {
            playPromise.then(() => {
                // Success
            }).catch(() => {
                if (!isMounted) return;

                // Fallback for autoplay block
                const handleFirstClick = () => {
                    if (isVoicePlayingRef.current) return;
                    audio.play().catch(() => { });
                    if (fallbackCleanupRef.current) {
                        fallbackCleanupRef.current();
                        fallbackCleanupRef.current = null;
                    }
                };

                document.addEventListener('click', handleFirstClick);
                fallbackCleanupRef.current = () => {
                    document.removeEventListener('click', handleFirstClick);
                };
            });
        }

        return () => {
            isMounted = false;
            if (fallbackCleanupRef.current) {
                fallbackCleanupRef.current();
                fallbackCleanupRef.current = null;
            }
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current = null;
            }
        };
    }, [musicUrl]);

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
