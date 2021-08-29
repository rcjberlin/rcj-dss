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
      const runSubmit: any = {
        only_testing: true,
        referee: { name: this.$store.state.settings.username, auth: this.$store.state.settings.password },
        competition: this.$store.state.settings.submitEvent + "-line",
        teamname: "team 0",
        round: 1,
        arena: "A",
        time_duration: 420,
        time_start: 13,
        time_end: 37,
        scoring: {},
        comments: "",
        complaints: "",
        confirmed: true,
        random: "a".repeat(Math.random() * 2000 + 200),
      };
      const len = JSON.stringify(runSubmit).length;
      eventBus.emit("loader-start", `${this.tc("submittingRun")} (~ ${len} B)`);
      const loaderT0 = new Date().getTime();
      function stopLoader() {
        const timeToWait = Math.max(0, 666 - (new Date().getTime() - loaderT0));
        setTimeout(() => {
          eventBus.emit("loader-finish");
        }, timeToWait);
      }
      fetch(`${this.$store.state.settings.submitHost}${this.$store.state.settings.submitPath}`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Basic " + btoa(runSubmit.referee.name + ":" + runSubmit.referee.auth),
        },
        body: JSON.stringify(runSubmit),
      })
        .then(async (response) => {
          let text = await response.text();
          if (response.status === 200 || response.status === 201) {
            console.log("successful", text);
            stopLoader();
            this.$router.push("/run/submitresult");
          } else {
            throw text;
          }
        })
        .catch((error) => {
          console.log({ msg: "failed", response: error.toString() });
          stopLoader();
          this.$router.push("/run/submitresult");
        });
      /*eventBus.emit("loader-start", `${this.tc("submittingRun")} (~ 1.2 KB)`);
      setTimeout(() => {
        this.$router.push("/run/submitresult");
        eventBus.emit("loader-finish");
      }, 2500);*/
    },
  },
});
</script>
