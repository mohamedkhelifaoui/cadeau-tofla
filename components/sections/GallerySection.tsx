/**
 * GallerySection — Elegant photo gallery with hover effects
 * ===========================================================
 * Displays a grid of photo placeholders with soft zoom on hover,
 * elegant gold frames, and optional captions.
 * Can be easily updated with real photos.
 */

"use client";

import { motion } from "framer-motion";
import GlassCard from "@/components/shared/GlassCard";

/** Gallery photo data */
interface GalleryPhoto {
    id: number;
    caption: string;
    captionAr: string;
    gradient: string; // placeholder gradient colors
}

/** Placeholder photos with romantic captions */
const PHOTOS: GalleryPhoto[] = [
    {
        id: 1,
        caption: "Our First Meeting",
        captionAr: "أول لقاء",
        gradient: "from-[#1a1a4e] via-[#2a1a3e] to-[#0d1137]",
    },
    {
        id: 2,
        caption: "Alger Center Together",
        captionAr: "معًا في الجزائر الوسطى",
        gradient: "from-[#1a2a4e] via-[#0d1137] to-[#2a1a4e]",
    },
    {
        id: 3,
        caption: "17:00 at the Bus Station",
        captionAr: "الساعة الخامسة عند المحطة",
        gradient: "from-[#2a1a3e] via-[#1a1a4e] to-[#0d1137]",
    },
    {
        id: 4,
        caption: "Beautiful Moments",
        captionAr: "لحظات جميلة",
        gradient: "from-[#0d1137] via-[#1a2a4e] to-[#2a1a3e]",
    },
    {
        id: 5,
        caption: "Forever & Always",
        captionAr: "للأبد ودائمًا",
        gradient: "from-[#1a1a4e] via-[#0d1137] to-[#1a2a4e]",
    },
    {
        id: 6,
        caption: "Our Love Story",
        captionAr: "قصة حبنا",
        gradient: "from-[#2a1a4e] via-[#1a1a3e] to-[#0d1137]",
    },
];

export default function GallerySection() {
    return (
        <section id="gallery" className="relative z-20 py-20 md:py-28 px-4">
            <div className="max-w-6xl mx-auto">
                {/* ─── Section Title ─── */}
                <motion.div
                    className="text-center mb-16"
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
                        📸 معرض الذكريات
                    </h2>
                    <p className="text-[#faf3e0]/60 text-lg">
                        Our most beautiful memories together
                    </p>
                </motion.div>

                {/* ─── Photo Grid ─── */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {PHOTOS.map((photo, index) => (
                        <motion.div
                            key={photo.id}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.12, duration: 0.7 }}
                        >
                            <GlassCard className="group p-3 overflow-hidden">
                                {/* Photo Placeholder */}
                                <div className="relative overflow-hidden rounded-xl aspect-[4/3]">
                                    <div
                                        className={`absolute inset-0 bg-gradient-to-br ${photo.gradient} 
                                transition-transform duration-700 ease-out
                                group-hover:scale-110`}
                                    >
                                        {/* Placeholder icon */}
                                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                                            <span className="text-5xl mb-2 opacity-30 group-hover:opacity-50 transition-opacity duration-500">
                                                📷
                                            </span>
                                            <span className="text-[#faf3e0]/20 text-sm group-hover:text-[#faf3e0]/40 transition-colors duration-500">
                                                Add your photo here
                                            </span>
                                        </div>
                                    </div>

                                    {/* Hover overlay */}
                                    <div
                                        className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent
                                opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                    />
                                </div>

                                {/* Caption */}
                                <div className="mt-3 px-1">
                                    <p
                                        className="font-[var(--font-amiri)] text-[#d4af37] text-lg text-right"
                                        dir="rtl"
                                    >
                                        {photo.captionAr}
                                    </p>
                                    <p className="text-[#faf3e0]/50 text-sm mt-0.5">
                                        {photo.caption}
                                    </p>
                                </div>
                            </GlassCard>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
