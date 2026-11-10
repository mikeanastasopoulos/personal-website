"use client";

import {
  type ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import gsap from "gsap";
import {
  SCENE_ROUTES,
  buildScenePath,
  getSceneIndex,
  type SceneRoute,
} from "@/features/EditorialExperience/routeOrder";
import { useSceneGestures } from "@/features/EditorialExperience/hooks/useSceneGestures";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { createSceneSnapshot } from "../createSceneSnapshot";
import styles from "./EditorialExperience.module.css";

// This component only ever renders above the 860px breakpoint - CSS hides it
// entirely below that (see EditorialExperience.module.css), and MobileExperience
// takes over. So there is no mobile branch to handle here.
const SCENE_SELECTOR = "[data-editorial-scene]";
const NAVIGATION_SELECTOR = "[data-scene-target]";
const PRIMARY_LAYER_SELECTOR = '[data-motion-layer="primary"]';
const SECONDARY_LAYER_SELECTOR = '[data-motion-layer="secondary"]';
const MEDIA_LAYER_SELECTOR = '[data-motion-layer="media"]';
const TRANSITION_DURATION = 0.9;

type Direction = 1 | -1;

type EditorialNavigationLink = {
  href: string;
  target: string;
  label: string;
};

type EditorialExperienceProps = {
  navigationLinks?: EditorialNavigationLink[];
  locale: string;
  children: ReactNode;
};

type Slot = { index: number; node: ReactNode };

const gsapTarget = (nodeList: NodeListOf<Element>) =>
  nodeList.length > 0 ? nodeList : null;

const getMotionLayers = (scene: HTMLElement) => {
  return scene.querySelectorAll(
    `${PRIMARY_LAYER_SELECTOR}, ${SECONDARY_LAYER_SELECTOR}, ${MEDIA_LAYER_SELECTOR}`,
  );
};

const resetScene = (scene: HTMLElement) => {
  gsap.set(scene, {
    clearProps: "transform,opacity,visibility,zIndex,pointerEvents",
  });
  gsap.set(getMotionLayers(scene), {
    clearProps: "transform,opacity,visibility",
  });
};

const EditorialExperience = ({
  navigationLinks = [],
  locale,
  children,
}: EditorialExperienceProps) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const currentSlotRef = useRef<HTMLDivElement>(null);
  const previousSlotRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();

  const sceneCount = SCENE_ROUTES.length;
  const initialIndex = getSceneIndex(pathname, locale);

  const [current, setCurrent] = useState<Slot>(() => ({
    index: initialIndex,
    node: children,
  }));
  // Whether a crossfade is in flight. The outgoing page itself is not held as
  // React state/children (see pendingSnapshotRef below for why) - it's a
  // plain DOM clone imperatively attached to previousSlotRef.
  const [outgoingActive, setOutgoingActive] = useState(false);

  const currentRef = useRef(current);
  const directionRef = useRef<Direction>(1);
  const isNavigatingRef = useRef(false);
  // Captured right before router.push, in beginTransition. `children` in the
  // App Router is not a frozen snapshot of a page - it's a live view into the
  // router's current segment, so holding a reference to the "old" children
  // and rendering it again just re-renders it as whatever page is *now*
  // active (both slots end up showing the destination page). Cloning the
  // actual DOM node instead gives us an inert, frozen copy that is immune to
  // the router's state.
  const pendingSnapshotRef = useRef<{ index: number; element: HTMLElement } | null>(null);

  // eslint-disable-next-line no-restricted-syntax -- mirrors state onto a ref so gesture/navigation callbacks can read the latest value without retriggering
  useIsomorphicLayoutEffect(() => {
    currentRef.current = current;
  }, [current]);

  // Keep --app-height accurate for the desktop fixed-viewport stage.
  // eslint-disable-next-line no-restricted-syntax -- subscribes to window resize (browser API)
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const setAppHeight = () => root.style.setProperty("--app-height", `${window.innerHeight}px`);
    setAppHeight();
    window.addEventListener("resize", setAppHeight);
    return () => window.removeEventListener("resize", setAppHeight);
  }, []);

  // React to a route change landing (pathname + children both now reflect the
  // destination). If beginTransition left a DOM snapshot of the page we're
  // leaving, attach it to the previous slot so the crossfade effect below can
  // animate it out alongside the new current content fading in.
  // eslint-disable-next-line no-restricted-syntax -- syncs local slot state to the router's pathname (third-party sync)
  useIsomorphicLayoutEffect(() => {
    const nextIndex = getSceneIndex(pathname, locale);

    const pending = pendingSnapshotRef.current;
    pendingSnapshotRef.current = null;

    if (nextIndex === currentRef.current.index || !pending) {
      if (nextIndex !== currentRef.current.index) {
        previousSlotRef.current?.replaceChildren();
        setOutgoingActive(false);
        isNavigatingRef.current = false;
      } else if (!previousSlotRef.current?.hasChildNodes()) {
        isNavigatingRef.current = false;
      }
      setCurrent({ index: nextIndex, node: children });
      return;
    }

    previousSlotRef.current?.replaceChildren(pending.element);
    setOutgoingActive(true);
    setCurrent({ index: nextIndex, node: children });
  }, [pathname, locale, children]);

  // Run the crossfade whenever a previous scene is being held for transition.
  // A layout effect so GSAP sets the "before" transform/opacity synchronously,
  // before the browser paints the plain (already-visible) DOM it just committed.
  // eslint-disable-next-line no-restricted-syntax -- drives a third-party (GSAP) animation off DOM nodes, not derivable state
  useIsomorphicLayoutEffect(() => {
    if (!outgoingActive) return;

    const previousScene = previousSlotRef.current?.querySelector<HTMLElement>(SCENE_SELECTOR);
    const nextScene = currentSlotRef.current?.querySelector<HTMLElement>(SCENE_SELECTOR);

    const clearOutgoing = () => {
      previousSlotRef.current?.replaceChildren();
      isNavigatingRef.current = false;
      setOutgoingActive(false);
    };

    if (!previousScene || !nextScene) {
      clearOutgoing();
      return;
    }

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      clearOutgoing();
      return;
    }

    const direction = directionRef.current;

    const currentPrimary = gsapTarget(previousScene.querySelectorAll(PRIMARY_LAYER_SELECTOR));
    const currentSecondary = gsapTarget(previousScene.querySelectorAll(SECONDARY_LAYER_SELECTOR));
    const currentMedia = gsapTarget(previousScene.querySelectorAll(MEDIA_LAYER_SELECTOR));
    const nextPrimary = gsapTarget(nextScene.querySelectorAll(PRIMARY_LAYER_SELECTOR));
    const nextSecondary = gsapTarget(nextScene.querySelectorAll(SECONDARY_LAYER_SELECTOR));
    const nextMedia = gsapTarget(nextScene.querySelectorAll(MEDIA_LAYER_SELECTOR));

    gsap.set(previousScene, { autoAlpha: 1, zIndex: 2, xPercent: 0, z: 0, rotateY: 0, scale: 1 });
    gsap.set(nextScene, {
      autoAlpha: 1,
      xPercent: direction * 2.5,
      z: -60,
      rotateY: direction * 2.4,
      scale: 0.992,
      zIndex: 1,
    });
    if (nextPrimary) gsap.set(nextPrimary, { x: direction * 26, y: 10, autoAlpha: 0 });
    if (nextSecondary) gsap.set(nextSecondary, { x: direction * 16, y: 7, autoAlpha: 0 });
    if (nextMedia) gsap.set(nextMedia, { x: direction * 10, scale: 1.01, autoAlpha: 0.62 });

    const timeline = gsap.timeline({
      defaults: { ease: "power3.inOut" },
      onComplete: () => {
        resetScene(nextScene);
        clearOutgoing();
      },
    });

    if (currentPrimary) {
      timeline.to(currentPrimary, { x: direction * -28, y: -14, autoAlpha: 0, duration: 0.54 }, 0);
    }
    if (currentSecondary) {
      timeline.to(currentSecondary, { x: direction * -16, y: -8, autoAlpha: 0, duration: 0.5 }, 0.05);
    }
    if (currentMedia) {
      timeline.to(currentMedia, { x: direction * -8, scale: 1.015, autoAlpha: 0.38, duration: 0.64 }, 0.02);
    }
    timeline.to(
      previousScene,
      {
        xPercent: direction * -3,
        z: -90,
        rotateY: direction * -2.8,
        scale: 0.985,
        autoAlpha: 0,
        duration: 0.74,
      },
      0,
    );
    timeline.to(
      nextScene,
      { xPercent: 0, z: 0, rotateY: 0, scale: 1, autoAlpha: 1, duration: TRANSITION_DURATION },
      0.1,
    );
    if (nextMedia) {
      timeline.to(nextMedia, { x: 0, scale: 1, autoAlpha: 1, duration: 0.68 }, 0.18);
    }
    if (nextPrimary) {
      timeline.to(nextPrimary, { x: 0, y: 0, autoAlpha: 1, duration: 0.58, stagger: 0.04 }, 0.24);
    }
    if (nextSecondary) {
      timeline.to(nextSecondary, { x: 0, y: 0, autoAlpha: 1, duration: 0.52, stagger: 0.03 }, 0.31);
    }

    return () => {
      timeline.kill();
      resetScene(nextScene);
    };
  }, [outgoingActive]);

  // A fresh page (no crossfade in flight - the initial load, or a same-index
  // content refresh) simply settles at rest with no entrance animation.
  // Content is already visible via SSR/CSS, so there's nothing to reveal -
  // and animating "from hidden" here previously caused a flash: React Strict
  // Mode double-invokes this effect on mount in dev, which defeated a
  // first-load guard and made the hero briefly flash to invisible before
  // animating back in.
  // eslint-disable-next-line no-restricted-syntax -- drives GSAP prop resets off DOM nodes, not derivable state
  useIsomorphicLayoutEffect(() => {
    if (outgoingActive) return;

    const scene = currentSlotRef.current?.querySelector<HTMLElement>(SCENE_SELECTOR);
    if (!scene) return;

    gsap.set(scene, { autoAlpha: 1, zIndex: 2, xPercent: 0, z: 0, rotateY: 0, scale: 1 });
    gsap.set(getMotionLayers(scene), { clearProps: "transform,opacity,visibility" });
  }, [current.index, outgoingActive]);

  // Shared entry point for every way a navigation can start (wheel/touch/key
  // gestures, the side rail, header/mobile nav links). Takes the DOM snapshot
  // of the page we're leaving *before* the route changes, while it's still
  // the real, currently-rendered scene.
  const beginTransition = useCallback(
    (targetIndex: number, targetRoute: SceneRoute) => {
      if (isNavigatingRef.current) return;
      isNavigatingRef.current = true;

      const scene = currentSlotRef.current?.querySelector<HTMLElement>(SCENE_SELECTOR);
      if (scene) {
        directionRef.current = targetIndex > currentRef.current.index ? 1 : -1;
        pendingSnapshotRef.current = {
          index: currentRef.current.index,
          element: createSceneSnapshot(scene),
        };
      }

      router.push(buildScenePath(locale, targetRoute));
    },
    [locale, router],
  );

  const navigate = useCallback(
    (direction: Direction) => {
      const targetIndex = getSceneIndex(pathname, locale) + direction;
      const targetRoute = SCENE_ROUTES[targetIndex];
      if (targetRoute === undefined) return;
      beginTransition(targetIndex, targetRoute);
    },
    [pathname, locale, beginTransition],
  );

  const navigateTo = useCallback(
    (targetIndex: number) => {
      const boundedTargetIndex = Math.min(
        Math.max(targetIndex, 0),
        SCENE_ROUTES.length - 1,
      );
      const currentIndex = getSceneIndex(pathname, locale);
      const targetRoute = SCENE_ROUTES[boundedTargetIndex];
      if (targetRoute === undefined || boundedTargetIndex === currentIndex) return;
      beginTransition(boundedTargetIndex, targetRoute);
    },
    [pathname, locale, beginTransition],
  );

  // eslint-disable-next-line no-restricted-syntax -- intercepts semantic scene links to keep route navigation locked to one transition
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const handleNavigationClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      const target = event.target;
      if (!(target instanceof Element)) return;

      const link = target.closest<HTMLAnchorElement>(NAVIGATION_SELECTOR);
      if (!link) return;

      const targetIndex = getSceneIndex(link.pathname, locale);
      const currentIndex = getSceneIndex(pathname, locale);
      const targetRoute = SCENE_ROUTES[targetIndex];
      if (targetRoute === undefined || targetIndex === currentIndex) return;

      event.preventDefault();
      if (isNavigatingRef.current || outgoingActive) return;

      beginTransition(targetIndex, targetRoute);
    };

    root.addEventListener("click", handleNavigationClick);

    return () => {
      root.removeEventListener("click", handleNavigationClick);
    };
  }, [locale, outgoingActive, pathname, beginTransition]);

  useSceneGestures({
    rootRef,
    onNavigate: navigate,
    onNavigateTo: navigateTo,
    sceneCount,
    navigationLockedRef: isNavigatingRef,
  });

  const activeIndex = current.index;
  const spinePositionClass = styles[`spineScene${activeIndex}of${sceneCount}`] ?? "";
  const spineClassName = [styles.editorialSpine, spinePositionClass]
    .filter(Boolean)
    .join(" ");

  return (
    <div ref={rootRef} className={styles.experience}>
      <main className={styles.sceneStage} aria-busy={outgoingActive}>
        {/* Always mounted so beginTransition/route-change can imperatively attach
            a DOM snapshot of the outgoing page before the crossfade effect runs. */}
        <div ref={previousSlotRef} className={styles.sceneSlot} />


        <div key={current.index} ref={currentSlotRef} className={styles.sceneSlot}>
          {current.node}
        </div>
      </main>

      <div className={spineClassName} aria-hidden="true">
        <span className={styles.spineLine} />
        <span className={styles.spineMarker} />
      </div>

      {navigationLinks.length > 0 ? (
        <nav className={styles.sideNavigation} aria-label="Section navigation">
          {navigationLinks.map((link, index) => {
            const isActive = activeIndex === index;
            const positionClass =
              styles[`sideNavigationLink${index}of${sceneCount}`] ?? "";

            return (
              <Link
                key={link.target}
                href={link.href}
                data-scene-target={link.target}
                className={`${styles.sideNavigationLink} ${positionClass} ${
                  isActive ? styles.sideNavigationLinkActive : ""
                }`}
                aria-current={isActive ? "true" : undefined}
              >
                <span className={styles.sideNavigationLabel}>
                  {link.label.split(/(?<=&)\s+/).map((line) => (
                    <span key={line} className={styles.tooltipLine}>{line}</span>
                  ))}
                </span>
              </Link>
            );
          })}
        </nav>
      ) : null}
    </div>
  );
};

export default EditorialExperience;
