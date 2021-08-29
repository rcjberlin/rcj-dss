<template>
  <div>
    <h1>{{ tc("settings") }}</h1>
    <h2>{{ tc("app") }}</h2>
    <div class="input-section">
      <custom-label :text="tc('language') + ' 🌍'" forId="locale-selector" />
      <select v-model="$i18n.locale" id="locale-selector">
        <option v-for="locale in $i18n.availableLocales" :key="`locale-${locale}`" :value="locale">
          {{ getLocaleOptionName(locale) }}
        </option>
      </select>
    </div>
    <div class="input-section">
      <custom-label :text="tc('drawer')" />
      <custom-switch :label="tc('drawerOnRightText')" @switch-input="onInputDrawerPosition" :initialValue="switchDrawerOnRight" />
    </div>
    <h2>{{ tc("runSubmission") }}</h2>
    <form @submit.prevent>
      <custom-text-input
        :label="tc('event')"
        :initialValue="$store.state.settings.submitEvent"
        :onchange="setSettingFunction('submitEvent')"
      />
      <custom-text-input
        :label="tc('submitHost')"
        :initialValue="$store.state.settings.submitHost"
        :onchange="setSettingFunction('submitHost')"
      />
      <custom-text-input
        :label="tc('submitPath')"
        :initialValue="$store.state.settings.submitPath"
        :onchange="setSettingFunction('submitPath')"
      />
    </form>
    <div class="v-center">
      <button v-on:click="$store.commit('restoreAPIDefaults')">{{ tc("submitRestoreDefaults") }}</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import CustomTextInput from "../components/inputs/CustomTextInput.vue";
import CustomSwitch from "../components/inputs/CustomSwitch.vue";
import CustomLabel from "../components/inputs/CustomLabel.vue";

import i18nMessagesRaw from "../locales/_index";
interface Ii18nMessages {
  [language: string]: {
    [key: string]: string | any;
  };
}
const i18nMessages: Ii18nMessages = i18nMessagesRaw;

export default defineComponent({
  name: "Settings",
  components: {
    CustomTextInput,
    CustomSwitch,
    CustomLabel,
  },
  computed: {
    switchDrawerOnRight() {
      return this.$store.state.settings.drawerSide === "right";
    },
  },
  methods: {
    tc(key: string): string {
      return this.$t("settings." + key);
    },
    onInputDrawerPosition(rightSide: Boolean) {
      this.$store.commit("setDrawerSide", rightSide ? "right" : "left");
    },
    getLocaleOptionName(locale: string): string {
      if (locale in i18nMessages && "languageName" in i18nMessages[locale]) {
        return `${i18nMessages[locale].languageName} (${locale})`;
      }
      return locale;
    },
    setSettingFunction(name: string): Function {
      return (value: string) => this.$store.commit("setSetting", { name, value });
    },
  },
  mounted() {
    this.$watch(
      () => this.$i18n.locale,
      () => {
        this.$store.commit("setLanguage", this.$i18n.locale);
      }
    );
  },
});
</script>
