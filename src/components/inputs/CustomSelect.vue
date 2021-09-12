<template>
  <div class="input-section">
    <custom-label :text="label" :forId="id" />
    <select :id="id" v-model="value">
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
    options: { type: Object as () => Array<string | { text: string; value: string }> },
    initialValue: String,
    onchange: {
      type: Function,
      default: () => {
        return;
      },
    },
  },
  components: {
    CustomLabel,
  },
  data() {
    return {
      id: uuidv4(),
      value: this.initialValue || "",
    };
  },
  computed: {
    opt(): Array<{ text: string; value: string }> {
      return this.options ? this.options.map((option) => (typeof option === "string" ? { text: option, value: option } : option)) : [];
    },
  },
  watch: {
    // TODO: better use v-model?
    value() {
      this.onchange(this.value);
    },
    opt() {
      if (!this.opt.find((o) => o.value === this.value)) {
        // selected value is no longer in options
        this.value = "";
      }
    },
    initialValue() {
      this.value = this.initialValue || "";
    },
  },
});
</script>
