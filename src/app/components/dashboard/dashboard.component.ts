import { Component } from '@angular/core';
import { TaskFormComponent } from '../task-form/task-form.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  standalone: true,
  imports: [TaskFormComponent],
  styleUrls: ['./dashboard.component.sass']
})
export class DashboardComponent {
  isTaskFormOpen = false;

  openTaskForm(): void {
    this.isTaskFormOpen = true;
  }

  closeTaskForm(): void {
    this.isTaskFormOpen = false;
  }
}
