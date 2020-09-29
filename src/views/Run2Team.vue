<template>
  <div>
    <div>Run Team</div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { IComponentsNavigationBarConfig } from "../types";

@Options({
  components: {},
})
export default class Run2Team extends Vue {
  getNavigationBarConfig(): IComponentsNavigationBarConfig {
    return {
      disableDrawerSwipeGestures: true,
      backButtonInsteadOfDrawer: true,
      backButtonRoute: "/run/setup",
    };
  }
}
</script>
