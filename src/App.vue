<template>
  <div class="app-main noselect">
    <Loader />
    <ColorTheme />
    <NavigationBar :config="navigationBarConfig" />
    <router-view class="app-content" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { RouteLocationNormalizedLoaded, RouteRecordRaw } from "vue-router";
import NavigationBar from "@/components/layout/NavigationBar.vue";
import Loader from "@/components/layout/Loader.vue";
import ColorTheme from "@/components/layout/ColorTheme.vue";
import { routes } from "./router";
import { IComponentsNavigationBarConfig } from "./types";

const METHOD_NAME_COMPONENTS_NAV_BAR_CONFIG = "getNavigationBarConfig";

export default defineComponent({
  name: "App",
  components: {
    NavigationBar,
    Loader,
    ColorTheme,
  },
  data() {
    return {
      navigationBarConfig: {} as IComponentsNavigationBarConfig,
    };
  },
  mounted() {
    this.updateNavigationBarOnRouteChange();
  },
  methods: {
    updateNavigationBarOnRouteChange() {
      this.$watch(
        () => this.$route,
        (to: RouteLocationNormalizedLoaded) => {
          function findRoute(path: string, routes: Array<RouteRecordRaw>, basePath = ""): RouteRecordRaw | void {
            for (const route of routes) {
              if (basePath + route.path === path) return route;
              if (path.startsWith(basePath + route.path) && route.children) {
                // DFS: search for matching route in children
                const match = findRoute(path, route.children, `${basePath}${route.path}/`);
                if (match) return match;
              }
            }
          }
          const currentRoute = findRoute(to.path, routes);
          if (currentRoute) {
            const { component } = currentRoute;
            if (component && component.prototype && typeof component.prototype[METHOD_NAME_COMPONENTS_NAV_BAR_CONFIG] === "function") {
              const config = component.prototype[METHOD_NAME_COMPONENTS_NAV_BAR_CONFIG]() as IComponentsNavigationBarConfig;
              this.navigationBarConfig = config;
              return;
            }
          }
          this.navigationBarConfig = {};
        }
      );
    },
  },
});
</script>

<style>
@import "./assets/styles/custom-style.css";

* {
  font-family: "Roboto", sans-serif;
}

body {
  background-color: var(--background-color);
  color: var(--text-color);
  font-size: 16px;
  margin: 0;
  height: 100vh;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  height: 100%;
}

.app-main {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.app-content {
  flex-grow: 1;
  padding: 8px;
  margin-top: 3.2em; /* requried due to position:fixed navbar */
}

.noselect {
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none; /* Non-prefixed version, currently
                        supported by Chrome and Opera */
}
</style>
