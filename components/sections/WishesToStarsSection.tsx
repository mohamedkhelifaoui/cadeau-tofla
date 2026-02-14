/**
 * WishesToStarsSection — Truly Random Starry Night
 * =================================================
 * Features:
 * - Stars launch to 100% random positions across the full viewport.
 * - Each star has unique size, speed, and rotation.
 * - Magical "Portal" collection animation.
 */

"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import GlassCard from "@/components/shared/GlassCard";

interface WishStar {
    id: number;
    text: string;
    x: number; // Final X %
    y: number; // Final Y %
    startX: number; // Start X %
    startY: number; // Start Y %
    scale: number;
    duration: number;
    rotation: number;
}

export default function WishesToStarsSection() {
    const [wishes, setWishes] = useState<WishStar[]>([]);
    const [inputValue, setInputValue] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isCollecting, setIsCollecting] = useState(false);
    const [showListModal, setShowListModal] = useState(false);
    const buttonRef = useRef<HTMLButtonElement>(null);

    // PERSISTENCE: Load wishes on mount
    useEffect(() => {
        const saved = localStorage.getItem("dounia_wishes");
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                if (Array.isArray(parsed)) {
                    setWishes(parsed);
                }
            } catch (e) {
                console.error("Failed to load wishes", e);
            }
        }
    }, []);

    const handleAddWish = (e: React.FormEvent) => {
        e.preventDefault();
        if (!inputValue.trim()) return;

        setIsSubmitting(true);

        const newId = Date.now();

        // Calculate start position from button
        let startPos = { x: 50, y: 100 }; // Default fallback
        if (buttonRef.current) {
            const rect = buttonRef.current.getBoundingClientRect();
            startPos = {
                x: ((rect.left + rect.width / 2) / window.innerWidth) * 100,
                y: ((rect.top + rect.height / 2) / window.innerHeight) * 100
            };
        }

        // Fully random target position across viewport (0-100%)
        const targetPos = {
            x: Math.random() * 100,
            y: Math.random() * 100
        };

        const newWish: WishStar = {
            id: newId,
            text: inputValue,
            x: targetPos.x,
            y: targetPos.y,
            startX: startPos.x,
            startY: startPos.y,
            scale: 0.5 + Math.random() * 1.0,
            duration: 2 + Math.random() * 2,
            rotation: Math.random() * 360,
        };

        setTimeout(() => {
            const nextWishes = [...wishes, newWish];
            setWishes(nextWishes);
            // PERSISTENCE: Save to localStorage
            localStorage.setItem("dounia_wishes", JSON.stringify(nextWishes));
            setInputValue("");
            setIsSubmitting(false);
        }, 300);
    };

    const handleCollectStars = () => {
        if (wishes.length === 0) return;
        setIsCollecting(true);
        setTimeout(() => {
            setShowListModal(true);
        }, 1500);
    };

    const handleCloseModal = () => {
        setShowListModal(false);
        setIsCollecting(false);
    };

    return (
        <section id="wishes" className="relative z-20 min-h-[70vh] py-20 px-4">

            {/* ─── Collection Portal ─── */}
            <AnimatePresence>
                {isCollecting && (
                    <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1.5, opacity: 1, rotate: 180 }}
                        exit={{ scale: 0, opacity: 0 }}
                        transition={{ duration: 1 }}
                        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[radial-gradient(circle,rgba(212,175,55,0.6)_0%,transparent_70%)] blur-3xl z-10 pointer-events-none"
                    />
                )}
            </AnimatePresence>

            {/* ─── Fixed Sky Container ─── */}
            <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
                <AnimatePresence>
                    {wishes.map((wish) => (
                        <motion.div
                            key={wish.id}
                            initial={{
                                left: `${wish.startX}%`,
                                top: `${wish.startY}%`,
                                scale: 0,
                                opacity: 1,
                            }}
                            animate={
                                isCollecting
                                    ? {
                                        left: "50%",
                                        top: "50%",
                                        scale: 0,
                                        opacity: 0,
                                        rotate: wish.rotation + 720
                                    }
                                    : {
                                        left: `${wish.x}%`,
                                        top: `${wish.y}%`,
                                        scale: wish.scale,
                                        opacity: 1,
                                        rotate: wish.rotation
                                    }
                            }
                            exit={{ scale: 0, opacity: 0 }}
                            transition={{
                                duration: isCollecting ? 1.5 : wish.duration,
                                ease: isCollecting ? "easeInOut" : "circOut",
                            }}
                            className="absolute"
                        >
                            <div className="relative group cursor-pointer pointer-events-auto">
                                {/* Star Visual - More Twinkle */}
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-24 bg-gradient-to-t from-transparent via-white to-transparent opacity-0 animate-pulse group-hover:opacity-0" />

                                <div className={`relative bg-gradient-to-r from-white to-[#f4c430] rounded-full shadow-[0_0_25px_#fff,0_0_50px_#d4af37] animate-pulse`}
                                    style={{ width: "12px", height: "12px" }}
                                />

                                <div className="absolute top-8 left-1/2 -translate-x-1/2 bg-[#0a0a2e]/90 backdrop-blur border border-[#d4af37]/40 px-3 py-1 rounded-full text-sm text-[#d4af37] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity z-50">
                                    {wish.text}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {/* ─── Input Area ─── */}
            <div className="relative z-10 max-w-xl mx-auto text-center mt-20">
                <GlassCard className="p-8 backdrop-blur-2xl border border-[#d4af37]/20 shadow-[0_0_50px_rgba(212,175,55,0.1)]">
                    <h2
                        className="text-3xl md:text-4xl font-[var(--font-amiri)] text-transparent bg-clip-text bg-gradient-to-r from-[#faf3e0] to-[#d4af37] mb-8"
                        dir="rtl"
                    >
                        ✨ تمنى أمنية للنجمة
                    </h2>

                    <form onSubmit={handleAddWish} className="flex flex-col gap-5">
                        <div className="relative group">
                            <input
                                type="text"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                placeholder="اكتب أمنيتك هنا..."
                                className="w-full bg-[#0a0a2e]/60 border border-[#d4af37]/30 rounded-xl p-5 text-lg text-[#faf3e0] placeholder-[#faf3e0]/30 focus:outline-none focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37] transition-all font-[var(--font-amiri)] shadow-inner"
                                dir="auto"
                                disabled={isSubmitting}
                            />
                            <div className="absolute inset-0 rounded-xl border border-[#d4af37]/0 group-hover:border-[#d4af37]/30 transition-all pointer-events-none" />
                        </div>

                        <div className="flex gap-4">
                            <motion.button
                                ref={buttonRef}
                                whileHover={{ scale: 1.02, textShadow: "0 0 8px rgb(255,255,255)" }}
                                whileTap={{ scale: 0.98 }}
                                type="submit"
                                disabled={isSubmitting}
                                className={`flex-1 py-4 rounded-xl font-bold text-[#0a0a2e] text-lg transition-all shadow-lg ${isSubmitting
                                    ? "bg-[#d4af37]/50 cursor-wait"
                                    : "bg-gradient-to-r from-[#d4af37] via-[#f4c430] to-[#d4af37] bg-[length:200%_auto] hover:bg-[position:right_center] hover:shadow-[0_0_30px_rgba(212,175,55,0.5)]"
                                    }`}
                            >
                                {isSubmitting ? "Sending..." : "Send to Sky 🚀"}
                            </motion.button>

                            {/* Collect Button */}
                            {wishes.length > 0 && (
                                <motion.button
                                    whileHover={{ scale: 1.05, backgroundColor: "rgba(212, 175, 55, 0.1)" }}
                                    whileTap={{ scale: 0.95 }}
                                    type="button"
                                    onClick={handleCollectStars}
                                    className="px-6 py-4 rounded-xl font-bold border-2 border-[#d4af37] text-[#d4af37] transition-all shadow-[0_0_15px_rgba(212,175,55,0.1)] hover:shadow-[0_0_25px_rgba(212,175,55,0.3)] relative overflow-hidden group"
                                    title="جمع الأمنيات"
                                >
                                    <span className="relative z-10 flex items-center gap-2">
                                        📥 <span className="hidden md:inline">Collect</span>
                                    </span>
                                </motion.button>
                            )}
                        </div>
                    </form>
                </GlassCard>
            </div>

            {/* ─── Wishes List Modal ─── */}
            <AnimatePresence>
                {showListModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        {/* Backdrop */}
                        <motion.button
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={handleCloseModal}
                            className="absolute inset-0 bg-[#000]/80 backdrop-blur-md cursor-default"
                        />

                        {/* Modal Content */}
                        <motion.div
                            initial={{ scale: 0.5, opacity: 0, y: 100 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.5, opacity: 0, y: 100 }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            className="relative z-10 w-full max-w-lg max-h-[80vh] flex flex-col"
                        >
                            <GlassCard className="flex flex-col max-h-[80vh] border-[#ffd700]/40 shadow-[0_0_100px_rgba(212,175,55,0.3)] overflow-hidden">
                                <div className="p-6 border-b border-[#faf3e0]/10 flex justify-between items-center bg-[#d4af37]/10">
                                    <h3 className="text-2xl font-[var(--font-amiri)] text-[#ffd700] drop-shadow-md">
                                        📜 سجل الأماني
                                    </h3>
                                    <button
                                        onClick={handleCloseModal}
                                        className="w-10 h-10 rounded-full flex items-center justify-center bg-[#faf3e0]/10 hover:bg-[#faf3e0]/20 text-[#faf3e0] transition-colors"
                                    >
                                        ✕
                                    </button>
                                </div>

                                <div className="p-6 overflow-y-auto space-y-4 custom-scrollbar bg-gradient-to-b from-transparent to-[#0a0a2e]/50">
                                    {wishes.map((wish, index) => (
                                        <motion.div
                                            key={wish.id}
                                            initial={{ x: -25, opacity: 0 }}
                                            animate={{ x: 0, opacity: 1 }}
                                            transition={{ delay: index * 0.1 + 0.3 }}
                                            className="bg-[#faf3e0]/5 rounded-xl p-4 border border-[#faf3e0]/10 flex items-start gap-4 hover:bg-[#faf3e0]/10 transition-colors group"
                                        >
                                            <div className="mt-1 w-8 h-8 rounded-full bg-gradient-to-br from-[#d4af37] to-[#b8860b] flex items-center justify-center text-xs text-[#0a0a2e] font-bold shadow-lg group-hover:scale-110 transition-transform">
                                                ★
                                            </div>
                                            <p className="flex-1 text-[#faf3e0] text-lg font-[var(--font-amiri)] leading-relaxed" dir="auto">
                                                {wish.text}
                                            </p>
                                        </motion.div>
                                    ))}
                                </div>
                            </GlassCard>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </section>
    );
}
