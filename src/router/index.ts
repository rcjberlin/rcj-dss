import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Run from "../views/Run.vue";
import Run1Setup from "../views/Run1Setup.vue";
import Run2Team from "../views/Run2Team.vue";
import Run3PreRun from "../views/Run3PreRun.vue";
import Run4Run from "../views/Run4Run.vue";
import Run5PostRun from "../views/Run5PostRun.vue";
import Run6Review from "../views/Run6Review.vue";
import Run7SubmitResult from "../views/Run7SubmitResult.vue";
import Settings from "../views/Settings.vue";
import RunHistory from "../views/RunHistory.vue";
import { beforeEachHandler } from "./navigationGuard";

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
      {
        path: "prerun",
        name: "Run - Pre-run",
        component: Run3PreRun,
      },
      {
        path: "run",
        name: "Run",
        component: Run4Run,
      },
      {
        path: "postrun",
        name: "Run - Post-run",
        component: Run5PostRun,
      },
      {
        path: "review",
        name: "Run - Review",
        component: Run6Review,
      },
      {
        path: "submitresult",
        name: "Run - Submit Result",
        component: Run7SubmitResult,
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

router.beforeEach((to, from, next) => {
  beforeEachHandler(to, from, next);
});

export default router;
