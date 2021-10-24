import { eventBus } from "@/event";
import { getSecondsAsTimeString } from "@/helpers/formatting";
import { IStateRun } from "@/types";

function getRunTime(timeStartedTimestamp: number | null, timeOffset: number): number {
  const timePassedSinceStarted = timeStartedTimestamp === null ? 0 : Date.now() / 1000 - timeStartedTimestamp;
  return timeOffset + timePassedSinceStarted;
}

export default {
  state(): IStateRun {
    return {
      runIdSchedule: 0,
      competition: "",
      teamId: "",
      arenaId: "",
      round: 0,
      scoring: {
        teamStarted: true,
        evacuationPoint: undefined,
      },
      time: {
        timeOffset: 0,
        timeStartedTimestamp: null,
        timestampRunStart: null,
        timestampRunEnd: null,
      },
    };
  },
  getters: {
    isTimeRunning(state: IStateRun): boolean {
      return state.time.timeStartedTimestamp !== null;
    },
    runTime(state: IStateRun): number {
      return getRunTime(state.time.timeStartedTimestamp, state.time.timeOffset);
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
    runTimeAsString(_state: IStateRun, getters: any): string {
      return getSecondsAsTimeString(Math.floor(getters.runTime));
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
    remainingRunTimeAsString(_state: IStateRun, getters: any): string {
      const timeInSeconds = 8 * 60 - Math.floor(getters.runTime);
      return (timeInSeconds < 0 ? "-" : "") + getSecondsAsTimeString(Math.abs(timeInSeconds));
    },
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
    setTeamStarted(state: IStateRun, teamStarted: boolean): void {
      state.scoring.teamStarted = teamStarted;
    },
    toggleTime(state: IStateRun): void {
      if (state.time.timeStartedTimestamp === null) {
        // start time
        state.time.timeStartedTimestamp = Date.now() / 1000;
        if (state.time.timestampRunStart === null) {
          state.time.timestampRunStart = Math.floor(state.time.timeStartedTimestamp);
        }
        eventBus.emit("started-time");
      } else {
        // pause time
        const timePassedSinceStarted = Date.now() / 1000 - state.time.timeStartedTimestamp;
        state.time.timeStartedTimestamp = null;
        state.time.timeOffset += timePassedSinceStarted;
        state.time.timestampRunEnd = Math.floor(Date.now() / 1000);
        eventBus.emit("paused-time");
      }
    },
    setTime(state: IStateRun, newTimeInSeconds: number): void {
      state.time.timeOffset += newTimeInSeconds - getRunTime(state.time.timeStartedTimestamp, state.time.timeOffset);
      eventBus.emit("updated-time");
    },
    resetCurrentRun(state: IStateRun): void {
      // keep competition, arena, and round, but clear all other values
      state.runIdSchedule = 0;
      state.teamId = "";
      state.scoring = {
        teamStarted: true,
        evacuationPoint: undefined,
      };
      state.time = {
        timeOffset: 0,
        timeStartedTimestamp: null,
        timestampRunStart: null,
        timestampRunEnd: null,
      };
    },
  },
  actions: {},
  modules: {},
};
