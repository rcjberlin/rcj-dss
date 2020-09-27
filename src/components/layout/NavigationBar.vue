<template>
  <div>
    <swipe-gestures @left="hideDrawer" @right="showDrawer" />
    <div class="modal" :class="{ active: drawer }"></div>
    <div class="drawer" :class="{ active: drawer }">
      <img src="../../assets/icon235x235cropped.png" />
      <router-link
        v-for="route in routes"
        :key="route.path"
        :to="route.path"
        @click="hideDrawer"
        >{{ route.name }}</router-link
      >
    </div>
    <div class="app-bar">
      <button @click="toggleDrawer">☰</button>
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

  mounted() {
    window.addEventListener("click", this.onClick);
  }
  beforeUnmount() {
    window.removeEventListener("click", this.onClick);
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
.drawer a:hover {
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
  display: inline-block;
  padding: 0 12px 2.75px;
  font-size: 1.5em;
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
