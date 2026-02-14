/**
 * QuizSection — A romantic mini-game about their relationship
 * ============================================================
 * An interactive quiz where Dounia answers questions about
 * their shared memories.
 *
 * Features:
 * - Fun personal questions
 * - Confetti burst animation (pure Framer Motion, no external lib)
 * - Visual feedback for correct/wrong answers
 * - Final "Success" state with a love message
 */

"use client";

import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import GlassCard from "@/components/shared/GlassCard";

interface Question {
    id: number;
    questionAr: string;
    questionEn: string;
    options: { text: string; isCorrect: boolean }[];
}

const QUESTIONS: Question[] = [
    {
        id: 1,
        questionAr: "متى هو عيد ميلادي؟",
        questionEn: "When is my birthday?",
        options: [
            { text: "12 July", isCorrect: false },
            { text: "11 July", isCorrect: true },
            { text: "11 June", isCorrect: false },
        ],
    },
    {
        id: 2,
        questionAr: "أين ولدت؟",
        questionEn: "Where was I born?",
        options: [
            { text: "Annaba", isCorrect: false },
            { text: "El Kala", isCorrect: true },
            { text: "Alger", isCorrect: false },
        ],
    },
    {
        id: 3,
        questionAr: "ما هو الشيء الذي أعشقه فيك وأريد أن أراه دائمًا؟",
        questionEn: "What do I love most about you and want to see always?",
        options: [
            { text: "Eyes", isCorrect: false },
            { text: "Smile (ابتسامتك)", isCorrect: true },
            { text: "Hair", isCorrect: false },
        ],
    },
    {
        id: 4,
        questionAr: "ما هي أكلتي المفضلة؟ (سؤال فخ 😂)",
        questionEn: "What is my favorite food? (Trick question!)",
        options: [
            { text: "Chakhchoukha", isCorrect: false },
            { text: "Dounia ❤️", isCorrect: true },
            { text: "Pizza", isCorrect: false },
        ],
    },
    {
        id: 5,
        questionAr: "من هي المرأة التي ملكت قلبي؟",
        questionEn: "Who is the woman who owns my heart?",
        options: [
            { text: "Dounia", isCorrect: true },
            { text: "The most beautiful woman", isCorrect: true },
            { text: "My beloved wife", isCorrect: true },
        ],
    },
];

/** Pure Framer Motion confetti particles — no external library needed */
const CONFETTI_EMOJIS = ["✨", "🌟", "💛", "⭐", "🤍", "💖", "🌙"];

function ConfettiBurst({ trigger }: { trigger: number }) {
    // Generate random particles each time trigger changes
    const particles = useMemo(() => {
        if (trigger === 0) return [];
        return Array.from({ length: 30 }, (_, i) => ({
            id: `${trigger}-${i}`,
            emoji: CONFETTI_EMOJIS[i % CONFETTI_EMOJIS.length],
            x: (Math.random() - 0.5) * 400,
            y: -(Math.random() * 300 + 100),
            rotate: Math.random() * 720 - 360,
            scale: Math.random() * 0.6 + 0.6,
            delay: Math.random() * 0.2,
        }));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [trigger]);

    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-50">
            <AnimatePresence>
                {particles.map((p) => (
                    <motion.span
                        key={p.id}
                        className="absolute left-1/2 top-1/2 text-xl"
                        initial={{ opacity: 1, x: 0, y: 0, scale: 0, rotate: 0 }}
                        animate={{
                            opacity: [1, 1, 0],
                            x: p.x,
                            y: p.y,
                            scale: p.scale,
                            rotate: p.rotate,
                        }}
                        exit={{ opacity: 0 }}
                        transition={{
                            duration: 1.2,
                            delay: p.delay,
                            ease: "easeOut",
                        }}
                    >
                        {p.emoji}
                    </motion.span>
                ))}
            </AnimatePresence>
        </div>
    );
}

