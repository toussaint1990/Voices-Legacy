import React, { useEffect, useState } from "react";
import "./Gallery.css";

// ✅ Vite will bundle anything under /src and give us URLs at build time.
//    Drop images into: src/assets/gallery/*.(jpg|jpeg|png|webp)
const assetModules = import.meta.glob(
  "/src/assets/gallery/*.{jpg,jpeg,png,webp}",
  { eager: true, as: "url" }
);

export default function Gallery() {
  const [images, setImages] = useState<string[]>([]);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  // Load all image URLs from the glob
  useEffect(() => {
    // Pull the urls out of the glob result and apply a simple optional filter
    const urls = Object.values(assetModules)
      .filter((url) => typeof url === "string")
      // optional: skip files that start with 'hero' so your hero poster
      // doesn't show up in the gallery if it lives in the same folder
      .filter((url) => !/\/hero/i.test(url as string)) as string[];

    // Sort by filename for a consistent order (optional)
    urls.sort((a, b) => a.localeCompare(b));

    setImages(urls);
  }, []);

  // Lock body scroll when lightbox is open
  useEffect(() => {
    if (openIndex === null) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = prev);
  }, [openIndex]);

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (openIndex === null) return;
      if (e.key === "Escape") setOpenIndex(null);
      if (e.key === "ArrowRight")
        setOpenIndex((i) => (((i ?? 0) + 1) % images.length));
      if (e.key === "ArrowLeft")
        setOpenIndex((i) => ((i ?? images.length) - 1 + images.length) % images.length);
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