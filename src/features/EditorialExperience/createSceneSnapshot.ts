export const createSceneSnapshot = (scene: HTMLElement): HTMLElement => {
  const snapshot = scene.cloneNode(true) as HTMLElement;
  const sources = [scene, ...scene.querySelectorAll<HTMLElement>("*")];
  const copies = [snapshot, ...snapshot.querySelectorAll<HTMLElement>("*")];

  sources.forEach((source, index) => {
    const animations = source.getAnimations();
    const copy = copies[index];
    if (!copy || animations.length === 0) return;

    const computed = window.getComputedStyle(source);

    // Cloned elements start CSS animations afresh; preserve their rendered frame.
    animations.forEach((animation) => {
      if (!(animation.effect instanceof KeyframeEffect)) return;
      animation.effect.getKeyframes().forEach((frame) => {
        Object.keys(frame).forEach((property) => {
          if (["offset", "computedOffset", "easing", "composite"].includes(property)) return;
          const cssProperty = property.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`);
          copy.style.setProperty(cssProperty, computed.getPropertyValue(cssProperty));
        });
      });
    });

    copy.style.animation = "none";
  });

  return snapshot;
};
