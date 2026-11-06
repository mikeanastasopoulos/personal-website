"use client";

import { useId, useRef, useState, type KeyboardEvent } from "react";
import EmphasisText from "@/components/ui/EmphasisText/EmphasisText";
import type { AcademicChapter } from "@/i18n/types";
import styles from "./AcademicChapters.module.css";

type AcademicChaptersProps = {
  label: string;
  chapters: AcademicChapter[];
};

const AcademicChapters = ({ label, chapters }: AcademicChaptersProps) => {
  const stepRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const baseId = useId();
  const lastIndex = chapters.length - 1;

  const selectSection = (index: number) => {
    if (index === activeIndex || index < 0 || index > lastIndex) return;
    setActiveIndex(index);
  };

  const handleStepKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    const targetIndexByKey: Record<string, number> = {
      ArrowDown: activeIndex === lastIndex ? 0 : activeIndex + 1,
      ArrowUp: activeIndex === 0 ? lastIndex : activeIndex - 1,
      Home: 0,
      End: lastIndex,
    };
    const targetIndex = targetIndexByKey[event.key];
    if (targetIndex === undefined) return;
    event.preventDefault();
    event.stopPropagation();
    selectSection(targetIndex);
    stepRefs.current[targetIndex]?.focus();
  };

  return (
    <div className={styles.chapters} data-motion-layer="secondary">
      <div role="tablist" aria-label={label} aria-orientation="vertical" className={styles.index}>
        {chapters.map((chapter, index) => (
          <button
            key={chapter.number}
            ref={(element) => { stepRefs.current[index] = element; }}
            type="button"
            role="tab"
            id={`${baseId}-step-${index}`}
            aria-selected={index === activeIndex}
            aria-controls={`${baseId}-panel-${index}`}
            tabIndex={index === activeIndex ? 0 : -1}
            className={styles.step}
            onClick={() => selectSection(index)}
            onKeyDown={handleStepKeyDown}
          >
            <span className={styles.marker} aria-hidden="true" />
            <span>{chapter.title}</span>
          </button>
        ))}
      </div>

      <div className={styles.content}>
        {chapters.map((chapter, index) => (
          <div
            key={chapter.number}
            role="tabpanel"
            id={`${baseId}-panel-${index}`}
            aria-labelledby={`${baseId}-step-${index}`}
            hidden={index !== activeIndex}
            tabIndex={0}
            className={styles.panel}
          >
            {chapter.paragraphs.map((paragraph) => (
              <p key={paragraph} className={styles.paragraph}>
                <EmphasisText text={paragraph} />
              </p>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AcademicChapters;
