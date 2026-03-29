"use client";

import { useState, useCallback, useEffect } from "react";

interface Props {
  images: string[];
  businessName: string;
}

export function ImageGallery({ images, businessName }: Props) {
  const [lightbox, setLightbox] = useState<number | null>(null);

  const close = useCallback(() => setLightbox(null), []);
  const prev = useCallback(() => setLightbox((i) => (i !== null ? (i - 1 + images.length) % images.length : null)), [images.length]);
  const next = useCallback(() => setLightbox((i) => (i !== null ? (i + 1) % images.length : null)), [images.length]);

  useEffect(() => {
    if (lightbox === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightbox, close, prev, next]);

  const cols = images.length <= 2 ? "grid-cols-2" : "grid-cols-2 sm:grid-cols-3";

  return (
    <>
      <div className={`grid ${cols} gap-2`}>
        {images.map((src, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setLightbox(i)}
            className="aspect-square overflow-hidden rounded-lg border border-border bg-white hover:opacity-90 transition-opacity"
          >
            <img src={src} alt={`${businessName} photo ${i + 1}`} className="w-full h-full object-cover" />
          </button>
        ))}
      </div>

      {lightbox !== null && (
        <div className="fixed inset-0 z-[9999] bg-black/90 flex items-center justify-center" onClick={close}>
          <button onClick={(e) => { e.stopPropagation(); prev(); }} className="absolute left-4 top-1/2 -translate-y-1/2 text-white text-3xl hover:text-white/70 p-2">‹</button>
          <button onClick={(e) => { e.stopPropagation(); next(); }} className="absolute right-4 top-1/2 -translate-y-1/2 text-white text-3xl hover:text-white/70 p-2">›</button>
          <button onClick={close} className="absolute top-4 right-4 text-white text-2xl hover:text-white/70 p-2">✕</button>
          <img
            src={images[lightbox]}
            alt={`${businessName} photo ${lightbox + 1}`}
            className="max-h-[85vh] max-w-[90vw] object-contain"
            onClick={(e) => e.stopPropagation()}
          />
          <div className="absolute bottom-4 text-white/60 text-sm">{lightbox + 1} / {images.length}</div>
        </div>
      )}
    </>
  );
}
