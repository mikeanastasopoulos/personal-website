"use client";

import { type RefObject, useEffect, useRef } from "react";
import { EDITORIAL_SCENE_SELECTOR, requestSceneStep } from "@/features/EditorialExperience/sceneSteps";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";

const WHEEL_INTENT_DISTANCE = 40;
const WHEEL_IDLE_MS = 220;
const TOUCH_INTENT_DISTANCE = 42;
const EDITABLE_SELECTOR = "input, textarea, select, [contenteditable]:not([contenteditable='false'])";

type Direction = 1 | -1;

type UseSceneGesturesOptions = {
  rootRef: RefObject<HTMLElement | null>;
  onNavigate: (direction: Direction) => void;
  onNavigateTo: (targetIndex: number) => void;
  sceneCount: number;
  navigationLockedRef: RefObject<boolean>;
};

// Overflowing regions and modal dialogs keep their native scrolling.
const shouldUseNativeScrolling = (target: EventTarget | null) => {
  if (!(target instanceof Element)) return false;
  if (target.closest(`dialog[open], ${EDITABLE_SELECTOR}`)) return true;
  const scrollRegion = target.closest("[data-lenis-prevent]");
  return !!scrollRegion && scrollRegion.scrollHeight > scrollRegion.clientHeight;
};

export const useSceneGestures = (options: UseSceneGesturesOptions): void => {
  const { rootRef } = options;
  const latest = useRef(options);

  // Keep listeners and wheel-burst history alive across route/animation updates.
  useIsomorphicLayoutEffect(() => {
    latest.current = options;
  });

  // eslint-disable-next-line no-restricted-syntax -- owns persistent browser gesture listeners and their cleanup
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const mobileViewport = window.matchMedia("(max-width: 860px)");
    const isDesktopVisible = () => !mobileViewport.matches;
    const isLocked = () => latest.current.navigationLockedRef.current;
    const navigateOrStep = (direction: Direction) => {
      if (isLocked()) return;
      const scene = root.querySelector(EDITORIAL_SCENE_SELECTOR);
      if (scene && requestSceneStep(scene, direction)) return;
      latest.current.onNavigate(direction);
    };

    let lastWheelAt = -Infinity;
    let wheelDistance = 0;
    let wheelConsumed = false;

    const handleWheel = (event: WheelEvent) => {
      if (!isDesktopVisible() || event.ctrlKey || Math.abs(event.deltaX) > Math.abs(event.deltaY)) return;
      if (!isLocked() && shouldUseNativeScrolling(event.target)) return;
      if (event.deltaY === 0) return;
      // Keep suppressing native page movement while a transition is running.
      event.preventDefault();

      const now = performance.now();
      if (now - lastWheelAt > WHEEL_IDLE_MS) {
        wheelDistance = 0;
        wheelConsumed = false;
      }
      lastWheelAt = now;
      if (isLocked()) {
        wheelConsumed = true;
        return;
      }
      if (wheelConsumed) return;

      // Mouse wheels may report lines/pages; trackpads usually report pixels.
      const unit = event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? root.clientHeight : 1;
      const delta = event.deltaY * unit;
      if (Math.sign(delta) !== Math.sign(wheelDistance)) wheelDistance = 0;
      wheelDistance += delta;
      if (Math.abs(wheelDistance) < WHEEL_INTENT_DISTANCE) return;
      wheelConsumed = true;
      navigateOrStep(wheelDistance > 0 ? 1 : -1);
    };

    let touchStart: { x: number; y: number } | null = null;
    const handleTouchStart = (event: TouchEvent) => {
      touchStart = null;
      if (!isDesktopVisible() || isLocked() || shouldUseNativeScrolling(event.target)) return;
      const touch = event.touches[0];
      if (touch && event.touches.length === 1) touchStart = { x: touch.clientX, y: touch.clientY };
    };
    const handleTouchMove = (event: TouchEvent) => {
      if (!isDesktopVisible() || event.touches.length !== 1) return;
      if (isLocked() || !shouldUseNativeScrolling(event.target)) event.preventDefault();
    };
    const clearTouch = () => { touchStart = null; };
    const handleTouchEnd = (event: TouchEvent) => {
      const start = touchStart;
      touchStart = null;
      if (!start || !isDesktopVisible() || isLocked() || shouldUseNativeScrolling(event.target)) return;
      const touch = event.changedTouches[0];
      if (!touch) return;
      const deltaY = start.y - touch.clientY;
      const deltaX = start.x - touch.clientX;
      if (Math.abs(deltaY) <= Math.abs(deltaX) * 1.25 || Math.abs(deltaY) < TOUCH_INTENT_DISTANCE) return;
      navigateOrStep(deltaY > 0 ? 1 : -1);
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isDesktopVisible() || event.defaultPrevented || event.ctrlKey || event.metaKey || event.altKey) return;
      if (shouldUseNativeScrolling(event.target)) return;
      if (!["ArrowDown", "PageDown", "ArrowUp", "PageUp", "Home", "End"].includes(event.key)) return;
      event.preventDefault();
      if (isLocked() || event.repeat) return;
      if (event.key === "Home") latest.current.onNavigateTo(0);
      else if (event.key === "End") latest.current.onNavigateTo(latest.current.sceneCount - 1);
      else navigateOrStep(event.key === "ArrowDown" || event.key === "PageDown" ? 1 : -1);
    };

    root.addEventListener("wheel", handleWheel, { passive: false });
    root.addEventListener("touchstart", handleTouchStart, { passive: true });
    root.addEventListener("touchmove", handleTouchMove, { passive: false });
    root.addEventListener("touchend", handleTouchEnd, { passive: true });
    root.addEventListener("touchcancel", clearTouch, { passive: true });
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      root.removeEventListener("wheel", handleWheel);
      root.removeEventListener("touchstart", handleTouchStart);
      root.removeEventListener("touchmove", handleTouchMove);
      root.removeEventListener("touchend", handleTouchEnd);
      root.removeEventListener("touchcancel", clearTouch);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [rootRef]);
};
