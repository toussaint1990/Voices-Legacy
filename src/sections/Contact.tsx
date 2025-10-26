import { useTranslation } from "react-i18next";
import "./Contact.css";

export default function Contact() {
  const { t } = useTranslation();

  return (
    <section id="contact" className="contact-section">
      <h2>{t("Contact")}</h2>

      <div className="contact-card">
        <p><strong>{t("Dr. Lorna R. Shuford")}</strong></p>
        <p>📞 <a href="tel:17864008765">786-400-8765</a></p>
        <p>📧 <a href="mailto:Funding4us@gmail.com">Funding4us@gmail.com</a></p>
        <p>🏢 7900 NW 27th Ave. Ste. A04A – Miami, FL 33147</p>

        <div className="contact-links">
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
      </div>
    </section>
  );
}