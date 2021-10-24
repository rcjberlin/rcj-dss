<template>
  <div>
    <div>{{ tc("submitResult") }}</div>
    <p>{{ submitResult.status }} {{ submitResult.error }}</p>

    <router-link to="/run/team">{{ tc("newRun") }}</router-link
    >&ensp;
    <router-link to="/runhistory">{{ tc("runHistory") }}</router-link>
  </div>
</template>

<script lang="ts">
import { IStateRunHistoryEntry } from "@/types";
import { defineComponent } from "vue";
import { RouteLocationNormalizedLoaded } from "vue-router";

export default defineComponent({
  name: "Run7SubmitResult",
  methods: {
    tc(key: string): string {
      return this.$t("run.submitResult." + key);
    },
  },
  computed: {
    submitResult(): { status: IStateRunHistoryEntry["status"]; error: IStateRunHistoryEntry["error"] } {
      if (this.$store.state.runHistory.entries.length === 0) {
        return {
          status: "failed",
          error: "Internal Error: No data found to display here",
        };
      }
      const lastRunSubmission = this.$store.state.runHistory.entries[this.$store.state.runHistory.entries.length - 1];
      return {
        status: lastRunSubmission.status,
        error: lastRunSubmission.error,
      };
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
