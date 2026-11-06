import type { SiteDictionary } from "@/i18n/types";
import AcademicChapters from "./AcademicChapters/AcademicChapters";
import styles from "./Academic.module.css";

type AcademicProps = {
  content: SiteDictionary["academic"];
};

const Academic = ({ content }: AcademicProps) => {
  return (
    <section data-editorial-scene className={styles.section} aria-label={content.label}>
      <div data-section-content className={styles.inner}>
        <AcademicChapters
          label={content.chaptersLabel}
          chapters={content.chapters}
        />
      </div>
    </section>
  );
};

export default Academic;
