<template>
  <router-view />
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Run",
  methods: {
    redirectToChildRouteIfNoneSet() {
      if (this.$route.path === "/run") {
        this.$router.replace("/run/team");
      }
    },
  },
  mounted() {
    this.redirectToChildRouteIfNoneSet();
  },
  updated() {
    this.redirectToChildRouteIfNoneSet();
  },
});
</script>
