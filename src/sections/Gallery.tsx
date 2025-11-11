import React, { useEffect, useState } from "react";
import "./Gallery.css";

export default function Gallery() {
  const [images, setImages] = useState<string[]>([]);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  // Auto-import all images in src/assets/gallery at build time
  useEffect(() => {
    // Vite: use query: '?url' instead of deprecated "as: 'url'"
    const modules = import.meta.glob("/src/assets/gallery/*.{jpg,jpeg,png,webp}", {
      eager: true,
      query: "?url",
      import: "default",
    }) as Record<string, string>;

    // Values of the object are URL strings
    setImages(Object.values(modules));
  }, []);

  // Lock body scroll when lightbox is open (return a function, not a string)
  useEffect(() => {
    if (openIndex === null) return;

    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [openIndex]);

  // Keyboard navigation (Esc / ← / →)
  useEffect(() => {
    if (openIndex === null) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenIndex(null);
      if (e.key === "ArrowRight") setOpenIndex(i => (((i ?? 0) + 1) % images.length));
      if (e.key === "ArrowLeft") setOpenIndex(i => (((i ?? images.length) - 1 + images.length) % images.length));
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openIndex, images.length]);

  const open = (i: number) => (e: React.PointerEvent | React.MouseEvent) => {
    e.preventDefault();
    setOpenIndex(i);
  };

  return (
    <section className="gallery-section" id="gallery">
      <h2>Gallery</h2>

      <div className="gallery-grid">
        {images.map((src, idx) => (
          <button
            key={src + idx}
            className="gallery-item"
            onPointerUp={open(idx)}
            onClick={open(idx)} // fallback
            aria-label={`Open image ${idx + 1}`}
          >
            <img src={src} alt={`Gallery ${idx + 1}`} loading="lazy" />
          </button>
        ))}
      </div>

      {openIndex !== null && (
        <div className="lightbox" role="dialog" aria-modal="true" onClick={() => setOpenIndex(null)}>
          <img
            src={images[openIndex]}
            alt="Zoomed"
            className="lightbox-img"
            onClick={(e) => e.stopPropagation()}
          />
          <button className="close-btn" onClick={() => setOpenIndex(null)} aria-label="Close">✕</button>
        </div>
      )}
    </section>
  );
}