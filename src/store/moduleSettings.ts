import { IStateSettings } from "@/types";

export default {
  state(): IStateSettings {
    return {
      language: "en",
      drawerSide: "left",
    };
  },
  getters: {
    language(state: IStateSettings) {
      return state.language;
    },
  },
  mutations: {
    setLanguage(state: IStateSettings, language: string) {
      state.language = language;
    },
    setDrawerSide(state: IStateSettings, side: "left" | "right") {
      state.drawerSide = side;
    },
  },
  actions: {},
  modules: {},
};
