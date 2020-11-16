import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { ReplacePipe } from './pipes/replace.pipe';
import { StripComponent } from './components/strip/strip.component';
import { ExchangeFormComponent } from './components/exchange-form/exchange-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ViewResultComponent } from './components/view-result/view-result.component';
import { FooterComponent } from './components/footer/footer.component';
import { GetCurrencySymbolPipe } from './pipes/get-currency-symbol.pipe';

@NgModule({
  declarations: [
    AppComponent,
    ReplacePipe,
    StripComponent,
    ExchangeFormComponent,
    ViewResultComponent,
    FooterComponent,
    GetCurrencySymbolPipe,
  ],
  imports: [BrowserModule, HttpClientModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
