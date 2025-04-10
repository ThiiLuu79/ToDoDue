import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { TaskCardComponent } from '../task-card/task-card.component';
import { TaskFormComponent } from '../task-form/task-form.component';
import { TaskDetailsComponent } from '../task-details/task-details.component';
import { ColorLegendComponent } from '../color-legend/color-legend.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    DashboardComponent,
    TaskCardComponent,
    TaskFormComponent,
    TaskDetailsComponent,
    ColorLegendComponent,
    RouterModule.forChild([
      { path: '', component: DashboardComponent },
    ]),
  ],
})
export class DashboardModule {}
