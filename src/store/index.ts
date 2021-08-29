import { createStore } from "vuex";
import { IState } from "@/types";
import { getJsonFromLocalStorage, writeJsonToLocalStorage } from "./localStorageHelper";
import moduleSettings from "./moduleSettings";

const LS_KEY_STORE = "vuexstore-";

const modules = {
  settings: moduleSettings,
};

// create a map of mutation names (e.g. "setLanguage" to module names (e.g. "settings")
// so that we only update the modules in local storage that might have changed
// array because mutation names can be used in multiple modules
const mutationModulesMap: { [mutationName: string]: Array<string> } = {};
for (const [moduleName, module] of Object.entries(modules)) {
  for (const mutationName in module.mutations) {
    if (mutationName in mutationModulesMap) {
      mutationModulesMap[mutationName].push(moduleName);
    } else {
      mutationModulesMap[mutationName] = [moduleName];
    }
  }
}

const store = createStore({
  modules,
  mutations: {
    init(state: IState, stateFromLocalStorage: { [moduleName: string]: any }) {
      // fill state from local storage: parse through all modules and their keys
      // if corresponding value in local storage exists and matches the type -> copy
      for (const [moduleName, module] of Object.entries(state)) {
        for (const key in module) {
          if (
            moduleName in stateFromLocalStorage &&
            key in stateFromLocalStorage[moduleName] &&
            typeof module[key] === typeof stateFromLocalStorage[moduleName][key]
          ) {
            module[key] = stateFromLocalStorage[moduleName][key];
          }
        }
      }
    },
  },
});

// read state from local storage for each module
// combine into one object { module1: state1, module2: state2, ... }
store.commit(
  "init",
  Object.fromEntries(
    Object.keys(modules).map((moduleName) => {
      return [moduleName, getJsonFromLocalStorage(LS_KEY_STORE + moduleName)];
    })
  )
);

// on mutation, write all module states to local storage that might have been changed
store.subscribe((mutation, state) => {
  for (const moduleName of mutationModulesMap[mutation.type]) {
    writeJsonToLocalStorage(LS_KEY_STORE + moduleName, state[moduleName]);
  }
});

export default store;
