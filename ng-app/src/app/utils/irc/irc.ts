import { AsyncSubject, BehaviorSubject } from 'rxjs';

import { Parser } from './parser';
import { codes } from './_events';

declare var md5;

export class IRC {

  private ws;
  private parser;
  private hostname: string;
  private serverhost: string;

  private hashMap = {}; // agenda todos los md5 y los resuelve.

  public bsChannels = new AsyncSubject();
  private _channels = [];

  public bsConversation = new BehaviorSubject({});
  private _conversation = {};

  public bsContacts = new BehaviorSubject({});
  private usersList: any[];

  private __servername = 'irc.irc-hispano.org';
  public username = 'mynameisskrillex';
  // private __servername = 'livingstone.freenode.net';

  constructor() {
    this.parser = new Parser();
    this.ws = new WebSocket('ws://localhost:5000/webirc/websocket/');
    this.ws.onmessage = (event: any) => {
      let commandName = this.parser.parseCommand(event.data);
      // like as getattr from python:
      // console.log('commandName: ', commandName);
      let command = this[`on${commandName}`];
      (command != undefined ? command.bind(this, event.data)() : null);
    }
    this.ws.onopen = (event) => {
      this._configureSession();
    }
  }

  private _configureSession(): void {
    let msg = `USER ${this.username} ${this.username} ${this.__servername} :mi nombre real`;
    this.ws.send(msg);
    this.ws.send(`NICK ${this.username}`);
    msg = 'CAP REQ :account-notify extended-join identify-msg multi-prefix';
    this.ws.send(msg);
    this.ws.send('CAP END');
    this.ws.send('ENCODING CP1252');
  }

  private onwelcome(content): void {
    this.listChannels();
  }

  private onping(content): void {
    let serverName = content.split(':').pop();
    this.ws.send(`PONG :${serverName}`);
  }

  private _isChannel(target: string) {
    return target.startsWith('#');
  }

  private _pushOrCreateConversation(id, payload) {
    (this._conversation[id] ? this._conversation[id].push(payload)
                            : this._conversation[id] = [payload]);
  }

  private onprivmsg(content): void {
    // first retrieve the messageData
    let messageData = content.slice(1).split('PRIVMSG');
    let sender = messageData[0].replace(/\s/g, '');

    let shortIndexName = sender.indexOf('!');
    if (shortIndexName != -1) {
      sender = sender.slice(0, shortIndexName);
    }

    let indexReceiver = messageData[1].indexOf(':');
    let receiver = messageData[1].slice(0, indexReceiver).replace(/\s/g, '');
    let message = messageData[1].slice(indexReceiver + 1);
    let payload = {
      from: sender, to: receiver, message: message
    };
    let id = md5(receiver);
    if (this._isChannel(receiver)) {
      this._pushOrCreateConversation(id, payload);
    }
    else {
      // debugger;
    }
    this.bsConversation.next(this._conversation);
  }

  private onyourhost(content) {
    this.serverhost = content.split(' ')[0].replace(':', '');
  }

  private onlist(content) {
    const indexDescription = content.slice(1).indexOf(' :');
    const channelData = content.slice(1, indexDescription + 1).split(' ').slice(3, 5);
    const name = channelData[0];
    const quantity = (channelData[1] === '' ? '0' : channelData[1]);
    const description = content.slice(indexDescription + 3);
    let id = md5(name);
    const item = {
      name: name,
      id: id,
      quantity: quantity,
      description: description,
    }
    this.hashMap[id] = name;
    this._channels.push(item);
  }

  private listChannels() {
    /* Retrieve channels where
    channels.people.length > minValue
    and
    channels.people.length < maxValue
    */
    let minValue = '40';
    let maxValue = '10000';
    this.ws.send(`LIST #undefined >${minValue},<${maxValue}`);
  }

  private onlistend() {
    this.bsChannels.next(this._channels);
    this.bsChannels.complete();
  }

  private onendofmotd(content) {
    this.ws.send('JOIN #undefined');
    this.usersList = [];
  }

  public privmsg(to, message) {
    let target = this.hashMap[to];
    let payload = {
      from: this.username, to: target, message: message,
    };
    this.ws.send(`PRIVMSG ${target} :${message}`);
    this._pushOrCreateConversation(to, payload);
    this.bsConversation.next(this._conversation);
  }

  private onnamreply(content: string) {
    //Parse users list with JOIN

    const indexChannel = content.indexOf('#');
    let channel = content.slice(indexChannel).split(' ')[0];

    const indexUser = content.indexOf(' :');
    let users = content.slice(indexUser + 2).split(' ');
    users = users.slice(1);
    this.usersList = this.usersList.concat(users);
    this.bsContacts[md5(channel)] = [];
    this.usersList.forEach((item) => {
      this.hashMap[md5(item)] = item;
      this.bsContacts[md5(channel)].push({'name': item, 'id': md5(item)});
    });
  }
}
