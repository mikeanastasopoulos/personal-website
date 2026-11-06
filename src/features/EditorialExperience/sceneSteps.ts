// Lets a scene consume scroll/keyboard steps for its own internal pages before
// the editorial experience moves on to the neighbouring scene. The scene listens
// for SCENE_STEP_EVENT on its [data-editorial-scene] element and calls
// preventDefault() when it handled the step.

export type SceneStepDirection = 1 | -1;

export type SceneStepDetail = {
  direction: SceneStepDirection;
};

export const EDITORIAL_SCENE_SELECTOR = "[data-editorial-scene]";

export const SCENE_STEP_EVENT = "editorial:scene-step";

export const requestSceneStep = (scene: Element, direction: SceneStepDirection): boolean => {
  const event = new CustomEvent<SceneStepDetail>(SCENE_STEP_EVENT, {
    detail: { direction },
    cancelable: true,
  });

  return !scene.dispatchEvent(event);
};
