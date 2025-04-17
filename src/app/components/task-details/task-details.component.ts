import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Task } from '../../models/task.model';
import { TaskStatus } from '../../enum/task-status.enum';

@Component({
  selector: 'app-task-details',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.sass']
})
export class TaskDetailsComponent {
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
  @Output() closeDetails = new EventEmitter<void>();
  @Output() taskUpdated = new EventEmitter<Task>();

  isEditing = false;

  onClose(): void {
    this.closeDetails.emit();
  }

  toggleEdit(): void {
    this.isEditing = !this.isEditing;
  }

  saveChanges(): void {

    if (!this.task.name || !this.task.dueDate) {
      alert('Please fill in all required fields');
      return;
    }

    this.taskUpdated.emit(this.task);
    this.isEditing = false;
  }
}
