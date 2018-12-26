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

  ngOnInit() {
    this.route.paramMap.subscribe((param) => this.chatId = param.get('id'));
    this.username = this.globals.irc.username;
    this.globals.irc.bsConversation.subscribe((converzations: any) => {
      this.conversation = converzations[this.chatId];
    });
    this.conversation = [
      {'from': 'am', 'to': 'pm', 'message': 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Hic quia voluptatibus distinctio maxime culpa laudantium suscipit dolorem quidem? Assumenda eum, asperiores reprehenderit numquam. Rerum officiis nobis, provident accusantium consectetur ab.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sapiente reprehenderit expedita dolores magnam sed odio enim consequuntur? Dolore velit modi qui ut magni ipsa saepe, alias, hic, voluptas dolor nemo.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dicta, error corporis adipisci delectus deserunt molestias quos necessitatibus sint ducimus praesentium? Debitis, aspernatur amet, dolorem quidem ab recusandae et maxime reprehenderit!'},
      {'from': 'am', 'to': 'pm', 'message': 'donde está el resto?'},
      {'from': 'am', 'to': 'pm', 'message': 'donde está el resto?'},
      {'from': 'am', 'to': 'pm', 'message': 'donde está el resto?'},
    ];
  }

}
