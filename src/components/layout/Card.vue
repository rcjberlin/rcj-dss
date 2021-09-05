<template>
  <div class="card">
    <h2>{{ title }}</h2>
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Card",
  props: {
    title: String,
  },
});
</script>

<style scoped>
.card {
  border-radius: 8px;
  background: var(--background-color2);
  box-shadow: 0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12);
  padding: 8px;
  margin: 24px 4px;
}
.card h2 {
  margin: 0;
  margin-top: 8px;
}
</style>
