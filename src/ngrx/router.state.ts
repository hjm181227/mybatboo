import { createAction, props } from '@ngrx/store';

const goBack = createAction('[router] go back', props<{
  defaultHref?: string
}>());

export const ngrxRouterActions = {
  goBack
};
