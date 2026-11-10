import Button from "@/components/ui/Button/Button";
import HeroPortraits from "@/features/HeroPortraits/HeroPortraits/HeroPortraits";
import type { Locale } from "@/i18n/locales";
import type { SiteDictionary } from "@/i18n/types";
import styles from "./Hero.module.css";

type HeroProps = {
  content: SiteDictionary["hero"];
  locale: Locale;
};

const Hero = ({ content, locale }: HeroProps) => {
  const nameFontClass = locale === "el" ? styles.nameEl : styles.nameEn;

  return (
    <section id="hero" className={styles.hero}>
      <div className={styles.imageStage}>
        <HeroPortraits
          swipeEnabled
          alt={`${content.name1} ${content.name2}`}
          label={content.portraitsLabel}
          selectLabel={content.selectPortrait}
        />
        <div className={styles.imageShade} aria-hidden="true" />
      </div>

      <div className={styles.copyPanel}>
        <div className={styles.eyebrow}>{content.label}</div>

        <h1 className={`${styles.name} ${nameFontClass}`}>
          <span>{content.name1}</span>
          <span>{content.name2}</span>
        </h1>

        <span className={styles.accentLine} aria-hidden="true" />

        <p className={styles.description}>{content.description}</p>

        <div className={styles.actions}>
          <Button href="#contact">{content.cta}</Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
