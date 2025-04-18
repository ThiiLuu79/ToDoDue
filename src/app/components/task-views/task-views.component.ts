import { Component, Input } from '@angular/core';
import { TasksLeaderboardComponent } from '../tasks-leaderboard/tasks-leaderboard.component';
import { CalendarViewComponent } from '../calendar-view/calendar-view.component';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-task-views',
  standalone: true,
  templateUrl: './task-views.component.html',
  styleUrl: './task-views.component.sass',
  imports: [TasksLeaderboardComponent, CalendarViewComponent],
})
export class TaskViewsComponent {
  @Input() todoTasks: Task[] = [];
  @Input() inProgressTasks: Task[] = [];
  @Input() doneTasks: Task[] = [];

  getAllTasks(): Task[] {
    return [...this.todoTasks, ...this.inProgressTasks, ...this.doneTasks];
  }

}
