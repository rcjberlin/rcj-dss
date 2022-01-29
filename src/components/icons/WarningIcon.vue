<template>
  <svg viewBox="0 0 100 100" class="inline-svg-icon pointer-cursor">
    <polygon points="5,85 50,15 95,85 5,85" fill="#dd5" stroke="#dd5" stroke-width="10" stroke-linecap="round" stroke-linejoin="round" />
    <polyline points="47,32 50,61 52,32 47,32" stroke="#000" fill="#000" stroke-width="10" stroke-linecap="round" stroke-linejoin="round" />
    <circle cx="50" cy="77" r="6" fill="#000" />
  </svg>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "CheckmarkIcon",
});
</script>

<style scoped>
svg.shadow {
  filter: drop-shadow(3px 5px 2px rgba(0, 0, 0, 0.42));
}
svg.shadow > polyline,
svg.shadow > circle {
  filter: drop-shadow(1px 1px 2px rgba(0, 0, 0, 0.42));
}
</style>
