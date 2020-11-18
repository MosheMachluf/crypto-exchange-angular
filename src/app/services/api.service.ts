import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  readonly currencyApiUrl: string = `https://api.exchangerate.host/latest?base=USD&symbols=USD,EUR,ILS,THB`;
  readonly cryptoApiUrl: string =
    'https://api.exchangerate.host/latest?base=USD&source=crypto&symbols=BTC,ETH,XRP,LTC,EOS,XTZ,XBT';

  constructor(private http: HttpClient) {}

  fetchCurrency(): Observable<object> {
    return this.http.get(this.currencyApiUrl);
  }

  fetchCrypto(): Observable<object> {
    return this.http.get(this.cryptoApiUrl);
  }

  fetchCryptoSymbol(cryptoId: string): string {
    cryptoId = cryptoId.toLowerCase();
    return `https://cryptoicons.org/api/icon/${cryptoId}/64`;
  }
}
