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

const placeholder = "/window.svg";

export default function GalleryPage() {
    const [lightbox, setLightbox] = React.useState<string | null>(null);

    return (
        <section className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8 pad-section">
            <h1 className="heading-1 text-gradient-primary text-glow">Gallery</h1>
            <p className="mt-2 text-body text-muted-foreground">Explore recent installs by category.</p>

            <div className="mt-8 grid gap-10">
                {categories.map((cat) => (
                    <div key={cat.key}>
                        <h2 className="heading-2 mb-3">{cat.label}</h2>
                        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                            {Array.from({ length: 6 }).map((_, i) => (
                                <button key={i} type="button" className="glass-card" onClick={() => setLightbox(placeholder)}>
                                    <Placeholder label="Image coming soon" />
                                </button>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {lightbox && (
                <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setLightbox(null)}>
                    <div className="relative w-full max-w-5xl aspect-[16/9]">
                        <Image src={lightbox} alt="Lightbox" fill className="object-contain" />
                    </div>
                </div>
            )}
        </section>
    );
}


