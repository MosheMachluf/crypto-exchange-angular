import { getCurrencySymbol } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'getCurrencySymbol',
})
export class GetCurrencySymbolPipe implements PipeTransform {
  transform(
    code: string,
    format: 'wide' | 'narrow' = 'narrow',
    locale?: string
  ): any {
    return getCurrencySymbol(code, format, locale);
  }
}
