<template>
  <div>
    victims, rescue kit, exit bonus (if not yet handled in previous screen)
    <router-link to="/run/review">Review</router-link>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { IComponentsNavigationBarConfig } from "../types";

@Options({
  components: {},
})
export default class Run5PostRun extends Vue {
  getNavigationBarConfig(): IComponentsNavigationBarConfig {
    return {
      disableDrawerSwipeGestures: true,
      backButtonInsteadOfDrawer: true,
      backButtonRoute: "/run/run",
    };
  }
}
</script>
