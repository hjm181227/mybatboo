import { ActionReducerMap, MetaReducer } from "@ngrx/store";
import { InjectionToken, Type } from "@angular/core";
import { UserState } from "./user.state";
import { userReducer } from "./user.reducer";
import { UserEffects } from "./user.effects";
import { routerReducer, RouterReducerState } from "@ngrx/router-store";
import { RouterEffects } from "./router.effects";

export interface GlobalState {
  user: UserState;
  router: RouterReducerState<any>;
}

export const globalReducers: ActionReducerMap<GlobalState> = {
  user: userReducer,
  router: routerReducer,
};

export const GLOBAL_EFFECTS: Type<any>[] = [
  UserEffects,
  RouterEffects,
];

export function _getGlobalReducers() {
  return globalReducers;
}

export const REDUCERS_TOKEN = new InjectionToken<ActionReducerMap<GlobalState>>('MyBatBoo Registered Reducers');
export const metaReducers: MetaReducer<GlobalState>[] = [];

export const ngrxEvents = {
};
