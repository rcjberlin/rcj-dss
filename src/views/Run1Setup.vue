<template>
  <div>
    <div>Run Setup</div>
    <form @submit.prevent>
      Competition
      <select>
        <option>Rescue Line</option>
        <option>Rescue Line Entry</option>
      </select>

      Arena
      <select>
        <option>Arena A</option>
        <option>Arena B</option>
      </select>

      Round
      <select>
        <option>Round 1</option>
        <option>Round 2</option>
        <option>Round 3</option>
      </select>
    </form>
    <router-link to="/run/team">Select Team</router-link>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({
  components: {},
})
export default class Run1Setup extends Vue {}
</script>
