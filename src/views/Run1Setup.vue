<template>
  <div>
    <div>Run Setup</div>
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
