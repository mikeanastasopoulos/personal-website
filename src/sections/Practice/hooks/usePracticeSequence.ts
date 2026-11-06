"use client";

import { useEffect, useRef, useState } from "react";

export const usePracticeSequence = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isSequenceActive, setIsSequenceActive] = useState(false);

  // eslint-disable-next-line no-restricted-syntax -- observes when this section enters the viewport to start its entrance sequence
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        setIsSequenceActive(true);
        observer.disconnect();
      },
      { threshold: 0.2 },
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return { sectionRef, isSequenceActive };
};
