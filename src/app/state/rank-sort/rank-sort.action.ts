import { createAction, props } from '@ngrx/store';

export const setSortType = createAction(
  '[Sort Type] Set Sort Type',
  props<{ sortType: string }>()
);
