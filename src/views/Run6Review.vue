<template>
  <div>
    <div>{{ tc("review") }}</div>
    <p>{{ $store.state.currentRun }}</p>
    <button @click="submit">{{ tc("submit") }}</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { IComponentsNavigationBarConfig } from "../types";
import { eventBus } from "../event";
import { submitRun } from "../helpers/submit-run";

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
      const { details, promise } = submitRun(
        {
          settings: this.$store.state.settings,
          run: this.$store.state.currentRun,
          schedule: this.$store.state.schedule,
        },
        this.$store.commit
      );
      eventBus.emit("loader-start", `${this.tc("submittingRun")} (~ ${details.requestLength} B)`);
      const loaderT0 = new Date().getTime();
      function stopLoader() {
        const timeToWait = Math.max(0, 666 - (new Date().getTime() - loaderT0));
        setTimeout(() => {
          eventBus.emit("loader-finish");
        }, timeToWait);
      }
      promise.then(() => {
        stopLoader();
        this.$router.push("/run/submitresult");
      }); // TODO: do we need a catch?
    },
  },
});
</script>
