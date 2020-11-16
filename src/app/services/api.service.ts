import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  readonly currencyApiUrl: string =
    'http://apilayer.net/api/live?access_key=3c81786f9b3d2e267f40d08af97b97f2&currencies=usd%2Cils%2Ceur%2Cbtc%2Cthb&fbclid=IwAR2fHpjxNurqH86ad8vz5CPum_TubfxF_JRxd4YbB4SxgMChEurO1kFHYnI';
  readonly cryptoApiUrl: string = 'http://fs1.co.il/bus/bitcoin.php';
  readonly cryptoSymbolApiUrl: string =
    'https://files.coinmarketcap.com/static/widget/coins_legacy/64x64';

  constructor(private http: HttpClient) {}

  fetchCurrency(): Observable<object> {
    return this.http.get(this.currencyApiUrl).pipe(
      map(({ quotes }: any) => {
        let newData = {};
        for (let key in quotes) {
          const newKey = key.replace('USD', '');
          newData[newKey] = quotes[key];
        }
        return newData;
      })
    );
  }

  fetchCrypto(): Observable<any> {
    return this.http.get(this.cryptoApiUrl);
  }

  fetchCryptoSymbol(cryptoId: string): string {
    return `${this.cryptoSymbolApiUrl}/${cryptoId}.png`;
  }
}
