import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskCardComponent } from '../task-card/task-card.component';
import { TaskFormComponent } from '../task-form/task-form.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, TaskCardComponent, TaskFormComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass']
})
export class DashboardComponent {
  isTaskFormOpen = false;
  todoTasks: any[] = [];
  inProgressTasks: any[] = [];
  doneTasks: any[] = [];

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

  onDragStart(event: DragEvent, task: any): void {
    event.dataTransfer?.setData('task', JSON.stringify(task));
  }

  onDrop(event: DragEvent, targetColumn: string): void {
    event.preventDefault();
    const taskData = event.dataTransfer?.getData('task');
    if (taskData) {
      const task = JSON.parse(taskData);
  
      // Remove task from its current column
      this.removeTaskFromColumn(task);
  
      // Update task status and add to the target column
      task.status = targetColumn;
      if (targetColumn === 'TODO') {
        this.todoTasks.push(task);
      } else if (targetColumn === 'In Progress') {
        this.inProgressTasks.push(task);
      } else if (targetColumn === 'Done') {
        this.doneTasks.push(task);
      }
    }
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
  }

  removeTaskFromColumn(task: any): void {
    // Remove the task from all columns by matching the ID
    this.todoTasks = this.todoTasks.filter(t => t.id !== task.id);
    this.inProgressTasks = this.inProgressTasks.filter(t => t.id !== task.id);
    this.doneTasks = this.doneTasks.filter(t => t.id !== task.id);
  }
}
