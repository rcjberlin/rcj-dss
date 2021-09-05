<template>
  <div></div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

/**
 * Does not support multi-touch!
 */

const MIN_ABSOLUTE_DIFF = 10;
const MIN_RATIO = 1.5;

export default defineComponent({
  name: "SwipeGestures",
  emits: ["top", "right", "down", "left"],
  data() {
    return {
      ongoingTouch: undefined as Touch | undefined,
    };
  },
  mounted() {
    window.addEventListener("touchstart", this.handleStart);
    window.addEventListener("touchend", this.handleEnd);
    window.addEventListener("touchcancel", this.handleCancel);
    //window.addEventListener("touchmove", this.handleMove);
  },
  beforeUnmount() {
    window.removeEventListener("touchstart", this.handleStart);
    window.removeEventListener("touchend", this.handleEnd);
    window.removeEventListener("touchcancel", this.handleCancel);
    //window.removeEventListener("touchmove", this.handleMove);
  },
  methods: {
    handleStart(event: TouchEvent) {
      if (!this.ongoingTouch) {
        this.ongoingTouch = event.changedTouches[0];
      }
    },
    handleMove(event: TouchEvent) {
      this.handleTouch(event, "move");
    },
    handleEnd(event: TouchEvent) {
      this.handleTouch(event, "end");
    },
    handleCancel(event: TouchEvent) {
      this.handleTouch(event, "cancel");
    },

    handleTouch(event: TouchEvent, type: "move" | "end" | "cancel") {
      for (const touch of event.changedTouches) {
        if (this.ongoingTouch && this.ongoingTouch.identifier === touch.identifier) {
          if (type === "end") {
            const x = touch.clientX - this.ongoingTouch.clientX;
            const y = touch.clientY - this.ongoingTouch.clientY;
            if (y <= -MIN_ABSOLUTE_DIFF && -Math.abs(x) * MIN_RATIO >= y) {
              this.$emit("top");
            } else if (x >= MIN_ABSOLUTE_DIFF && Math.abs(y) * MIN_RATIO <= x) {
              this.$emit("right");
            } else if (y >= MIN_ABSOLUTE_DIFF && Math.abs(x) * MIN_RATIO <= y) {
              this.$emit("down");
            } else if (x <= -MIN_ABSOLUTE_DIFF && -Math.abs(y) * MIN_RATIO >= x) {
              this.$emit("left");
            }
          }
          if (type === "end" || type === "cancel") {
            this.ongoingTouch = undefined;
          }
        }
      }
    },
  },
});
</script>
