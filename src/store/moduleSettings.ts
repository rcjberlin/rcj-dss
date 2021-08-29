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
      submitEvent: API_DEFAULTS.event,
      submitHost: API_DEFAULTS.host,
      submitPath: API_DEFAULTS.path,
      username: "",
      password: "",
      loginStatus: null,
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
    restoreAPIDefaults(state: IStateSettings) {
      state.submitEvent = API_DEFAULTS.event;
      state.submitHost = API_DEFAULTS.host;
      state.submitPath = API_DEFAULTS.path;
    },
    setSetting(
      state: IStateSettings,
      payload: { name: "submitEvent" | "submitHost" | "submitPath" | "username" | "password"; value: string }
    ) {
      state[payload.name] = payload.value;
    },
    setLoginStatus(state: IStateSettings, loginStatus: boolean | null) {
      state.loginStatus = loginStatus;
    },
  },
  actions: {},
  modules: {},
};
