<template>
  <div>
    <div>Run Team</div>
    <router-link to="/run/setup">Back to Setup</router-link>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { IComponentsNavigationBarConfig } from "../types";

@Options({
  components: {},
})
export default class Run2Team extends Vue {
  getNavigationBarConfig(): IComponentsNavigationBarConfig {
    return {
      hideNavigationBar: true,
    };
  }
}
</script>
