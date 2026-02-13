/**
 * LoveLetterModal — Heartfelt love letter with typing effect
 * ============================================================
 * Full-screen modal that reveals a personal love letter line by line
 * with a typewriter animation effect. Includes:
 *   - First meeting at "Intaj-Mohtawayat"
 *   - Working together before she left
 *   - Her studies at "المدرسة الوطنية العليا لعلوم البحر وتهيئة الساحل"
 *   - The touching "do you have a man in your life?" moment
 *   - Memories of Alger Center and the 17:00 bus station
 *   - Romantic closing signature
 *
 * Uses Framer Motion for the modal entrance/exit and a custom
 * typing animation hook for the letter content.
 */

"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LoveLetterModalProps {
    isOpen: boolean;
    onClose: () => void;
}

/** The love letter content — each item is a separate paragraph */
const LETTER_LINES = [
    "حبيبتي دنيا… 🤍",
    "",
    "لا أعرف من أين أبدأ، لأن كل الكلمات تقف عاجزة أمام ما أشعر به نحوك.",
    "",
    'أتذكرين يوم التقينا في "Intaj-Mohtawayat"؟ كان مكان عملنا، وكانت أيامنا هناك قليلة لكنها كانت كافية لأن يتعلق قلبي بك. عملنا معًا بضعة أيام فقط، قبل أن تنتقلي إلى فرص جديدة… لكن قلبي لم ينتقل من مكانه.',
    "",
    'وأنتِ الآن تواصلين مشوارك في "المدرسة الوطنية العليا لعلوم البحر وتهيئة الساحل"، وأنا أفخر بك كل يوم. أنتِ امرأة طموحة، قوية، وتستحقين كل النجاح في هذه الدنيا.',
    "",
    'أتذكرين اللحظة التي سألتك فيها: "هل في حياتك رجل؟"… كنت أحمل في قلبي نية واحدة فقط: أن أكون أنا ذلك الرجل. وأحمد الله أنك أعطيتني هذه الفرصة.',
    "",
    "أتذكرين مشاوينا إلى وسط الجزائر العاصمة؟ كل شارع مشيناه معًا أصبح ذكرى لا تُنسى. وأتذكر كل يوم الساعة الخامسة مساءً، عندما كنا نمشي معًا إلى محطة الحافلات بعد نهاية العمل… تلك اللحظات البسيطة كانت أجمل لحظات حياتي.",
    "",
    "دنيا… أنتِ اسم على مسمى. أنتِ دنياي وجنتي. أحبك بكل ما في هذا القلب.",
    "",
    "كل عام وأنتِ حبيبتي، كل رمضان وأنتِ نوري، وكل يوم وأنتِ سبب سعادتي.",
    "",
    "زوجك الذي يحبك دائمًا 🤍",
];

