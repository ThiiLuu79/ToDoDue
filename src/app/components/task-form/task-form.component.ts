import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HelptextComponent } from '../helptext/helptext.component';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [FormsModule, CommonModule, HelptextComponent], // Import FormsModule and CommonModule
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.sass']
})
export class TaskFormComponent {
  @Output() taskCreated = new EventEmitter<any>();

  task = {
    id : 0,
    name: '',
    course: '',
    dueDate: '',
    description: '',
    effortEstimate: 0,
    notes: '',
    status : 'TODO'
  };

  createTask(): void {
    if (!this.task.name || !this.task.dueDate) {
      alert('Please fill in all required fields');
      return;
    }
  
    // Assign a unique ID as a number
    this.task.id = Date.now(); // Keep it as a number
  
    this.taskCreated.emit(this.task);
  
    this.task = {
      id: 0, // Reset ID to null
      name: '',
      course: '',
      dueDate: '',
      description: '',
      effortEstimate: 0,
      notes: '',
      status: 'TODO'
    };
  }
}
