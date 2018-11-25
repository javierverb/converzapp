import { Component } from '@angular/core';
import { IRC } from '../../classes/irc/irc';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';
  private irc;


  constructor() {
    this.irc = new IRC();
  }
}
