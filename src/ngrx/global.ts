import { ActionReducerMap, MetaReducer } from "@ngrx/store";
import { InjectionToken, Type } from "@angular/core";
import { UserState } from "./user.state";
import { userReducer } from "./user.reducer";
import { UserEffects } from "./user.effects";

export interface GlobalState {
  user: UserState;
}

export const globalReducers: ActionReducerMap<GlobalState> = {
  user: userReducer,
};

export const GLOBAL_EFFECTS: Type<any>[] = [
  UserEffects,
];

export function _getGlobalReducers() {
  return globalReducers;
}

export const REDUCERS_TOKEN = new InjectionToken<ActionReducerMap<GlobalState>>('MyBatBoo Registered Reducers');
export const metaReducers: MetaReducer<GlobalState>[] = [];

export const ngrxEvents = {
  // paymentSuccess: createAction('[event] payment-success', props<{
  //   order: Order,
  // }>()),
};
