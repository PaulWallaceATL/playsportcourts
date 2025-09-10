"use client";

import Image from "next/image";
import Link from "next/link";
import { RotatingTile } from "@/components/interactive/RotatingTile";

interface ProductCardProps {
  href: string;
  name: string;
  price: string;
  image: string;
  badge?: string;
}

export function ProductCard({ href, name, price, image, badge }: ProductCardProps) {
  const isPlaceholder = image.endsWith("/file.svg") || image.endsWith("/window.svg") || image.endsWith("/globe.svg") || image.endsWith("/next.svg");
  return (
    <Link href={href} className="group glass-dark glass-border rounded-xl overflow-hidden block hover-lift">
      <div className="relative aspect-[16/10] bg-gradient-primary bg-mesh-soft">
        {isPlaceholder ? (
          <div className="absolute inset-0 grid place-items-center"><RotatingTile size={180} /></div>
        ) : (
          <Image src={image} alt={name} fill sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw" className="object-contain p-4 transition transform group-hover:scale-[1.03]" />
        )}
        <span className="absolute right-2 top-2 rounded-full bg-black/60 text-white text-xs px-2 py-0.5">{price}</span>
        {badge && <span className="absolute left-2 top-2 text-xs px-2 py-0.5 rounded-full bg-[var(--accent)] text-[var(--accent-foreground)]">{badge}</span>}
      </div>
      <div className="p-4">
        <p className="font-semibold">{name}</p>
      </div>
    </Link>
  );
}


