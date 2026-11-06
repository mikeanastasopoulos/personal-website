import EmphasisText from "@/components/ui/EmphasisText/EmphasisText";
import type { SiteDictionary } from "@/i18n/types";
import styles from "./Academic.module.css";

type AcademicProps = {
  content: SiteDictionary["academic"];
};

const Academic = ({ content }: AcademicProps) => {
  return (
    <section id="academic" className={styles.section} aria-label={content.label}>
      <div className={styles.inner}>
        {content.chapters.map((chapter) => (
          <article key={chapter.number} className={styles.chapter}>
            <h2 className={styles.chapterHeading}>
              <span className={styles.chapterNumber}>{chapter.number}</span>
              <span className={styles.chapterTitle}>{chapter.title}</span>
            </h2>

            {chapter.paragraphs.map((paragraph) => (
              <p key={paragraph} className={styles.paragraph}>
                <EmphasisText text={paragraph} />
              </p>
            ))}
          </article>
        ))}
      </div>
    </section>
  );
};

export default Academic;
