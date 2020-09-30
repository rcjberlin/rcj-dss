<template>
  <div>
    <div>Submit Result</div>

    <router-link to="/run/team">New Run</router-link>&ensp;
    <router-link to="/runhistory">Run History</router-link>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { RouteLocationNormalizedLoaded } from "vue-router";
import { IComponentsNavigationBarConfig } from "../types";

@Options({
  components: {},
})
export default class Run7SubmitResult extends Vue {
  mounted() {
    this.$watch(
      () => this.$route,
      (to: RouteLocationNormalizedLoaded) => {
        if (to.path === "/run/review") {
          // go-back-button of browser should not be allowed here
          this.$router.go(1);
        }
      }
    );
  }
}
</script>
