<template>
  <label v-bind:for="forId" :class="{ bold: bold !== false }">
    {{ text }}
  </label>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

export default defineComponent({
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
