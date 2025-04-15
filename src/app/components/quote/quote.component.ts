import { Component } from '@angular/core';
import { QUOTES } from '../../constants/quotes.constant';

@Component({
  selector: 'app-quote',
  standalone: true,
  templateUrl: './quote.component.html',
  styleUrl: './quote.component.sass'
})
export class QuoteComponent {
  quoteOfTheDay: string = '';

  ngOnInit(): void {
    this.setQuoteOfTheDay();
  }

  private setQuoteOfTheDay(): void {
    const today = new Date();
    const seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
    
    const randomIndex = seed % QUOTES.length;
    this.quoteOfTheDay = QUOTES[randomIndex];
  }
}
