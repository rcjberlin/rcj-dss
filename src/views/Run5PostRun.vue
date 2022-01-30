<template>
  <div>
    victims, rescue kit, exit bonus (if not yet handled in previous screen) evacuation point?
    <router-link to="/run/review">Review</router-link>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { IComponentsNavigationBarConfig } from "../types";

export default defineComponent({
  name: "Run5PostRun",
  methods: {
    getNavigationBarConfig(): IComponentsNavigationBarConfig {
      return {
        disableDrawerSwipeGestures: true,
        backButtonInsteadOfDrawer: true,
        backButtonRoute: "/run/run",
      };
    },
  },
});
</script>
