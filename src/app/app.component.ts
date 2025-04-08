import { Component } from '@angular/core';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [DashboardComponent, HeaderComponent, FooterComponent],
  styleUrl: './app.component.sass'
})
export class AppComponent {
  title = 'todo-due';
}
