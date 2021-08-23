<template>
  <div>
    <div>{{ tc("runPreRun") }}</div>
    Team Evacuation Point (Referee Competition Arena Round)
    <br />
    <form @submit.prevent>
      <label><input type="checkbox" /> {{ tc("teamShowedUp") }}</label>
      <br />

      Time 1:23
      <img src="../assets/icons/pause.svg" />
      <button>{{ tg("buttonSetTime") }}</button>
    </form>
    <router-link to="/run/run">Next</router-link>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { IComponentsNavigationBarConfig } from "../types";

export default defineComponent({
  name: "Run3PreRun",
  methods: {
    tc(key: string): string {
      return this.$t("run.preRun." + key);
    },
    tg(key: string): string {
      return this.$t("general." + key);
    },
    getNavigationBarConfig(): IComponentsNavigationBarConfig {
      return {
        disableDrawerSwipeGestures: true,
        backButtonInsteadOfDrawer: true,
        backButtonRoute: "/run/team",
      };
    },
  },
});
</script>
