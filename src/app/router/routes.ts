export const ROUTE_NAMES = {
  HOME: "home",
  CREATE: "create",
  LOGIN: "login",
} as const;

export const ROUTE_PATHS = {
  ROOT: "/",
  HOME: "",
  CREATE: "create",
  LOGIN: "/login",
} as const;

export type RouteName = (typeof ROUTE_NAMES)[keyof typeof ROUTE_NAMES];
