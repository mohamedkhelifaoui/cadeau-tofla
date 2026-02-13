/**
 * ReasonsSection — Infinite card stack of love reasons
 * =====================================================
 * An interactive section where cards flip to reveal
 * different reasons why he loves her. Now with 50+ reasons!
 */

"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import GlassCard from "@/components/shared/GlassCard";

const REASONS = [
    { ar: "لأنكِ حنونة وطيبة القلب", en: "Because you are kind and soft-hearted" },
    { ar: "لأنكِ تدعمينني دائمًا", en: "Because you always support me" },
    { ar: "لأن ضحكتك تنير حياتي", en: "Because your laugh lights up my life" },
    { ar: "لأنكِ طموحة ومجتهدة", en: "Because you are ambitious and hardworking" },
    { ar: "لأنكِ أجمل شيء حدث لي", en: "Because you are the best thing that happened to me" },
    { ar: "لأنكِ تجعلين الصعب سهلًا", en: "Because you make hard things easy" },
    { ar: "لأنكِ أماني ومأمني", en: "Because you are my safety and peace" },
    { ar: "لأنكِ دنيا.. ودنياي", en: "Because you are Dounia.. my world" },
    { ar: "لأنكِ تفهمينني بدون كلام", en: "Because you understand me without words" },
    { ar: "لأنكِ صبورة ومتفهمة", en: "Because you are patient and understanding" },
    { ar: "لأنكِ تجعلين كل يوم أجمل", en: "Because you make every day more beautiful" },
    { ar: "لأنكِ أقوى امرأة أعرفها", en: "Because you are the strongest woman I know" },
    { ar: "لأن عينيكِ تحكي قصة حب", en: "Because your eyes tell a love story" },
    { ar: "لأنكِ ملجأي في كل وقت", en: "Because you are my refuge at all times" },
    { ar: "لأنكِ تؤمنين بي حتى عندما أشك في نفسي", en: "Because you believe in me even when I doubt myself" },
    { ar: "لأنكِ طيبة مع كل الناس", en: "Because you are kind to everyone" },
    { ar: "لأنكِ تعلمينني الحب كل يوم", en: "Because you teach me love every day" },
    { ar: "لأن صوتكِ يهدئ روحي", en: "Because your voice calms my soul" },
    { ar: "لأنكِ تحبينني بعيوبي", en: "Because you love me with my flaws" },
    { ar: "لأن قلبكِ كبير ونقي", en: "Because your heart is big and pure" },
    { ar: "لأنكِ ذكية ومبدعة", en: "Because you are smart and creative" },
    { ar: "لأنكِ تهتمين بالتفاصيل الصغيرة", en: "Because you care about the small details" },
    { ar: "لأنكِ أحلى ابتسامة في العالم", en: "Because you have the most beautiful smile in the world" },
    { ar: "لأنكِ شريكة أحلامي", en: "Because you are the partner of my dreams" },
    { ar: "لأنكِ تقفين بجانبي في السراء والضراء", en: "Because you stand by me in good times and bad" },
    { ar: "لأنكِ تجعلين البيت جنة", en: "Because you make our home a paradise" },
    { ar: "لأنكِ تلهمينني أن أكون أفضل", en: "Because you inspire me to be better" },
    { ar: "لأنكِ نور في حياتي المظلمة", en: "Because you are the light in my dark life" },
    { ar: "لأنكِ تحبين الخير للجميع", en: "Because you wish goodness for everyone" },
    { ar: "لأنكِ جميلة من الداخل والخارج", en: "Because you are beautiful inside and out" },
    { ar: "لأن حضنكِ أجمل مكان في الدنيا", en: "Because your embrace is the most beautiful place in the world" },
    { ar: "لأنكِ تضحكين على نكتي حتى لو ما كانت مضحكة", en: "Because you laugh at my jokes even when they're not funny" },
    { ar: "لأنكِ تطبخين بحب", en: "Because you cook with love" },
    { ar: "لأنكِ دعاء أمي استجاب", en: "Because you are my mother's prayer answered" },
    { ar: "لأنكِ رفيقة دربي", en: "Because you are my life companion" },
    { ar: "لأنكِ تتحملينني وقت الغضب", en: "Because you tolerate me when I'm angry" },
    { ar: "لأنكِ وفية ومخلصة", en: "Because you are loyal and faithful" },
    { ar: "لأنكِ أول وآخر فكرة في يومي", en: "Because you are my first and last thought of the day" },
    { ar: "لأنكِ سبب سعادتي", en: "Because you are the reason for my happiness" },
    { ar: "لأنكِ تجعلين المستحيل ممكن", en: "Because you make the impossible possible" },
    { ar: "لأنكِ تخافين عليّ أكثر من نفسي", en: "Because you care about me more than I do myself" },
    { ar: "لأنكِ تصلين من أجلي", en: "Because you pray for me" },
    { ar: "لأنكِ هدية من الله", en: "Because you are a gift from God" },
    { ar: "لأنكِ تملأين حياتي بالألوان", en: "Because you fill my life with colors" },
    { ar: "لأنكِ قوية حتى في أصعب اللحظات", en: "Because you are strong even in the hardest moments" },
    { ar: "لأن حبكِ يشفيني", en: "Because your love heals me" },
    { ar: "لأنكِ تعرفين ماذا أريد قبل أن أقول", en: "Because you know what I want before I say it" },
    { ar: "لأنكِ أمل لا ينتهي", en: "Because you are an endless hope" },
    { ar: "لأنكِ تجعلين الحياة تستحق", en: "Because you make life worth living" },
    { ar: "لأنني أحبكِ ببساطة.. بلا سبب", en: "Because I simply love you.. for no reason at all" },
];

