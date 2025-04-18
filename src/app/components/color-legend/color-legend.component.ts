import { Component } from '@angular/core';
import { DueDateColors } from '../../enum/due-date-colors.enum';

@Component({
  selector: 'app-color-legend',
  standalone: true,
  templateUrl: './color-legend.component.html',
  styleUrl: './color-legend.component.sass'
})
export class ColorLegendComponent {

  getLegendColor(type: string): string {
    switch (type) {
      case 'MORE_THAN_7_DAYS':
        return DueDateColors.MORE_THAN_7_DAYS;
      case 'BETWEEN_4_AND_7_DAYS':
        return DueDateColors.BETWEEN_4_AND_7_DAYS;
      case 'BETWEEN_2_AND_3_DAYS':
        return DueDateColors.BETWEEN_2_AND_3_DAYS;
      case 'LESS_THAN_24_HOURS':
        return DueDateColors.LESS_THAN_24_HOURS;
      case 'PAST_DUE':
        return DueDateColors.PAST_DUE;
      default:
        return 'transparent';
    }
  }

}
