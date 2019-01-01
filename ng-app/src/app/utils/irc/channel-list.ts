import { Channel } from './channel';

export class ChannelList {

  private _list: Channel[];

  constructor() {
    this._list = [];
  }

  get list() {
    return this._list;
  }

  public add(name: string, quantity: string, description: string) {
    var obj = new Channel(name, quantity, description);
    this._list.push(obj);
  }

  public resolve(id: string): Channel {
    return this._list.find((item) => {
      return item.id == id;
    });
  }
}
