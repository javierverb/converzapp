import { Component, OnInit } from '@angular/core';
import { GlobalsService } from '@app/services/globals.service';
import { GroupsService } from '@app/services/groups.service';

@Component({
  selector: 'contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {

  constructor(private groupService: GroupsService,
              private globalService: GlobalsService) { }


  private contacts = [];

  ngOnInit() {
    this.groupService.change.subscribe((groupId) => {
      this.contacts = this.globalService.irc.bsContacts[groupId];
    });
  }

}
