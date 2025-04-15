import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-task-card',
  standalone: true,
  imports: [CommonModule], // Import CommonModule
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.sass']
})
export class TaskCardComponent {
  @Input() task: Task = {
    id: 0,
    name: '',
    course: '',
    dueDate: '',
    description: '',
    effortEstimate: 0,
    notes: '',
    status: 'TODO'
  };
  @Output() deleteTask = new EventEmitter<Task>();
  @Output() viewDetails = new EventEmitter<Task>();

  onDelete(): void {
    const isConfirmed = window.confirm(`Are you sure you want to delete the task "${this.task.name}"?`);
    if (isConfirmed) {
      this.deleteTask.emit(this.task);
    }
  }

  onViewDetails(): void {
    this.viewDetails.emit(this.task);
  }

  getBackgroundColor(): string {
    const currentDate = new Date();
    const dueDate = new Date(this.task.dueDate);
    const timeDiff = dueDate.getTime() - currentDate.getTime();
    const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24)); // Convert milliseconds to days

    if (daysDiff > 7) {
      return 'green'; // More than 7 days
    } else if (daysDiff > 3) {
      return 'yellow'; // Between 4 and 7 days
    } else if (daysDiff > 1) {
      return 'orange'; // Between 2 and 3 days
    } else if (daysDiff >= 0) {
      return 'red'; // Less than 24 hours
    } else {
      return 'darkred'; // Past due
    }
  }
}
