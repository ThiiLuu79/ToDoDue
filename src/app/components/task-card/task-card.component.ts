import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-card',
  standalone: true,
  imports: [CommonModule], // Import CommonModule
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.sass']
})
export class TaskCardComponent {
  @Input() task: any;
  @Output() deleteTask = new EventEmitter<any>();

  onDelete(): void {
    this.deleteTask.emit(this.task);
  }
}