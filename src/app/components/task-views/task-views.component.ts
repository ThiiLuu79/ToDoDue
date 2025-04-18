import { Component, Input } from '@angular/core';
import { TasksLeaderboardComponent } from '../tasks-leaderboard/tasks-leaderboard.component';
import { CalendarViewComponent } from '../calendar-view/calendar-view.component';
import { Task } from '../../models/task.model';
import { TododueViews } from '../../enum/tododue-views.enum';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-views',
  standalone: true,
  templateUrl: './task-views.component.html',
  styleUrl: './task-views.component.sass',
  imports: [TasksLeaderboardComponent, CalendarViewComponent, CommonModule],
})
export class TaskViewsComponent {
  @Input() todoTasks: Task[] = [];
  @Input() inProgressTasks: Task[] = [];
  @Input() doneTasks: Task[] = [];

  currentView: string = TododueViews.PRIORITIES;

  getAllTasks(): Task[] {
    return [...this.todoTasks, ...this.inProgressTasks, ...this.doneTasks];
  }

  showPriorities(): void {
    this.currentView = TododueViews.PRIORITIES;
  }

  showCalendar(): void{
    this.currentView = TododueViews.CALENDAR;
  }
}
