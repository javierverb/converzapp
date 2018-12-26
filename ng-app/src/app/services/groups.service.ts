import { Injectable, Output, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GroupsService {

  @Output() change: EventEmitter<string> = new EventEmitter();

  triggerSelectedGroup(groupId: string) {
    this.change.emit(groupId);
  }

}
