<template>
  <div>
    <h1>{{ tc("runTeam") }}</h1>

    <card :title="tc('setup')">
      <key-value-row :name="tg('referee')" :value="$store.state.settings.username">
        <template v-slot:value>
          <checkmark-icon v-if="$store.state.settings.loginStatus" />
          <warning-icon v-else v-on:click="goToLogin" />
        </template>
      </key-value-row>
      <key-value-row :name="tg('competition')" :value="competitionName">
        <template v-slot:value><edit-icon v-on:click="backToSetup" /></template>
      </key-value-row>
      <key-value-row :name="tg('arena')" :value="`${tg('arena')} ${$store.state.currentRun.arenaId}`">
        <template v-slot:value><edit-icon v-on:click="backToSetup" /></template>
      </key-value-row>
      <key-value-row :name="tg('round')" :value="`${tg('round')} ${$store.state.currentRun.round}`">
        <template v-slot:value><edit-icon v-on:click="backToSetup" /></template>
      </key-value-row>
    </card>

    <form @submit.prevent>
      <custom-select
        :label="tc('team')"
        :options="teamOptions"
        :initialValue="$store.state.currentRun.teamId"
        :onchange="(t) => setTeam(t)"
      />

      <custom-label :text="tg('evacuationPoint')" />
      <div id="evacuation-point-selection">
        <label
          ><input
            type="radio"
            name="evacuation-point"
            id="evacuation-point-low"
            v-model="vEvacuationPoint"
            value="low"
            :disabled="$store.state.currentRun.competition === 'line-entry'"
          />
          {{ tg("epLow") }}</label
        >&emsp;
        <label
          ><input
            type="radio"
            name="evacuation-point"
            id="evacuation-point-high"
            v-model="vEvacuationPoint"
            value="high"
            :disabled="$store.state.currentRun.competition === 'line-entry'"
          />
          {{ tg("epHigh") }}</label
        >
      </div>
    </form>
    <div class="v-center">
      <button v-on:click="continueToPreRun">{{ tc("continueToPreRun") }}</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { IComponentsNavigationBarConfig, IScheduleRun, IScheduleTeam } from "../types";
import CustomSelect from "../components/inputs/CustomSelect.vue";
import CustomLabel from "../components/inputs/CustomLabel.vue";
import KeyValueRow from "../components/layout/KeyValueRow.vue";
import Card from "../components/layout/Card.vue";
import EditIcon from "../components/icons/EditIcon.vue";
import CheckmarkIcon from "../components/icons/CheckmarkIcon.vue";
import WarningIcon from "../components/icons/WarningIcon.vue";

import { competitionIdToReadableName, convertDateToString, parseServerScheduleTimestamp } from "../helpers/formatting";

export default defineComponent({
  name: "Run2Team",
  components: { CustomSelect, CustomLabel, KeyValueRow, Card, EditIcon, CheckmarkIcon, WarningIcon },
  data() {
    return {
      vEvacuationPoint: "",
    };
  },
  computed: {
    teamOptions(): Array<{ text: string; value: string }> {
      interface RunToIncluded extends IScheduleRun {
        parsedTime: number;
        teamname: string;
      }
      const runsToBeIncluded: RunToIncluded[] = [];
      for (const run of this.$store.state.schedule.runs as IScheduleRun[]) {
        if (
          run.competition === this.$store.state.currentRun.competition &&
          run.arenaId === this.$store.state.currentRun.arenaId &&
          run.round === this.$store.state.currentRun.round
        ) {
          runsToBeIncluded.push({
            ...run,
            parsedTime: parseServerScheduleTimestamp(run.time).getTime(),
            teamname: ((this.$store.state.schedule.teams as IScheduleTeam[]).find((team) => team.teamId === run.teamId) || { name: "" })
              .name,
          });
        }
      }
      // order runs by time
      runsToBeIncluded.sort((runA, runB) => {
        return runA.parsedTime - runB.parsedTime;
      });
      return runsToBeIncluded.map((run) => ({
        text: convertDateToString(new Date(run.parsedTime), "hh:mm") + " " + run.teamname,
        value: run.teamId, // TODO: use runId?
      }));
    },
    competitionName(): string {
      return competitionIdToReadableName(this.$store.state.currentRun.competition || "");
    },
  },
  methods: {
    tc(key: string): string {
      return this.$t("run.team." + key);
    },
    tg(key: string): string {
      return this.$t("general." + key);
    },
    getNavigationBarConfig(): IComponentsNavigationBarConfig {
      return {
        disableDrawerSwipeGestures: false,
        backButtonInsteadOfDrawer: false,
      };
    },
    backToSetup(): void {
      this.$router.push("/run/setup");
    },
    goToLogin(): void {
      this.$router.push("/login");
    },
    setTeam(teamId: string): void {
      this.$store.commit("setTeam", teamId);
      // TODO: ask whether scoring data should be resetted or not
    },
    selectEvacuationPoint(ep: "low" | "high"): void {
      console.log("select ep", ep);
    },
    continueToPreRun(): void {
      if (
        this.$store.state.currentRun.competition &&
        this.$store.state.currentRun.arenaId &&
        this.$store.state.currentRun.round &&
        this.$store.state.currentRun.teamId &&
        this.$store.state.currentRun.scoring.evacuationPoint
      ) {
        this.$router.push("/run/prerun");
      }
    },
  },
  mounted() {
    if (!(this.$store.state.currentRun.competition && this.$store.state.currentRun.arenaId && this.$store.state.currentRun.round)) {
      this.$router.push("/run/setup");
    }
    if (this.$store.state.currentRun.competition === "line-entry") {
      this.$store.commit("setEvacuationPoint", "low");
    }
    this.vEvacuationPoint = this.$store.state.currentRun.scoring.evacuationPoint || "";
  },
  watch: {
    vEvacuationPoint(ep: "low" | "high") {
      this.$store.commit("setEvacuationPoint", ep);
    },
  },
});
</script>

<style scoped>
#evacuation-point-selection {
  text-align: left;
}
#evacuation-point-selection label {
  display: inline;
}
</style>
