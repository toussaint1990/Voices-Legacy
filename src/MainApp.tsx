// src/MainApp.tsx
import NavBar from "./components/NavBar";
import About from "./sections/About";
import Gallery from "./sections/Gallery";
import Contact from "./sections/Contact";
import "./App.css"; // keep your section styles
// (index.css is loaded in main.tsx, so we don't import it here)

export default function MainApp() {
  return (
    <>
      <NavBar />

      {/* HERO SECTION */}
      <section id="hero" className="hero">
        {/* Place the poster at /public/hero.jpg */}
        <img src="/hero.jpg" alt="Voices of Legacy" className="hero-img" />

        {/* Social buttons — sit on the image on desktop, move below on mobile */}
        <div className="hero-buttons">
          <a
            className="btn gofundme"
            href="https://www.gofundme.com/f/yje5m-join-panamerican-dojo-kai-dream-travel-to-japan"
            target="_blank"
            rel="noopener noreferrer"
          >
            GoFundMe
          </a>
          <a
            className="btn instagram"
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Instagram
          </a>
          <a
            className="btn facebook"
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Facebook
          </a>
        </div>
      </section>

      {/* CONTENT */}
      <About />
      <Gallery />
      <Contact />
    </>
  );
}