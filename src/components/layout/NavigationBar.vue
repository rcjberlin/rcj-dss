<template>
  <div>
    <swipe-gestures @left="hideDrawer" @right="showDrawer" />
    <div class="modal" :class="{ active: drawer }"></div>
    <div class="drawer" :class="{ active: drawer }">
      <img src="../../assets/icons/icon-235x235-cropped.png" />
      <router-link
        v-for="route in routes"
        :key="route.path"
        :to="route.path"
        @click="hideDrawer"
        :tabindex="drawer ? 0 : -1"
        >{{ route.name }}</router-link
      >
    </div>
    <div class="app-bar">
      <button @click="toggleDrawer" class="no-button-styling">
        <svg viewBox="0 0 72 72">
          <!-- nav icon / hamburger menu -->
          <rect x="8" y="17" width="56" height="6" />
          <rect x="8" y="33" width="56" height="6" />
          <rect x="8" y="49" width="56" height="6" />
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
import { routes } from "../../router";
import SwipeGestures from "./SwipeGestures.vue";

@Options({
  components: { SwipeGestures },
})
export default class NavigationBar extends Vue {
  routes = routes;
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
  hideDrawerOnEscape(event: KeyboardEvent) {
    if (event.keyCode === 27) {
      this.hideDrawer();
    }
  }

  mounted() {
    window.addEventListener("click", this.onClick);
    window.addEventListener("keydown", this.hideDrawerOnEscape);
  }
  beforeUnmount() {
    window.removeEventListener("click", this.onClick);
    window.removeEventListener("keydown", this.hideDrawerOnEscape);
  }

  onClick(event: Event) {
    const target = event.target as HTMLElement;
    if (target.classList.contains("modal")) {
      this.hideDrawer();
    }
  }
}
</script>

<style scoped>
.modal {
  display: none;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.4);
}
.modal.active {
  display: block;
}

.drawer {
  --drawer-width: 250px;
  --padding: 32px;

  height: 100%;
  position: fixed;
  z-index: 2;
  top: 0;
  left: 0;
  background-color: #111;
  overflow-x: hidden;
  transition: 0.4s;
}
.drawer.active {
  /*width: var(--drawer-width);*/
  left: 0;
  box-shadow: 0px 0px 20px 4px rgba(0, 0, 0, 0.6);
}
.drawer:not(.active) {
  /*width: 0;*/
  left: calc(-1 * var(--drawer-width));
}

.drawer a {
  display: block;
  font-size: 1.5em;
  text-align: left;
  width: calc(var(--drawer-width) - 2 * var(--padding));
  padding: calc(var(--padding) / 2) var(--padding);
  text-decoration: none;
  color: #888;
  transition: 0.3s;
}
.drawer a:hover,
.drawer a:focus,
.drawer a.active {
  color: #ccc;
}
.drawer img {
  width: calc(var(--drawer-width) - 2 * var(--padding));
  height: calc(var(--drawer-width) - 2 * var(--padding));
  margin: var(--padding) var(--padding) calc(var(--padding) / 2);
}

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
  padding: 0 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 2em;
  padding-left: 0;
  margin-left: 0;
}
.app-bar button svg {
  height: 1.25em;
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
