import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.sass']
})
export class TaskDetailsComponent {
  @Input() task: any;
  @Output() closeDetails = new EventEmitter<void>();

  onClose(): void {
    this.closeDetails.emit();
  }
}
