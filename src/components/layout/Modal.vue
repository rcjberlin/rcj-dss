<template>
  <div>
    <div class="bg" :class="{ active: showModal }"></div>
    <div class="modal" :class="{ active: showModal }">
      <h2>{{ title }}</h2>
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import * as navigationGuard from "@/router/navigationGuard";

export default defineComponent({
  name: "Modal",
  props: {
    showModal: Boolean,
    title: String,
    options: {
      default: {
        hideOnEscapeKey: true,
        hideOnClickOutside: true,
        hideOnBrowserBackButton: true,
      },
    },
  },
  emits: ["hide"],
  methods: {
    registerEventListenersAndPreventRoutingWhenModalIsShown() {
      window.addEventListener("click", this.onClick);
      window.addEventListener("keydown", this.hideDrawerOnEscape);
      navigationGuard.preventRouting(this.preventRoutingCallback);
      // TODO: prevent app drawer (only reason it's not needed yet is because modal is only used in views that disable drawer)
    },
    unregisterEventListenersAndAllowRoutingWhenModalIsHidden() {
      window.removeEventListener("click", this.onClick);
      window.removeEventListener("keydown", this.hideDrawerOnEscape);
      navigationGuard.allowRouting(this.preventRoutingCallback);
    },
    onClick(event: Event) {
      if (this.options.hideOnClickOutside === false) return;
      const target = event.target as HTMLElement;
      if (target.classList.contains("bg")) {
        this.$emit("hide");
      }
    },
    hideDrawerOnEscape(event: KeyboardEvent) {
      if (this.options.hideOnEscapeKey === false) return;
      if (event.key === "Escape") {
        this.$emit("hide");
      }
    },
    preventRoutingCallback(): void {
      if (this.options.hideOnBrowserBackButton === false) return;
      this.$emit("hide");
    },
  },
  mounted() {
    if (this.showModal) {
      this.registerEventListenersAndPreventRoutingWhenModalIsShown();
    }
  },
  watch: {
    showModal() {
      if (this.showModal) {
        this.registerEventListenersAndPreventRoutingWhenModalIsShown();
      } else {
        this.unregisterEventListenersAndAllowRoutingWhenModalIsHidden();
      }
    },
  },
});
</script>

<style scoped>
.bg {
  display: none;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: var(--modal-bg-color);
}
.bg.active {
  display: block;
}

.modal {
  --modal-width: min(80vw, 600px);
  --modal-max-height: 90%;
  --modal-top-offset-from-center: 0%;
  --modal-padding: 8px;

  width: var(--modal-width);
  max-height: var(--modal-max-height);
  position: fixed;
  z-index: 2;
  top: calc((100% - var(--modal-max-height)) / 2 - var(--modal-padding) + var(--modal-top-offset-from-center));
  left: calc((100% - var(--modal-width)) / 2 - var(--modal-padding)); /* center */
  overflow-x: hidden;

  background-color: var(--background-color);
  border-radius: 8px;
  padding: var(--modal-padding);
}
.modal.active {
  box-shadow: 0px 0px 20px 4px rgba(0, 0, 0, 0.6);
  transform: scale(1);
  transition: 0.4s; /* modal appears */
}
.modal:not(.active) {
  transform: scale(0);
  transition: 0.4s ease-in; /* modal disappears */
}

.modal h2 {
  margin: 8px;
}
</style>
