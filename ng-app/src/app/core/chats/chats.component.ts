import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { GlobalsService } from '@app/services/globals.service';
import { GroupsService } from '@app/services/groups.service';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.scss']
})
export class ChatsComponent implements OnInit {

  constructor(private groupService: GroupsService, private route: ActivatedRoute, private globals: GlobalsService) {}
  private chatId = '';
  private conversation: any[];
  private username = '';
  private message = '';

  private positionMap = {};

  handleScroll() {
    var content = document.querySelector('.mat-drawer-content');
    content.scrollTo(0, content.scrollHeight);
  }

  private _setStyleMessageContainer(chatId) {
    console.log(this.positionMap[chatId]);
    if (!this.positionMap[chatId]) {
      var messageContainer = document.getElementById('message-container');
      messageContainer.style.position = 'absolute';
      var drawerContent = <HTMLElement>document.querySelector('.mat-drawer-content');
      if (drawerContent.scrollHeight > drawerContent.offsetHeight) {
        messageContainer.style.position = 'sticky';
        this.positionMap[chatId] = true;
      }
    }
  }
  ngOnInit() {
    document.addEventListener("DOMContentLoaded", (ev) => this._setStyleMessageContainer(this.chatId));

    this.handleScroll();
    this.route.paramMap.subscribe((param) => {
      this.chatId = param.get('id');
      this.groupService.triggerSelectedGroup(this.chatId);
      this.conversation = this.globals.irc.bsConversation.value[this.chatId];
      this.globals.addChatFragment(this.chatId);
      this._setStyleMessageContainer(this.chatId);
    });
    this.username = this.globals.irc.username;
    this.globals.irc.bsConversation.subscribe((converzations: any) => {
      this.conversation = converzations[this.chatId];
      this._setStyleMessageContainer(this.chatId);
    });
  }


  private sendMessage() {
    if (this.message) {
      this.globals.irc.privmsg(this.chatId, this.message);
      this.message = '';
    }
  }

}