export default function LoveLetterModal({
    isOpen,
    onClose,
}: LoveLetterModalProps) {
    /** How much of the letter has been "typed" out */
    const [displayedLines, setDisplayedLines] = useState<string[]>([]);
    const [currentLineIndex, setCurrentLineIndex] = useState(0);
    const [currentCharIndex, setCurrentCharIndex] = useState(0);
    const [isTypingComplete, setIsTypingComplete] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    /** Reset typing state when modal opens */
    useEffect(() => {
        if (isOpen) {
            setDisplayedLines([]);
            setCurrentLineIndex(0);
            setCurrentCharIndex(0);
            setIsTypingComplete(false);
        }
    }, [isOpen]);

    /** Typing animation effect */
    useEffect(() => {
        if (!isOpen || isTypingComplete) return;

        // If all lines are done
        if (currentLineIndex >= LETTER_LINES.length) {
            setIsTypingComplete(true);
            return;
        }

        const currentFullLine = LETTER_LINES[currentLineIndex];

        // If current line is empty (paragraph break), add immediately
        if (currentFullLine === "") {
            const timeout = setTimeout(() => {
                setDisplayedLines((prev) => [...prev, ""]);
                setCurrentLineIndex((prev) => prev + 1);
                setCurrentCharIndex(0);
            }, 200);
            return () => clearTimeout(timeout);
        }

        // Type out character by character
        if (currentCharIndex <= currentFullLine.length) {
            const timeout = setTimeout(
                () => {
                    const partialLine = currentFullLine.slice(0, currentCharIndex);

                    setDisplayedLines((prev) => {
                        const newLines = [...prev];
                        // Replace last line being typed, or add new one
                        if (
                            newLines.length > 0 &&
                            currentCharIndex > 0 &&
                            newLines[newLines.length - 1] !== ""
                        ) {
                            newLines[newLines.length - 1] = partialLine;
                        } else {
                            newLines.push(partialLine);
                        }
                        return newLines;
                    });

                    if (currentCharIndex === currentFullLine.length) {
                        // Line complete — move to next
                        setCurrentLineIndex((prev) => prev + 1);
                        setCurrentCharIndex(0);
                    } else {
                        setCurrentCharIndex((prev) => prev + 1);
                    }
                },
                currentCharIndex === 0 ? 300 : 25 // Pause before each new line
            );
            return () => clearTimeout(timeout);
        }
    }, [isOpen, currentLineIndex, currentCharIndex, isTypingComplete]);

    /** Auto-scroll to bottom as text appears */
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [displayedLines]);

    /** Skip to full letter */
    const skipTyping = useCallback(() => {
        setDisplayedLines([...LETTER_LINES]);
        setIsTypingComplete(true);
    }, []);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 z-[100] flex items-center justify-center p-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                >
                    {/* ─── Backdrop ─── */}
                    <motion.div
                        className="absolute inset-0 bg-black/70 backdrop-blur-md"
                        onClick={onClose}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    />

                    {/* ─── Modal Content ─── */}
                    <motion.div
                        className="relative w-full max-w-2xl max-h-[85vh] glass-strong rounded-3xl
                       border border-[rgba(212,175,55,0.2)] overflow-hidden
                       flex flex-col"
                        initial={{ opacity: 0, scale: 0.9, y: 30 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 30 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                    >
                        {/* Top decorative bar */}
                        <div className="h-1 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent" />

                        {/* ─── Header ─── */}
                        <div className="flex items-center justify-between px-6 pt-6 pb-3">
                            <h3
                                className="font-[var(--font-amiri)] text-2xl md:text-3xl text-[#d4af37] text-glow-gold"
                                dir="rtl"
                            >
                                💌 رسالة من قلبي
                            </h3>
                            <button
                                onClick={onClose}
                                className="w-10 h-10 rounded-full glass flex items-center justify-center
                           text-[#faf3e0]/60 hover:text-[#d4af37] transition-colors duration-300
                           cursor-pointer hover:border-[rgba(212,175,55,0.4)]"
                                aria-label="Close letter"
                            >
                                ✕
                            </button>
                        </div>

                        {/* ─── Letter Content ─── */}
                        <div
                            ref={scrollRef}
                            className="flex-1 overflow-y-auto custom-scrollbar px-6 pb-6"
                            dir="rtl"
                        >
                            <div className="py-4 space-y-1">
                                {displayedLines.map((line, index) => (
                                    <p
                                        key={index}
                                        className={`font-[var(--font-amiri)] text-lg md:text-xl leading-loose
                      ${line === "" ? "h-4" : ""}
                      ${index === displayedLines.length - 1 && !isTypingComplete
                                                ? "text-[#faf3e0]"
                                                : index === 0
                                                    ? "text-[#d4af37] text-2xl font-bold"
                                                    : line.includes("زوجك الذي يحبك")
                                                        ? "text-[#d4af37] text-xl font-bold mt-4"
                                                        : "text-[#faf3e0]/85"
                                            }`}
                                    >
                                        {line}
                                        {/* Typing cursor on the current line */}
                                        {index === displayedLines.length - 1 &&
                                            !isTypingComplete &&
                                            line !== "" && (
                                                <span
                                                    className="inline-block w-0.5 h-5 bg-[#d4af37] ml-1 align-middle"
                                                    style={{ animation: "cursor-blink 0.8s infinite" }}
                                                />
                                            )}
                                    </p>
                                ))}
                            </div>
                        </div>

                        {/* ─── Footer Actions ─── */}
                        <div className="px-6 py-4 border-t border-[rgba(212,175,55,0.1)] flex justify-between items-center">
                            {!isTypingComplete && (
                                <button
                                    onClick={skipTyping}
                                    className="text-[#faf3e0]/40 text-sm hover:text-[#d4af37] transition-colors cursor-pointer"
                                >
                                    Skip typing →
                                </button>
                            )}
                            {isTypingComplete && (
                                <motion.p
                                    className="text-[#d4af37]/50 text-sm font-[var(--font-amiri)]"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    بكل حبي 🤍
                                </motion.p>
                            )}
                            <button
                                onClick={onClose}
                                className="px-5 py-2 rounded-full glass text-[#d4af37] text-sm
                           border border-[rgba(212,175,55,0.2)] hover:border-[rgba(212,175,55,0.5)]
                           transition-all duration-300 cursor-pointer glow-gold-hover"
                            >
                                Close
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
