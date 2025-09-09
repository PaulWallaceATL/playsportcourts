"use client";
import * as React from "react";
import Image from "next/image";
import { Placeholder } from "@/components/ui/Placeholder";

const categories = [
    { key: "basketball", label: "Basketball" },
    { key: "pickleball", label: "Pickleball" },
    { key: "tennis", label: "Tennis" },
    { key: "garage", label: "Garage" },
];

// Temporary stock-like placeholders; replace with real project URLs
const sample = [
    "https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=1600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?q=80&w=1600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1502877338535-766e1452684a?q=80&w=1600&auto=format&fit=crop",
];

export default function GalleryPage() {
    const [lightbox, setLightbox] = React.useState<{ src: string; idx: number } | null>(null);
    const open = (src: string, idx: number) => setLightbox({ src, idx });
    const close = () => setLightbox(null);
    const next = () => lightbox && setLightbox({ src: sample[(lightbox.idx + 1) % sample.length], idx: (lightbox.idx + 1) % sample.length });
    const prev = () => lightbox && setLightbox({ src: sample[(lightbox.idx - 1 + sample.length) % sample.length], idx: (lightbox.idx - 1 + sample.length) % sample.length });

    return (
        <section className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8 pad-section">
            <h1 className="heading-1 text-gradient-primary text-glow">Gallery</h1>
            <p className="mt-2 text-body text-muted-foreground">Explore recent installs by category.</p>

            <div className="mt-8 grid gap-12">
                {categories.map((cat) => (
                    <div key={cat.key}>
                        <h2 className="heading-2 mb-3">{cat.label}</h2>
                        <div className="grid gap-6">
                            {sample.map((src, i) => (
                                <button key={i} type="button" className="relative w-full aspect-[16/9] overflow-hidden rounded-xl surface-elevated"
                                    onClick={() => open(src, i)}
                                >
                                    <Image src={src} alt={`${cat.label} ${i+1}`} fill className="object-cover" loading="lazy" />
                                </button>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {lightbox && (
                <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4">
                    <button className="absolute left-3 top-1/2 -translate-y-1/2 text-white text-2xl" onClick={prev} aria-label="Previous">‹</button>
                    <div className="relative w-full max-w-6xl aspect-[16/9]">
                        <Image src={lightbox.src} alt="Lightbox" fill className="object-contain" />
                    </div>
                    <button className="absolute right-3 top-1/2 -translate-y-1/2 text-white text-2xl" onClick={next} aria-label="Next">›</button>
                    <button className="absolute top-3 right-3 text-white text-xl" onClick={close} aria-label="Close">✕</button>
                </div>
            )}
        </section>
    );
}


