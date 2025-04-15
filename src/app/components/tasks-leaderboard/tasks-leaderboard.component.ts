import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HelptextComponent } from '../helptext/helptext.component';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-tasks-leaderboard',
  standalone: true,
  templateUrl: './tasks-leaderboard.component.html',
  styleUrl: './tasks-leaderboard.component.sass',
  imports: [CommonModule, HelptextComponent]
})
export class TasksLeaderboardComponent {
  @Input() todoTasks: Task[] = [];
  @Input() inProgressTasks: Task[] = [];
  @Input() doneTasks: Task[] = [];

  getUrgentTasks(): Task[] {
    const allTasks = [...this.todoTasks, ...this.inProgressTasks];
    const nonDoneTasks = allTasks.filter(task => task.status !== 'Done');
  
    return nonDoneTasks.sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());
  }

  getTaskRankClass(index: number): string {
    if (index === 0) {
      return 'gold';
    } else if (index === 1) {
      return 'silver';
    } else if (index === 2) {
      return 'bronze';
    }
    return '';
  }
}
