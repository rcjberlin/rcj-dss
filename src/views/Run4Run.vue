<template>
  <div class="fullscreen-app-content">
    run inputs like in previous version
    <br />
    <div>
      <run-time />, remaining:
      <run-time :showRemainingTime="true" />
    </div>
    <div>
      <time-toggle-button />
    </div>

    <router-link to="/run/prerun">prev</router-link>&ensp;
    <router-link to="/run/postrun">next</router-link>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { IComponentsNavigationBarConfig } from "../types";
import RunTime from "../components/time/RunTime.vue";
import TimeToggleButton from "../components/time/TimeToggleButton.vue";

export default defineComponent({
  name: "Run4Run",
  components: { RunTime, TimeToggleButton },
  methods: {
    getNavigationBarConfig(): IComponentsNavigationBarConfig {
      return {
        hideNavigationBar: true,
        disableDrawerSwipeGestures: true,
      };
    },
  },
});
</script>

<style scoped>
.fullscreen-app-content {
  margin-top: 0;
}
</style>
