/**
 * CountdownSection — Dual countdown: Ramadan + Dounia's Birthday
 * ================================================================
 * Displays two beautiful countdown timers side by side (desktop)
 * or stacked (mobile):
 *   1. Countdown to Ramadan 2026 (Feb 18)
 *   2. Countdown to Dounia's Birthday (Feb 19)
 */

"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import GlassCard from "@/components/shared/GlassCard";

/** Target dates */
const RAMADAN_START = new Date("2026-02-18T00:00:00");
const DOUNIA_BIRTHDAY = new Date("2026-02-19T00:00:00");

/** Time remaining structure */
interface TimeLeft {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
}

/** Labels for each time unit */
const units: { key: keyof TimeLeft; labelAr: string; labelEn: string }[] = [
    { key: "days", labelAr: "يوم", labelEn: "Days" },
    { key: "hours", labelAr: "ساعة", labelEn: "Hours" },
    { key: "minutes", labelAr: "دقيقة", labelEn: "Min" },
    { key: "seconds", labelAr: "ثانية", labelEn: "Sec" },
];

/** Calculate time difference */
function calcTimeLeft(target: Date): TimeLeft {
    const now = new Date();
    const diff = target.getTime() - now.getTime();

    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };

    return {
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
    };
}

/** Single countdown unit box */
function CountdownUnit({
    value,
    labelAr,
    labelEn,
    accentColor,
    glowColor,
    delay,
}: {
    value: number;
    labelAr: string;
    labelEn: string;
    accentColor: string;
    glowColor: string;
    delay: number;
}) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay, duration: 0.5 }}
        >
            <div className="glass rounded-xl p-3 md:p-4 text-center border border-transparent hover:border-opacity-40 transition-all duration-300"
                style={{ borderColor: `${accentColor}33` }}
            >
                <div
                    className="text-3xl sm:text-4xl md:text-5xl font-bold tabular-nums"
                    style={{
                        color: accentColor,
                        textShadow: `0 0 15px ${glowColor}, 0 0 30px ${glowColor}40`,
                    }}
                >
                    {String(value).padStart(2, "0")}
                </div>
                <div
                    className="mt-1 text-sm font-[var(--font-amiri)]"
                    style={{ color: `${accentColor}BB` }}
                    dir="rtl"
                >
                    {labelAr}
                </div>
                <div className="text-[#faf3e0]/30 text-[10px] uppercase tracking-widest">
                    {labelEn}
                </div>
            </div>
        </motion.div>
    );
}

