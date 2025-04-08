import { Component } from '@angular/core';
import { DashboardComponent } from './components/dashboard/dashboard.component';

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
