import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pubKeyFormat'
})
export class PubKeyFormatPipe implements PipeTransform {

  transform(value: string, size: number ): string {
    if (!value) {
        return '';
    }
    const limit = size > 0 ? size : 10;
    return value.length > limit ? value.substring(0, limit) + '...' +value.substring(value.length-limit,value.length): value;
  }
}
