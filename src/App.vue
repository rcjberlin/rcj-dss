<template>
  <div class="app-main noselect">
    <NavigationBar />
    <router-view class="app-content" />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import NavigationBar from "@/components/layout/NavigationBar.vue";

@Options({
  components: {
    NavigationBar,
  },
})
export default class App extends Vue {}
</script>

<style>
@import "./assets/styles/custom-style.css";

* {
  font-family: "Roboto", sans-serif;
}

body {
  --theme-color: #fd5e53;
  background-color: #f5f5f6;
  font-size: 16px;
  margin: 0;
  height: 100vh;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  height: 100%;
}

.app-main {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.app-content {
  flex-grow: 1;
  padding: 8px;
}

.noselect {
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none; /* Non-prefixed version, currently
                        supported by Chrome and Opera */
}
</style>
