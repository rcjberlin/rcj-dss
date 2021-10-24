import { IStateRunHistory, IStateRunHistoryEntry } from "@/types";

export default {
  state(): IStateRunHistory {
    return {
      entries: [],
    };
  },
  mutations: {
    addEntryToRunHistory(state: IStateRunHistory, entry: IStateRunHistoryEntry): void {
      state.entries.push(entry);
    },
  },
  actions: {},
  modules: {},
};
