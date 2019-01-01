declare var md5;

import { assert } from '../assert';

export class Channel {

  public name: string;
  public id: string;
  public quantity: string;
  public description: string;

  static isChannel(target: any): boolean {
    return (typeof(target) == 'string' ? target.startsWith('#'): false);
  }

  constructor(name: string, quantity: string, description: string) {
    assert(name.startsWith('#'), 'The name should starts with #');
    this.name = name;
    this.id = md5(name);
    this.quantity = quantity;
    this.description = description;
  }
}
