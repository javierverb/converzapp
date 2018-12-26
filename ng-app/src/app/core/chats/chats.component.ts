import { Component, OnInit } from '@angular/core';
import { GlobalsService } from '@app/services/globals.service';
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.scss']
})
export class ChatsComponent implements OnInit {

  constructor(private route: ActivatedRoute, private globals: GlobalsService) {}
  private chatId = '';
  private conversation = [];
  private username = '';
  private message = '';

  ngOnInit() {
    this.route.paramMap.subscribe((param) => this.chatId = param.get('id'));
    this.username = this.globals.irc.username;
    this.globals.irc.bsConversation.subscribe((converzations: any) => {
      this.conversation = converzations[this.chatId];
    });
  }

  private sendMessage() {
    console.log('username:', this.username);
    this.globals.irc.privmsg(this.chatId, this.message);
    this.message = '';
  }

}