/** Single countdown card */
function CountdownCard({
    title,
    titleEn,
    emoji,
    target,
    timeLeft,
    hasArrived,
    arrivedTextAr,
    arrivedTextEn,
    accentColor,
    glowColor,
    bgGradient,
    animDelay,
}: {
    title: string;
    titleEn: string;
    emoji: string;
    target: Date;
    timeLeft: TimeLeft;
    hasArrived: boolean;
    arrivedTextAr: string;
    arrivedTextEn: string;
    accentColor: string;
    glowColor: string;
    bgGradient: string;
    animDelay: number;
}) {
    return (
        <motion.div
            className="flex-1"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: animDelay, duration: 0.8, ease: "easeOut" }}
        >
            <div
                className="relative rounded-3xl p-6 md:p-8 overflow-hidden"
                style={{
                    background: bgGradient,
                    border: `1px solid ${accentColor}25`,
                }}
            >
                {/* Decorative glow orb */}
                <div
                    className="absolute -top-20 -right-20 w-40 h-40 rounded-full blur-3xl opacity-20"
                    style={{ background: accentColor }}
                />
                <div
                    className="absolute -bottom-10 -left-10 w-32 h-32 rounded-full blur-3xl opacity-10"
                    style={{ background: accentColor }}
                />

                {/* Title */}
                <div className="relative z-10 text-center mb-6">
                    <motion.div
                        className="text-4xl md:text-5xl mb-3"
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    >
                        {emoji}
                    </motion.div>
                    <h3
                        className="font-[var(--font-amiri)] text-xl sm:text-2xl md:text-3xl mb-1"
                        style={{
                            background: `linear-gradient(135deg, ${accentColor}, ${accentColor}CC)`,
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            textShadow: "none",
                        }}
                        dir="rtl"
                    >
                        {title}
                    </h3>
                    <p className="text-[#faf3e0]/40 text-xs md:text-sm">{titleEn}</p>
                </div>

                {/* Countdown or arrived message */}
                <div className="relative z-10">
                    {hasArrived ? (
                        <motion.div
                            className="text-center py-4"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8 }}
                        >
                            <p
                                className="font-[var(--font-amiri)] text-2xl md:text-3xl mb-2"
                                style={{ color: accentColor }}
                                dir="rtl"
                            >
                                {arrivedTextAr}
                            </p>
                            <p className="text-[#faf3e0]/60 text-sm">{arrivedTextEn}</p>
                        </motion.div>
                    ) : (
                        <div className="grid grid-cols-4 gap-2 md:gap-3">
                            {units.map((unit, index) => (
                                <CountdownUnit
                                    key={unit.key}
                                    value={timeLeft[unit.key]}
                                    labelAr={unit.labelAr}
                                    labelEn={unit.labelEn}
                                    accentColor={accentColor}
                                    glowColor={glowColor}
                                    delay={animDelay + 0.1 * index}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </motion.div>
    );
}

export default function CountdownSection() {
    const [ramadanTime, setRamadanTime] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    const [birthdayTime, setBirthdayTime] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    const [ramadanArrived, setRamadanArrived] = useState(false);
    const [birthdayArrived, setBirthdayArrived] = useState(false);

    useEffect(() => {
        const tick = () => {
            const rt = calcTimeLeft(RAMADAN_START);
            const bt = calcTimeLeft(DOUNIA_BIRTHDAY);
            setRamadanTime(rt);
            setBirthdayTime(bt);
            setRamadanArrived(rt.days === 0 && rt.hours === 0 && rt.minutes === 0 && rt.seconds === 0);
            setBirthdayArrived(bt.days === 0 && bt.hours === 0 && bt.minutes === 0 && bt.seconds === 0);
        };

        tick();
        const timer = setInterval(tick, 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <section id="countdown" className="relative z-20 py-16 md:py-24 px-4">
            <div className="max-w-6xl mx-auto">
                {/* Section Header */}
                <motion.div
                    className="text-center mb-10 md:mb-14"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <h2
                        className="font-[var(--font-amiri)] text-3xl sm:text-4xl md:text-5xl
                         text-gold-gradient animate-glow-pulse mb-3"
                        dir="rtl"
                    >
                        ⏳ العد التنازلي
                    </h2>
                    <p className="text-[#faf3e0]/50 text-base md:text-lg">
                        Two beautiful moments approaching...
                    </p>
                </motion.div>

                {/* Dual Countdown Cards — side by side on desktop */}
                <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
                    {/* Ramadan Countdown */}
                    <CountdownCard
                        title="العد التنازلي لرمضان"
                        titleEn="Countdown to Ramadan"
                        emoji="🌙"
                        target={RAMADAN_START}
                        timeLeft={ramadanTime}
                        hasArrived={ramadanArrived}
                        arrivedTextAr="🌙 رمضان مبارك 🌙"
                        arrivedTextEn="The blessed month has arrived!"
                        accentColor="#d4af37"
                        glowColor="rgba(212, 175, 55, 0.6)"
                        bgGradient="linear-gradient(135deg, rgba(13,17,55,0.7) 0%, rgba(20,24,82,0.5) 50%, rgba(13,17,55,0.7) 100%)"
                        animDelay={0}
                    />

                    {/* Decorative divider between cards */}
                    <div className="hidden lg:flex items-center">
                        <div className="w-px h-3/4 bg-gradient-to-b from-transparent via-[#d4af37]/20 to-transparent" />
                    </div>
                    <div className="flex lg:hidden items-center justify-center py-2">
                        <div className="h-px w-1/3 bg-gradient-to-r from-transparent via-[#e8a0bf]/30 to-transparent" />
                        <div className="mx-3 text-[#e8a0bf]/40 text-lg">💕</div>
                        <div className="h-px w-1/3 bg-gradient-to-r from-transparent via-[#e8a0bf]/30 to-transparent" />
                    </div>

                    {/* Birthday Countdown */}
                    <CountdownCard
                        title="عيد ميلاد دنيا 🎂"
                        titleEn="Dounia's Birthday — February 19"
                        emoji="🎂"
                        target={DOUNIA_BIRTHDAY}
                        timeLeft={birthdayTime}
                        hasArrived={birthdayArrived}
                        arrivedTextAr="🎂 عيد ميلاد سعيد يا دنيا! 🎂"
                        arrivedTextEn="Happy Birthday, my love!"
                        accentColor="#e8a0bf"
                        glowColor="rgba(232, 160, 191, 0.6)"
                        bgGradient="linear-gradient(135deg, rgba(30,13,35,0.7) 0%, rgba(50,20,50,0.5) 50%, rgba(30,13,35,0.7) 100%)"
                        animDelay={0.3}
                    />
                </div>
            </div>
        </section>
    );
}
