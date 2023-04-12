import { createFeatureSelector, createSelector } from "@ngrx/store";

export interface UserState {
  currentUser: User;
  recentCropType: string;
}

export const initUserState: UserState = {
  currentUser: undefined,
  recentCropType: undefined,
}

const selectUserFeature = createFeatureSelector<UserState>('user');

export const selectCurrentUser = createSelector(
  selectUserFeature, (state => state.currentUser)
);
