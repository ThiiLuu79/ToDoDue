import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [FormsModule, CommonModule], // Import FormsModule and CommonModule
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.sass']
})
export class TaskFormComponent {
  @Output() taskCreated = new EventEmitter<any>();

  task = {
    name: '',
    course: '',
    dueDate: '',
    description: '',
    effortEstimate: null,
    notes: ''
  };

  createTask(): void {
    if (!this.task.name || !this.task.course || !this.task.dueDate) {
      alert('Please fill in all required fields: Task Name, Course, and Due Date.');
      return;
    }

    this.taskCreated.emit(this.task);

    this.task = {
      name: '',
      course: '',
      dueDate: '',
      description: '',
      effortEstimate: null,
      notes: ''
    };
  }
}
