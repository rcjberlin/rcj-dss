<template>
  <div>
    <h1>{{ tc("runPreRun") }}</h1>

    <card :title="tc('teamSetup')">
      <key-value-row :name="tg('referee')" :value="$store.state.settings.username">
        <template v-slot:value>
          <checkmark-icon v-if="$store.state.settings.loginStatus" />
          <warning-icon v-else v-on:click="goToLogin" />
        </template>
      </key-value-row>
      <key-value-row :name="tg('competition')" :value="competitionName">
        <template v-slot:value><edit-icon v-on:click="backToSetup" /></template>
      </key-value-row>
      <key-value-row
        :name="`${tg('arena')} & ${tg('round')}`"
        :value="`${tg('arena')} ${$store.state.currentRun.arenaId}, ${tg('round')} ${$store.state.currentRun.round}`"
      >
        <template v-slot:value><edit-icon v-on:click="backToSetup" /></template>
      </key-value-row>
      <!-- TODO: show time of run? -->
      <key-value-row
        :name="tg('team')"
        :value="($store.state.schedule.teams.find((team) => team.teamId === $store.state.currentRun.teamId) || { name: '' }).name"
      >
        <template v-slot:value><edit-icon v-on:click="backToTeamSelection" /></template>
      </key-value-row>
    </card>

    <form @submit.prevent>
      <!-- TODO: select instead of radio buttons? -->
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

    <label class="v-center"><input type="checkbox" v-model="vTeamShowedUp" /> {{ tc("teamShowedUp") }}</label>

    <div class="box-time">
      <div>
        <run-time class="time" />
      </div>
      <div>
        <time-toggle-button :style="{ width: '16vw', 'max-width': '200px', 'max-height': '30vh' }" />
      </div>
      <div>
        <set-time-button />
      </div>
    </div>

    <div class="v-center">
      <button v-on:click="continueToRun">{{ tc("continueToRun") }}</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { IComponentsNavigationBarConfig } from "../types";
import CustomLabel from "../components/inputs/CustomLabel.vue";
import KeyValueRow from "../components/layout/KeyValueRow.vue";
import Card from "../components/layout/Card.vue";
import EditIcon from "../components/icons/EditIcon.vue";
import CheckmarkIcon from "../components/icons/CheckmarkIcon.vue";
import WarningIcon from "../components/icons/WarningIcon.vue";
import RunTime from "../components/time/RunTime.vue";
import TimeToggleButton from "../components/time/TimeToggleButton.vue";
import SetTimeButton from "../components/time/SetTimeButton.vue";

import { competitionIdToReadableName } from "../helpers/formatting";

export default defineComponent({
  name: "Run3PreRun",
  components: { CustomLabel, KeyValueRow, Card, EditIcon, CheckmarkIcon, WarningIcon, RunTime, TimeToggleButton, SetTimeButton },
  data() {
    return {
      vEvacuationPoint: "",
      vTeamShowedUp: false,
    };
  },
  computed: {
    selectedEvacuationPoint(): string {
      return this.$store.state.currentRun.scoring.evacuationPoint === "low"
        ? this.tg("epLow")
        : this.$store.state.currentRun.scoring.evacuationPoint === "high"
        ? this.tg("epHigh")
        : "?";
    },
    competitionName(): string {
      return competitionIdToReadableName(this.$store.state.currentRun.competition || "");
    },
  },
  methods: {
    tc(key: string): string {
      return this.$t("run.preRun." + key);
    },
    tg(key: string): string {
      return this.$t("general." + key);
    },
    getNavigationBarConfig(): IComponentsNavigationBarConfig {
      return {
        disableDrawerSwipeGestures: true,
        backButtonInsteadOfDrawer: true,
        backButtonRoute: "/run/team",
      };
    },
    goToLogin(): void {
      this.$router.push("/login");
    },
    backToSetup(): void {
      this.$router.push("/run/setup");
    },
    backToTeamSelection(): void {
      this.$router.push("/run/team");
    },
    continueToRun(): void {
      // TODO: show warning if "team showed up" is not checked?
      this.$router.push("/run/run");
    },
  },
  mounted() {
    if (
      !(
        this.$store.state.currentRun.competition &&
        this.$store.state.currentRun.arenaId &&
        this.$store.state.currentRun.round &&
        this.$store.state.currentRun.teamId
      )
    ) {
      this.$router.push("/run/team");
    }

    if (this.$store.state.currentRun.competition === "line-entry") {
      this.$store.commit("setEvacuationPoint", "low");
    }
    this.vEvacuationPoint = this.$store.state.currentRun.scoring.evacuationPoint || "";

    this.vTeamShowedUp = this.$store.state.currentRun.scoring.teamStarted;
  },
  watch: {
    vEvacuationPoint(ep: "low" | "high") {
      this.$store.commit("setEvacuationPoint", ep);
    },
    vTeamShowedUp(showedUp: boolean) {
      this.$store.commit("setTeamStarted", showedUp);
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

.box-time {
  display: flex;
  margin: 32px 0;
}
.box-time > * {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  width: 100%;
}
.box-time .time {
  font-size: 2em;
  margin-top: 0.125em;
}
</style>
