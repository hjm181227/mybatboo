import { createAction, createReducer, on, props } from "@ngrx/store";
import { initUserState, UserState } from "./user.state";
import { createActionExtend } from "./util";

const logout = createAction('[user] logout');

const loadCurrentUser = createActionExtend({
  type: '[user] load current user',
  begin: props<{ context?: string }>(),
  success: props<{ currentUser: User, context?: string }>()
});


const retryLoadCurrentUser = createActionExtend({
  type: '[user] retry load current user'
});

export const ngrxUserActions = {
  logout,
  loadCurrentUser,
  retryLoadCurrentUser
}

export const userReducer = createReducer<UserState>(initUserState,
  on(logout, (state) => {
    return {
      ...state,
      currentUser: undefined,
      recentCropType: undefined
    }
  }),
  on(loadCurrentUser.SUCCESS, (state, { currentUser }) => {
    return {
      ...state,
      currentUser
    }
  })
)
