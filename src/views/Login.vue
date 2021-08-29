<template>
  <div>
    <h1>{{ tc("headingLogin") }}</h1>

    <form @submit.prevent>
      <custom-text-input
        :placeholder="tc('username')"
        :initialValue="$store.state.settings.username"
        :onchange="setSettingFunction('username')"
      />
      <custom-text-input
        :placeholder="tc('password')"
        type="password"
        :initialValue="$store.state.settings.password"
        :onchange="setSettingFunction('password')"
        :focusInput="focusPasswordInput"
      />

      <div class="v-center">
        <button v-on:click="tryLogin">{{ tc("buttonLogin") }}</button>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import CustomTextInput from "../components/inputs/CustomTextInput.vue";

export default defineComponent({
  name: "Login",
  components: {
    CustomTextInput,
  },
  data() {
    return {
      focusPasswordInput: false,
    };
  },
  methods: {
    tc(key: string): string {
      return this.$t("login." + key);
    },
    setSettingFunction(name: string): Function {
      return (value: string) => this.$store.commit("setSetting", { name, value });
    },
    tryLogin() {
      const { username, password } = this.$store.state.settings;
      if (!password) {
        //this.$refs.passwordInput.focusInput();
        // focus password input by changing prop value :(
        this.focusPasswordInput = true;
        this.$nextTick(() => (this.focusPasswordInput = false));
        return;
      }
      // TODO
    },
  },
});
</script>
