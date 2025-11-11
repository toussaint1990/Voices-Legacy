// src/sections/About.tsx
import { useTranslation } from "react-i18next";
import "./About.css";

function stripTags(s: string) {
  return s ? s.replace(/<\/?[^>]+>/g, "") : s;
}

export default function About() {
  const { t } = useTranslation();

  return (
    <section id="about" className="about-section">
      <h2>{stripTags(t("about.title"))}</h2>

      <p>{stripTags(t("about.letter.greeting"))}</p>
      <p>{stripTags(t("about.letter.p1"))}</p>
      <p>{stripTags(t("about.letter.p2"))}</p>
      <p>{stripTags(t("about.letter.p3"))}</p>
      <p>{stripTags(t("about.letter.p4"))}</p>
      <p>{stripTags(t("about.letter.p5"))}</p>

      <p className="closing">
        <strong>{stripTags(t("about.letter.closingTitle"))}</strong>
        <br />
        {stripTags(t("about.letter.name"))}
        <br />
        {stripTags(t("about.letter.title"))}
      </p>
    </section>
  );
}