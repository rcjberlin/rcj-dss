import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Run from "../views/Run.vue";
import Run1Setup from "../views/Run1Setup.vue";
import Run2Team from "../views/Run2Team.vue";
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
    children: [
      {
        path: "setup",
        name: "Run - Setup",
        component: Run1Setup,
      },
      {
        path: "team",
        name: "Run - Team",
        component: Run2Team,
      },
    ],
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
