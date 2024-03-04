import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'camelCaseToText',
  standalone: true
})
export class CamelCaseToTextPipe implements PipeTransform {

  transform(value: string): string {
    const regExp = /([a-z])([A-Z])/g;

    return value?.replace(regExp, '$1 $2').charAt(0).toUpperCase() + value.slice(1);
  }

}
