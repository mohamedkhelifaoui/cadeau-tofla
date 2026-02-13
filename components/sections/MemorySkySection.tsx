/**
 * MemorySkySection — Interactive hidden messages in the stars
 * ============================================================
 * A section filled with twinkling stars. When the user clicks
 * on specific brighter stars, hidden romantic messages appear.
 */

"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const MEMORIES = [
    {
        id: 1,
        text: "تذكرت يوم الجزائر الوسطى؟ كان أجمل يوم 🤍",
        x: "20%",
        y: "30%",
        delay: 0,
    },
    {
        id: 2,
        text: "Want you always with me",
        x: "70%",
        y: "60%",
        delay: 1.5,
    },
    {
        id: 3,
        text: "ضحكتك هي الموسيقى المفضلة لدي 🎶",
        x: "40%",
        y: "80%",
        delay: 0.8,
    },
    {
        id: 4,
        text: "Every moment with you is a gift",
        x: "85%",
        y: "20%",
        delay: 2.2,
    },
    {
        id: 5,
        text: "أحب تفاصيلك الصغيرة",
        x: "15%",
        y: "75%",
        delay: 3.1,
    },
];

export default function MemorySkySection() {
    const [activeMemory, setActiveMemory] = useState<number | null>(null);

    return (
        <section id="memory-sky" className="relative h-[80vh] w-full overflow-hidden bg-transparent">
            {/* ─── Title ─── */}
            <div className="absolute top-10 left-1/2 -translate-x-1/2 text-center pointer-events-none z-10">
                <h2 className="text-[#faf3e0]/30 text-sm tracking-[0.3em] uppercase">
                    Find the hidden stars
                </h2>
            </div>

            {/* ─── Interactive Stars ─── */}
            {MEMORIES.map((memory) => (
                <div
                    key={memory.id}
                    className="absolute"
                    style={{ left: memory.x, top: memory.y }}
                >
                    <motion.button
                        onClick={() => setActiveMemory(activeMemory === memory.id ? null : memory.id)}
                        whileHover={{ scale: 1.5, rotate: 45 }}
                        whileTap={{ scale: 0.9 }}
                        animate={{
                            opacity: [0.4, 1, 0.4],
                            scale: [1, 1.2, 1],
                        }}
                        transition={{
                            opacity: { duration: 2 + Math.random(), repeat: Infinity, delay: memory.delay },
                            scale: { duration: 2 + Math.random(), repeat: Infinity, delay: memory.delay },
                        }}
                        className="relative z-20 w-8 h-8 flex items-center justify-center cursor-pointer focus:outline-none group"
                    >
                        {/* Star Shape */}
                        <svg
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className={`w-6 h-6 transition-colors duration-300 ${activeMemory === memory.id ? "text-[#e8a0bf]" : "text-[#faf3e0] group-hover:text-[#d4af37]"
                                }`}
                        >
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                        </svg>

                        {/* Pulse effect */}
                        <div className="absolute inset-0 bg-[#d4af37]/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
                    </motion.button>

                    {/* ─── Revealed Message ─── */}
                    <AnimatePresence>
                        {activeMemory === memory.id && (
                            <motion.div
                                initial={{ opacity: 0, y: 10, scale: 0.9 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 10, scale: 0.9 }}
                                className="absolute left-1/2 -translate-x-1/2 mt-4 w-48 bg-[#0a0a2e]/90 backdrop-blur-md border border-[#d4af37]/30 rounded-xl p-4 text-center z-30 shadow-[0_0_30px_rgba(212,175,55,0.2)]"
                            >
                                <p className="text-[#faf3e0] font-[var(--font-amiri)] text-lg leading-relaxed" dir="auto">
                                    {memory.text}
                                </p>
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 w-4 h-4 bg-[#0a0a2e]/90 border-t border-l border-[#d4af37]/30 rotate-45" />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            ))}
        </section>
    );
}
