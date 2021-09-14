import { IStateRun } from "@/types";

export default {
  state(): IStateRun {
    return {
      runIdSchedule: 0,
      competition: "",
      teamId: "",
      arenaId: "",
      round: 0,
      scoring: {
        teamStarted: false,
        evacuationPoint: undefined,
      },
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
    setTeam(state: IStateRun, teamId: string): void {
      state.teamId = teamId;
    },
    setEvacuationPoint(state: IStateRun, evacuationPoint: "low" | "high" | undefined): void {
      state.scoring.evacuationPoint = evacuationPoint;
    },
  },
  actions: {},
  modules: {},
};
