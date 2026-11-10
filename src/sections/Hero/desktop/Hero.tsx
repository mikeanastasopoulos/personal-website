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
    <section data-editorial-scene className={styles.hero}>
      <div className={styles.imageStage} data-motion-layer="media">
        <HeroPortraits
          alt={`${content.name1} ${content.name2}`}
          label={content.portraitsLabel}
          selectLabel={content.selectPortrait}
        />
      </div>

      <div className={styles.imageShade} aria-hidden="true" />

      <div className={styles.content}>
        <div className={styles.copyPanel}>
          <div className={styles.eyebrow} data-motion-layer="secondary">
            {content.label}
          </div>

          <h1
            className={`${styles.name} ${nameFontClass}`}
            data-motion-layer="primary"
          >
            <span>{content.name1}</span>
            <span>{content.name2}</span>
          </h1>

          <span
            className={styles.accentLine}
            data-motion-layer="secondary"
            aria-hidden="true"
          />

          <p className={styles.description} data-motion-layer="secondary">
            {content.description}
          </p>

          <div className={styles.credentials} data-motion-layer="secondary">
            {content.chips.map((chip) => (
              <span key={chip} className={styles.credential}>
                <span>{chip}</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
