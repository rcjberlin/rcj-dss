export interface IComponentsNavigationBarConfig {
  hideNavigationBar?: boolean;
  disableDrawerSwipeGestures?: boolean;
  backButtonInsteadOfDrawer?: boolean;
  backButtonRoute?: string;
}

export interface IStateSettings {
  language: string;
  drawerSide: "left" | "right";
  submitEvent: string;
  submitHost: string;
  submitPath: string;
  username: string;
  password: string;
  loginStatus: boolean | null;
}

export interface IState {
  settings: IStateSettings;
  [moduleName: string]: any;
}
