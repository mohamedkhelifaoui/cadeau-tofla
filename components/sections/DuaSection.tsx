/**
 * DuaSection — Beautiful prayer section for Dounia
 * ===================================================
 * Displays the heartfelt dua in elegant Arabic typography
 * with a glassmorphism card, gold accents, and reveal animations.
 */

"use client";

import { motion } from "framer-motion";
import GlassCard from "@/components/shared/GlassCard";

/** The complete dua text, split by paragraph for individual animations */
const DUA_PARAGRAPHS = [
    "اللهم يا واسع الرحمة ويا عليم الغيوب،",
    "اللهم اجعل دنيا زوجة صالحة لي، واجمع بيننا على الخير والمحبة في طاعتك، واجعل علاقتنا حلالاً طيباً مباركاً، وبارك لنا في قلبينا وفي مستقبلنا معاً.",
    "اللهم احفظ دنيا وأهلها وأحبابها من كل سوء، واجعلهم في أمان وسعادة ورزق وراحة بال، واغمر حياتهم بالخير والبركة والفرح.",
    "اللهم اجعلنا لبعضنا لبعض أسباب سعادة الدنيا والآخرة، ووفقنا لما تحبه وترضاه، واجعل محبتنا فيك وفي طاعتك.",
    "اللهم احفظ من يحب دنيا وأحبهم فيها، وبارك لنا جميعاً في كل شيء خير لنا.",
    "اللهم آمين. 🤲",
];

export default function DuaSection() {
    return (
        <section id="dua" className="relative z-20 py-20 md:py-28 px-4">
            <div className="max-w-4xl mx-auto">
                {/* ─── Section Title ─── */}
                <motion.div
                    className="text-center mb-12"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <h2
                        className="font-[var(--font-amiri)] text-3xl sm:text-4xl md:text-5xl
                       text-gold-gradient animate-glow-pulse mb-4"
                        dir="rtl"
                    >
                        🤲 دعاء لدنيا
                    </h2>
                    <p className="text-[#faf3e0]/60 text-lg">A prayer from my heart</p>
                </motion.div>

                {/* ─── Dua Card ─── */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <GlassCard strong className="relative overflow-hidden">
                        {/* Decorative top border */}
                        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent" />

                        {/* Bismillah opening */}
                        <motion.p
                            className="text-center text-[#d4af37] text-2xl md:text-3xl font-[var(--font-amiri)]
                         text-glow-gold mb-10"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.5, duration: 0.8 }}
                            dir="rtl"
                        >
                            بسم الله الرحمن الرحيم
                        </motion.p>

                        {/* Dua paragraphs */}
                        <div className="space-y-6" dir="rtl">
                            {DUA_PARAGRAPHS.map((paragraph, index) => {
                                const isAmeen = index === DUA_PARAGRAPHS.length - 1;

                                return (
                                    <motion.p
                                        key={index}
                                        className={`font-[var(--font-amiri)] leading-loose ${isAmeen
                                            ? "text-center text-3xl md:text-4xl text-[#d4af37] text-glow-gold mt-10 font-bold"
                                            : "text-lg md:text-xl text-[#faf3e0]/90"
                                            }`}
                                        initial={{ opacity: 0, x: 20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{
                                            delay: 0.5 + index * 0.15,
                                            duration: 0.6,
                                        }}
                                    >
                                        {paragraph}
                                    </motion.p>
                                );
                            })}
                        </div>

                        {/* Decorative bottom border */}
                        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent" />
                    </GlassCard>
                </motion.div>
            </div>
        </section>
    );
}
