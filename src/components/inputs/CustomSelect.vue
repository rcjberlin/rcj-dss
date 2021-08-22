<template>
  <div class="custom-select">
    <custom-label :text="label" :forId="id" />
    <select :id="id">
      <option v-for="option in opt" :key="option.value" :value="option.value">{{ option.text }}</option>
    </select>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import CustomLabel from "./CustomLabel.vue";

import { v4 as uuidv4 } from "uuid";

export default defineComponent({
  name: "CustomSelect",
  props: {
    label: String,
    options: { type: Object as () => Array<string | { text: String; value: String }> },
  },
  components: {
    CustomLabel,
  },
  data() {
    return {
      id: uuidv4(),
    };
  },
  computed: {
    opt(): Array<{ text: String; value: String }> {
      return this.options ? this.options.map((option) => (typeof option === "string" ? { text: option, value: option } : option)) : [];
    },
  },
});
</script>

<style scoped>
.custom-select {
  margin: 8px 0;
}
</style>
