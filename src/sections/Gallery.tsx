import React, { useEffect, useState } from "react";
import "./Gallery.css";

export default function Gallery() {
  const [images, setImages] = useState<string[]>([]);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  // Auto-load every image from /public/gallery
  useEffect(() => {
    const load = async () => {
      const imported = import.meta.glob("/public/gallery/*.{jpg,jpeg,png,JPG,JPEG,PNG,webp,WEBP}", {
        eager: true,
      });
      // Vite returns absolute /public/... paths locally — remove /public for prod
      const paths = Object.keys(imported).map((p) => p.replace("/public", ""));
      // Optional: sort by name for stable order
      paths.sort((a, b) => a.localeCompare(b));
      setImages(paths);
    };
    load();
  }, []);

  // Close on ESC / navigate with arrows
  useEffect(() => {
    if (openIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenIndex(null);
      if (e.key === "ArrowRight") setOpenIndex((i) => (i === null ? 0 : (i + 1) % images.length));
      if (e.key === "ArrowLeft")
        setOpenIndex((i) => (i === null ? 0 : (i - 1 + images.length) % images.length));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openIndex, images.length]);

  return (
    <section id="gallery" className="gallery-section">
      <h2>Gallery</h2>

      <div className="gallery-grid">
        {images.map((src, i) => (
          <button
            key={src + i}
            className="gallery-item"
            onClick={() => setOpenIndex(i)}
            aria-label={`Open image ${i + 1}`}
          >
            {/* Square card via CSS ::before; image fills with object-fit: cover */}
            <img src={src} alt={`Gallery ${i + 1}`} loading="lazy" />
          </button>
        ))}
      </div>

      {openIndex !== null && (
        <div className="lightbox" onClick={() => setOpenIndex(null)} role="dialog" aria-modal="true">
          <img src={images[openIndex]} alt="Enlarged view" />
        </div>
      )}
    </section>
  );
}