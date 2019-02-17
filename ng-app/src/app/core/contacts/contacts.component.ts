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
              private globals: GlobalsService) { }


  contacts = [];

  ngOnInit() {
    const irc = this.globals.getIRC();
    this.groupService.change.subscribe((groupId) => {
      this.contacts = irc.bsContacts.value.listByChannel(groupId);
    });
  }

}
