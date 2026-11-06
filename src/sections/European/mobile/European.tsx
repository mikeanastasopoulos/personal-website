import type { SiteDictionary } from "@/i18n/types";
import EuropeanGallery from "@/features/EuropeanGallery/EuropeanGallery/EuropeanGallery";
import styles from "./European.module.css";

type EuropeanProps = {
  content: SiteDictionary["european"];
};

const European = ({ content }: EuropeanProps) => {
  return (
    <section id="european" className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.intro}>
          <div className={styles.eyebrow}>
            <span className={styles.rule} aria-hidden="true" />
            {content.affiliationLabel}
          </div>

          <h2 className={styles.title}>
            <span>{content.titleL1}</span>{" "}
            <em>{content.titleL2}</em>
          </h2>

          <p className={styles.text}>
            {content.text}
          </p>
        </div>

        <div className={styles.gallery}>
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
