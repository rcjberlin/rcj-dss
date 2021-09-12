<template>
  <svg viewBox="0 0 100 100" class="inline-svg-icon">
    <g transform="rotate(45 50 50)">
      <rect x="37.5" y="-5" width="25" height="17.5" fill="var(--text-color2)" />
      <rect x="37.5" y="20" width="25" height="62.5" fill="var(--text-color2)" />
      <polygon points="37.5,90 62.5,90 50,115" fill="var(--text-color2)" />
    </g>
  </svg>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "EditIcon",
});
</script>
