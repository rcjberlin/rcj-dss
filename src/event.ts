import mitt from "mitt";

type Events = {
  "loader-start": string;
  [event: string]: any;
};
export const eventBus = mitt<Events>();
