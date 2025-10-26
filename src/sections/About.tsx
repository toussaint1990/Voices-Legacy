import { useTranslation } from "react-i18next";
import "./About.css";

export default function About() {
  const { t } = useTranslation();

  return (
    <section id="about" className="about-section">
      <h2>{t("about.title")}</h2>

      <div className="about-body">
        <p><strong>{t("about.letter.greeting")}</strong></p>
        <p dangerouslySetInnerHTML={{ __html: t("about.letter.p1") }} />
        <p>{t("about.letter.p2")}</p>
        <p dangerouslySetInnerHTML={{ __html: t("about.letter.p3") }} />
        <p>{t("about.letter.p4")}</p>
        <p>{t("about.letter.p5")}</p>
        <p>
          <strong>{t("about.letter.closingTitle")}</strong><br/>
          {t("about.letter.name")}<br/>
          {t("about.letter.title")}
        </p>
      </div>
    </section>
  );
}