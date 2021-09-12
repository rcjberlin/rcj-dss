<template>
  <svg viewBox="0 0 100 100" class="inline-svg-icon">
    <polygon points="0,90 50,10 100,90" fill="#dd5" />
    <polyline points="47,35 50,64 52,35 47,35" stroke="#000" fill="#000" stroke-width="10" stroke-linecap="round" stroke-linejoin="round" />
    <circle cx="50" cy="80" r="6" fill="#000" />
  </svg>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "CheckmarkIcon",
});
</script>
