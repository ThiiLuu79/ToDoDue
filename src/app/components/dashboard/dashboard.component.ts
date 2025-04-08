import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.sass'
})
export class DashboardComponent {
  constructor() {}

  ngOnInit(): void {
    // Initialization logic for the Kanban dashboard can go here
  }
}
