<template>
  <div>
    <div>{{ tc("submitResult") }}</div>

    <router-link to="/run/team">{{ tc("newRun") }}</router-link
    >&ensp;
    <router-link to="/runhistory">{{ tc("runHistory") }}</router-link>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { RouteLocationNormalizedLoaded } from "vue-router";

export default defineComponent({
  name: "Run7SubmitResult",
  methods: {
    tc(key: string): string {
      return this.$t("run.submitResult." + key);
    },
  },
  mounted() {
    this.$watch(
      () => this.$route,
      (to: RouteLocationNormalizedLoaded) => {
        if (to.path === "/run/review") {
          // go-back-button of browser should not be allowed here
          this.$router.go(1);
        }
      }
    );
  },
});
</script>