/** Swipe direction variants */
const cardVariants = {
    enter: (direction: number) => ({
        x: direction > 0 ? 200 : -200,
        opacity: 0,
        scale: 0.85,
        rotateY: direction > 0 ? 15 : -15,
    }),
    center: {
        x: 0,
        opacity: 1,
        scale: 1,
        rotateY: 0,
    },
    exit: (direction: number) => ({
        x: direction > 0 ? -200 : 200,
        opacity: 0,
        scale: 0.85,
        rotateY: direction > 0 ? -15 : 15,
    }),
};

export default function ReasonsSection() {
    const [index, setIndex] = useState(0);
    const [direction, setDirection] = useState(1);
    const [isAutoPlaying, setIsAutoPlaying] = useState(false);

    const nextReason = () => {
        setDirection(1);
        setIndex((prev) => (prev + 1) % REASONS.length);
    };

    const prevReason = () => {
        setDirection(-1);
        setIndex((prev) => (prev - 1 + REASONS.length) % REASONS.length);
    };

    /** Optional auto-play */
    useEffect(() => {
        if (!isAutoPlaying) return;
        const timer = setInterval(nextReason, 3000);
        return () => clearInterval(timer);
    }, [isAutoPlaying]);

    return (
        <section id="reasons" className="relative z-20 py-20 px-4">
            <div className="max-w-4xl mx-auto text-center">
                {/* ─── Section Title ─── */}
                <motion.div
                    className="mb-12"
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
                        💖 {REASONS.length} سبب لماذا أحبك
                    </h2>
                    <p className="text-[#faf3e0]/60 text-lg">
                        Swipe through all the reasons... 💕
                    </p>
                </motion.div>

                {/* ─── Card Stack ─── */}
                <div className="relative h-72 md:h-80 w-full max-w-lg mx-auto perspective-1000">
                    <AnimatePresence mode="wait" custom={direction}>
                        <motion.div
                            key={index}
                            custom={direction}
                            variants={cardVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{ duration: 0.45, ease: "easeInOut" }}
                            className="absolute inset-0 cursor-pointer"
                            onClick={nextReason}
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                        >
                            <GlassCard className="h-full flex flex-col items-center justify-center p-6 border-2 border-[#d4af37]/30 relative overflow-hidden">
                                {/* Subtle gradient overlay */}
                                <div className="absolute inset-0 bg-gradient-to-br from-[#d4af37]/5 via-transparent to-[#e8a0bf]/5 pointer-events-none" />

                                {/* Number badge */}
                                <div className="relative z-10 w-14 h-14 rounded-full bg-gradient-to-br from-[#d4af37]/30 to-[#d4af37]/10 flex items-center justify-center mb-5 border border-[#d4af37]/20">
                                    <span className="text-[#d4af37] text-xl font-bold">{index + 1}</span>
                                </div>

                                {/* Arabic reason */}
                                <h3
                                    className="relative z-10 text-xl sm:text-2xl md:text-3xl font-[var(--font-amiri)] text-[#faf3e0] mb-4 text-center leading-relaxed"
                                    dir="rtl"
                                >
                                    {REASONS[index].ar}
                                </h3>

                                {/* English translation */}
                                <p className="relative z-10 text-[#d4af37]/60 font-light text-sm md:text-base italic">
                                    {REASONS[index].en}
                                </p>

                                {/* Tap hint */}
                                <div className="relative z-10 mt-6 text-[#faf3e0]/20 text-xs uppercase tracking-[0.2em]">
                                    Tap for next
                                </div>
                            </GlassCard>
                        </motion.div>
                    </AnimatePresence>

                    {/* Background decorative cards to show stack effect */}
                    <div className="absolute inset-0 bg-[#d4af37]/5 rotate-2 scale-[0.97] -z-10 rounded-3xl border border-[#d4af37]/10" />
                    <div className="absolute inset-0 bg-[#d4af37]/3 -rotate-2 scale-[0.94] -z-20 rounded-3xl border border-[#d4af37]/5" />
                    <div className="absolute inset-0 bg-[#d4af37]/2 rotate-3 scale-[0.91] -z-30 rounded-3xl" />
                </div>

                {/* ─── Navigation Controls ─── */}
                <motion.div
                    className="mt-8 flex items-center justify-center gap-4"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                >
                    {/* Prev button */}
                    <button
                        onClick={prevReason}
                        className="w-10 h-10 rounded-full glass flex items-center justify-center text-[#d4af37]/70 hover:text-[#d4af37] hover:border-[#d4af37]/30 border border-transparent transition-all duration-300 hover:scale-110"
                        aria-label="Previous reason"
                    >
                        ←
                    </button>

                    {/* Progress indicator */}
                    <div className="flex items-center gap-2">
                        <span className="text-[#d4af37] font-bold text-sm">{index + 1}</span>
                        <div className="w-24 h-1 bg-[#d4af37]/10 rounded-full overflow-hidden">
                            <motion.div
                                className="h-full bg-gradient-to-r from-[#d4af37] to-[#f4c430] rounded-full"
                                animate={{ width: `${((index + 1) / REASONS.length) * 100}%` }}
                                transition={{ duration: 0.3 }}
                            />
                        </div>
                        <span className="text-[#faf3e0]/30 text-sm">{REASONS.length}</span>
                    </div>

                    {/* Next button */}
                    <button
                        onClick={nextReason}
                        className="w-10 h-10 rounded-full glass flex items-center justify-center text-[#d4af37]/70 hover:text-[#d4af37] hover:border-[#d4af37]/30 border border-transparent transition-all duration-300 hover:scale-110"
                        aria-label="Next reason"
                    >
                        →
                    </button>

                    {/* Auto-play toggle */}
                    <button
                        onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                        className={`w-10 h-10 rounded-full glass flex items-center justify-center text-sm transition-all duration-300 hover:scale-110 border ${isAutoPlaying
                                ? "text-[#d4af37] border-[#d4af37]/30 shadow-[0_0_15px_rgba(212,175,55,0.2)]"
                                : "text-[#faf3e0]/40 border-transparent hover:text-[#d4af37]/70"
                            }`}
                        aria-label={isAutoPlaying ? "Pause auto-play" : "Start auto-play"}
                    >
                        {isAutoPlaying ? "⏸" : "▶"}
                    </button>
                </motion.div>
            </div>
        </section>
    );
}
