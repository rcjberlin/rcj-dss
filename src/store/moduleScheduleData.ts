import { IStateScheduleData } from "@/types";

import computed from "../schedule/_computed.json";
import timestamp from "../schedule/_timestamp.json";
import arenas from "../schedule/arenas.json";
import competitions from "../schedule/competitions.json";
import events from "../schedule/events.json";
import runs from "../schedule/scheduled-runs.json";
import teams from "../schedule/teams.json";

export default {
  state(): IStateScheduleData {
    return {
      timestamp: 0,
      arenas: [],
      competitions: [],
      events: [],
      runs: [],
      teams: [],
      rounds: 0,
      arenasByCompetition: {},
    };
  },
  mutations: {
    initSchedule(state: IStateScheduleData): void {
      // compares the schedule data in state (from local storage) and the default data -> takes the most recent
      if (timestamp.time > state.timestamp) {
        // data in state / from local storage is not up-to-date -> overwrite
        state.arenas = arenas;
        state.competitions = competitions;
        state.events = events;
        state.runs = runs;
        state.teams = teams;
        state.rounds = computed.rounds;
        state.arenasByCompetition = computed.arenasByCompetition;
        state.timestamp = timestamp.time;
      }
    },
  },
  actions: {},
  modules: {},
};
