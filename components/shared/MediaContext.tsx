/**
 * MediaContext — Preloaded media provider
 * =========================================
 * Stores blob URLs for all preloaded media (images, audio).
 * Components consume this context to get blob URLs instead
 * of fetching files directly (which can trigger download prompts).
 */

"use client";

import { createContext, useContext } from "react";

export interface PreloadedMedia {
    /** Map of original path → blob URL */
    blobUrls: Record<string, string>;
}

const MediaContext = createContext<PreloadedMedia>({ blobUrls: {} });

export function MediaProvider({
    children,
    media,
}: {
    children: React.ReactNode;
    media: PreloadedMedia;
}) {
    return (
        <MediaContext.Provider value={media}>{children}</MediaContext.Provider>
    );
}

/**
 * Hook to get a preloaded blob URL for a given asset path.
 * Falls back to the original path if not preloaded.
 */
export function useMediaUrl(originalPath: string): string {
    const { blobUrls } = useContext(MediaContext);
    return blobUrls[originalPath] || originalPath;
}

export default MediaContext;
