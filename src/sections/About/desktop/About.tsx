import Image from "next/image";
import type { SiteDictionary } from "@/i18n/types";
import styles from "./About.module.css";

type AboutProps = {
  content: SiteDictionary["about"];
};

const About = ({ content }: AboutProps) => {
  return (
    <section data-editorial-scene className={styles.section}>
      <div data-section-content className={styles.inner}>
        <div className={styles.content}>
          <h1 className={styles.title} data-motion-layer="primary">
            {content.quote}
          </h1>

          <div className={styles.biography} data-motion-layer="secondary">
            <p className={styles.bio}>{content.bio}</p>
          </div>
        </div>

        <figure className={styles.portraitFigure} data-motion-layer="media">
          <div className={styles.portraitWrap}>
            <Image
              src="/images/about-portrait.jpg"
              alt={content.affiliation.name}
              fill
              sizes="(max-width: 860px) 100vw, 65vw"
              className={styles.portrait}
              unoptimized
            />

            <div className={styles.portraitTone} aria-hidden="true" />
          </div>

          <figcaption className={styles.portraitCaption}>
            <span>{content.affiliation.name}</span>
            <span>{content.affiliation.sub}</span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
};

export default About;
