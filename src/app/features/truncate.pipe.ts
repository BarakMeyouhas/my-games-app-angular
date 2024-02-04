// truncate.pipe.ts
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate'
})
export class TruncatePipe implements PipeTransform {
  transform(value: string, words: number): string {
    if (!value) return '';

    const wordsArray = value.split(' ');
    const truncatedArray = [];

    for (const word of wordsArray) {
      const wordWithoutColon = word.replace(':', ''); // Remove colon from the word
      truncatedArray.push(wordWithoutColon);

      if (truncatedArray.length === words) {
        break;
      }
    }

    return truncatedArray.join(' ');
  }
}
