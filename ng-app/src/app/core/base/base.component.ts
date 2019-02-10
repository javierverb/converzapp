import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss']
})
export class BaseComponent implements OnInit {

  constructor() { }
  private configuratedNick: boolean = false;

  private onNickname(value) {
    this.configuratedNick = true;
  }

  ngOnInit() {
  }

}
