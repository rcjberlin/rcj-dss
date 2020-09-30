<template>
  <div>
    <div>Review</div>
    <button @click="submit">Submit</button>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { IComponentsNavigationBarConfig } from "../types";

@Options({
  components: {},
})
export default class Run6Review extends Vue {
  getNavigationBarConfig(): IComponentsNavigationBarConfig {
    return {
      disableDrawerSwipeGestures: true,
      backButtonInsteadOfDrawer: true,
      backButtonRoute: "/run/postrun",
    };
  }

  submit() {
    this.$router.push("/run/submitresult");
  }
}
</script>
