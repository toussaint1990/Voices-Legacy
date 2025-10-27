import React, { useEffect, useState } from "react";
import "../sections/Gallery.css";

export default function Gallery() {
  const [images, setImages] = useState<string[]>([]);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  // Auto-import all images from /public/gallery
  useEffect(() => {
    // @ts-ignore
    const imported = import.meta.glob("/public/gallery/*.{jpg,jpeg,png}");
    const paths = Object.keys(imported).map((path) => path.replace("/public", ""));
    setImages(paths);
  }, []);

  // Keyboard close
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenIndex(null);
      if (e.key === "ArrowRight" && openIndex !== null)
        setOpenIndex((prev) => (prev! + 1) % images.length);
      if (e.key === "ArrowLeft" && openIndex !== null)
        setOpenIndex((prev) => (prev! - 1 + images.length) % images.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openIndex, images.length]);

  return (
    <section className="gallery-section" id="gallery">
      <h2>Gallery</h2>
      <div className="gallery-grid">
        {images.map((src, index) => (
          <div
            key={index}
            className="gallery-item"
            onClick={() => setOpenIndex(index)}
          >
            <img src={src} alt={`Gallery ${index}`} />
          </div>
        ))}
      </div>

      {openIndex !== null && (
        <div className="lightbox" onClick={() => setOpenIndex(null)}>
          <img
            src={images[openIndex]}
            alt="Zoomed"
            className="lightbox-img"
            onClick={(e) => e.stopPropagation()}
          />
          <button className="close-btn" onClick={() => setOpenIndex(null)}>
            ✕
          </button>
        </div>
      )}
    </section>
  );
}