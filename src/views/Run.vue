<template>
  <router-view />
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({
  components: {},
})
export default class Run extends Vue {
  mounted() {
    this.redirectToChildRouteIfNoneSet();
  }
  updated() {
    this.redirectToChildRouteIfNoneSet();
  }

  redirectToChildRouteIfNoneSet() {
    if (this.$route.path === "/run") {
      this.$router.replace("/run/setup");
    }
  }
}
</script>
