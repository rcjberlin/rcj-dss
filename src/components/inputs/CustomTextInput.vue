<template>
  <div class="input-section">
    <custom-label v-if="label" :text="label" :forId="id" />
    <input ref="input" :type="type" :id="id" :placeholder="placeholder" v-model="value" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import CustomLabel from "./CustomLabel.vue";

import { v4 as uuidv4 } from "uuid";

export default defineComponent({
  name: "CustomTextInput",
  props: {
    label: String,
    placeholder: String,
    type: {
      type: String,
      default: "text",
    },
    initialValue: String,
    onchange: {
      type: Function,
      default: () => {
        return;
      },
    },
    focusInput: Boolean,
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
  watch: {
    // TODO: better use v-model?
    value() {
      this.onchange(this.value);
    },
    initialValue() {
      this.value = this.initialValue || "";
    },
    focusInput(newValue) {
      if (newValue) (this.$refs.input as HTMLInputElement).focus();
    },
  },
});
</script>
