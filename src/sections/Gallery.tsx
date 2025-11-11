import React, { useEffect, useState } from "react";
import "../sections/Gallery.css";

export default function Gallery() {
  const [images, setImages] = useState<string[]>([]);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  // Import all images from /public/gallery
  useEffect(() => {
    // @ts-ignore
    const imported = import.meta.glob("/public/gallery/*.{jpg,jpeg,png,webp}");
    const paths = Object.keys(imported).map((p) => p.replace("/public", ""));
    setImages(paths);
  }, []);

  // Lock body scroll when lightbox open
  useEffect(() => {
    if (openIndex !== null) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [openIndex]);

  // Keyboard navigation/close
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (openIndex === null) return;
      if (e.key === "Escape") setOpenIndex(null);
      if (e.key === "ArrowRight") setOpenIndex((i) => ((i ?? 0) + 1) % images.length);
      if (e.key === "ArrowLeft") setOpenIndex((i) => ((i ?? images.length) - 1 + images.length) % images.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openIndex, images.length]);

  // Open handler using pointer (works great on mobile)
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
            // fallback (older browsers) — onClick still included
            onClick={open(idx)}
            aria-label={`Open image ${idx + 1}`}
          >
            <img src={src} alt={`Gallery ${idx + 1}`} loading="lazy" />
          </button>
        ))}
      </div>

      {openIndex !== null && (
        <div className="lightbox" onClick={() => setOpenIndex(null)} role="dialog" aria-modal="true">
          <img
            src={images[openIndex]}
            alt="Zoomed"
            className="lightbox-img"
            onClick={(e) => e.stopPropagation()}
          />
          <button className="close-btn" onClick={() => setOpenIndex(null)} aria-label="Close">
            ✕
          </button>
        </div>
      )}
    </section>
  );
}