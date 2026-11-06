import type { Locale } from "@/i18n/locales";
import type { SiteDictionary } from "@/i18n/types";
import Hero from "@/sections/Hero/mobile/Hero";
import About from "@/sections/About/mobile/About";
import Practice from "@/sections/Practice/mobile/Practice";
import Academic from "@/sections/Academic/mobile/Academic";
import European from "@/sections/European/mobile/European";
import Contact from "@/sections/Contact/mobile/Contact";
import styles from "./MobileExperience.module.css";

type MobileExperienceProps = {
  dict: SiteDictionary;
  locale: Locale;
};

const MobileExperience = ({ dict, locale }: MobileExperienceProps) => {
  return (
    <div className={styles.experience}>
      <main className={styles.stack}>
        <Hero content={dict.hero} locale={locale} />
        <About content={dict.about} />
        <Practice content={dict.practice} />
        <Academic content={dict.academic} />
        <European content={dict.european} />
        <Contact content={dict.contact} footerContent={dict.footer} />
      </main>
    </div>
  );
};

export default MobileExperience;
