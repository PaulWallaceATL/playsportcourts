"use client";
import * as React from "react";
import Image from "next/image";
//

// Simplified gallery: single continuous gallery, 12 slots

// Temporary stock-like placeholders; replace with real project URLs
const sample = [
    "https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=1600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?q=80&w=1600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1502877338535-766e1452684a?q=80&w=1600&auto=format&fit=crop",
];

export default function GalleryPage() {
    const [lightbox, setLightbox] = React.useState<{ src: string; idx: number } | null>(null);
    const images = [...sample, ...sample, ...sample, ...sample].slice(0, 12);
    const open = (src: string, idx: number) => setLightbox({ src, idx });
    const close = () => setLightbox(null);
    const next = () => lightbox && setLightbox({ src: images[(lightbox.idx + 1) % images.length], idx: (lightbox.idx + 1) % images.length });
    const prev = () => lightbox && setLightbox({ src: images[(lightbox.idx - 1 + images.length) % images.length], idx: (lightbox.idx - 1 + images.length) % images.length });

    return (
        <section className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8 pad-section">
            <h1 className="heading-1 text-white">Gallery</h1>
            <p className="mt-2 text-body text-muted-foreground">A continuous stream of our favorite installs—courts and garages in one place.</p>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {images.map((src, i) => (
                    <button key={i} type="button" className="relative aspect-[16/10] overflow-hidden rounded-xl surface-elevated hover-lift"
                        onClick={() => open(src, i)}
                    >
                        <Image src={src} alt={`${active} ${i+1}`} fill sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw" className="object-cover" loading="lazy" />
                    </button>
                ))}
            </div>

            {lightbox && (
                <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-label="Gallery lightbox">
                    <button className="absolute left-3 top-1/2 -translate-y-1/2 text-white text-2xl" onClick={prev} aria-label="Previous">‹</button>
                    <div className="relative w-full max-w-6xl aspect-[16/9]">
                        <Image src={lightbox.src} alt="Selected gallery image" fill sizes="100vw" className="object-contain" />
                    </div>
                    <button className="absolute right-3 top-1/2 -translate-y-1/2 text-white text-2xl" onClick={next} aria-label="Next">›</button>
                    <button className="absolute top-3 right-3 text-white text-xl" onClick={close} aria-label="Close">×</button>
                </div>
            )}
        </section>
    );
}


