import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CalendarState } from './calendar.models';

export const selectCalendarState = createFeatureSelector<CalendarState>('calendar');

export const selectCurrentMonth = createSelector(
  selectCalendarState,
  (state: CalendarState) => state.currentMonth
);

export const selectCurrentView = createSelector(
  selectCalendarState,
  (state: CalendarState) => state.currentView
);
