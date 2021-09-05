<template>
  <div>
    <div>{{ tc("runSetup") }}</div>
    <form @submit.prevent>
      <custom-select :label="tc('competition')" :options="competitionOptions" />
      <custom-select :label="tc('arena')" :options="arenaOptions" />
      <custom-select :label="tc('round')" :options="roundOptions" />
    </form>
    <router-link to="/run/team">{{ tc("selectTeam") }}</router-link>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import CustomSelect from "../components/inputs/CustomSelect.vue";
import { competitionIdToReadableName } from "../helpers/formatting";
import { IScheduleArena } from "../types";

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
      // TODO: filter based on selected competition
      return this.$store.state.schedule.arenas.map((arena: IScheduleArena) => ({
        text: arena.name,
        value: arena.arenaId,
      }));
    },
    roundOptions(): Array<{ text: string; value: string }> {
      return Array(this.$store.state.schedule.rounds)
        .fill(1)
        .map((_v, index) => ({
          text: `${this.tc("round")} ${index + 1}`,
          value: String(index + 1),
        }));
    },
  },
  methods: {
    tc(key: string): string {
      return this.$t("run.setup." + key);
    },
  },
});
</script>
