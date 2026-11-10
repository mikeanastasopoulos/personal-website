"use client";

import { useEffect, useRef, useState } from "react";
import type { EuropeanPhoto } from "@/i18n/types";
import { HERO_MOSAIC_IMAGE_SIZES } from "../model/photos";
import GallerySlot from "../GallerySlot/GallerySlot";
import GalleryLightbox from "../GalleryLightbox/GalleryLightbox";
import { useGalleryViewer } from "../hooks/useGalleryViewer";
import styles from "./EuropeanGallery.module.css";

type EuropeanGalleryProps = {
  photos: EuropeanPhoto[];
  label: string;
  previousLabel: string;
  nextLabel: string;
  enlargeLabel: string;
  closeLabel: string;
};

const EuropeanGallery = ({
  photos, label, previousLabel, nextLabel, enlargeLabel, closeLabel,
}: EuropeanGalleryProps) => {
  const albumRef = useRef<HTMLDivElement>(null);
  const [preload, setPreload] = useState(false);
  // eslint-disable-next-line no-restricted-syntax -- observe gallery proximity to warm full-size images before interaction
  useEffect(() => {
    const album = albumRef.current;
    if (!album) return;
    const observer = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        setPreload(true);
        observer.disconnect();
      }
    }, { rootMargin: "300px" });
    observer.observe(album);
    return () => observer.disconnect();
  }, []);
  const viewer = useGalleryViewer(photos.length);
  // Display order follows the requested collage placement; lightbox indices stay tied to each photo.
  const collageOrder = [0, 4, 2, 1, 3];

  return (
    <div ref={albumRef} className={styles.album} role="group" aria-label={label}>
      <div className={styles.collage}>
        {collageOrder.map((photoIndex, slotIndex) => (
          <GallerySlot
            key={photos[photoIndex]!.id}
            photo={photos[photoIndex]!}
            sizes={(slotIndex === 0 || slotIndex === 1 || slotIndex === 4) ? HERO_MOSAIC_IMAGE_SIZES : undefined}
            enlargeLabel={enlargeLabel}
            onOpen={(button) => { setPreload(true); viewer.openViewer(photoIndex, button); }}
          />
        ))}
      </div>
      <GalleryLightbox
        preload={preload}
        dialogRef={viewer.dialogRef}
        photos={photos}
        selectedIndex={viewer.selectedIndex}
        label={label}
        previousLabel={previousLabel}
        nextLabel={nextLabel}
        closeLabel={closeLabel}
        enlargeLabel={enlargeLabel}
        onMove={viewer.movePhoto}
        onSelect={viewer.selectPhoto}
        onRequestClose={() => { void viewer.closeViewer(); }}
        onClose={viewer.handleClosed}
      />
    </div>
  );
};

export default EuropeanGallery;
