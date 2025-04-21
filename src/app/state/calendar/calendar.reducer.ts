import { createReducer, on } from '@ngrx/store';
import { CalendarState } from './calendar.models';
import * as CalendarActions from './calendar.action';

const initialState: CalendarState = {
  currentMonth: new Date()
};

export const calendarReducer = createReducer(
  initialState,
  on(CalendarActions.setMonth, (state, { month }) => ({
    ...state,
    currentMonth: month
  }))
);
