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

  ngOnInit() {
    this.handleScroll();
    this.route.paramMap.subscribe((param) => {
      this.chatId = param.get('id');
      this.groupService.triggerSelectedGroup(this.chatId);
      this.conversation = this.globals.irc.bsConversation.value[this.chatId];
      this.globals.addChatFragment(this.chatId);
    });
    this.username = this.globals.irc.username;
    this.globals.irc.bsConversation.subscribe((converzations: any) => {
      this.conversation = converzations[this.chatId];
    });
  }


  private sendMessage() {
    if (this.message) {
      this.globals.irc.privmsg(this.chatId, this.message);
      this.message = '';
    }
  }

}
