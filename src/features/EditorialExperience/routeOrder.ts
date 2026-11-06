export const SCENE_ROUTES = [
  "",
  "about",
  "practice",
  "academic",
  "european",
  "contact",
] as const;

export type SceneRoute = (typeof SCENE_ROUTES)[number];

export const buildScenePath = (locale: string, route: SceneRoute): string => {
  return route ? `/${locale}/${route}` : `/${locale}`;
};

export const getSceneIndex = (pathname: string, locale: string): number => {
  const prefix = `/${locale}`;
  const rest = pathname.startsWith(prefix) ? pathname.slice(prefix.length) : pathname;
  const segment = rest.replace(/^\/+/, "").replace(/\/+$/, "");
  const index = SCENE_ROUTES.indexOf(segment as SceneRoute);
  return index >= 0 ? index : 0;
};
