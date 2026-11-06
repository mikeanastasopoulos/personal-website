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
        <h2 className={styles.title}>{content.quote}</h2>

        <p className={styles.bio}>{content.bio}</p>

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
        <div className={styles.credentials}>
          <div className={styles.credential}>
            <span className={styles.credentialLabel}>
              {content.affiliation.label}
            </span>
            <div className={styles.credentialContent}>
              <span className={styles.credentialValue}>
                {content.affiliation.name}
              </span>
              <span className={styles.credentialSub}>
                {content.affiliation.sub}
              </span>
            </div>
          </div>

          <div className={styles.credential}>
            <span className={styles.credentialLabel}>
              {content.academic.label}
            </span>
            <div className={styles.credentialContent}>
              {content.academic.degrees.map((degree) => (
                <span key={degree} className={styles.credentialValue}>
                  {degree}
                </span>
              ))}
            </div>
          </div>

          <div className={styles.credential}>
            <span className={styles.credentialLabel}>
              {content.languagesLabel}
            </span>
            <div className={styles.credentialContent}>
              <span className={styles.credentialValue}>
                {content.languagesValue}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
