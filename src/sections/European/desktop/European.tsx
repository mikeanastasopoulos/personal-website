import type { SiteDictionary } from "@/i18n/types";
import EuropeanGallery from "@/features/EuropeanGallery/EuropeanGallery/EuropeanGallery";
import styles from "./European.module.css";

type EuropeanProps = {
  content: SiteDictionary["european"];
};

const European = ({ content }: EuropeanProps) => {
  return (
    <section data-editorial-scene className={styles.section}>
      <div data-section-content className={styles.inner} data-lenis-prevent>
        <div className={styles.intro}>
          <div className={styles.eyebrow} data-motion-layer="secondary">
            <span className={styles.rule} aria-hidden="true" />
            {content.affiliationLabel}
          </div>

          <h1 className={styles.title} data-motion-layer="primary">
            <span>{content.titleL1}</span>{" "}
            <em>{content.titleL2}</em>
          </h1>

          <p className={styles.text} data-motion-layer="secondary">
            {content.text}
          </p>
        </div>

        <div className={styles.gallery} data-motion-layer="media">
          <EuropeanGallery
            photos={content.photos}
            label={content.galleryLabel}
            previousLabel={content.previousPhoto}
            nextLabel={content.nextPhoto}
            enlargeLabel={content.enlargePhoto}
            closeLabel={content.closeGallery}
          />
        </div>
      </div>
    </section>
  );
};

export default European;
