<template>
  <div></div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "ColorTheme",
  computed: {
    selectedTheme() {
      return this.$store.state.settings.theme;
    },
  },
  methods: {
    setTheme() {
      document.body.setAttribute("data-theme", this.selectedTheme);
    },
  },
  watch: {
    selectedTheme() {
      this.setTheme();
    },
  },
  mounted() {
    this.setTheme();
  },
});
</script>

<style>
body,
body[data-theme="light"] {
  --theme-color-rgb: 253, 94, 83; /* #fd5e53 */
  --theme-color: rgb(var(--theme-color-rgb));
  --background-color: #f5f5f6;
  --background-color2: #fff;
  --background-color3: #ccc;
  --text-color: #000;
  --text-color2: #444;
  --link-color: #00e;
  --input-border-color: #c9c9c9;
  --modal-bg-color: rgba(0, 0, 0, 0.4);
}

body[data-theme="dark"] {
  --background-color: #111;
  --background-color2: #222;
  --background-color3: #666;
  --text-color: #fff;
  --text-color2: #999;
  --link-color: #48f;
  --input-border-color: #c9c9c9;
  --modal-bg-color: rgba(32, 32, 32, 0.8);
}

@media (prefers-color-scheme: dark) {
  body[data-theme="system"] {
    /* TODO: use CSS pre-processor? */
    --background-color: #111;
    --background-color2: #222;
    --background-color3: #666;
    --text-color: #fff;
    --text-color2: #999;
    --link-color: #48f;
    --input-border-color: #c9c9c9;
    --modal-bg-color: rgba(32, 32, 32, 0.8);
  }
}
</style>
