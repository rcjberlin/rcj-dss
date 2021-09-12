<template>
  <div>
    <div>{{ tc("runSetup") }}</div>
    <form @submit.prevent>
      <custom-select :label="tc('competition')" :options="competitionOptions" :onchange="(c) => (selectedCompetition = c)" />
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

export default defineComponent({
  name: "Run1Setup",
  components: {
    CustomSelect,
  },
  data() {
    return {
      selectedCompetition: "",
    };
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
        if ((this.$store.state.schedule.arenasByCompetition[this.selectedCompetition || ""] || []).includes(arena.arenaId)) {
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
