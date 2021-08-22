<template>
  <div>
    <div>Run Pre-run</div>
    Team Evacuation Point (Referee Competition Arena Round)
    <br />
    <form @submit.prevent>
      <label><input type="checkbox" /> Team showed up</label>
      <br />

      Time 1:23
      <img src="../assets/icons/pause.svg" />
      <button>Set Time</button>
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
