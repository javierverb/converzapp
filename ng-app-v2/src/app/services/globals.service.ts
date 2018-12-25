import { Injectable } from '@angular/core';
import { IRC } from '@app/utils/irc/irc';

@Injectable()
export class GlobalsService {

  public irc: IRC;

  constructor() {
    this.irc = new IRC();
  }
}
