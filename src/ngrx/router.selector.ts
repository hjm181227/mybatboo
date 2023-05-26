import { getRouterSelectors, RouterReducerState } from '@ngrx/router-store';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Data } from '@angular/router';

export const selectRouter = createFeatureSelector<RouterReducerState<any>>(
  'router'
);

export const routerStateSelectors = getRouterSelectors(selectRouter);

export const selectUrl = routerStateSelectors.selectUrl;
export const selectQueryParams = routerStateSelectors.selectQueryParams;
export const selectRouteData = createSelector(
  routerStateSelectors.selectRouteData,
  routeData => routeData || {} as Data
);

export const selectNavigationId = createSelector(
  selectRouter,
  state => state && state.navigationId
);
