import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // Required for [(ngModel)]
import { CommonModule } from '@angular/common'; // Required for *ngFor and other directives

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component'; // Standalone component
import { DashboardComponent } from './components/dashboard/dashboard.component'; // Standalone component
import { TaskFormComponent } from './components/task-form/task-form.component'; // Standalone component
import { TaskCardComponent } from './components/task-card/task-card.component';
import { TaskDetailsComponent } from './components/task-details/task-details.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component'; // Standalone component

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CommonModule,
    AppComponent,
    DashboardComponent,
    TaskFormComponent,
    TaskCardComponent,
    TaskDetailsComponent,
    HeaderComponent,
    FooterComponent
  ],
  providers: [
    provideClientHydration(withEventReplay())
  ],
  bootstrap: [AppComponent],
  declarations: []
})
export class AppModule { }
