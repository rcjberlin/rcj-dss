<template>
  <div>
    <div>Review</div>
    <button @click="submit">Submit</button>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { IComponentsNavigationBarConfig } from "../types";
import { eventBus } from "../event";

@Options({
  components: {},
})
export default class Run6Review extends Vue {
  getNavigationBarConfig(): IComponentsNavigationBarConfig {
    return {
      disableDrawerSwipeGestures: true,
      backButtonInsteadOfDrawer: true,
      backButtonRoute: "/run/postrun",
    };
  }

  submit() {
    eventBus.emit("loader-start", "Submitting Run (~ 1.2 KB)");
    setTimeout(() => {
      this.$router.push("/run/submitresult");
      eventBus.emit("loader-finish");
     }, 2500);
  }
}
</script>
