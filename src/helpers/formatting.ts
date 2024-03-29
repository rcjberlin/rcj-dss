export function convertDateToString(date: Date, formatString = "hh:mm:ss (DD.MM.YYYY)"): string {
  return formatString
    .replace("hh", pad(date.getHours()))
    .replace("mm", pad(date.getMinutes()))
    .replace("ss", pad(date.getSeconds()))
    .replace("DD", pad(date.getDate()))
    .replace("MM", pad(date.getMonth() + 1))
    .replace("YYYY", pad(date.getFullYear(), 4));
}

export function pad(value: string | number, length = 2, character: string | number = 0): string {
  value = String(value);
  return String(character).repeat(Math.max(0, length - value.length)) + value;
}

export function competitionIdToReadableName(competitionId: string): string {
  const mapping: { [id: string]: string } = { line: "Rescue Line", "line-entry": "Rescue Line Entry" };
  return mapping[competitionId] || competitionId;
}

export function parseServerScheduleTimestamp(timestamp: string): Date {
  // if the ISO 8601 timestamp ends with a two-digit timezone offset, 00 is appended so that JS can parse it
  return new Date(timestamp + (timestamp.match(/(\+|-)\d\d$/) ? "00" : ""));
}

export function getSecondsAsTimeString(timeInSeconds: number): string {
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = Math.floor(timeInSeconds % 60);
  const minutesStr = minutes < 10 ? minutes : minutes > 15 ? "X" : minutes.toString(16);
  const secondsStr = (seconds < 10 ? "0" : "") + seconds;
  return minutesStr + ":" + secondsStr;
}
