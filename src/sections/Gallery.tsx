import React, { useEffect, useState } from "react";
import "./Gallery.css";

export default function Gallery() {
  const [images, setImages] = useState<string[]>([]);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  // Auto-import all images from /public/gallery
  useEffect(() => {
    // @ts-ignore
    const imported = import.meta.glob("/public/gallery/*.{jpg,jpeg,png,webp}", { eager: true });
    const paths = Object.keys(imported).map((path) => path.replace("/public", ""));
    setImages(paths);
  }, []);

  // Lightbox controls
  useEffect(() => {
    if (openIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenIndex(null);
      if (e.key === "ArrowRight") setOpenIndex((i) => (i === null ? null : (i + 1) % images.length));
      if (e.key === "ArrowLeft")
        setOpenIndex((i) => (i === null ? null : (i - 1 + images.length) % images.length));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openIndex, images.length]);

  return (
    <section id="gallery" className="gallery-section">
      <h2>Gallery</h2>

      <div className="gallery-grid">
        {images.map((src, index) => (
          <button
            key={index}
            className="gallery-item"
            onClick={() => setOpenIndex(index)}
            aria-label={`Open image ${index + 1}`}
          >
            <img src={src} alt={`Gallery ${index + 1}`} loading="lazy" />
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {openIndex !== null && (
        <div className="lightbox" onClick={() => setOpenIndex(null)}>
          <button
            className="lb-close"
            onClick={(e) => {
              e.stopPropagation();
              setOpenIndex(null);
            }}
          >
            ✕
          </button>

          <button
            className="lb-nav prev"
            onClick={(e) => {
              e.stopPropagation();
              setOpenIndex((openIndex - 1 + images.length) % images.length);
            }}
          >
            ‹
          </button>

          <img
            className="lb-img"
            src={images[openIndex]}
            alt={`Gallery enlarged ${openIndex + 1}`}
            onClick={(e) => e.stopPropagation()}
          />

          <button
            className="lb-nav next"
            onClick={(e) => {
              e.stopPropagation();
              setOpenIndex((openIndex + 1) % images.length);
            }}
          >
            ›
          </button>
        </div>
      )}
    </section>
  );
}