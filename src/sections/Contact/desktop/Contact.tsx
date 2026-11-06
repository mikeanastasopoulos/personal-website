import { ArrowRight } from "lucide-react";
import type { SiteDictionary } from "@/i18n/types";
import Button from "@/components/ui/Button/Button";
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
          <h2 className={styles.title} data-motion-layer="primary">
            {content.title}
          </h2>

          <p className={styles.text} data-motion-layer="secondary">
            {content.text}
          </p>

          <p className={styles.text} data-motion-layer="secondary">
            {content.invitation}
          </p>

          <div data-motion-layer="secondary">
            <Button variant="primary" href={`mailto:${siteConfig.email}`}>
              {content.cta} <ArrowRight size={14} />
            </Button>
          </div>
        </div>

        <div className={styles.right} data-motion-layer="secondary">
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
