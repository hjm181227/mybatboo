import { createAction, createReducer, on, props } from "@ngrx/store";
import { initUserState, UserState } from "./user.state";
import { createActionExtend } from "@mapiacompany/armory";

const logout = createAction('[user] logout');
const deleteAccount = createAction('[user] delete account')

const loadCurrentUser = createActionExtend({
  type: '[user] load current user',
  begin: props<{ context?: string }>(),
  success: props<{ currentUser: User, context?: string }>()
});


const retryLoadCurrentUser = createActionExtend({
  type: '[user] retry load current user'
});

const setRecentCropType = createAction('[user] set recent crop type', props<{ recentCropType: number }>());

export const ngrxUserActions = {
  logout,
  loadCurrentUser,
  deleteAccount,
  retryLoadCurrentUser,
  setRecentCropType,
}

export const userReducer = createReducer<UserState>(initUserState,
  on(logout, (state) => {
    return {
      ...state,
      currentUser: undefined,
      recentCropType: undefined
    }
  }),
  on(deleteAccount, (state) => {
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
  }),
  on(setRecentCropType, (state, { recentCropType }) => {
    return {
      ...state,
      recentCropType
    }
  })
)
