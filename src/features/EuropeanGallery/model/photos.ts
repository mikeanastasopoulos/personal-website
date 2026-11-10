import type { EuropeanPhoto } from "@/i18n/types";
import photo1 from "../../../../public/images/european/european-1.jpg";
import photo2 from "../../../../public/images/european/european-2.png";
import photo3 from "../../../../public/images/european/european-3.jpg";
import photo4 from "../../../../public/images/european/european-4.jpg";
import photo5 from "../../../../public/images/european/european-5.jpg";
import photo6 from "../../../../public/images/european/european-6.jpg";

// Static imports give renamed/replaced photos content-hashed URLs, preventing
// stale optimized images at different screen sizes. Translations stay localized.
export const EUROPEAN_PHOTOS = [
  { id: "european-1", src: photo1.src, objectPosition: "50% 42%" },
  { id: "european-2", src: photo2.src, objectPosition: "50% 42%" },
  { id: "european-3", src: photo3.src, objectPosition: "12% 39%" },
  { id: "european-4", src: photo4.src, objectPosition: "20% 41%" },
  { id: "european-5", src: photo5.src, objectPosition: "55% 38%" },
  { id: "european-6", src: photo6.src, objectPosition: "78% 35%" },
] as const;

export const getEuropeanPhotos = (translations: { caption: string; alt: string }[]): EuropeanPhoto[] =>
  EUROPEAN_PHOTOS.map((photo, index) => ({ ...photo, ...translations[index]! }));

export const COLLAGE_IMAGE_SIZES = "(max-width: 767px) 50vw, (max-width: 1199px) 42vw, (max-width: 1500px) 26vw, 400px";

export const HERO_MOSAIC_IMAGE_SIZES = "(max-width: 767px) 100vw, (max-width: 1199px) 60vw, (max-width: 1500px) 34vw, 560px";
