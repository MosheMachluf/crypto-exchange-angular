import { Component, OnInit } from '@angular/core';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'exchange-calc';
  result: number = 0;
  cryptoSrc: string;

  constructor(private api: ApiService) {}

  calc = (values) => {
    const { amount, from, to, cryptoSrc } = values;
    const amountInUSD = amount / from;
    const result = amountInUSD * to;
    this.result = result;
    this.cryptoSrc = cryptoSrc;
  };

  ngOnInit() {}
}
