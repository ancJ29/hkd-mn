import { lazy } from "react";
import { type RouteObject } from "react-router-dom";

const map = {
  Explore: lazy(() => import("@/routes/explore")),
  TopMenu: lazy(() => import("@/routes/top-menu")),
};
const routes: RouteObject[] = [
  {
    path: "/explore",
    element: <map.Explore />,
  },
  {
    path: "/top-menu",
    element: <map.TopMenu />,
  },
  {
    path: "/*",
    element: <map.TopMenu />,
  },
];

export default routes;