export default function QuizSection() {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [isCompleted, setIsCompleted] = useState(false);
    const [selectedOption, setSelectedOption] = useState<number | null>(null);
    const [isWrong, setIsWrong] = useState(false);
    const [confettiTrigger, setConfettiTrigger] = useState(0);

    // PERSISTENCE: Load state on mount
    useEffect(() => {
        const savedIndex = localStorage.getItem("dounia_quiz_index");
        const savedCompleted = localStorage.getItem("dounia_quiz_completed");
        if (savedIndex) setCurrentQuestionIndex(parseInt(savedIndex));
        if (savedCompleted === "true") setIsCompleted(true);
    }, []);

    const handleOptionClick = (isCorrect: boolean, index: number) => {
        setSelectedOption(index);

        if (isCorrect) {
            // Correct answer — trigger confetti burst
            setConfettiTrigger((prev) => prev + 1);
            setTimeout(() => {
                const nextIndex = currentQuestionIndex + 1;
                if (nextIndex < QUESTIONS.length) {
                    setCurrentQuestionIndex(nextIndex);
                    localStorage.setItem("dounia_quiz_index", String(nextIndex));
                    setSelectedOption(null);
                } else {
                    setIsCompleted(true);
                    localStorage.setItem("dounia_quiz_completed", "true");
                }
            }, 1200);
        } else {
            // Wrong answer — shake effect
            setIsWrong(true);
            setTimeout(() => {
                setIsWrong(false);
                setSelectedOption(null);
            }, 1000);
        }
    };

    return (
        <section id="quiz" className="relative z-20 py-20 px-4">
            <div className="max-w-3xl mx-auto">
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
                        🧩 لعبة الذكريات
                    </h2>
                    <p className="text-[#faf3e0]/60 text-lg">
                        How well do you know me?
                    </p>
                </motion.div>

                {/* ─── Quiz Card ─── */}
                <AnimatePresence mode="wait">
                    {!isCompleted ? (
                        <motion.div
                            key={`question-${currentQuestionIndex}`}
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: -20 }}
                            transition={{ duration: 0.5 }}
                            className="perspective-1000"
                        >
                            <GlassCard className="p-8 md:p-12 relative overflow-hidden">
                                {/* Confetti burst overlay */}
                                <ConfettiBurst trigger={confettiTrigger} />

                                {/* Progress Bar */}
                                <div className="absolute top-0 left-0 h-1.5 bg-[#d4af37]/20 w-full">
                                    <motion.div
                                        className="h-full bg-gradient-to-r from-[#d4af37] to-[#f4c430]"
                                        initial={{ width: 0 }}
                                        animate={{
                                            width: `${((currentQuestionIndex + 1) / QUESTIONS.length) * 100}%`,
                                        }}
                                        transition={{ duration: 0.5 }}
                                    />
                                </div>

                                {/* Question counter badge */}
                                <div className="text-center mb-2 mt-4">
                                    <span className="inline-block px-3 py-1 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/30 text-[#d4af37]/70 text-xs tracking-wider">
                                        {currentQuestionIndex + 1} / {QUESTIONS.length}
                                    </span>
                                </div>

                                <div className="text-center mb-10 mt-4">
                                    <h3
                                        className="text-2xl md:text-3xl font-[var(--font-amiri)] text-[#d4af37] mb-3 leading-relaxed"
                                        dir="rtl"
                                    >
                                        {QUESTIONS[currentQuestionIndex].questionAr}
                                    </h3>
                                    <p className="text-[#faf3e0]/50 text-sm">
                                        {QUESTIONS[currentQuestionIndex].questionEn}
                                    </p>
                                </div>

                                <div className="grid gap-4">
                                    {QUESTIONS[currentQuestionIndex].options.map((option, idx) => {
                                        const isSelected = selectedOption === idx;
                                        const isCorrectOption = option.isCorrect;

                                        let buttonClass =
                                            "bg-[#0a0a2e]/30 border-[#d4af37]/30 text-[#faf3e0] hover:bg-[#d4af37]/10 hover:border-[#d4af37]";

                                        if (isSelected) {
                                            if (isCorrectOption) {
                                                buttonClass =
                                                    "bg-green-500/20 border-green-500 text-green-200 shadow-[0_0_30px_rgba(34,197,94,0.3)]";
                                            } else {
                                                buttonClass =
                                                    "bg-red-500/20 border-red-500 text-red-200";
                                            }
                                        }

                                        return (
                                            <motion.button
                                                key={idx}
                                                onClick={() =>
                                                    handleOptionClick(option.isCorrect, idx)
                                                }
                                                className={`
                          w-full py-5 px-6 rounded-xl border-2 transition-all duration-300
                          font-[var(--font-amiri)] text-xl relative overflow-hidden cursor-pointer
                          ${buttonClass}
                          ${isWrong && isSelected ? "animate-shake" : ""}
                        `}
                                                whileHover={selectedOption === null ? { scale: 1.03 } : {}}
                                                whileTap={selectedOption === null ? { scale: 0.97 } : {}}
                                                disabled={selectedOption !== null}
                                                animate={
                                                    isSelected && isCorrectOption
                                                        ? {
                                                            scale: [1, 1.05, 1],
                                                        }
                                                        : {}
                                                }
                                                transition={{ duration: 0.4 }}
                                                dir="rtl"
                                            >
                                                <span className="relative z-10 flex items-center justify-center gap-3">
                                                    {option.text}
                                                    {isSelected && isCorrectOption && (
                                                        <motion.span
                                                            initial={{ opacity: 0, scale: 0 }}
                                                            animate={{ opacity: 1, scale: 1 }}
                                                            transition={{ type: "spring", stiffness: 300 }}
                                                            className="text-2xl"
                                                        >
                                                            ✅
                                                        </motion.span>
                                                    )}
                                                    {isSelected && !isCorrectOption && (
                                                        <motion.span
                                                            initial={{ opacity: 0, scale: 0 }}
                                                            animate={{ opacity: 1, scale: 1 }}
                                                            transition={{ type: "spring", stiffness: 300 }}
                                                            className="text-2xl"
                                                        >
                                                            ❌
                                                        </motion.span>
                                                    )}
                                                </span>
                                            </motion.button>
                                        );
                                    })}
                                </div>
                            </GlassCard>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="completion-card"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.6 }}
                            className="text-center relative"
                        >
                            {/* Final confetti */}
                            <ConfettiBurst trigger={confettiTrigger + 100} />

                            <GlassCard className="p-10 border-[#d4af37]">
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1, rotate: 360 }}
                                    transition={{ duration: 0.8, type: "spring" }}
                                    className="text-7xl mb-6 inline-block"
                                >
                                    👑
                                </motion.div>
                                <h3
                                    className="text-3xl md:text-5xl font-[var(--font-amiri)] text-[#d4af37] mb-6 text-glow-gold"
                                    dir="rtl"
                                >
                                    أنتِ تعرفينني أكثر من نفسي!
                                </h3>
                                <p
                                    className="text-[#faf3e0]/80 text-lg mb-8 leading-relaxed"
                                    dir="rtl"
                                >
                                    أحب ابتسامتك، أحب وجودك، وأحب كل لحظة معك.
                                    <br />
                                    ربي يحفظك لي يا دنيا.
                                </p>
                                <motion.div
                                    className="inline-block px-8 py-3 rounded-full bg-[#d4af37]/20 border border-[#d4af37] text-[#d4af37] font-bold text-xl"
                                    animate={{
                                        boxShadow: [
                                            "0 0 0px rgba(212,175,55,0)",
                                            "0 0 25px rgba(212,175,55,0.6)",
                                            "0 0 0px rgba(212,175,55,0)",
                                        ],
                                    }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                >
                                    ❤️ أحبك يا دنيا ❤️
                                </motion.div>
                            </GlassCard>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
}
