<template>
  <div>
    run inputs like in previous version
    <br />

    <router-link to="/run/prerun">prev</router-link>&ensp;
    <router-link to="/run/postrun">next</router-link>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { IComponentsNavigationBarConfig } from "../types";

@Options({
  components: {},
})
export default class Run4Run extends Vue {
  getNavigationBarConfig(): IComponentsNavigationBarConfig {
    return {
      hideNavigationBar: true,
      disableDrawerSwipeGestures: true,
    };
  }
}
</script>
