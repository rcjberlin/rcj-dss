<template>
  <div>
    <h1>{{ tc("runPreRun") }}</h1>

    <card :title="tc('teamSetup')">
      <key-value-row
        :name="tg('team')"
        :value="($store.state.schedule.teams.find((team) => team.teamId === $store.state.currentRun.teamId) || { name: '' }).name"
      >
        <template v-slot:value><edit-icon v-on:click="backToTeamSelection" /></template>
      </key-value-row>
      <key-value-row :name="tg('evacuationPoint')" :value="selectedEvacuationPoint">
        <template v-slot:value><edit-icon v-on:click="backToTeamSelection" /></template>
      </key-value-row>
      <!-- TODO: show further values? arena, competition, round, time, ...? -->
    </card>

    <label class="v-center"><input type="checkbox" v-model="vTeamShowedUp" /> {{ tc("teamShowedUp") }}</label>

    <div class="box-time">
      <div>
        <run-time class="time" />
      </div>
      <div>
        <time-toggle-button :style="{ width: '16vw', 'max-width': '200px', 'max-height': '30vh' }" />
      </div>
      <div>
        <button class="set-time">{{ tg("buttonSetTime") }}</button>
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
import KeyValueRow from "../components/layout/KeyValueRow.vue";
import Card from "../components/layout/Card.vue";
import EditIcon from "../components/icons/EditIcon.vue";
import RunTime from "../components/time/RunTime.vue";
import TimeToggleButton from "../components/time/TimeToggleButton.vue";

export default defineComponent({
  name: "Run3PreRun",
  components: { KeyValueRow, Card, EditIcon, RunTime, TimeToggleButton },
  data() {
    return {
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
        this.$store.state.currentRun.teamId &&
        this.$store.state.currentRun.scoring.evacuationPoint
      )
    ) {
      this.$router.push("/run/team");
    }
    this.vTeamShowedUp = this.$store.state.currentRun.scoring.teamStarted;
  },
  watch: {
    vTeamShowedUp(showedUp: boolean) {
      this.$store.commit("setTeamStarted", showedUp);
    },
  },
});
</script>

<style scoped>
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

/* set font size of "set time" button depending on width */
.box-time .set-time {
  font-size: 0.75em;
}
@media only screen and (min-width: 360px) {
  .box-time .set-time {
    font-size: 1em;
  }
}
@media only screen and (min-width: 500px) {
  .box-time .set-time {
    font-size: 1.25em;
  }
}
</style>
