import { Contact } from './contact';

export class ContactList {

  private _list: Contact[];

  constructor() {
    this._list = [];
  }

  get list() {
    return this._list;
  }

  public add(name: string, channel: string) {
    if (!name) return;
    // lets clean 'ops' characters
    if (!name[0].replace(/[^a-z0-9]/gi,'')) {
      name = name.substr(1);
    }
    var obj = new Contact(name, channel);
    this._list.push(obj);
  }

  public listByChannel(channel: string): any[] {
    return this._list.filter((item) => {
      return item.channel == channel;
    });
  }

  public resolve(name: string): Contact {
    return this._list.find((item) => {
      return item.name == name;
    });
  }

}
