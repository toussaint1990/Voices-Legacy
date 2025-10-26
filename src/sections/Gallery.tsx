import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

function useGalleryImages() {
  const modules = import.meta.glob("/public/gallery/*.(png|jpg|jpeg|webp)", {
    eager: true,
    query: "?url",
    import: "default",
  });
  return useMemo(
    () => Object.values(modules).map((m: any) => m as string),
    [modules]
  );
}

export default function Gallery() {
  const { t } = useTranslation();
  const images = useGalleryImages();
  const [lightbox, setLightbox] = useState<string | null>(null);

  return (
    <section id="gallery" className="stack">
      <h2>{t("Gallery")}</h2>

      <div className="gallery-grid">
        {images.map((src, i) => (
          <button className="gallery-card" key={i} onClick={() => setLightbox(src)} aria-label={t("gallery.open")}>
            <img src={src} alt={t("gallery.alt", { index: i + 1 })} loading="lazy" />
          </button>
        ))}
      </div>

      {lightbox && (
        <div className="lightbox" onClick={() => setLightbox(null)} role="dialog" aria-modal="true">
          <img src={lightbox} alt={t("gallery.openedAlt")} />
        </div>
      )}
    </section>
  );
}