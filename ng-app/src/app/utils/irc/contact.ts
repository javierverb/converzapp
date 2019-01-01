declare var md5;

export class Contact {

  public id: string;
  public name: string;
  public channel: string;

  constructor(name: string, channel: string) {
    this.id = md5(name);
    this.name = name;
    this.channel = channel;
  }

  public update(newName: string) {
    this.id = md5(newName);
    this.name = newName;
  }

}
