import { createAction, props } from '@ngrx/store';

export const setMonth = createAction(
  '[Calendar] Set Month',
  props<{ month: Date }>()
);

export const setCurrentView = createAction(
  '[Calendar] Set View',
  props<{ view: string }>()
);
