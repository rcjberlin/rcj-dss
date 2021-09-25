<template>
  <div>
    <img v-show="$store.getters.isTimeRunning" src="../../assets/icons/pause.svg" :style="style" v-on:click="$store.commit('toggleTime')" />
    <img
      v-show="!$store.getters.isTimeRunning"
      src="../../assets/icons/start.svg"
      :style="style"
      v-on:click="$store.commit('toggleTime')"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "TimeToggleButton",
  props: {
    style: Object,
  },
});
</script>
