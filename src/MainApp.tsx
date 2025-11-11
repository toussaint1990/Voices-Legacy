import NavBar from "./components/NavBar";
import About from "./sections/About";
import Gallery from "./sections/Gallery";
import Contact from "./sections/Contact";
import "./App.css";

export default function MainApp() {
  console.log("✅ MainApp loaded"); // <-- this line logs once when page mounts

  return (
    <>
      <NavBar />
      <section
        id="hero"
        style={{
          backgroundImage: "url('/hero.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
        }}
      >
        <section
          style={{
            color: "white",
            textAlign: "center",
            marginTop: "20px",
          }}
        >
          <div className="social-buttons">
            <a
              className="btn gofundme"
              href="https://www.gofundme.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              GoFundMe
            </a>
            <a
              className="btn instagram"
              href="https://instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram
            </a>
            <a
              className="btn facebook"
              href="https://facebook.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Facebook
            </a>
          </div>
        </section>
      </section>

      {/* Content */}
      <About />
      <Gallery />
      <Contact />

      <footer
        style={{
          textAlign: "center",
          padding: "20px",
          marginTop: "40px",
          fontSize: "0.9rem",
          color: "#ccc",
          background: "rgba(0, 0, 0, 0.6)",
          borderTop: "1px solid rgba(255, 255, 255, 0.1)",
        }}
      >
        © {new Date().getFullYear()} Cristian D Toussaint 
      </footer>
    </>
  );
}