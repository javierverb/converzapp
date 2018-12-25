import { Component, OnInit } from '@angular/core';
import { GlobalsService } from '@app/services/globals.service';

@Component({
  selector: 'groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss']
})
export class GroupsComponent implements OnInit {

  constructor(private globals: GlobalsService) {
    globals.irc.bsChannels.subscribe((data) => {
      this.groups.push(data);
    });
  }

  groups = [];

  ngOnInit() {
  }

}
