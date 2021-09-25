import { NavigationGuardNext, RouteLocationNormalized } from "vue-router";

const preventRoutingCallbacks: Array<() => void> = [];

export function preventRouting(callback: () => void): void {
  preventRoutingCallbacks.push(callback);
}
export function allowRouting(callback: () => void): void {
  const indexOfCallback = preventRoutingCallbacks.indexOf(callback);
  if (indexOfCallback > -1) {
    preventRoutingCallbacks.splice(indexOfCallback, 1);
  }
}

export function beforeEachHandler(_to: RouteLocationNormalized, _from: RouteLocationNormalized, next: NavigationGuardNext): void {
  if (preventRoutingCallbacks.length > 0) {
    next(false);
    for (const callback of preventRoutingCallbacks) {
      callback();
    }
  } else {
    next();
  }
}
