"use client";

import Image from "next/image";
import type { EuropeanPhoto } from "@/i18n/types";
import { COLLAGE_IMAGE_SIZES } from "../model/photos";
import styles from "./GallerySlot.module.css";

type GallerySlotProps = {
  photo: EuropeanPhoto;
  enlargeLabel: string;
  sizes?: string;
  onOpen: (button: HTMLButtonElement) => void;
};

const GallerySlot = ({ photo, enlargeLabel, onOpen, sizes = COLLAGE_IMAGE_SIZES }: GallerySlotProps) => (
  <button
    type="button"
    className={styles.slot}
    data-photo-id={photo.id}
    onClick={(event) => onOpen(event.currentTarget)}
    aria-label={`${enlargeLabel}: ${photo.caption}`}
  >
    <span className={styles.photoFrame}>
      <Image
        src={photo.src}
        alt={photo.alt}
        fill
        sizes={sizes}
        className={styles.image}
        // eslint-disable-next-line react/forbid-dom-props -- crop coordinates belong to the centralized per-photo metadata
        style={{ objectPosition: photo.objectPosition }}
      />
    </span>
  </button>
);

export default GallerySlot;
