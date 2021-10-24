<template>
  <div>
    <h1>{{ tc("runHistory") }}</h1>
    <!-- todo: export, resubmit all failed, filter options? -->
    <div v-if="runHistory.length > 0">
      <card>
        <div v-for="run in runHistory" :key="run.runHistoryId">
          <details-box :title="getDetailsBoxTitle(run)">
            <template v-slot:icon
              ><checkmark-icon v-if="run.status === 'successful'" class="status-icon" /> <warning-icon v-else class="status-icon" />
            </template>
            <template v-slot:details>
              <!-- todo: resubmit, edit? -->
              <key-value-row v-for="entry in getKeyValuePairs(run)" :key="entry.key" :name="entry.key" :value="entry.value" />
            </template>
          </details-box>
        </div>
      </card>
    </div>
    <p v-else>{{ tc("noRunsYet") }}</p>
  </div>
</template>

<script lang="ts">
import CheckmarkIcon from "@/components/icons/CheckmarkIcon.vue";
import WarningIcon from "@/components/icons/WarningIcon.vue";
import Card from "@/components/layout/Card.vue";
import DetailsBox from "@/components/layout/DetailsBox.vue";
import KeyValueRow from "@/components/layout/KeyValueRow.vue";
import { competitionIdToReadableName, convertDateToString, getSecondsAsTimeString } from "@/helpers/formatting";
import { IStateRunHistoryEntry } from "@/types";
import { defineComponent } from "vue";

export default defineComponent({
  components: { DetailsBox, Card, CheckmarkIcon, WarningIcon, KeyValueRow },
  name: "RunHistory",
  computed: {
    runHistory(): IStateRunHistoryEntry[] {
      // TODO: filter by onlyTesting and !onlyTesting?
      return this.$store.state.runHistory.entries.slice().reverse();
    },
  },
  methods: {
    tc(key: string): string {
      return this.$t("runHistory." + key);
    },
    tg(key: string): string {
      return this.$t("general." + key);
    },
    getTeamnameForTeamId(teamId: IStateRunHistoryEntry["run"]["teamId"]): string {
      return this.$store.state.schedule.teams.find((team) => team.teamId === teamId)?.name || "???";
    },
    getDetailsBoxTitle(runHistoryEntry: IStateRunHistoryEntry): string {
      return (
        convertDateToString(new Date(runHistoryEntry.unixTimestamp * 1000), "hh:mm ") +
        this.getTeamnameForTeamId(runHistoryEntry.run.teamId)
      );
    },
    getKeyValuePairs(runHistoryEntry: IStateRunHistoryEntry): Array<{ key: string; value: string }> {
      return [
        { key: this.tg("team"), value: `${this.getTeamnameForTeamId(runHistoryEntry.run.teamId)} (${runHistoryEntry.run.teamId})` },
        {
          key: `${this.tg("score")} (${this.tg("time")})`,
          value: `${runHistoryEntry.score} (${getSecondsAsTimeString(runHistoryEntry.time)})`,
        },
        { key: `${this.tc("submissionTimestamp")}`, value: convertDateToString(new Date(runHistoryEntry.unixTimestamp * 1000)) },
        { key: `${this.tc("submissionUrl")}`, value: runHistoryEntry.url },
        ...(runHistoryEntry.status === "failed" ? [{ key: this.tc("errorDetails"), value: runHistoryEntry.error || "" }] : []),
        { key: this.tg("competition"), value: competitionIdToReadableName(runHistoryEntry.run.competition || "") },
        { key: this.tg("arena"), value: `${this.tg("arena")} ${runHistoryEntry.run.arenaId}` },
        { key: this.tg("round"), value: `${this.tg("round")} ${runHistoryEntry.run.round}` },
        // TODO: scoring json?, time json?
      ];
    },
  },
});
</script>

<style scoped>
.status-icon {
  height: 1.5em;
}
</style>
