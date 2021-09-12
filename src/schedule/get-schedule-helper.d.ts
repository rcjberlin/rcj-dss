export const jsonFiles: string[];
export function getComputedData(
  data: string[],
  jsonFiles: string[]
): {
  rounds: number;
  arenasByCompetition: {
    [competition: string]: string[];
  };
};
