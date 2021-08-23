<template>
  <div>
    <div>{{ tc("runTeam") }}</div>
    Referee Competition Arena Round
    <br />
    <form @submit.prevent>
      {{ tc("team") }}
      <select>
        <option>RL1</option>
        <option>RL2</option>
        <option>RL3</option>
        <option>RL4</option>
        <option>RL5</option>
      </select>

      {{ tg("evacuationPoint") }}
      <label><input type="radio" name="evacuation-point" id="evacuation-point-low" /> {{ tg("epLow") }}</label
      >&emsp;
      <label><input type="radio" name="evacuation-point" id="evacuation-point-high" /> {{ tg("epHigh") }}</label>
    </form>
    <router-link to="/run/prerun">Next</router-link>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { IComponentsNavigationBarConfig } from "../types";

export default defineComponent({
  name: "Run2Team",
  methods: {
    tc(key: string): string {
      return this.$t("run.team." + key);
    },
    tg(key: string): string {
      return this.$t("general." + key);
    },
    getNavigationBarConfig(): IComponentsNavigationBarConfig {
      return {
        disableDrawerSwipeGestures: true,
        backButtonInsteadOfDrawer: true,
        backButtonRoute: "/run/setup",
      };
    },
  },
});
</script>
