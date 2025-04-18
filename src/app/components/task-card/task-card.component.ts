import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task } from '../../models/task.model';
import { TaskStatus } from '../../enum/task-status.enum';
import { DueDateTypes } from '../../enum/due-date-types.enum';
import { DueDateColors } from '../../enum/due-date-colors.enum';

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
    status: TaskStatus.TODO
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
