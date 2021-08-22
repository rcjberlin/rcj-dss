<template>
  <div>
    <div>Review</div>
    <button @click="submit">Submit</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { IComponentsNavigationBarConfig } from "../types";
import { eventBus } from "../event";

export default defineComponent({
  name: "Run6Review",
  methods: {
    getNavigationBarConfig(): IComponentsNavigationBarConfig {
      return {
        disableDrawerSwipeGestures: true,
        backButtonInsteadOfDrawer: true,
        backButtonRoute: "/run/postrun",
      };
    },
    submit() {
      eventBus.emit("loader-start", "Submitting Run (~ 1.2 KB)");
      setTimeout(() => {
        this.$router.push("/run/submitresult");
        eventBus.emit("loader-finish");
      }, 2500);
    },
  },
});
</script>
