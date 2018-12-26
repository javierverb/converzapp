import { Injectable } from '@angular/core';
import { IRC } from '@app/utils/irc/irc';

@Injectable({
  providedIn: 'root',
})
export class GlobalsService {

  public irc = new IRC();

  constructor() {
  }
}
