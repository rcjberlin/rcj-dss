const jsonFiles = ["teams.json", "events.json", "competitions.json", "arenas.json", "scheduled-runs.json"];

function getComputedData(data, jsonFiles) {
  return {
    ...JSON.parse(data[jsonFiles.findIndex((name) => name === "scheduled-runs.json")]).reduce((data, run) => {
      return {
        // get number of rounds from scheduled runs
        rounds: Math.max(data.rounds || 0, run.round),
        // find which arenas are used for which competition
        arenasByCompetition: {
          ...data.arenasByCompetition,
          [run.competition]:
            data.arenasByCompetition && run.competition in data.arenasByCompetition
              ? data.arenasByCompetition[run.competition].includes(run.arenaId)
                ? data.arenasByCompetition[run.competition]
                : data.arenasByCompetition[run.competition].concat([run.arenaId])
              : [run.arenaId],
        },
      };
    }),
  };
}

module.exports = {
  jsonFiles,
  getComputedData,
};
