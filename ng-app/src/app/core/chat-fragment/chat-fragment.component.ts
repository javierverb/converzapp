import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat-fragment',
  templateUrl: './chat-fragment.component.html',
  styleUrls: ['./chat-fragment.component.scss']
})
export class ChatFragmentComponent implements OnInit {

  constructor() { }

  public name: string;

  ngOnInit() {}

}
