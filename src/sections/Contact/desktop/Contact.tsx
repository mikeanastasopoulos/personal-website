import type { SiteDictionary } from "@/i18n/types";
import ContactForm from "@/features/ContactForm/ContactForm";
import { siteConfig } from "@/seo/siteConfig";
import styles from "./Contact.module.css";

type ContactProps = {
  content: SiteDictionary["contact"];
  footerContent: SiteDictionary["footer"];
};

const Contact = ({ content, footerContent }: ContactProps) => {
  return (
    <section data-editorial-scene className={styles.section}>
      <div data-section-content className={styles.inner}>
        <div className={styles.left}>
          <span className={styles.eyebrow} data-motion-layer="secondary">
            {content.label}
          </span>
          <h1 className={styles.title} data-motion-layer="primary">
            {content.title}
          </h1>

          <p className={styles.text} data-motion-layer="secondary">
            {content.text}
          </p>

          <p className={styles.text} data-motion-layer="secondary">
            {content.invitation}
          </p>

          <div className={styles.details} data-motion-layer="secondary">
            <div className={styles.row}>
              <div className={styles.rowLabel}>{content.emailLabel}</div>
              <a href={`mailto:${siteConfig.email}`} className={styles.rowLink}>
                {siteConfig.email}
              </a>
            </div>
            <div className={styles.row}>
              <div className={styles.rowLabel}>{content.phoneLabel}</div>
              <a href={`tel:${siteConfig.phone}`} className={styles.rowLink}>
                {siteConfig.phoneDisplay}
              </a>
            </div>
          </div>
        </div>

        <div className={styles.right} data-motion-layer="secondary">
          <ContactForm content={content.form} />
        </div>
      </div>

      <footer className={styles.footer} data-motion-layer="secondary">
        <span className={styles.footerCopy}>
          © {new Date().getFullYear()} {footerContent.copy}
        </span>
        <span className={styles.footerCredit}>{footerContent.developedBy}</span>
      </footer>
    </section>
  );
};

export default Contact;
