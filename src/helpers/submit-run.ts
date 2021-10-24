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
  if (!data.schedule.competitions.includes(data.run.competition || "")) {
    throw new Error("Invalid value for competition");
  }
  const team = data.schedule.teams.find((team) => team.teamId === data.run.teamId);
  if (!team) {
    throw new Error("No teamname found for this team ID");
  }
  if (data.run.round === undefined) {
    throw new Error("Round must not be undefined");
  }
  if (data.run.arenaId === undefined) {
    throw new Error("ArenaId must not be undefined");
  }
  if (data.run.time.timestampRunStart === null || data.run.time.timestampRunEnd === null) {
    throw new Error("Timestamps for run start and end must not be null");
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
    time_start: data.run.time.timestampRunStart,
    time_end: data.run.time.timestampRunEnd,
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
          run: data.run,
          score,
          time,
          url,
          timestamp: Math.floor(Date.now() / 1000),
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
        run: data.run,
        score,
        time,
        url,
        timestamp: Math.floor(Date.now() / 1000),
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
