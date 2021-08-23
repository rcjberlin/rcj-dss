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
      <custom-switch :label="tc('drawerOnRightText')" @switch-input="onInputDrawerPosition" />
    </div>
    <h2>{{ tc("runSubmission") }}</h2>
    <custom-text-input :label="tc('event')" />
    <custom-text-input :label="tc('submitHost')" />
    <custom-text-input :label="tc('submitPath')" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import CustomTextInput from "../components/inputs/CustomTextInput.vue";
import CustomSwitch from "../components/inputs/CustomSwitch.vue";
import CustomLabel from "../components/inputs/CustomLabel.vue";
import { eventBus } from "../event";

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
  methods: {
    tc(key: string): string {
      return this.$t("settings." + key);
    },
    onInputDrawerPosition(rightSide: Boolean) {
      // TODO: use vuex
      eventBus.emit("settings-drawer-right", rightSide);
    },
    getLocaleOptionName(locale: string): string {
      if (locale in i18nMessages && "languageName" in i18nMessages[locale]) {
        return `${i18nMessages[locale].languageName} (${locale})`;
      }
      return locale;
    },
    // TODO: persist locale
  },
});
</script>
