"use client";

import { useEffect, useState, type RefObject } from "react";
import { HERO_PHOTOS } from "../model/photos";

const ROTATION_INTERVAL_MS = 8000;

export const useHeroPortraits = (rootRef: RefObject<HTMLDivElement | null>) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [secondaryReady, setSecondaryReady] = useState(false);
  const [environment, setEnvironment] = useState({ visible: false, tabVisible: false, reducedMotion: true });

  const running = secondaryReady && environment.visible && environment.tabVisible && !environment.reducedMotion;

  // eslint-disable-next-line no-restricted-syntax -- subscribes to viewport, Page Visibility, and reduced-motion browser APIs
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateEnvironment = () => setEnvironment((previous) => ({
      ...previous,
      tabVisible: !document.hidden,
      reducedMotion: media.matches,
    }));
    const observer = new IntersectionObserver(([entry]) => {
      setEnvironment((previous) => ({ ...previous, visible: Boolean(entry?.isIntersecting) }));
    });

    updateEnvironment();
    if (rootRef.current) observer.observe(rootRef.current);
    document.addEventListener("visibilitychange", updateEnvironment);
    media.addEventListener("change", updateEnvironment);

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", updateEnvironment);
      media.removeEventListener("change", updateEnvironment);
    };
  }, [rootRef]);

  // eslint-disable-next-line no-restricted-syntax -- owns the portrait rotation timer; manual selection restarts the full eight-second interval
  useEffect(() => {
    if (!running) return;
    const timer = setTimeout(() => {
      setActiveIndex((index) => (index + 1) % HERO_PHOTOS.length);
    }, ROTATION_INTERVAL_MS);
    return () => clearTimeout(timer);
  }, [running, activeIndex]);

  return {
    activeIndex,
    setActiveIndex,
    secondaryReady,
    setSecondaryReady,
  };
};
