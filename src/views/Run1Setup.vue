<template>
  <div>
    <div>{{ tc("runSetup") }}</div>
    <form @submit.prevent>
      <custom-select :label="tc('competition')" :options="['Rescue Line', 'Rescue Line Entry']" />
      <custom-select :label="tc('arena')" :options="['Arena A', 'Arena B']" />
      <custom-select :label="tc('round')" :options="['Round 1', 'Round 2', 'Round 3']" />
    </form>
    <router-link to="/run/team">{{ tc("selectTeam") }}</router-link>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import CustomSelect from "../components/inputs/CustomSelect.vue";

export default defineComponent({
  name: "Run1Setup",
  components: {
    CustomSelect,
  },
  methods: {
    tc(key: string): string {
      return this.$t("run.setup." + key);
    },
  },
});
</script>
