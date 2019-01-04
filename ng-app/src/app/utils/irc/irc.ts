import { AsyncSubject, BehaviorSubject } from 'rxjs';

import { Channel } from './channel';
import { ChannelList } from './channel-list';
import { ContactList } from './contact-list';
import { Parser } from './parser';
import { codes } from './_events';

declare var md5;

export class IRC {

  private _ws;
  private _parser;
  private _hostname: string;
  private _serverhost: string;

  public asyncChannels = new AsyncSubject();
  private _channels: ChannelList;

  public bsConversation = new BehaviorSubject({});
  public conversation = {};

  public bsContacts: BehaviorSubject<ContactList>;
  private _contacts: ContactList;

  private readonly __servername = 'irc.irc-hispano.org';
  public username = 'mynameisskrillex';

  constructor() {
    this._parser = new Parser();
    this._channels = new ChannelList();
    this._contacts = new ContactList();
    this.bsContacts = new BehaviorSubject(this._contacts);

    this._ws = new WebSocket('ws://localhost:5000/webirc/websocket/');
    this._ws.onmessage = (event: any) => {
      var commandName = this._parser.parseCommand(event.data);
      // like as getattr from python:
      var command = this[`_on${commandName}`];
      (command != undefined ? command.bind(this, event.data)() : null);
    }
    this._ws.onopen = (event) => {
      this._configureSession();
    }
  }

  private _configureSession(): void {
    var msg = `USER ${this.username} ${this.username} ${this.__servername} :mi nombre real`;
    this._ws.send(msg);
    this._ws.send(`NICK ${this.username}`);
    msg = 'CAP REQ :account-notify extended-join identify-msg multi-prefix';
    this._ws.send(msg);
    this._ws.send('CAP END');
    this._ws.send('ENCODING CP1252');
  }

  private _onwelcome(content): void {
    this._listChannels();
  }

  private _onping(content): void {
    var serverName = content.split(':').pop();
    this._ws.send(`PONG :${serverName}`);
  }

  private _pushOrCreateConversation(id, payload) {
    (this.conversation[id] ? this.conversation[id].push(payload)
                            : this.conversation[id] = [payload]);
  }

  private _onprivmsg(content): void {
    // first retrieve the messageData
    var messageData = content.slice(1).split('PRIVMSG');
    var sender = messageData[0].replace(/\s/g, '');

    var shortIndexName = sender.indexOf('!');
    if (shortIndexName != -1) {
      sender = sender.slice(0, shortIndexName);
    }

    var indexReceiver = messageData[1].indexOf(':');
    var receiver = messageData[1].slice(0, indexReceiver).replace(/\s/g, '');
    var message = messageData[1].slice(indexReceiver + 1);
    var payload = {
      from: sender, to: receiver, message: message
    };
    if (Channel.isChannel(receiver)) {
      this._pushOrCreateConversation(receiver, payload);
    }
    else {
      // TODO: check this case
    }
    this.bsConversation.next(this.conversation);
  }

  private _onyourhost(content) {
    this._serverhost = content.split(' ')[0].replace(':', '');
  }

  public resolve(id): any {
    var item = this._contacts.resolve(id);
    return (item != undefined ? item : this._channels.resolve(id));
  }

  private _onlist(content) {
    const indexDescription = content.slice(1).indexOf(' :');
    const channelData = content.slice(1, indexDescription + 1).split(' ').slice(3, 5);
    const name = channelData[0];
    const quantity = (channelData[1] === '' ? '0' : channelData[1]);
    const description = content.slice(indexDescription + 3);
    const item = {
      quantity: quantity,
      description: description,
    }
    this._channels.add(name, quantity, description);
  }

  private _listChannels() {
    /* Retrieve channels where
    channels.people.length > minValue
    and
    channels.people.length < maxValue
    */
    var minValue = '40';
    var maxValue = '10000';
    this._ws.send(`LIST *sexo* >${minValue},<${maxValue}`);
  }

  private _onlistend() {
    this.asyncChannels.next(this._channels);
    this.asyncChannels.complete();
  }

  private _onendofmotd(content) {
    this._ws.send('JOIN #sexo');
  }

  public privmsg(target, message) {
    var payload = {
      from: this.username, to: target, message: message,
    };
    this._ws.send(`PRIVMSG ${target} :${message}`);
    this._pushOrCreateConversation(target, payload);
    this.bsConversation.next(this.conversation);
  }

  private _onnamreply(content: string) {
    // Parse users list with JOIN

    const indexChannel = content.indexOf('#');
    var channel = content.slice(indexChannel).split(' ')[0];

    const indexUser = content.indexOf(' :');
    var users = content.slice(indexUser + 2).split(' ').sort();

    // namreply response with contacts
    users.forEach((item) => {
      this._contacts.add(item, channel);
      this.bsContacts.next(this._contacts);
    });
  }
}
