<template>
  <div>
    <div class="modal" :class="{ active: drawer }"></div>
    <div class="drawer" :class="{ active: drawer, fromLeft: fromLeft }">
      <img src="../../assets/icons/icon-235x235-cropped.png" />
      <router-link v-for="route in routes" :key="route.path" :to="route.path" :tabindex="drawer ? 0 : -1">{{ route.name }}</router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { WatchStopHandle } from "vue";
import { Options, Vue } from "vue-class-component";
import { routes } from "../../router";

@Options({
  props: {
    drawer: Boolean,
    fromLeft: Boolean,
  },
  emits: ["hide"],
})
export default class NavigationDrawer extends Vue {
  routes = routes;
  watchers: WatchStopHandle[] = [];

  mounted() {
    // hide drawer on click outside of drawer, escape key or when route changes
    window.addEventListener("click", this.onClick);
    window.addEventListener("keydown", this.hideDrawerOnEscape);
    this.watchers.push(
      this.$watch(
        () => this.$route,
        () => {
          this.$emit("hide");
        }
      )
    );
  }

  beforeUnmount() {
    window.removeEventListener("click", this.onClick);
    window.removeEventListener("keydown", this.hideDrawerOnEscape);
    for (const removeWatcher of this.watchers) {
      removeWatcher();
    }
  }

  onClick(event: Event) {
    const target = event.target as HTMLElement;
    if (target.classList.contains("modal")) {
      this.$emit("hide");
    }
  }

  hideDrawerOnEscape(event: KeyboardEvent) {
    if (event.keyCode === 27) {
      this.$emit("hide");
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
  background-color: #111;
  overflow-x: hidden;
  transition: 0.4s;
}
.drawer.active {
  box-shadow: 0px 0px 20px 4px rgba(0, 0, 0, 0.6);
}
.drawer.fromLeft.active {
  left: 0;
}
.drawer.fromLeft:not(.active) {
  left: calc(-1 * var(--drawer-width));
}
.drawer:not(.fromLeft).active {
  right: 0;
}
.drawer:not(.fromLeft):not(.active) {
  right: calc(-1 * var(--drawer-width));
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
</style>
