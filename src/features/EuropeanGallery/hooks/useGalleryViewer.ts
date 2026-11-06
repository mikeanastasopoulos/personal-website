"use client";

import { useEffect, useRef, useState } from "react";

const OPEN_DURATION_MS = 320;
const CLOSE_DURATION_MS = 180;
const EASING = "cubic-bezier(0.22, 1, 0.36, 1)";

export const useGalleryViewer = (photoCount: number) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const openerRef = useRef<HTMLButtonElement | null>(null);
  const closingRef = useRef(false);
  const animationsRef = useRef<Animation[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const cancelAnimations = () => {
    animationsRef.current.forEach((animation) => animation.cancel());
    animationsRef.current = [];
  };

  const openViewer = (index: number, opener: HTMLButtonElement) => {
    const dialog = dialogRef.current;
    if (!dialog || dialog.open) return;
    cancelAnimations();
    openerRef.current = opener;
    closingRef.current = false;
    delete dialog.dataset.closing;
    setSelectedIndex(index);
    dialog.showModal();

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const panel = dialog.querySelector<HTMLElement>("[data-gallery-viewer]");
    if (panel) {
      animationsRef.current = [panel.animate([
        { opacity: 0, transform: "translateY(16px) scale(0.97)" },
        { opacity: 1, transform: "translateY(0) scale(1)" },
      ], { duration: OPEN_DURATION_MS, easing: EASING })];
    }
  };

  const closeViewer = async () => {
    const dialog = dialogRef.current;
    if (!dialog?.open || closingRef.current) return;
    closingRef.current = true;
    cancelAnimations();

    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      // Coordinate the native backdrop with the panel's Web Animation before closing the dialog.
      dialog.dataset.closing = "true";
      const panel = dialog.querySelector<HTMLElement>("[data-gallery-viewer]");
      if (panel) {
        const animation = panel.animate([
          { opacity: 1, transform: "translateY(0) scale(1)" },
          { opacity: 0, transform: "translateY(8px) scale(0.985)" },
        ], { duration: CLOSE_DURATION_MS, easing: "ease-in", fill: "forwards" });
        animationsRef.current = [animation];
        try { await animation.finished; } catch { return; }
      }
    }

    if (dialog.isConnected) dialog.close();
    cancelAnimations();
  };

  const handleClosed = () => {
    closingRef.current = false;
    if (dialogRef.current) delete dialogRef.current.dataset.closing;
    if (openerRef.current?.isConnected) openerRef.current.focus();
  };

  const movePhoto = (direction: 1 | -1) => {
    if (closingRef.current) return;
    setSelectedIndex((index) => (index + direction + photoCount) % photoCount);
  };

  // eslint-disable-next-line no-restricted-syntax -- cancels browser animations when the gallery unmounts during route navigation
  useEffect(() => () => {
    animationsRef.current.forEach((animation) => animation.cancel());
  }, []);

  return { dialogRef, selectedIndex, selectPhoto: setSelectedIndex, openViewer, closeViewer, handleClosed, movePhoto };
};
