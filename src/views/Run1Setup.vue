<template>
  <div>
    <div>Run Setup</div>
    <form @submit.prevent>
      <custom-select label="Competition" :options="['Rescue Line', 'Rescue Line Entry']" />
      <custom-select label="Arena" :options="['Arena A', 'Arena B']" />
      <custom-select label="Round" :options="['Round 1', 'Round 2', 'Round 3']" />
    </form>
    <router-link to="/run/team">Select Team</router-link>
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
});
</script>
