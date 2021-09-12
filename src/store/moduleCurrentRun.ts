import { IStateRun } from "@/types";

export default {
  state(): IStateRun {
    return {
      runIdSchedule: 0,
      competition: "",
      teamId: "",
      arenaId: "",
      round: 0,
    };
  },
  mutations: {
    setCompetition(state: IStateRun, competition: string): void {
      state.competition = competition;
    },
    setArena(state: IStateRun, arenaId: string): void {
      state.arenaId = arenaId;
    },
    setRound(state: IStateRun, round: number): void {
      state.round = round;
    },
  },
  actions: {},
  modules: {},
};
