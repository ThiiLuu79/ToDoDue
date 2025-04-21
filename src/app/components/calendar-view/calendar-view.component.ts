import { Component, Input, OnInit, Signal, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task } from '../../models/task.model';
import { HelptextComponent } from '../helptext/helptext.component';
import { DueDateTypes } from '../../enum/due-date-types.enum';
import { DueDateColors } from '../../enum/due-date-colors.enum';
import { Store } from '@ngrx/store';
import { selectCurrentMonth } from '../../state/calendar/calendar.selector';
import { setMonth } from '../../state/calendar/calendar.action';
import { selectCurrentView } from '../../state/calendar/calendar.selector';
import { setCurrentView } from '../../state/calendar/calendar.action';
import { toSignal } from '@angular/core/rxjs-interop';

type CalendarViewType = 'day' | 'week' | 'month';

@Component({
  selector: 'app-calendar-view',
  standalone: true,
  templateUrl: './calendar-view.component.html',
  styleUrls: ['./calendar-view.component.sass'],
  imports: [CommonModule, HelptextComponent]
})
export class CalendarViewComponent implements OnInit {
  private _tasks: Task[] = [];
  @Input()
  set tasks(value: Task[]) {
    this._tasks = value;
    this.generateCalendar();
  }

  get tasks(): Task[] {
    return this._tasks;
  }

  currentMonthSignal: Signal<Date>;
  currentViewSignal: Signal<string>;
  weeks = signal<{ date: Date; tasks: Task[] }[][]>([]);
  dayTasks = signal<{ date: Date; tasks: Task[] }>({ date: new Date(), tasks: [] });
  weekDays = signal<{ date: Date; tasks: Task[] }[]>([]);

  currentView = signal<CalendarViewType>('month');

  constructor(private store: Store) {
    this.currentMonthSignal = toSignal(this.store.select(selectCurrentMonth), { initialValue: new Date() });
    this.currentViewSignal = toSignal(this.store.select(selectCurrentView), { initialValue: 'month' });
  }

  ngOnInit(): void {
    this.generateCalendar();
  }

  setView(view: CalendarViewType): void {
    this.currentView.set(view);
    this.store.dispatch(setCurrentView({ view }));
    this.generateCalendar();
  }

  previousMonth(): void {
    const newMonth = new Date(this.currentMonthSignal().getTime());
    newMonth.setMonth(newMonth.getMonth() - 1);
    this.store.dispatch(setMonth({ month: newMonth }));
    this.generateCalendar();
  }

  nextMonth(): void {
    const newMonth = new Date(this.currentMonthSignal().getTime());
    newMonth.setMonth(newMonth.getMonth() + 1);
    this.store.dispatch(setMonth({ month: newMonth }));
    this.generateCalendar();
  }

  currentMonthView(): void {
    const today = new Date();
    this.store.dispatch(setMonth({ month: today }));
    this.generateCalendar();
  }

  private generateCalendar(): void {
    const currentDate = this.currentMonthSignal();
    const currentView = this.currentViewSignal() as CalendarViewType;
  
    if (currentView === 'day') {
      const iso = currentDate.toISOString().split('T')[0];
      const tasksForDay = this.tasks.filter(task => task.dueDate.startsWith(iso));
      this.dayTasks.set({ date: currentDate, tasks: tasksForDay });
  
    } else if (currentView === 'week') {

      const today = new Date();
      const dayOfWeek = today.getDay();
      const sunday = new Date(today);
      sunday.setDate(today.getDate() - dayOfWeek);
      const week = [];
  
      for (let i = 0; i < 7; i++) {
        const date = new Date(sunday);
        date.setDate(sunday.getDate() + i);
        const iso = date.toISOString().split('T')[0];
        const tasksForDay = this.tasks.filter(task => task.dueDate.startsWith(iso));
        week.push({ date, tasks: tasksForDay });
      }
  
      this.weekDays.set(week);
  
    } else {
      const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
      const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
      const startDay = startOfMonth.getDay();
      const daysInMonth = endOfMonth.getDate();
  
      const calendar: { date: Date; tasks: Task[] }[] = [];
  
      for (let i = 0; i < startDay; i++) {
        calendar.push({ date: null as any, tasks: [] });
      }
  
      for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
        const iso = date.toISOString().split('T')[0];
        const tasksForDay = this.tasks.filter(task => task.dueDate.startsWith(iso));
        calendar.push({ date, tasks: tasksForDay });
      }
  
      const weekChunks: { date: Date; tasks: Task[] }[][] = [];
      for (let i = 0; i < calendar.length; i += 7) {
        weekChunks.push(calendar.slice(i, i + 7));
      }
  
      this.weeks.set(weekChunks);
    }
  }

  getDayLabel(date: Date | null): string {
    return date ? date.getDate().toString() : '';
  }

  isToday(date: Date | null): boolean {
    if (!date) return false;
  
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  }

  getTaskColor(dueDate: string): string {
    const currentDate = new Date();
    const taskDueDate = new Date(dueDate);
    const timeDiff = taskDueDate.getTime() - currentDate.getTime();
    const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
  
    if (daysDiff > DueDateTypes.MORE_THAN_7_DAYS) {
      return DueDateColors.MORE_THAN_7_DAYS;
    } else if (daysDiff >= DueDateTypes.BETWEEN_4_AND_7_DAYS) {
      return DueDateColors.BETWEEN_4_AND_7_DAYS;
    } else if (daysDiff >= DueDateTypes.BETWEEN_2_AND_3_DAYS) {
      return DueDateColors.BETWEEN_2_AND_3_DAYS;
    } else if (daysDiff >= DueDateTypes.PAST_DUE) {
      return DueDateColors.LESS_THAN_24_HOURS;
    } else {
      return DueDateColors.PAST_DUE;
    }
  }
}
