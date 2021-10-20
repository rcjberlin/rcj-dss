<template>
  <span>{{ timeStr }}</span>
</template>

<script lang="ts">
import { eventBus } from "@/event";
import { defineComponent } from "vue";

const DEFAULT_TIME_UPDATE_INTERVAL_IN_MS = 50;

export default defineComponent({
  name: "RunTime",
  props: {
    showRemainingTime: {
      default: false,
    },
  },
  data() {
    return {
      timeStr: "-:--",
      autoUpdatingIntervalId: null as number | null,
    };
  },
  mounted() {
    if (this.$store.getters.isTimeRunning) this.startAutoUpdatingTime();
    eventBus.on("started-time", this.startAutoUpdatingTime);
    eventBus.on("paused-time", this.stopAutoUpdatingTime);
    eventBus.on("updated-time", this.updateTime);
    this.updateTime();
  },
  methods: {
    startAutoUpdatingTime(): void {
      if (this.autoUpdatingIntervalId !== null) return;
      this.autoUpdatingIntervalId = setInterval(this.updateTime, DEFAULT_TIME_UPDATE_INTERVAL_IN_MS);
    },
    stopAutoUpdatingTime(): void {
      if (this.autoUpdatingIntervalId === null) return;
      clearInterval(this.autoUpdatingIntervalId);
      this.autoUpdatingIntervalId = null;
      this.updateTime();
    },
    updateTime(): void {
      this.timeStr = this.showRemainingTime ? this.$store.getters.remainingRunTimeAsString : this.$store.getters.runTimeAsString;
    },
  },
});
</script>
