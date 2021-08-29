export interface IComponentsNavigationBarConfig {
  hideNavigationBar?: boolean;
  disableDrawerSwipeGestures?: boolean;
  backButtonInsteadOfDrawer?: boolean;
  backButtonRoute?: string;
}

export interface IStateSettings {
  language: string;
  drawerSide: "left" | "right";
}

export interface IState {
  settings: IStateSettings;
  [moduleName: string]: any;
}
