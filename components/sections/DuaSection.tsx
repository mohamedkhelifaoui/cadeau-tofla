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
    "اللهم يا رب السماوات والأرض، احفظ لي دنيا حفظًا يليق بعظمتك.",
    "اللهم اجعلها أسعد خلقك نصيبًا، وأجملهم قدرًا، وأطيبهم قلبًا.",
    'اللهم بارك لها في عمرها، وفي علمها، وفي طريقها، ووفقها في دراستها في المدرسة الوطنية العليا لعلوم البحر وتهيئة الساحل، وافتح لها أبواب النجاح كما فتحت لي أبواب محبتها.',
    "اللهم إن كانت تبحث عن مستقبل أفضل، فاكتب لها مستقبلًا يفوق أحلامها، ويسّر لها الخير حيث كان، واصرف عنها كل سوء.",
    "اللهم اجعلني لها سندًا لا يميل، وأمانًا لا يخون، وقلبًا لا يتغير.",
    "اللهم احفظ عائلتها كما تحفظ عبادك الصالحين، وبارك لهم في صحتهم وأعمارهم، وأدم عليهم السكينة والطمأنينة.",
    "اللهم احفظ كل من يحبها ويحب لها الخير، واكتب لهم الأجر على محبتهم الصادقة.",
    'اللهم كما جمعتني بها في مكان العمل في "Intaj-Mohtawayat"، فاجمعني بها على طاعتك، واجعل بيننا مودة ورحمة، واكتب لنا أيامًا أجمل من ذكرياتنا في الجزائر الوسطى، وأجمل من لحظات الساعة الخامسة مساءً عند محطة الحافلات.',
    "يا رب، إن كانت هي دنيا اسماً، فاجعلها لي دنيا ونعيمًا، واكتب لنا جنةً نجتمع فيها كما اجتمع قلبانا هنا.",
    "آمين 🤍",
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
