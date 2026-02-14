/**
 * GallerySection — Elegant photo gallery with hover effects
 * ===========================================================
 * Displays a grid of photos in 3:4 aspect ratio.
 */

"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import GlassCard from "@/components/shared/GlassCard";
import { useMediaUrl } from "@/components/shared/MediaContext";

/** Gallery photo data */
interface GalleryPhoto {
    id: number;
    src: string;
    caption: string;
    captionAr: string;
    gradient: string;
}

/** Photos with romantic adjectives for Dounia */
const PHOTOS: GalleryPhoto[] = [
    {
        id: 1,
        src: "/images/1.jpeg",
        caption: "Our First Date",
        captionAr: "أول لقاء جمعنا 🤍",
        gradient: "from-[#1a1a4e] via-[#2a1a3e] to-[#0d1137]",
    },
    {
        id: 2,
        src: "/images/2.jpeg",
        caption: "The Most Beautiful",
        captionAr: "الأجمل في الدنيا ✨",
        gradient: "from-[#1a2a4e] via-[#0d1137] to-[#2a1a4e]",
    },
    {
        id: 3,
        src: "/images/3.jpeg",
        caption: "My Whole World",
        captionAr: "دنيتي كلها 💫",
        gradient: "from-[#2a1a3e] via-[#1a1a4e] to-[#0d1137]",
    },
    {
        id: 4,
        src: "/images/4.jpeg",
        caption: "Radiant Soul",
        captionAr: "روحها نور 🌙",
        gradient: "from-[#0d1137] via-[#1a2a4e] to-[#2a1a3e]",
    },
    {
        id: 5,
        src: "/images/5.jpeg",
        caption: "Pure Elegance",
        captionAr: "أناقة لا تُضاهى 👑",
        gradient: "from-[#1a1a4e] via-[#0d1137] to-[#1a2a4e]",
    },
    {
        id: 6,
        src: "/images/6.jpeg",
        caption: "Queen of My Heart",
        captionAr: "ملكة قلبي 🤍",
        gradient: "from-[#2a1a4e] via-[#1a1a3e] to-[#0d1137]",
    },
];

function GalleryImage({ src, alt, className }: { src: string; alt: string; className?: string }) {
    const blobUrl = useMediaUrl(src);
    return <img src={blobUrl} alt={alt} className={className} />;
}

export default function GallerySection() {
    const [selectedPhoto, setSelectedPhoto] = useState<GalleryPhoto | null>(null);

    return (
        <section id="gallery" className="relative z-20 py-20 px-4">
            <div className="max-w-6xl mx-auto">
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
                        Our most beautiful memories together(sorry we didnt shot a lot of pics together so i use this pics) 💖
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {PHOTOS.map((photo, index) => (
                        <motion.div
                            key={photo.id}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.6 }}
                            onClick={() => setSelectedPhoto(photo)}
                            className="cursor-pointer"
                        >
                            <GlassCard className="group p-3 hover:translate-y-[-5px] transition-transform duration-300">
                                <div className="relative rounded-xl overflow-hidden shadow-lg border border-[#d4af37]/20 aspect-[3/4]">
                                    <div className={`absolute inset-0 bg-gradient-to-br ${photo.gradient} opacity-20`} />
                                    <GalleryImage
                                        src={photo.src}
                                        alt={photo.caption}
                                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 block"
                                    />
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                        <span className="text-[#d4af37] text-3xl font-sans">🔍</span>
                                    </div>
                                </div>

                                <div className="mt-4 px-2 text-center">
                                    <h3
                                        className="font-[var(--font-amiri)] text-[#d4af37] text-xl mb-1 flex items-center justify-center gap-2"
                                        dir="rtl"
                                    >
                                        {/* Split text and emoji to ensure correct font rendering */}
                                        {photo.captionAr.split(/([\u2000-\u32ff]|[\ud83c-\ud83e][\udc00-\udfff])/g).map((part, i) => (
                                            <span key={i} className={/([\u2000-\u32ff]|[\ud83c-\ud83e][\udc00-\udfff])/.test(part) ? "font-sans" : ""}>
                                                {part}
                                            </span>
                                        ))}
                                    </h3>
                                    <p className="text-[#faf3e0]/50 text-xs tracking-widest uppercase">
                                        {photo.caption}
                                    </p>
                                </div>
                            </GlassCard>
                        </motion.div>
                    ))}
                </div>
            </div>

            <AnimatePresence>
                {selectedPhoto && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl"
                        onClick={() => setSelectedPhoto(null)}
                    >
                        <button
                            className="absolute top-6 right-6 text-[#faf3e0] hover:text-[#d4af37] transition-colors z-50 p-2"
                            onClick={() => setSelectedPhoto(null)}
                        >
                            <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="relative max-w-5xl max-h-[90vh] flex flex-col items-center"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <GalleryImage
                                src={selectedPhoto.src}
                                alt={selectedPhoto.caption}
                                className="max-w-full max-h-[80vh] rounded-xl shadow-[0_0_50px_rgba(212,175,55,0.2)] border border-[#d4af37]/30"
                            />

                            <div className="mt-6 text-center">
                                <h3 className="font-[var(--font-amiri)] text-2xl md:text-3xl text-[#d4af37] mb-2 flex items-center justify-center gap-2" dir="rtl">
                                    {selectedPhoto.captionAr.split(/([\u2000-\u32ff]|[\ud83c-\ud83e][\udc00-\udfff])/g).map((part, i) => (
                                        <span key={i} className={/([\u2000-\u32ff]|[\ud83c-\ud83e][\udc00-\udfff])/.test(part) ? "font-sans" : ""}>
                                            {part}
                                        </span>
                                    ))}
                                </h3>
                                <p className="text-[#faf3e0]/70 font-light">
                                    {selectedPhoto.caption}
                                </p>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
