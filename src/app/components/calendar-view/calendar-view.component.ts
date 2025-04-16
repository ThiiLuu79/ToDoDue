import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-calendar-view',
  standalone: true,
  templateUrl: './calendar-view.component.html',
  styleUrls: ['./calendar-view.component.sass'],
  imports: [CommonModule]
})
export class CalendarViewComponent implements OnInit {
  currentMonth: Date = new Date();
  weeks: { date: Date; tasks: Task[] }[][] = [];
  @Input() tasks: Task[] = [];

  ngOnInit(): void {
    this.generateCalendar();
  }

  ngOnChanges(): void {
    this.generateCalendar();
  }

  previousMonth(): void {
    this.currentMonth = new Date(this.currentMonth.setMonth(this.currentMonth.getMonth() - 1));
    this.generateCalendar();
  }

  nextMonth(): void {
    this.currentMonth = new Date(this.currentMonth.setMonth(this.currentMonth.getMonth() + 1));
    this.generateCalendar();
  }

  currentMonthView(): void {
    this.currentMonth = new Date();
    this.generateCalendar();
  }

  private generateCalendar(): void {
    const startOfMonth = new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth(), 1);
    const endOfMonth = new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth() + 1, 0);

    const startDay = startOfMonth.getDay();
    const daysInMonth = endOfMonth.getDate();

    const calendar: { date: Date; tasks: Task[] }[] = [];

    for (let i = 0; i < startDay; i++) {
      calendar.push({ date: null as any, tasks: [] });
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth(), day);
      const iso = date.toISOString().split('T')[0];

      const tasksForDay = this.tasks.filter(task => task.dueDate.startsWith(iso));
      calendar.push({ date, tasks: tasksForDay });
    }

    this.weeks = [];
    for (let i = 0; i < calendar.length; i += 7) {
      this.weeks.push(calendar.slice(i, i + 7));
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
  
    if (daysDiff > 7) {
      return 'green';
    } else if (daysDiff > 3) {
      return 'yellow';
    } else if (daysDiff > 1) {
      return 'orange';
    } else if (daysDiff >= 0) {
      return 'red';
    } else {
      return 'darkred';
    }
  }
}
