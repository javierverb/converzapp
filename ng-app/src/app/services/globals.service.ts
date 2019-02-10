import { BehaviorSubject } from 'rxjs';

import { Injectable } from '@angular/core';
import { IRC } from '@app/utils/irc/irc';
import { Channel } from '@app/utils/irc/channel';

@Injectable({
  providedIn: 'root',
})
export class GlobalsService {

  private _irc = null;

  private _groups = [];

  set groups(items) {
    this._groups = items;
  }
  get groups() {
    return this._groups;
  }

  public getIRC(nickname = '') {
    if (!this._irc || !this._irc.isConnected) {
      this._irc = new IRC(nickname);
    }
    return this._irc;
  }


  public bsChatFragments = new BehaviorSubject(undefined);
  public chatFragment = [];

  public addChatFragment(chatId: string) {
    var chatObj = this._irc.resolve(chatId);

    if (chatObj != undefined && !Channel.isChannel(chatObj.name)) {
      if (!this.chatFragment.includes(chatObj.name)) {
        this.chatFragment.push(chatObj.name)
        this.bsChatFragments.next(chatObj);
      }
    }
  }

  constructor() {}
}
