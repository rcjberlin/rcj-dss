import mitt from "mitt";

type Events = {
  "loader-start": string;
  [event: string]: any; // eslint-disable-line
};
export const eventBus = mitt<Events>();
