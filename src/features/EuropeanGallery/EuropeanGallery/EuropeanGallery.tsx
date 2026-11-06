"use client";

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
  const viewer = useGalleryViewer(photos.length);
  const collageOrder = [0, 1, 3, 4, 2, 5];

  return (
    <div className={styles.album} role="group" aria-label={label}>
      <div className={styles.collage}>
        {collageOrder.map((photoIndex) => (
          <GallerySlot
            key={photos[photoIndex]!.id}
            photo={photos[photoIndex]!}
            sizes={photoIndex === 0 ? HERO_MOSAIC_IMAGE_SIZES : undefined}
            enlargeLabel={enlargeLabel}
            onOpen={(button) => viewer.openViewer(photoIndex, button)}
          />
        ))}
      </div>
      <GalleryLightbox
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
