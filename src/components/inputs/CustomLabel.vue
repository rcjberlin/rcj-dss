<template>
  <label v-bind:for="forId" :class="{ bold: bold !== false }">
    {{ text }}
  </label>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "CustomLabel",
  props: {
    text: String,
    forId: String,
    bold: {
      type: Boolean,
      default: true,
    },
  },
});
</script>

<style scoped>
label.bold {
  font-weight: bold;
}
</style>
