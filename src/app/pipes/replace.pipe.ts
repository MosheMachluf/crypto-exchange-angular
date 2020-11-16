import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'replace',
})
export class ReplacePipe implements PipeTransform {
  transform(value: string, findValue: string, replaceValue: string): any {
    return value.replace(findValue, replaceValue);
  }
}
