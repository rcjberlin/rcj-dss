<template>
  <div>
    <swipe-gestures
      @left="config.disableDrawerSwipeGestures ? undefined : hideDrawer()"
      @right="config.disableDrawerSwipeGestures ? undefined : showDrawer()"
    />
    <navigation-drawer :drawer="drawer" @hide="hideDrawer" />
    <div class="app-bar" v-show="!config.hideNavigationBar">
      <button @click="config.backButtonInsteadOfDrawer ? back(config.backButtonRoute) : toggleDrawer()" class="no-button-styling">
        <svg viewBox="0 0 72 72">
          <!-- nav icon / hamburger menu -->
          <line v-show="!config.backButtonInsteadOfDrawer" x1="8" y1="20" x2="64" y2="20" />
          <line x1="8" y1="36" x2="64" y2="36" />
          <line v-show="!config.backButtonInsteadOfDrawer" x1="8" y1="52" x2="64" y2="52" />
          <line v-show="config.backButtonInsteadOfDrawer" x1="6.5" y1="37.5" x2="36" y2="8" />
          <line v-show="config.backButtonInsteadOfDrawer" x1="6.5" y1="34.5" x2="36" y2="64" />
        </svg>
      </button>
      <div class="title-wrapper">
        <div class="title">RCJ Digital Scoring Sheet</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { IComponentsNavigationBarConfig } from "../../types";
import SwipeGestures from "./SwipeGestures.vue";
import NavigationDrawer from "./NavigationDrawer.vue";

@Options({
  components: { SwipeGestures, NavigationDrawer },
  props: {
    config: { type: Object as () => IComponentsNavigationBarConfig },
  },
})
export default class NavigationBar extends Vue {
  drawer = false;

  toggleDrawer() {
    this.drawer = !this.drawer;
  }
  showDrawer() {
    this.drawer = true;
  }
  hideDrawer() {
    this.drawer = false;
  }

  back(route: string) {
    if (route) {
      this.$router.push(route);
    } else {
      this.$router.go(-1);
    }
  }
}
</script>

<style scoped>
.app-bar {
  background-color: var(--theme-color);
  display: flex;
  padding: 8px;
  color: #000;
}
.app-bar button {
  background: none;
  border: none;
  cursor: pointer;
  text-decoration: none;
  font-size: 1.5em;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 2em;
  margin-left: 0;
}
.app-bar button svg {
  height: 1.25em;
}
.app-bar button svg line {
  stroke: #000;
  stroke-width: 6;
  fill: none;
}
.app-bar .title-wrapper {
  margin-left: 8px;
  font-size: 1.5em;
  display: flex;
  align-items: center;
  overflow: hidden;
}
.app-bar .title-wrapper .title {
  display: block;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  font-weight: 600;
}
</style>
