export interface IRecursiveObject<T> {
  [key: string]: T | IRecursiveObject<T>;
}

export interface IComponentsNavigationBarConfig {
  hideNavigationBar?: boolean;
  disableDrawerSwipeGestures?: boolean;
  backButtonInsteadOfDrawer?: boolean;
  backButtonRoute?: string;
}

export interface IStateSettings {
  language: string;
  drawerSide: "left" | "right";
  theme: string;
  submitEvent: string;
  submitHost: string;
  submitPath: string;
  username: string;
  password: string;
  loginStatus: boolean | null;
}

export interface IStateScheduleData {
  timestamp: number;
  arenas: Array<IScheduleArena>;
  competitions: string[];
  events: string[];
  runs: Array<IScheduleRun>;
  teams: Array<IScheduleTeam>;
  rounds: number;
  arenasByCompetition: {
    [competition: string]: string[];
  };
}

export interface IScheduleArena {
  arenaId: string;
  name: string;
  maps: Array<{
    from: string;
    to: string;
    mapId: string;
  }>;
}

export interface IScheduleTeam {
  teamId: string;
  name: string;
  competition: string;
}

export interface IScheduleRun {
  competition: string;
  teamId: string;
  time: string;
  arenaId: string;
  round: number;
  event: string;
  runId: number;
}

export interface IStateRun {
  runIdSchedule?: number;
  competition?: string;
  teamId?: string;
  arenaId?: string;
  round?: number;
  scoring: {
    teamStarted: boolean;
    evacuationPoint: "low" | "high" | undefined;
    // TODO
  };
  time: {
    /**
     * offset in seconds
     */
    timeOffset: number;
    /**
     * unix timestamp in seconds, can have milliseconds;
     * null means that time is not running
     */
    timeStartedTimestamp: number | null;
    /**
     * unix timestamp in seconds when run started
     */
    timestampRunStart: number | null;
    /**
     * unix timetstamp in seconds when run ended
     */
    timestampRunEnd: number | null;
  };
}

export interface IStateRunHistoryEntry {
  runHistoryId: string;
  // TODO: resubmits?
  run: IStateRun;
  score: number;
  time: number;
  unixTimestamp: number;
  url: string;
  status: "successful" | "failed";
  error?: string;
}

export interface IStateRunHistory {
  entries: IStateRunHistoryEntry[];
}

export interface IState {
  settings: IStateSettings;
  schedule: IStateScheduleData;
  currentRun: IStateRun;
  runHistory: IStateRunHistory;
  [moduleName: string]: any; // eslint-disable-line
}
