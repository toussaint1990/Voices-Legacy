import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import "./NavBar.css";

export default function NavBar() {
  const { t, i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  // Close menu on outside click
  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      const target = e.target as Node;
      if (
        panelRef.current &&
        !panelRef.current.contains(target) &&
        btnRef.current &&
        !btnRef.current.contains(target)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, []);

  // Close when navigating (hash links)
  useEffect(() => {
    const close = () => setOpen(false);
    window.addEventListener("hashchange", close);
    return () => window.removeEventListener("hashchange", close);
  }, []);

  // Language switcher
  const setLang = (lng: "en" | "es" | "fr") => i18n.changeLanguage(lng);

  return (
    <header className="navbar">
      <div className="nav-inner">
        <a href="#" className="brand">Voices of Legacy</a>

        {/* Desktop links */}
        <nav className="nav-links" aria-label="Primary">
          <a href="#about">{t("nav.about", "About")}</a>
          <a href="#gallery">{t("nav.gallery", "Gallery")}</a>
          <a href="#contact">{t("nav.contact", "Contact")}</a>
          <div className="lang" aria-label={t("nav.lang", "Language")}>
            <button onClick={() => setLang("en")} type="button">EN</button>
            <button onClick={() => setLang("es")} type="button">ES</button>
            <button onClick={() => setLang("fr")} type="button">FR</button>
          </div>
        </nav>

        {/* Burger */}
        <button
          ref={btnRef}
          className={`burger ${open ? "open" : ""}`}
          aria-label="Menu"
          aria-expanded={open}
          aria-controls="mobile-panel"
          onClick={() => setOpen(v => !v)}
          type="button"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* Mobile panel (rendered INSIDE .nav-inner so top:100% works) */}
        <div
          id="mobile-panel"
          ref={panelRef}
          className={`mobile-panel ${open ? "open" : ""}`}
          role="dialog"
          aria-modal="false"
        >
          <a href="#about" onClick={() => setOpen(false)}>{t("nav.about", "About")}</a>
          <a href="#gallery" onClick={() => setOpen(false)}>{t("nav.gallery", "Gallery")}</a>
          <a href="#contact" onClick={() => setOpen(false)}>{t("nav.contact", "Contact")}</a>

          <div className="lang-row" aria-label={t("nav.lang", "Language")}>
            <button onClick={() => setLang("en")} type="button">EN</button>
            <button onClick={() => setLang("es")} type="button">ES</button>
            <button onClick={() => setLang("fr")} type="button">FR</button>
          </div>
        </div>
      </div>
    </header>
  );
}