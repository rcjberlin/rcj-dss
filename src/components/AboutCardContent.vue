<template>
  <div>
    <p>&copy; {{ new Date().getFullYear() }} Niko Lockenvitz</p>
    <p><a href="https://github.com/rcjberlin/rcj-dss" target="_blank">github.com/rcjberlin/rcj-dss</a></p>
    <p>Version: {{ versionString }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { appVersion } from "../helpers/read-app-version";

export default defineComponent({
  name: "AboutCardContent",
  data() {
    return {
      versionString: "???",
    };
  },
  mounted() {
    appVersion.then((version) => (this.versionString = version)).catch(() => (this.versionString = "???"));
  },
});
</script>

<style scoped>
div {
  margin: 8px 0;
}
div > p {
  margin: 4px 0;
}
</style>
