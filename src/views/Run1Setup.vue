<template>
  <div>
    <h1>{{ tc("runSetup") }}</h1>
    <form @submit.prevent>
      <custom-select
        :label="tg('competition')"
        :options="competitionOptions"
        :initialValue="$store.state.currentRun.competition"
        :onchange="(v) => $store.commit('setCompetition', v)"
      />
      <custom-select
        :label="tg('arena')"
        :options="arenaOptions"
        :initialValue="$store.state.currentRun.arenaId"
        :onchange="(v) => $store.commit('setArena', v)"
      />
      <custom-select
        :label="tg('round')"
        :options="roundOptions"
        :initialValue="String($store.state.currentRun.round)"
        :onchange="(v) => $store.commit('setRound', Number(v))"
      />
    </form>
    <div class="v-center">
      <button v-on:click="continueToSelectTeam">{{ tc("selectTeam") }}</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import CustomSelect from "../components/inputs/CustomSelect.vue";
import { competitionIdToReadableName } from "../helpers/formatting";

export default defineComponent({
  name: "Run1Setup",
  components: {
    CustomSelect,
  },
  computed: {
    competitionOptions(): Array<{ text: string; value: string }> {
      return this.$store.state.schedule.competitions.map((competition: string) => ({
        text: competitionIdToReadableName(competition),
        value: competition,
      }));
    },
    arenaOptions(): Array<{ text: string; value: string }> {
      const options = [];
      for (const arena of this.$store.state.schedule.arenas) {
        if (
          (this.$store.state.schedule.arenasByCompetition[this.$store.state.currentRun.competition || ""] || []).includes(arena.arenaId)
        ) {
          options.push({
            text: arena.name,
            value: arena.arenaId,
          });
        }
      }
      return options;
    },
    roundOptions(): Array<{ text: string; value: string }> {
      return Array(this.$store.state.schedule.rounds)
        .fill(1)
        .map((_v, index) => ({
          text: `${this.tg("round")} ${index + 1}`,
          value: String(index + 1),
        }));
    },
  },
  methods: {
    tc(key: string): string {
      return this.$t("run.setup." + key);
    },
    tg(key: string): string {
      return this.$t("general." + key);
    },
    continueToSelectTeam(): void {
      if (this.$store.state.currentRun.competition && this.$store.state.currentRun.arenaId && this.$store.state.currentRun.round) {
        this.$router.push("/run/team");
      }
    },
  },
});
</script>
