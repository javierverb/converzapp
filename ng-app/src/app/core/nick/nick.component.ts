import { Component, Output, OnInit, EventEmitter } from '@angular/core';
import { GlobalsService } from '@app/services/globals.service';
import { NickError } from '@app/utils/irc/_exceptions';
import { ChannelList } from '@app/utils/irc/channel-list';

@Component({
  selector: 'nick',
  templateUrl: './nick.component.html',
  styleUrls: ['./nick.component.scss']
})
export class NickComponent implements OnInit {

  @Output('nickname') public onNickname = new EventEmitter<string>();

  private selectedIndex = 0;
  private query = '';
  private showSpinner = false;
  private configuratedNick = false;
  private nickname = '';
  private officialNickname = '';
  private nickError = false;
  private selectedGroups;
  private groups = [];

  constructor(private globals: GlobalsService) { }

  updateOfficialNickname() {
    if (!this.nickname || this.nickname.length <= 4) {
      this.officialNickname = '';
      return;
    }
    const randomNumber =  Math.floor((Math.random() * 100) + 1);
    this.officialNickname = this.nickname.replace(/\s/g, '_') + randomNumber;
  }

  private registerNickname() {
    this.showSpinner = true;
    const irc = this.globals.getIRC(this.officialNickname);
    irc.onCreate.subscribe((createObj) => {
      if (createObj) {
        if (createObj.hasError) {
          this.nickError = true;
          this.selectedIndex = 0;
        }
        else {
          this.nickError = false;
          this.selectedIndex = 1;
          this.configuratedNick = true;
          irc.asyncChannels.subscribe((groups: ChannelList) => {
            this.groups = groups.list;
          });
        }
        this.showSpinner = false;
      }
    });
  }

  private joinChannels() {
    const irc = this.globals.getIRC();
    this.globals.groups = this.selectedGroups;
    this.showSpinner = true;
    irc.joinChannels(this.selectedGroups);
    setTimeout(() => {
      this.showSpinner = false;
      this.onNickname.emit(this.officialNickname);
    }, 2500);
  }

  ngOnInit() {
  }

}
