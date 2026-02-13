/**
 * GlassCard — Reusable glassmorphism card component
 * ===================================================
 * A semi-transparent card with backdrop blur and subtle
 * gold border, creating the "frosted glass" luxury effect.
 */

import { cn } from "@/lib/utils";

interface GlassCardProps {
    children: React.ReactNode;
    className?: string;
    /** Use stronger/darker glass background */
    strong?: boolean;
}

export default function GlassCard({
    children,
    className,
    strong = false,
}: GlassCardProps) {
    return (
        <div
            className={cn(
                "rounded-2xl p-6 md:p-8 transition-all duration-500",
                "glow-gold-hover",
                strong ? "glass-strong" : "glass",
                className
            )}
        >
            {children}
        </div>
    );
}
