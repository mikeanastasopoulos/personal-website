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
    <section id="contact" className={styles.section}>
      <div className={styles.inner}>

        <h2 className={styles.title}>
          {content.title}
        </h2>

        <p className={styles.text}>{content.text}</p>

        <p className={styles.text}>{content.invitation}</p>


        <ContactForm content={content.form} />

        <div className={styles.rows}>
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

      <footer className={styles.footer}>
        <span className={styles.footerCopy}>
          © {new Date().getFullYear()} {footerContent.copy}
        </span>
        <span className={styles.footerCredit}>{footerContent.developedBy}</span>
      </footer>
    </section>
  );
};

export default Contact;
