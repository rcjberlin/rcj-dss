<template>
  <div>
    <h1>Settings</h1>
    <h2>App</h2>
    <custom-switch label="Drawer on the right (default: left)" @switch-input="onInputDrawerPosition" />
    <h2>Run Submission</h2>
    <custom-text-input label="Event" />
    <custom-text-input label="Submit Host" />
    <custom-text-input label="Submit Path" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import CustomTextInput from "../components/inputs/CustomTextInput.vue";
import CustomSwitch from "../components/inputs/CustomSwitch.vue";
import { eventBus } from "../event";

export default defineComponent({
  name: "Settings",
  components: {
    CustomTextInput,
    CustomSwitch,
  },
  methods: {
    onInputDrawerPosition(rightSide: Boolean) {
      // TODO: use vuex
      eventBus.emit("settings-drawer-right", rightSide);
    },
  },
});
</script>
