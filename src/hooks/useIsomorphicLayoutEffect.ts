import { useEffect, useLayoutEffect } from "react";

// Layout effects run after the DOM is updated but before the browser paints,
// so GSAP can set the "before" transform/opacity state without a flash of
// the plain final state first. On the server this is a no-op useEffect.
export const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;
