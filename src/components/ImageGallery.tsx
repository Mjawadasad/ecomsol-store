"use client";

import Image from "next/image";
import { useState } from "react";
import type { ProductImage } from "@/data/types";

export default function ImageGallery({ images }: { images: ProductImage[] }) {
  const [selected, setSelected] = useState(0);
  const current = images[selected];

  if (!current) return null;

  return (
    <div className="space-y-3">
      <div className="relative aspect-square overflow-hidden rounded-xl bg-surface border border-border">
        <Image
          src={current.src}
          alt={current.alt}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
          priority
        />
      </div>

      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setSelected(i)}
              className={`relative shrink-0 h-16 w-16 sm:h-20 sm:w-20 rounded-lg overflow-hidden border-2 transition-colors ${
                i === selected
                  ? "border-primary"
                  : "border-border hover:border-border-hover"
              }`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="80px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
