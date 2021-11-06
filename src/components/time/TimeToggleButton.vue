<template>
  <div>
    <img v-show="$store.getters.isTimeRunning" src="../../assets/icons/pause.svg" :style="style" v-on:click="toggleTime" />
    <img v-show="!$store.getters.isTimeRunning" src="../../assets/icons/start.svg" :style="style" v-on:click="toggleTime" />
  </div>
</template>

<script lang="ts">
import { sendRunStartedEvent } from "@/helpers/submit-run";
import { defineComponent } from "vue";

export default defineComponent({
  name: "TimeToggleButton",
  props: {
    style: Object,
  },
  methods: {
    toggleTime(): void {
      if (!this.$store.getters.isTimeRunning && this.$store.state.currentRun.time.timestampRunStart === null) {
        sendRunStartedEvent({ settings: this.$store.state.settings, run: this.$store.state.currentRun });
      }
      this.$store.commit("toggleTime");
    },
  },
});
</script>
