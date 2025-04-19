import { createFeatureSelector, createSelector } from '@ngrx/store';
import { RankSortState } from './rank-sort.models';

export const selectSortTypeState = createFeatureSelector<RankSortState>('sortType');

export const selectCurrentSortType = createSelector(
  selectSortTypeState,
  (state: RankSortState) => state.currentSortType
);
