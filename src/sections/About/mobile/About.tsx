import Image from "next/image";
import type { SiteDictionary } from "@/i18n/types";
import styles from "./About.module.css";

type AboutProps = {
  content: SiteDictionary["about"];
};

const About = ({ content }: AboutProps) => {
  return (
    <section id="about" className={styles.section}>
      <div className={styles.inner}>
        <figure className={styles.portraitFigure}>
          <div className={styles.portraitWrap}>
            <Image
              src="/images/about-portrait.jpg"
              alt={content.affiliation.name}
              fill
              sizes="100vw"
              className={styles.portrait}
              unoptimized
            />
            <div className={styles.portraitTone} aria-hidden="true" />
          </div>
        </figure>

        <div className={styles.content}>
          <h2 className={styles.title}>{content.quote}</h2>

          <p className={styles.bio}>{content.bio}</p>
        </div>
      </div>
    </section>
  );
};

export default About;
