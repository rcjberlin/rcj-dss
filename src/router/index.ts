import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Run from "../views/Run.vue";
import Settings from "../views/Settings.vue";
import RunHistory from "../views/RunHistory.vue";

export const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/run",
    name: "New Run",
    component: Run,
  },
  {
    path: "/settings",
    name: "Settings",
    component: Settings,
  },
  {
    path: "/runhistory",
    name: "Run History",
    component: RunHistory,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
