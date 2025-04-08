import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskCardComponent } from '../task-card/task-card.component';
import { TaskFormComponent } from '../task-form/task-form.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, TaskCardComponent, TaskFormComponent], // Import CommonModule and TaskCardComponent
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass']
})
export class DashboardComponent {
  isTaskFormOpen = false;
  todoTasks: any[] = [];

  openTaskForm(): void {
    this.isTaskFormOpen = true;
  }

  closeTaskForm(): void {
    this.isTaskFormOpen = false;
  }

  addTaskToTodoColumn(task: any): void {
    this.todoTasks.push(task);
    this.closeTaskForm();
  }
}
