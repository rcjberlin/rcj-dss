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

  <div class="login-status">
    <div v-if="$store.state.settings.loginStatus === true">
      <img src="../assets/icons/successful.svg" />
    </div>
    <div v-else-if="$store.state.settings.loginStatus === false">
      <img src="../assets/icons/failed.svg" />
    </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import CustomTextInput from "../components/inputs/CustomTextInput.vue";

const CHECK_LOGIN_PATH = "/api/v1/login_required";

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
      return (value: string) => {
        this.$store.commit("setSetting", { name, value });
        this.$store.commit("setLoginStatus", null);
      };
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
      fetch(`${this.$store.state.settings.submitHost}${CHECK_LOGIN_PATH}`, {
        method: "GET",
        credentials: "include",
        headers: {
          Authorization: "Basic " + btoa(username + ":" + password),
        },
      })
        .then(async (response) => {
          let text = await response.text();
          if (response.status === 200 && text === "ok") {
            this.$store.commit("setLoginStatus", true);
          } else {
            throw text;
          }
        })
        .catch((error) => {
          console.log({ msg: "failed", response: error.toString() });
          this.$store.commit("setLoginStatus", false);
        });
    },
  },
});
</script>

<style scoped>
.login-status img {
  max-width: 30vw;
  max-height: 30vh;
  margin: 2em 0;
}
</style>
