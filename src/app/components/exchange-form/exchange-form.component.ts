import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';

interface formValues {
  amount: number;
  from: string;
  to: string;
  cryptoSrc: string;
}

@Component({
  selector: 'app-exchange-form',
  template: `
    <form class="mb-3" [formGroup]="exchange" (ngSubmit)="submit()">
      <div class="form-group">
        <span class="text-danger"> * </span><label for="amount">Amount</label>
        <input
          type="number"
          class="form-control"
          id="amount"
          min="0"
          formControlName="amount"
          [ngClass]="{
            'is-invalid':
              exchange.controls['amount'].errors &&
              exchange.controls['amount'].touched,
            'is-valid':
              !exchange.controls['amount'].errors &&
              exchange.controls['amount'].touched
          }"
        />
        <div
          class="text-danger"
          *ngIf="
            exchange.controls['amount'].touched &&
            exchange.controls['amount'].errors?.required
          "
        >
          Please enter amount
        </div>
        <div
          class="text-danger"
          *ngIf="
            exchange.controls['amount'].touched &&
            exchange.controls['amount'].errors?.min
          "
        >
          An amount must be greater than 0
        </div>
      </div>

      <div class="form-row">
        <div class="form-group col-md-6">
          <span class="text-danger"> * </span>
          <label for="fromCurrency">From</label>
          <select
            name="from"
            id="fromCurrency"
            class="form-control"
            formControlName="from"
            [ngClass]="{
              'is-invalid':
                exchange.controls['from'].errors &&
                exchange.controls['from'].touched,
              'is-valid':
                !exchange.controls['from'].errors &&
                exchange.controls['from'].touched
            }"
          >
            <option selected value="">Choose currency...</option>
            <option
              *ngFor="let currency of currencyData | keyvalue"
              [value]="currency.value"
            >
              {{ currency.key }}
              ({{ currency.key | getCurrencySymbol }})
            </option>
          </select>
          <div
            class="text-danger"
            *ngIf="
              (exchange.controls['from'].touched || submitted) &&
              exchange.controls['from'].errors?.required
            "
          >
            Please choose currency
          </div>
        </div>
        <div class="form-group col-md-6">
          <span class="text-danger"> * </span>
          <label for="toCurrency">To</label>
          <select
            name="to"
            id="toCurrency"
            class="form-control text-capitalize"
            formControlName="to"
            #toCurrency
            (input)="getCryptoId(toCurrency)"
            [ngClass]="{
              'is-invalid':
                exchange.controls['to'].errors &&
                exchange.controls['to'].touched,
              'is-valid':
                !exchange.controls['to'].errors &&
                exchange.controls['to'].touched
            }"
          >
            <option selected value="">Choose Crypto...</option>
            <option
              *ngFor="let crypto of cryptoData | keyvalue"
              [value]="crypto.value"
            >
              {{ crypto.key }}
            </option>
          </select>
          <div
            class="text-danger"
            *ngIf="
              (exchange.controls['to'].touched || submitted) &&
              exchange.controls['to'].errors?.required
            "
          >
            Please choose crypto
          </div>
        </div>
      </div>

      <button
        type="submit"
        class="btn btn-success text-uppercase font-weight-bold btn-block"
        [disabled]="exchange.invalid || loading"
      >
        <span
          class="spinner-border spinner-border-sm mr-2"
          [hidden]="!loading"
        ></span>
        Exchange
        <i class="fas fa-angle-double-right ml-2"></i>
      </button>
    </form>
  `,
  styles: [],
})
export class ExchangeFormComponent implements OnInit {
  @Output() sendValues: EventEmitter<formValues> = new EventEmitter();

  currencyData: object = null;
  cryptoData: object = null;

  submitted: boolean = false;
  loading: boolean = false;

  cryptoId: string = null;

  exchange: FormGroup = new FormGroup({
    amount: new FormControl(null, [Validators.required, Validators.min(0.1)]),
    from: new FormControl('', Validators.required),
    to: new FormControl('', Validators.required),
  });

  constructor(private api: ApiService) {
    this.api
      .fetchCurrency()
      .subscribe(({ rates }: any) => (this.currencyData = rates));
    this.api
      .fetchCrypto()
      .subscribe(({ rates }: any) => (this.cryptoData = rates));
  }

  getCryptoById(cryptoId: string) {
    return this.api.fetchCryptoSymbol(cryptoId);
  }

  getCryptoId(toCurrency) {
    this.cryptoId = toCurrency.options[toCurrency.selectedIndex].text;
  }

  submit(): void {
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
      this.submitted = true;
      const cryptoSrc = this.getCryptoById(this.cryptoId);
      this.sendValues.emit({ ...this.exchange.value, cryptoSrc });
    }, 500);
  }

  ngOnInit(): void {
    // this.exchange.valueChanges.subscribe((data) => console.log(data));
  }
}
