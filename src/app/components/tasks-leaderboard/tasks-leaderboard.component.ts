import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tasks-leaderboard',
  standalone: true,
  templateUrl: './tasks-leaderboard.component.html',
  styleUrl: './tasks-leaderboard.component.sass',
  imports: [CommonModule]
})
export class TasksLeaderboardComponent {
  @Input() todoTasks: any[] = [];
  @Input() inProgressTasks: any[] = [];
  @Input() doneTasks: any[] = [];

  getUrgentTasks(): any[] {
    const allTasks = [...this.todoTasks, ...this.inProgressTasks];
    const nonDoneTasks = allTasks.filter(task => task.status !== 'Done');
  
    return nonDoneTasks.sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());
  }

}
