import { BehaviorSubject } from 'rxjs';

import { Injectable } from '@angular/core';
import { IRC } from '@app/utils/irc/irc';
import { Channel } from '@app/utils/irc/channel';

@Injectable({
  providedIn: 'root',
})
export class GlobalsService {

  public irc = new IRC();
  public bsChatFragments = new BehaviorSubject(undefined);
  public chatFragment = [];

  public addChatFragment(chatId: string) {
    var chatObj = this.irc.resolve(chatId);

    if (chatObj != undefined && !Channel.isChannel(chatObj.name)) {
      if (!this.chatFragment.includes(chatObj.name)) {
        this.chatFragment.push(chatObj.name)
        this.bsChatFragments.next(chatObj);
      }
    }
  }

  constructor() {}
}
