"use client";

import { useRef, useState, type KeyboardEvent, type RefObject, type TouchEvent } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight, LoaderCircle, X } from "lucide-react";
import type { EuropeanPhoto } from "@/i18n/types";
import styles from "./GalleryLightbox.module.css";

type GalleryLightboxProps = {
  dialogRef: RefObject<HTMLDialogElement>;
  photos: EuropeanPhoto[];
  selectedIndex: number;
  label: string;
  previousLabel: string;
  nextLabel: string;
  closeLabel: string;
  enlargeLabel: string;
  onMove: (direction: 1 | -1) => void;
  onSelect: (index: number) => void;
  onRequestClose: () => void;
  onClose: () => void;
};

const GalleryLightbox = ({
  dialogRef, photos, selectedIndex, label, previousLabel, nextLabel, closeLabel,
  enlargeLabel, onMove, onSelect, onRequestClose, onClose,
}: GalleryLightboxProps) => {
  const touchRef = useRef<{ x: number; y: number } | null>(null);
  const [loadedPhotoId, setLoadedPhotoId] = useState<string | null>(null);
  const photo = photos[selectedIndex];
  const isLoaded = photo?.id === loadedPhotoId;
  const counter = `${String(selectedIndex + 1).padStart(2, "0")} / ${String(photos.length).padStart(2, "0")}`;

  const handleKeyDown = (event: KeyboardEvent<HTMLDialogElement>) => {
    event.stopPropagation();
    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      event.preventDefault();
      onMove(event.key === "ArrowRight" ? 1 : -1);
    }
    if (event.key === "Tab") {
      const buttons = event.currentTarget.querySelectorAll<HTMLButtonElement>("button");
      const first = buttons[0];
      const last = buttons[buttons.length - 1];
      if (event.shiftKey && event.target === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && event.target === last) {
        event.preventDefault();
        first?.focus();
      }
    }
  };

  const handleTouchEnd = (event: TouchEvent<HTMLElement>) => {
    const start = touchRef.current;
    const touch = event.changedTouches[0];
    touchRef.current = null;
    if (!start || !touch) return;
    const dx = touch.clientX - start.x;
    const dy = touch.clientY - start.y;
    if (Math.abs(dx) > 48 && Math.abs(dx) > Math.abs(dy) * 1.25) onMove(dx < 0 ? 1 : -1);
  };

  if (!photo) return null;

  return (
    // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions -- native modal handles keyboard navigation, focus containment and backdrop dismissal
    <dialog
      ref={dialogRef}
      className={styles.dialog}
      aria-label={label}
      onKeyDown={handleKeyDown}
      onClose={onClose}
      onCancel={(event) => { event.preventDefault(); onRequestClose(); }}
      onClick={(event) => { if (event.target === event.currentTarget) onRequestClose(); }}
      data-lenis-prevent
    >
      <div className={styles.viewer} data-gallery-viewer>
        <header className={styles.header}>
          <span className={styles.label}>{label}</span>
          <button type="button" className={styles.control} onClick={onRequestClose} aria-label={closeLabel}>
            <X size={20} aria-hidden="true" />
          </button>
        </header>

        <div className={styles.stage}>
          <button type="button" className={`${styles.control} ${styles.previous}`} onClick={() => onMove(-1)} aria-label={previousLabel}>
            <ArrowLeft size={21} aria-hidden="true" />
          </button>
          <figure
            className={styles.imageFrame}
            aria-busy={!isLoaded}
            onTouchStart={(event) => {
              const touch = event.touches[0];
              touchRef.current = touch ? { x: touch.clientX, y: touch.clientY } : null;
            }}
            onTouchEnd={handleTouchEnd}
            onTouchCancel={() => { touchRef.current = null; }}
          >
            {!isLoaded && <span className={styles.loading} aria-hidden="true"><LoaderCircle size={24} /></span>}
            <Image
              key={photo.id}
              src={photo.src}
              alt={photo.alt}
              fill
              sizes="(max-width: 767px) 95vw, (max-width: 1199px) 85vw, 1000px"
              className={styles.photo}
              data-loaded={isLoaded}
              onLoad={() => setLoadedPhotoId(photo.id)}
            />
          </figure>
          <button type="button" className={`${styles.control} ${styles.next}`} onClick={() => onMove(1)} aria-label={nextLabel}>
            <ArrowRight size={21} aria-hidden="true" />
          </button>
        </div>

        <footer className={styles.footer}>
          <div className={styles.caption} aria-live="polite" aria-atomic="true">
            <span className={styles.counter}>{counter}</span>
            <span className={styles.captionTitle}>{photo.caption}</span>
          </div>
          <div className={styles.filmstrip} role="group" aria-label={label}>
            {photos.map((item, index) => (
              <button
                key={item.id}
                type="button"
                className={styles.thumbnail}
                onClick={() => onSelect(index)}
                aria-label={`${enlargeLabel}: ${item.caption}`}
                aria-pressed={index === selectedIndex}
              >
                <Image src={item.src} alt="" fill sizes="64px" className={styles.thumbnailImage} />
              </button>
            ))}
          </div>
        </footer>
      </div>
    </dialog>
  );
};

export default GalleryLightbox;
