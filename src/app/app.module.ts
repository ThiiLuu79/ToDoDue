import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // Required for [(ngModel)]
import { CommonModule } from '@angular/common'; // Required for *ngFor and other directives

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component'; // Standalone component
import { DashboardComponent } from './components/dashboard/dashboard.component'; // Standalone component
import { TaskFormComponent } from './components/task-form/task-form.component'; // Standalone component
import { TaskCardComponent } from './components/task-card/task-card.component'; // Standalone component

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule, // Import FormsModule for [(ngModel)]
    CommonModule, // Import CommonModule for *ngFor and *ngIf
    AppComponent, // Import standalone AppComponent
    DashboardComponent, // Import standalone DashboardComponent
    TaskFormComponent, // Import standalone TaskFormComponent
    TaskCardComponent // Import standalone TaskCardComponent
  ],
  providers: [
    provideClientHydration(withEventReplay())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
