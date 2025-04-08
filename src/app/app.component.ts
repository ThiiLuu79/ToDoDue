import { Component } from '@angular/core';
import { TaskCardComponent } from './components/task-card/task-card.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TaskFormComponent } from './components/task-form/task-form.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [DashboardComponent],
  styleUrl: './app.component.sass'
})
export class AppComponent {
  title = 'todo-due';
}
