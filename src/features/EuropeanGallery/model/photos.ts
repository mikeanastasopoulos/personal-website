import type { EuropeanPhoto } from "@/i18n/types";

// Shared by both languages. Captions and alt text stay in their dictionaries.
export const EUROPEAN_PHOTOS = [
  { id: "european-1", src: "/images/european/european-1.jpg", objectPosition: "0% 42%" },
  { id: "european-2", src: "/images/european/european-2.jpg", objectPosition: "50% 42%" },
  { id: "european-3", src: "/images/european/european-3.jpg", objectPosition: "55% 38%" },
  { id: "european-4", src: "/images/european/european-4.jpg", objectPosition: "12% 39%" },
  { id: "european-5", src: "/images/european/european-5.jpg", objectPosition: "78% 35%" },
  { id: "european-6", src: "/images/european/european-6.jpg", objectPosition: "20% 40%" },
] as const;

export const getEuropeanPhotos = (translations: { caption: string; alt: string }[]): EuropeanPhoto[] =>
  EUROPEAN_PHOTOS.map((photo, index) => ({ ...photo, ...translations[index]! }));

export const COLLAGE_IMAGE_SIZES = "(max-width: 767px) 50vw, (max-width: 1199px) 42vw, (max-width: 1500px) 26vw, 400px";

export const HERO_MOSAIC_IMAGE_SIZES = "(max-width: 767px) 100vw, (max-width: 1199px) 60vw, (max-width: 1500px) 34vw, 560px";
