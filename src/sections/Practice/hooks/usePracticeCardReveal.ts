"use client";

import { useRef, useState } from "react";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";

export const usePracticeCardReveal = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [revealReady, setRevealReady] = useState(false);
  const [revealedCards, setRevealedCards] = useState<Set<string>>(() => new Set());

  // Arm the enhancement before paint; server-rendered content stays visible
  // without JavaScript, and reduced-motion styles never hide the cards.
  useIsomorphicLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section || !("IntersectionObserver" in window)) return;

    const cards = section.querySelectorAll<HTMLElement>("[data-practice-card]");
    const observer = new IntersectionObserver((entries) => {
      const revealed = entries.filter((entry) => entry.isIntersecting);
      if (!revealed.length) return;

      setRevealedCards((previous) => {
        const next = new Set(previous);
        revealed.forEach((entry) => {
          const id = (entry.target as HTMLElement).dataset.practiceCard;
          if (id) next.add(id);
        });
        return next;
      });
      revealed.forEach((entry) => observer.unobserve(entry.target));
    }, { threshold: 0.25, rootMargin: "0px 0px -8% 0px" });

    cards.forEach((card) => observer.observe(card));
    setRevealReady(true);
    return () => observer.disconnect();
  }, []);

  return { sectionRef, revealReady, revealedCards };
};
