import { IStateSettings } from "@/types";

const API_DEFAULTS = {
  event: "2022-berlin",
  host: "https://rcj.pythonanywhere.com",
  path: "/api/v1/submit_run",
};

export default {
  state(): IStateSettings {
    return {
      language: "en",
      drawerSide: "left",
      theme: "light",
      submitEvent: API_DEFAULTS.event,
      submitHost: API_DEFAULTS.host,
      submitPath: API_DEFAULTS.path,
      username: "",
      password: "",
      loginStatus: null,
    };
  },
  getters: {
    language(state: IStateSettings): string {
      return state.language;
    },
  },
  mutations: {
    setLanguage(state: IStateSettings, language: string): void {
      state.language = language;
    },
    setDrawerSide(state: IStateSettings, side: "left" | "right"): void {
      state.drawerSide = side;
    },
    restoreAPIDefaults(state: IStateSettings): void {
      state.submitEvent = API_DEFAULTS.event;
      state.submitHost = API_DEFAULTS.host;
      state.submitPath = API_DEFAULTS.path;
    },
    setSetting(
      state: IStateSettings,
      payload: { name: "theme" | "submitEvent" | "submitHost" | "submitPath" | "username" | "password"; value: string }
    ): void {
      state[payload.name] = payload.value;
    },
    setLoginStatus(state: IStateSettings, loginStatus: boolean | null): void {
      state.loginStatus = loginStatus;
    },
  },
  actions: {},
  modules: {},
};
