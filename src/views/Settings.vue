<template>
  <div>
    <h1>{{ tc("settings") }}</h1>

    <card :title="tc('app')">
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
      <custom-select
        :label="tc('theme')"
        :options="colorThemeOptions"
        :initialValue="$store.state.settings.theme"
        :onchange="setSettingFunction('theme')"
      />
    </card>

    <card :title="tc('scheduleData')">
      <key-value-row :name="tc('scheduleLastUpdated')" :value="scheduleLastUpdateTime" />
      <key-value-row :name="tc('scheduleArenas')" :value="displayArrayValues($store.state.schedule.arenas.map((arena) => arena.name))" />
      <key-value-row :name="tc('scheduleRounds')" :value="String($store.state.schedule.rounds)" />
      <key-value-row :name="tc('scheduleCompetitions')" :value="displayArrayValues($store.state.schedule.competitions)" />
      <key-value-row :name="tc('scheduleTeams')" :value="scheduleTeamsPerCompetition" />
      <key-value-row :name="tc('scheduleRuns')" :value="String($store.state.schedule.runs.length)" />
      <div class="v-center">
        <!-- TODO: fetch data from server -->
        <button>{{ tc("checkForScheduleUpdates") }}</button>
      </div>
    </card>

    <card :title="tc('runSubmission')">
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
    </card>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import CustomTextInput from "../components/inputs/CustomTextInput.vue";
import CustomSwitch from "../components/inputs/CustomSwitch.vue";
import CustomLabel from "../components/inputs/CustomLabel.vue";
import CustomSelect from "../components/inputs/CustomSelect.vue";
import KeyValueRow from "../components/layout/KeyValueRow.vue";
import Card from "../components/layout/Card.vue";

import { competitionIdToReadableName, convertDateToString } from "../helpers/formatting";
import { colorThemes } from "../components/layout/colorThemes";

import i18nMessagesRaw from "../locales/_index";
import { IRecursiveObject } from "../types";
interface Ii18nMessages {
  [language: string]: IRecursiveObject<string>;
}
const i18nMessages: Ii18nMessages = i18nMessagesRaw;

export default defineComponent({
  name: "Settings",
  components: {
    CustomTextInput,
    CustomSwitch,
    CustomLabel,
    KeyValueRow,
    Card,
    CustomSelect,
  },
  computed: {
    switchDrawerOnRight() {
      return this.$store.state.settings.drawerSide === "right";
    },
    colorThemeOptions(): Array<{ text: string; value: string }> {
      return colorThemes.map((theme) => ({ text: this.tc("themes." + theme), value: theme }));
    },
    scheduleLastUpdateTime() {
      return convertDateToString(new Date(this.$store.state.schedule.timestamp));
    },
    scheduleTeamsPerCompetition() {
      const teamsPerCompetition: { [competition: string]: number } = {};
      for (const team of this.$store.state.schedule.teams) {
        if (team.competition in teamsPerCompetition) {
          teamsPerCompetition[team.competition] += 1;
        } else {
          teamsPerCompetition[team.competition] = 1;
        }
      }
      return Object.entries(teamsPerCompetition).reduce((text, competitionWithTeamCount) => {
        return (
          text + (text === "" ? "" : ", ") + `${competitionWithTeamCount[1]} (${competitionIdToReadableName(competitionWithTeamCount[0])})`
        );
      }, "");
    },
  },
  methods: {
    tc(key: string): string {
      return this.$t("settings." + key);
    },
    onInputDrawerPosition(rightSide: boolean) {
      this.$store.commit("setDrawerSide", rightSide ? "right" : "left");
    },
    getLocaleOptionName(locale: string): string {
      if (locale in i18nMessages && "languageName" in i18nMessages[locale]) {
        return `${i18nMessages[locale].languageName} (${locale})`;
      }
      return locale;
    },
    setSettingFunction(name: string): (value: string) => void {
      return (value: string) => this.$store.commit("setSetting", { name, value });
    },
    displayArrayValues(array: string[]): string {
      return array.reduce((values, value) => {
        return values + (values === "" ? "" : ", ") + value;
      }, "");
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
