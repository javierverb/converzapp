import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'search'})
export class searchPipe implements PipeTransform {
  transform(value: any[], term: string): any[] {
    return value.filter((x:any) => x.name.toLowerCase().startsWith(`#${term.toLowerCase()}`))
  }
}
