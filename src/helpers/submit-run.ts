import { IStateRun, IStateRunHistoryEntry, IStateScheduleData, IStateSettings } from "@/types";
import { v4 as uuidv4 } from "uuid";

interface IRCJServerSubmitObject {
  only_testing?: boolean;
  referee: {
    name: string;
    auth: string;
  };
  competition: string;
  arena: string;
  round: number;
  teamname: string;
  time_duration: number;
  time_start: number;
  time_end: number;
  scoring: {
    teamStarted: boolean;
    evacuationPoint: string;
    score: number;
  };
  comments: string;
  confirmed: boolean;
  complaints: string;
}

export function submitRun(
  data: {
    settings: IStateSettings;
    run: IStateRun;
    schedule: IStateScheduleData;
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  storeCommitFunction: (type: string, payload?: any) => void
): {
  details: { requestLength: number };
  promise: Promise<void>;
} {
  // validate run data
  const team = data.schedule.teams.find((team) => team.teamId === data.run.teamId);
  try {
    if (!data.schedule.competitions.includes(data.run.competition || "")) {
      throw new Error("Invalid value for competition");
    }
    if (!team) {
      throw new Error("No teamname found for this team ID");
    }
    if (data.run.round === undefined) {
      throw new Error("Round must not be undefined");
    }
    if (data.run.arenaId === undefined) {
      throw new Error("ArenaId must not be undefined");
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    const runHistoryEntry: IStateRunHistoryEntry = {
      runHistoryId: uuidv4(),
      run: clone(data.run),
      score: 0,
      time: 0,
      url: "",
      unixTimestamp: Math.floor(Date.now() / 1000),
      status: "failed",
      error: `Internal Error: Didn't even send run (${err.message})`,
    };
    storeCommitFunction("addEntryToRunHistory", runHistoryEntry);
    storeCommitFunction("resetCurrentRun");
    return {
      details: { requestLength: 0 },
      promise: new Promise((resolve) => {
        resolve();
      }),
    };
  }

  // prepare submit object
  const score = calculateScore(data.run.scoring);
  const time = Math.floor(data.run.time.timeOffset);
  const runSubmit: IRCJServerSubmitObject = {
    only_testing: true,
    referee: { name: data.settings.username, auth: data.settings.password },
    competition: data.settings.submitEvent + "-" + data.run.competition,
    teamname: team.name,
    round: data.run.round,
    arena: data.run.arenaId,
    time_duration: time,
    time_start: data.run.time.timestampRunStart || 0,
    time_end: data.run.time.timestampRunEnd || 0,
    scoring: {
      teamStarted: data.run.scoring.teamStarted,
      evacuationPoint: data.run.scoring.evacuationPoint || "",
      score,
    },
    comments: "",
    complaints: "",
    confirmed: true,
  };
  const len = JSON.stringify(runSubmit).length;

  // submit
  let resolvePromise: () => void;
  const promise = new Promise<void>((resolve) => (resolvePromise = resolve));
  const url = `${data.settings.submitHost}${data.settings.submitPath}`;
  fetch(url, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Basic " + btoa(runSubmit.referee.name + ":" + runSubmit.referee.auth),
    },
    body: JSON.stringify(runSubmit),
  })
    .then(async (response) => {
      const text = await response.text();
      if (response.status === 200 || response.status === 201) {
        console.log("successfully submitted run", text);
        const runHistoryEntry: IStateRunHistoryEntry = {
          runHistoryId: uuidv4(),
          run: clone(data.run),
          score,
          time,
          url,
          unixTimestamp: Math.floor(Date.now() / 1000),
          status: "successful",
        };
        storeCommitFunction("addEntryToRunHistory", runHistoryEntry);
        storeCommitFunction("resetCurrentRun");
        resolvePromise();
      } else {
        throw text;
      }
    })
    .catch((error) => {
      console.log({ msg: "failed to submit run", response: error.toString() });
      const runHistoryEntry: IStateRunHistoryEntry = {
        runHistoryId: uuidv4(),
        run: clone(data.run),
        score,
        time,
        url,
        unixTimestamp: Math.floor(Date.now() / 1000),
        status: "failed",
        error: error.toString(),
      };
      storeCommitFunction("addEntryToRunHistory", runHistoryEntry);
      storeCommitFunction("resetCurrentRun");
      resolvePromise();
    });

  return {
    details: {
      requestLength: len,
    },
    promise,
  };
}

function calculateScore(scoring: IStateRun["scoring"]) {
  return scoring.teamStarted ? 5 : 0;
}

export function sendRunStartedEvent(data: { settings: IStateSettings; run: IStateRun }): void {
  try {
    const url = `${data.settings.submitHost}/api/v1/run_started`;
    fetch(url, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Basic " + btoa(data.settings.username + ":" + data.settings.password),
      },
      body: JSON.stringify({
        run: {
          competition: data.settings.submitEvent + "-" + data.run.competition,
          arenaId: data.run.arenaId,
          round: data.run.round,
          teamId: data.run.teamId,
        },
      }),
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.log({ msg: "failed to send run_started event", response: error.toString() });
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function clone(obj: any) {
  return JSON.parse(JSON.stringify(obj));
}
