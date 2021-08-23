<template>
  <div>
    <div>{{ tc("review") }}</div>
    <button @click="submit">{{ tc("submit") }}</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { IComponentsNavigationBarConfig } from "../types";
import { eventBus } from "../event";

export default defineComponent({
  name: "Run6Review",
  methods: {
    tc(key: string): string {
      return this.$t("run.review." + key);
    },
    getNavigationBarConfig(): IComponentsNavigationBarConfig {
      return {
        disableDrawerSwipeGestures: true,
        backButtonInsteadOfDrawer: true,
        backButtonRoute: "/run/postrun",
      };
    },
    submit() {
      eventBus.emit("loader-start", `${this.tc("submittingRun")} (~ 1.2 KB)`);
      setTimeout(() => {
        this.$router.push("/run/submitresult");
        eventBus.emit("loader-finish");
      }, 2500);
    },
  },
});
</script>
