import { createReducer, on } from '@ngrx/store';
import { RankSortState } from './rank-sort.models';
import * as RankSortAction from './rank-sort.action';
import { TaskRankingTypes } from '../../enum/task-ranking-types.enum';

const initialState: RankSortState = {
  currentSortType: TaskRankingTypes.DUE_DATE
};

export const sortTypeReducer = createReducer(
  initialState,
  on(RankSortAction.setSortType, (state, { sortType }) => ({
    ...state,
    currentSortType: sortType
  }))
);
