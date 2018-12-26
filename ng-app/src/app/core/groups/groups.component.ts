import { Component, OnInit } from '@angular/core';
import { GlobalsService } from '@app/services/globals.service';

@Component({
  selector: 'groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss']
})
export class GroupsComponent implements OnInit {

  private groups = [];

  constructor(private globals: GlobalsService) {
  }

  ngOnInit() {
    this.globals.irc.bsChannels.subscribe((groups: any) => {
      this.groups = groups;
    });
  }

}
