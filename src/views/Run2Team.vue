<template>
  <div>
    <div>{{ tc("runTeam") }}</div>
    Referee Competition Arena Round
    <br />
    <form @submit.prevent>
      <custom-select :label="tc('team')" :options="teamOptions" />

      {{ tg("evacuationPoint") }}
      <label><input type="radio" name="evacuation-point" id="evacuation-point-low" /> {{ tg("epLow") }}</label
      >&emsp;
      <label><input type="radio" name="evacuation-point" id="evacuation-point-high" /> {{ tg("epHigh") }}</label>
    </form>
    <router-link to="/run/prerun">Next</router-link>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { IComponentsNavigationBarConfig, IScheduleTeam } from "../types";
import CustomSelect from "../components/inputs/CustomSelect.vue";

export default defineComponent({
  name: "Run2Team",
  components: { CustomSelect },
  computed: {
    teamOptions(): Array<{ text: string; value: string }> {
      // TODO: filter based on selected competition
      return this.$store.state.schedule.teams.map((team: IScheduleTeam) => ({
        text: team.name,
        value: team.teamId,
      }));
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
        disableDrawerSwipeGestures: true,
        backButtonInsteadOfDrawer: true,
        backButtonRoute: "/run/setup",
      };
    },
  },
});
</script>
