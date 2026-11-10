"use client";

import type { SiteDictionary } from "@/i18n/types";
import { usePracticeCardReveal } from "../hooks/usePracticeCardReveal";
import styles from "./Practice.module.css";

type PracticeProps = {
  content: SiteDictionary["practice"];
};

const Practice = ({ content }: PracticeProps) => {
  const { sectionRef, revealReady, revealedCards } = usePracticeCardReveal();

  return (
    <section
      ref={sectionRef}
      id="practice"
      className={styles.section}
      data-reveal-ready={revealReady}
    >
      <div className={styles.inner}>
        <div className={styles.grid}>
          {content.items.map((item) => (
            <article
              key={item.number}
              className={styles.card}
              data-practice-card={item.number}
              data-revealed={revealedCards.has(item.number)}
            >
              <div className={styles.cardContent}>
                <h2 className={styles.title}>{item.title}</h2>

                <span className={styles.divider} aria-hidden="true" />

                <p className={styles.text}>{item.text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Practice;
