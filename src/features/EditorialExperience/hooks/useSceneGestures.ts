"use client";

import { type RefObject, useEffect } from "react";
import { EDITORIAL_SCENE_SELECTOR, requestSceneStep } from "@/features/EditorialExperience/sceneSteps";

const WHEEL_INTENT_DISTANCE = 12;
const TOUCH_INTENT_DISTANCE = 42;

type Direction = 1 | -1;

type UseSceneGesturesOptions = {
  rootRef: RefObject<HTMLElement | null>;
  onNavigate: (direction: Direction) => void;
  onNavigateTo: (targetIndex: number) => void;
  sceneCount: number;
  disabled: boolean;
};

// A [data-lenis-prevent] region keeps wheel/touch/keys for itself only while its
// content actually overflows; when everything fits, gestures still change scene.
const shouldUseNativeScrolling = (target: EventTarget | null) => {
  if (!(target instanceof Element)) return false;
  if (target.closest("dialog[open]")) return true;

  const scrollRegion = target.closest("[data-lenis-prevent]");
  if (!scrollRegion) return false;

  return scrollRegion.scrollHeight > scrollRegion.clientHeight;
};

export const useSceneGestures = ({
  rootRef,
  onNavigate,
  onNavigateTo,
  sceneCount,
  disabled,
}: UseSceneGesturesOptions): void => {
  // eslint-disable-next-line no-restricted-syntax -- wires up wheel/touch/keyboard DOM listeners for scene navigation
  useEffect(() => {
    const root = rootRef.current;
    if (!root || disabled) return;

    // The active scene gets the first chance to use the step for its own internal pages.
    const navigateOrStep = (direction: Direction) => {
      const scene = root.querySelector(EDITORIAL_SCENE_SELECTOR);
      if (scene && requestSceneStep(scene, direction)) return;

      onNavigate(direction);
    };

    const handleWheel = (event: WheelEvent) => {
      if (shouldUseNativeScrolling(event.target)) return;
      if (Math.abs(event.deltaY) < WHEEL_INTENT_DISTANCE) return;

      event.preventDefault();
      navigateOrStep(event.deltaY > 0 ? 1 : -1);
    };

    let touchStartY = 0;
    let touchStartX = 0;

    const handleTouchStart = (event: TouchEvent) => {
      if (shouldUseNativeScrolling(event.target)) return;

      const touch = event.touches[0];
      if (!touch) return;

      touchStartY = touch.clientY;
      touchStartX = touch.clientX;
    };

    const handleTouchMove = (event: TouchEvent) => {
      if (shouldUseNativeScrolling(event.target)) return;
      event.preventDefault();
    };

    const handleTouchEnd = (event: TouchEvent) => {
      if (shouldUseNativeScrolling(event.target)) return;

      const touch = event.changedTouches[0];
      if (!touch) return;

      const deltaY = touchStartY - touch.clientY;
      const deltaX = touchStartX - touch.clientX;
      const isVerticalIntent = Math.abs(deltaY) > Math.abs(deltaX) * 1.25;

      if (!isVerticalIntent || Math.abs(deltaY) < TOUCH_INTENT_DISTANCE) return;

      navigateOrStep(deltaY > 0 ? 1 : -1);
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (shouldUseNativeScrolling(event.target)) return;
      if (event.key === "ArrowDown" || event.key === "PageDown") {
        event.preventDefault();
        navigateOrStep(1);
      }

      if (event.key === "ArrowUp" || event.key === "PageUp") {
        event.preventDefault();
        navigateOrStep(-1);
      }

      if (event.key === "Home") {
        event.preventDefault();
        onNavigateTo(0);
      }

      if (event.key === "End") {
        event.preventDefault();
        onNavigateTo(sceneCount - 1);
      }
    };

    root.addEventListener("wheel", handleWheel, { passive: false });
    root.addEventListener("touchstart", handleTouchStart, { passive: true });
    root.addEventListener("touchmove", handleTouchMove, { passive: false });
    root.addEventListener("touchend", handleTouchEnd, { passive: true });
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      root.removeEventListener("wheel", handleWheel);
      root.removeEventListener("touchstart", handleTouchStart);
      root.removeEventListener("touchmove", handleTouchMove);
      root.removeEventListener("touchend", handleTouchEnd);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [rootRef, onNavigate, onNavigateTo, sceneCount, disabled]);
};
