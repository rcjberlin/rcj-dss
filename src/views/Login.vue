<template>
  <div>
    <h1>{{ tc("headingLogin") }}</h1>
    <form @submit.prevent>
      <input type="text" :placeholder="tc('username')" />
      <input type="password" :placeholder="tc('password')" />
      <button>{{ tc("buttonLogin") }}</button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Login",
  methods: {
    tc(key: string): string {
      return this.$t("login." + key);
    },
  },
});
</script>
