"use client";

import { useRef } from "react";
import Image from "next/image";
import { HERO_PHOTOS } from "../model/photos";
import { useHeroPortraits } from "../hooks/useHeroPortraits";
import styles from "./HeroPortraits.module.css";

type HeroPortraitsProps = {
  alt: string;
  label: string;
  selectLabel: string;
  swipeEnabled?: boolean;
};

const HeroPortraits = ({ alt, label, selectLabel, swipeEnabled = false }: HeroPortraitsProps) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const portraits = useHeroPortraits(rootRef);

  return (
    <div
      ref={rootRef}
      className={styles.portraits}
      style={swipeEnabled ? { touchAction: "pan-y pinch-zoom" } : undefined}
      onTouchStart={swipeEnabled ? (event) => {
        const touch = event.touches[0];
        touchStart.current = touch && event.touches.length === 1 ? { x: touch.clientX, y: touch.clientY } : null;
      } : undefined}
      onTouchCancel={() => { touchStart.current = null; }}
      onTouchEnd={swipeEnabled ? (event) => {
        const start = touchStart.current;
        touchStart.current = null;
        if (!start || !portraits.secondaryReady) return;
        const touch = event.changedTouches[0];
        if (!touch) return;
        const dx = touch.clientX - start.x;
        const dy = touch.clientY - start.y;
        if (Math.abs(dx) < 40 || Math.abs(dx) < Math.abs(dy) * 1.5) return;
        portraits.setActiveIndex((index) => (index + (dx < 0 ? 1 : -1) + HERO_PHOTOS.length) % HERO_PHOTOS.length);
      } : undefined}
    >
      {HERO_PHOTOS.map((photo, index) => (
        <div key={photo.id} className={styles.slide} data-photo={photo.id} data-active={index === portraits.activeIndex} aria-hidden={index !== portraits.activeIndex}>
          <Image
            src={photo.src}
            alt={alt}
            fill
            priority={index === 0}
            sizes="(max-width: 860px) 100vw, 52vw"
            className={styles.photo}
            onLoad={index === 1 ? () => portraits.setSecondaryReady(true) : undefined}
          />
        </div>
      ))}

      <div
        className={styles.controls}
        role="group"
        aria-label={label}
      >
        {HERO_PHOTOS.map((photo, index) => (
          <button
            key={photo.id}
            type="button"
            className={styles.selector}
            onClick={() => portraits.setActiveIndex(index)}
            aria-label={`${selectLabel} ${index + 1}`}
            aria-pressed={index === portraits.activeIndex}
            disabled={index === 1 && !portraits.secondaryReady}
          >
            <span aria-hidden="true" />
          </button>
        ))}
      </div>
    </div>
  );
};

export default HeroPortraits;
