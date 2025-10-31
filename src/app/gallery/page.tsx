"use client";

import * as React from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, Grid3x3, Maximize2 } from "lucide-react";

// Premium placeholder images - categorized
const galleryImages = {
  basketball: [
    {
      id: 1,
      src: "https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=1600&auto=format&fit=crop",
      title: "Outdoor Basketball Court",
      category: "Basketball",
      location: "Atlanta, GA",
    },
    {
      id: 2,
      src: "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?q=80&w=1600&auto=format&fit=crop",
      title: "Indoor Basketball Facility",
      category: "Basketball",
      location: "Marietta, GA",
    },
  ],
  tennis: [
    {
      id: 3,
      src: "https://images.unsplash.com/photo-1502877338535-766e1452684a?q=80&w=1600&auto=format&fit=crop",
      title: "Tennis Court Resurface",
      category: "Tennis",
      location: "Alpharetta, GA",
    },
    {
      id: 4,
      src: "https://images.unsplash.com/photo-1622547748225-3fc4abd2cca0?q=80&w=1600&auto=format&fit=crop",
      title: "Private Tennis Court",
      category: "Tennis",
      location: "Roswell, GA",
    },
  ],
  multiSport: [
    {
      id: 5,
      src: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=1600&auto=format&fit=crop",
      title: "Multi-Sport Complex",
      category: "Multi-Sport",
      location: "Sandy Springs, GA",
    },
    {
      id: 6,
      src: "https://images.unsplash.com/photo-1530549387789-4c1017266635?q=80&w=1600&auto=format&fit=crop",
      title: "Community Recreation Center",
      category: "Multi-Sport",
      location: "Decatur, GA",
    },
  ],
  garage: [
    {
      id: 7,
      src: "https://images.unsplash.com/photo-1558036117-15d82a90b9b1?q=80&w=1600&auto=format&fit=crop",
      title: "Luxury Garage Floor",
      category: "Garage",
      location: "Buckhead, GA",
    },
    {
      id: 8,
      src: "https://images.unsplash.com/photo-1513467535987-fd81bc7d62f8?q=80&w=1600&auto=format&fit=crop",
      title: "Commercial Showroom",
      category: "Garage",
      location: "Atlanta, GA",
    },
  ],
};

type Category = "all" | "basketball" | "tennis" | "multiSport" | "garage";

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = React.useState<Category>("all");
  const [lightbox, setLightbox] = React.useState<{
    image: typeof allImages[0];
    idx: number;
  } | null>(null);

  const allImages = [
    ...galleryImages.basketball,
    ...galleryImages.tennis,
    ...galleryImages.multiSport,
    ...galleryImages.garage,
  ];

  const filteredImages =
    selectedCategory === "all"
      ? allImages
      : galleryImages[selectedCategory] || [];

  const openLightbox = (image: typeof allImages[0], idx: number) => {
    setLightbox({ image, idx });
  };

  const closeLightbox = () => setLightbox(null);

  const navigateLightbox = (direction: "prev" | "next") => {
    if (!lightbox) return;
    const currentImages = filteredImages;
    const newIdx =
      direction === "next"
        ? (lightbox.idx + 1) % currentImages.length
        : (lightbox.idx - 1 + currentImages.length) % currentImages.length;
    setLightbox({ image: currentImages[newIdx], idx: newIdx });
  };

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightbox) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") navigateLightbox("prev");
      if (e.key === "ArrowRight") navigateLightbox("next");
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightbox]);

  const categories: { id: Category; label: string }[] = [
    { id: "all", label: "All Projects" },
    { id: "basketball", label: "Basketball" },
    { id: "tennis", label: "Tennis" },
    { id: "multiSport", label: "Multi-Sport" },
    { id: "garage", label: "Garage" },
  ];

  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0 bg-gradient-primary" />
        <div className="absolute inset-0 dot-pattern opacity-30" />

        <div className="relative mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-tier-2 mb-6">
              <Grid3x3 className="w-4 h-4 text-[var(--brand-primary)]" />
              <span className="text-sm font-semibold">Project Portfolio</span>
            </div>

            <h1 className="heading-display text-gradient-hero mb-4">
              Our Work Speaks for Itself
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Browse our portfolio of completed projects across Atlanta. From backyard courts to commercial facilities.
            </p>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="sticky top-16 z-40 bg-black/80 backdrop-blur-xl border-b border-white/10">
        <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex gap-2 overflow-x-auto">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-6 py-2 rounded-lg font-semibold text-sm whitespace-nowrap transition-all ${
                  selectedCategory === cat.id
                    ? "bg-gradient-primary text-black shadow-primary"
                    : "glass-tier-1 text-muted-foreground hover:text-white"
                }`}
              >
                {cat.label}
                {cat.id !== "all" && (
                  <span className="ml-2 text-xs opacity-60">
                    ({cat.id === "all" ? allImages.length : galleryImages[cat.id]?.length || 0})
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredImages.map((image, idx) => (
            <div
              key={image.id}
              className="group relative card-premium cursor-pointer overflow-hidden p-0"
              onClick={() => openLightbox(image, idx)}
            >
              {/* Image */}
              <div className="relative aspect-video overflow-hidden">
                <Image
                  src={image.src}
                  alt={image.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-90 transition-opacity" />

                {/* Zoom Icon */}
                <div className="absolute top-4 right-4 w-10 h-10 rounded-full glass-tier-2 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all">
                  <Maximize2 className="w-5 h-5" />
                </div>
              </div>

              {/* Info */}
              <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-2 group-hover:translate-y-0 transition-transform">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-tier-3 mb-2">
                  <span className="text-xs font-semibold text-[var(--brand-primary)]">
                    {image.category}
                  </span>
                </div>
                <h3 className="font-bold text-lg mb-1">{image.title}</h3>
                <p className="text-sm text-muted-foreground">{image.location}</p>
              </div>
            </div>
          ))}
        </div>

        {filteredImages.length === 0 && (
          <div className="glass-dark rounded-xl p-12 text-center">
            <Grid3x3 className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
            <p className="text-body-lg text-muted-foreground">
              No projects found in this category
            </p>
          </div>
        )}
      </section>

      {/* Lightbox Modal */}
      {lightbox && (
        <div className="fixed inset-0 z-50 modal-overlay-premium flex items-center justify-center p-4">
          {/* Close Button */}
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 w-12 h-12 rounded-full glass-tier-3 flex items-center justify-center hover:bg-red-500/20 transition-all z-10"
            aria-label="Close lightbox"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Navigation */}
          <button
            onClick={() => navigateLightbox("prev")}
            className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full glass-tier-3 flex items-center justify-center hover-lift transition-all"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={() => navigateLightbox("next")}
            className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full glass-tier-3 flex items-center justify-center hover-lift transition-all"
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Image */}
          <div className="relative w-full max-w-6xl">
            <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/20 shadow-2xl">
              <Image
                src={lightbox.image.src}
                alt={lightbox.image.title}
                fill
                className="object-contain"
                sizes="100vw"
                priority
              />
            </div>

            {/* Image Info */}
            <div className="mt-6 text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-tier-3 mb-3">
                <span className="text-sm font-semibold text-[var(--brand-primary)]">
                  {lightbox.image.category}
                </span>
              </div>
              <h3 className="heading-3 mb-1">{lightbox.image.title}</h3>
              <p className="text-sm text-muted-foreground">{lightbox.image.location}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
