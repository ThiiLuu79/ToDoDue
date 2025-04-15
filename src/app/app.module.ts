import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TaskFormComponent } from './components/task-form/task-form.component';
import { TaskCardComponent } from './components/task-card/task-card.component';
import { TaskDetailsComponent } from './components/task-details/task-details.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ColorLegendComponent } from './components/color-legend/color-legend.component';
import { TasksLeaderboardComponent } from './components/tasks-leaderboard/tasks-leaderboard.component';
import { HelptextComponent } from './components/helptext/helptext.component';
import { QuoteComponent } from './components/quote/quote.component';

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
    FooterComponent,
    ColorLegendComponent,
    TasksLeaderboardComponent,
    HelptextComponent,
    QuoteComponent
  ],
  providers: [
    provideClientHydration(withEventReplay())
  ],
  bootstrap: [AppComponent],
  declarations: []
})
export class AppModule { }
