import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-task-details',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.sass']
})
export class TaskDetailsComponent {
  @Input() task: any;
  @Output() closeDetails = new EventEmitter<void>();
  @Output() taskUpdated = new EventEmitter<any>();

  isEditing = false;

  onClose(): void {
    this.closeDetails.emit();
  }

  toggleEdit(): void {
    this.isEditing = !this.isEditing;
  }

  saveChanges(): void {

    if (!this.task.name) {
      alert('Please fill in all required fields');
      return;
    }

    this.taskUpdated.emit(this.task);
    this.isEditing = false;
  }
}
