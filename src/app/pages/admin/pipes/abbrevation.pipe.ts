import { Pipe } from '@angular/core';

@Pipe({
  standalone: true,
  name: 'abbreviation',
})
export class AbbreviationPipe {
  transform(value: string) {
    return `${value?.at(0)}${value?.split(' ')?.at(-1)?.at(0) ?? value?.at(1)}`;
  }
}
