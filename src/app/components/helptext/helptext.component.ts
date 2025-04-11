import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-helptext',
  templateUrl: './helptext.component.html',
  styleUrls: ['./helptext.component.sass'],
  standalone: true,
  imports: [CommonModule]
})
export class HelptextComponent {
  @Input() description: string = '';
}
