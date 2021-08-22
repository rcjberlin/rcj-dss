<template>
  <div class="custom-switch">
    <custom-label :text="label" :forId="id" style="cursor: pointer" :bold="false" />
    <div>
      <label class="switch">
        <input type="checkbox" :id="id" v-model="value" />
        <span class="slider round"></span>
      </label>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import CustomLabel from "./CustomLabel.vue";

import { v4 as uuidv4 } from "uuid";

export default defineComponent({
  name: "CustomSwitch",
  props: {
    label: String,
  },
  components: {
    CustomLabel,
  },
  emits: ["switch-input"],
  data() {
    return {
      value: false,
      id: uuidv4(),
    };
  },
  watch: {
    value() {
      this.$emit("switch-input", this.value);
    },
  },
});
</script>

<style scoped>
.custom-switch {
  margin: 8px 0;

  display: flex;
}

/* https://www.w3schools.com/howto/howto_css_switch.asp */
/* The switch - the box around the slider */
.switch {
  --switch-height: 1.25em;

  position: relative;
  display: inline-block;
  width: calc(60 / 34 * var(--switch-height));
  height: var(--switch-height);
}

/* Hide default HTML checkbox */
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

/* The slider */
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: calc(26 / 34 * var(--switch-height));
  width: calc(26 / 34 * var(--switch-height));
  left: calc(4 / 34 * var(--switch-height));
  bottom: calc(4 / 34 * var(--switch-height));
  background-color: white;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

input:checked + .slider {
  background-color: var(--theme-color);
}

input:focus + .slider {
  box-shadow: 0 0 1px var(--theme-color);
}

input:checked + .slider:before {
  -webkit-transform: translateX(calc(26 / 34 * var(--switch-height)));
  -ms-transform: translateX(calc(26 / 34 * var(--switch-height)));
  transform: translateX(calc(26 / 34 * var(--switch-height)));
}

/* Rounded sliders */
.slider.round {
  border-radius: var(--switch-height);
}

.slider.round:before {
  border-radius: 50%;
}
</style>
