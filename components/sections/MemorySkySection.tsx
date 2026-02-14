/**
 * MemorySkySection — Interactive hidden messages in the stars
 * ============================================================
 */

"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const MEMORIES = [
    { id: 1, text: "واش راكي يا طفلة؟ لقيتيني! 😂🤍", x: "15%", y: "20%", delay: 0 },
    { id: 2, text: "هدي النجمة ديالك وحدك، ما تقوليش لحد 🤫✨", x: "72%", y: "55%", delay: 1.5 },
    { id: 3, text: "كي نشوفك نولي نقول 'يا حسرة على قلبي' 😂❤️", x: "38%", y: "75%", delay: 0.8 },
    { id: 4, text: "نحبك خير من الزلابية في رمضان 🤣🌙", x: "83%", y: "15%", delay: 2.2 },
    { id: 5, text: "ما تهربيش مني، راني نلقاك حتى في النجوم 🌟😂", x: "10%", y: "65%", delay: 3.1 },
    { id: 6, text: "راكي ساكنة هنا ☝️ (يعني في قلبي مش في النجمة) 😂🤍", x: "55%", y: "30%", delay: 1.0 },
    { id: 7, text: "لو كان كل ضحكة ديالك نجمة، كون السما ضيقة عليهم 🌌😂", x: "28%", y: "45%", delay: 2.5 },
    { id: 8, text: "مبروك لقيتي نجمة أخرى! بصح مازال عندك خدمة 😂🔍", x: "90%", y: "40%", delay: 0.5 },
    { id: 9, text: "هاذي النجمة كانت مستنياتك من بكري 😂⭐", x: "48%", y: "88%", delay: 1.8 },
    { id: 10, text: "W t9al9ini nogetlek ya tofla 😂❤️‍🔥", x: "65%", y: "10%", delay: 3.5 },
    { id: 11, text: "أنا و أنتي كيما القمر و النجوم، ما ينفارقوش 🌙⭐", x: "5%", y: "85%", delay: 2.0 },
    { id: 12, text: "آخر نجمة! برافو عليك يا بطلة 🏆😂🤍", x: "78%", y: "80%", delay: 4.0 },
];

export default function MemorySkySection() {
    const [activeMemory, setActiveMemory] = useState<number | null>(null);
    const [foundStars, setFoundStars] = useState<Set<number>>(new Set());

    useEffect(() => {
        const saved = localStorage.getItem("dounia_found_stars");
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                if (Array.isArray(parsed)) setFoundStars(new Set(parsed));
            } catch (e) { console.error(e); }
        }
    }, []);

    const handleStarClick = (id: number) => {
        setActiveMemory(activeMemory === id ? null : id);
        setFoundStars((prev) => {
            const next = new Set(prev);
            if (!next.has(id)) {
                next.add(id);
                localStorage.setItem("dounia_found_stars", JSON.stringify(Array.from(next)));
            }
            return next;
        });
    };

    return (
        <section id="memory-sky" className="relative h-[80vh] w-full overflow-hidden bg-transparent pt-20">
            <div className="absolute top-10 left-1/2 -translate-x-1/2 text-center pointer-events-none z-10 w-full px-4">
                <h2 className="text-[#faf3e0]/30 text-sm tracking-[0.3em] uppercase">Find the hidden stars</h2>
                <p className="text-[#d4af37]/40 text-xs mt-2 font-mono">⭐ {foundStars.size} / {MEMORIES.length}</p>
            </div>

            {MEMORIES.map((memory) => {
                // Determine if the popup should go left or right based on X position
                const isFarRight = parseInt(memory.x) > 70;
                const isFarLeft = parseInt(memory.x) < 30;

                return (
                    <div key={memory.id} className="absolute" style={{ left: memory.x, top: memory.y }}>
                        <motion.button
                            onClick={() => handleStarClick(memory.id)}
                            whileHover={{ scale: 1.5, rotate: 45 }}
                            whileTap={{ scale: 0.9 }}
                            animate={{ opacity: [0.3, 1, 0.3], scale: [1, 1.3, 1] }}
                            transition={{
                                opacity: { duration: 2 + Math.random(), repeat: Infinity, delay: memory.delay },
                                scale: { duration: 2 + Math.random(), repeat: Infinity, delay: memory.delay },
                            }}
                            className="relative z-20 w-10 h-10 flex items-center justify-center cursor-pointer focus:outline-none group"
                        >
                            <svg viewBox="0 0 24 24" fill="currentColor"
                                className={`w-7 h-7 transition-colors duration-300 drop-shadow-[0_0_6px_rgba(212,175,55,0.5)] 
                                 ${foundStars.has(memory.id) ? "text-[#e8a0bf]" : "text-[#faf3e0] group-hover:text-[#d4af37]"}`}>
                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                            </svg>
                        </motion.button>

                        <AnimatePresence>
                            {activeMemory === memory.id && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10, scale: 0.9 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 10, scale: 0.9 }}
                                    className={`absolute z-30 w-52 bg-[#0a0a2e]/95 backdrop-blur-md border border-[#d4af37]/40 rounded-xl p-4 text-center shadow-[0_0_30px_rgba(212,175,55,0.3)]
                                                ${isFarRight ? "-left-48" : isFarLeft ? "left-10" : "left-1/2 -translate-x-1/2"} mt-4`}
                                >
                                    <p className="text-[#faf3e0] font-[var(--font-amiri)] text-lg leading-relaxed">{memory.text}</p>
                                    <div className={`absolute top-0 ${isFarRight ? "right-4" : isFarLeft ? "left-4" : "left-1/2 -translate-x-1/2"} 
                                                    -translate-y-2 w-4 h-4 bg-[#0a0a2e] border-t border-l border-[#d4af37]/40 rotate-45`} />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                );
            })}
        </section>
    );
}
