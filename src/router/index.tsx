import { lazy } from "react";
import { type RouteObject } from "react-router-dom";

const map = {
  Dashboard: lazy(() => import("@/routes/dashboard")),
  TopMenu: lazy(() => import("@/routes/top-menu")),
};
const routes: RouteObject[] = [
  {
    path: "/dashboard",
    element: <map.Dashboard />,
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
