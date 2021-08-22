<template>
  <div>
    <div class="modal" :class="{ active: showLoadingAnimation }">
      <!-- https://loading.io/spinner/eclipse/-eclipse-ring-circle-rotate -->
      <svg viewBox="0 0 100 100">
        <path d="M9 50A41 41 0 0 0 91 50A41 44.1 0 0 1 9 50">
          <animateTransform
            attributeName="transform"
            type="rotate"
            dur="1.6s"
            repeatCount="indefinite"
            keyTimes="0;1"
            values="0 50 51.55;360 50 51.55"
          ></animateTransform>
        </path>
      </svg>
      <div class="text">{{ text }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { eventBus } from "../../event";

export default defineComponent({
  name: "Loader",
  data() {
    return {
      showLoadingAnimation: false,
      text: "",
    };
  },
  mounted() {
    eventBus.on("loader-start", (text: string) => {
      this.text = text;
      this.showLoadingAnimation = true;
    });
    eventBus.on("loader-finish", () => {
      this.showLoadingAnimation = false;
      this.text = "";
    });
  },
});
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
  background-color: rgba(0, 0, 0, 0.6);
}
.modal.active {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.modal svg {
  --size: min(60vw, 40vh);
  width: var(--size);
  height: var(--size);
}
.modal svg path {
  fill: var(--theme-color);
}

.modal .text {
  color: #fff;
  margin: 32px;
}
</style>
