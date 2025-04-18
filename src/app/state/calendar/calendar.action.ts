import { createAction, props } from '@ngrx/store';

export const setMonth = createAction(
  '[Calendar] Set Month',
  props<{ month: Date }>()
);
