<template>
  <div class="custom-text-input">
    <custom-label :text="label" :forId="id" />
    <input type="text" :id="id" />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import CustomLabel from "./CustomLabel.vue";

import { v4 as uuidv4 } from "uuid";

export default defineComponent({
  props: {
    label: String,
  },
  components: {
    CustomLabel,
  },
  data() {
    return {
      id: uuidv4(),
    };
  },
});
</script>

<style scoped>
.custom-text-input {
  margin: 8px 0;
}
</style>
