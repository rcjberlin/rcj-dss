<template>
  <div>
    <div>Run Team</div>
    Referee Competition Arena Round
    <br />
    <form @submit.prevent>
      Team
      <select>
        <option>RL1</option>
        <option>RL2</option>
        <option>RL3</option>
        <option>RL4</option>
        <option>RL5</option>
      </select>

      Evacuation Point
      <label><input type="radio" name="evacuation-point" id="evacuation-point-low" /> low</label>&emsp;
      <label><input type="radio" name="evacuation-point" id="evacuation-point-high" /> high</label>
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
