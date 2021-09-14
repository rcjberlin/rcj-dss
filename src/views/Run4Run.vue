<template>
  <div class="fullscreen-app-content">
    run inputs like in previous version
    <br />

    <router-link to="/run/prerun">prev</router-link>&ensp;
    <router-link to="/run/postrun">next</router-link>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { IComponentsNavigationBarConfig } from "../types";

export default defineComponent({
  name: "Run4Run",
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
