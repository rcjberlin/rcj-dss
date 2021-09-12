<template>
  <div class="key-value-container input-section">
    <div class="key-value-item">{{ name }}</div>
    <div class="key-value-item">
      {{ value }}
      <slot name="value"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "KeyValueRow",
  props: {
    name: String,
    value: String,
  },
});
</script>

<style scoped>
.key-value-container {
  display: flex;
}
.key-value-item {
  flex-wrap: wrap;
  flex: 1 1;
  text-align: left;
  max-width: 50%;
  overflow-wrap: break-word;
}
</style>
