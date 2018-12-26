import { Parser } from './parser';
import { codes } from './_events';

export class IRC {

  private ws;
  private parser;
  private hostname: string;
  private serverhost: string;
  private channels: [{}];
  private usersList: string[];

  private __servername = 'irc.irc-hispano.org';
  // private __servername = 'livingstone.freenode.net';

  constructor() {
    this._fetchHostname();
    this.parser = new Parser();
    this.ws = new WebSocket('ws://localhost:5000/webirc/websocket/');
    this.ws.onmessage = (event: any) => {
      let commandName = this.parser.parseCommand(event.data);
      // like as getattr from python:
      console.log('commandName: ', commandName);
      let command = this[`on${commandName}`];
      (command != undefined ? command.bind(this, event.data)() : null);
    }
    this.ws.onopen = (event) => {
      this._configureSession();
    }
  }

  private _configureSession(): void {
    let msg = `USER mynameisskrillex mynameisskrillex  ${this.__servername} :mi nombre real`;
    this.ws.send(msg);
    this.ws.send(`NICK mynameisskrillex`);
    msg = 'CAP REQ :account-notify extended-join identify-msg multi-prefix';
    this.ws.send(msg);
    this.ws.send('CAP END');
    this.ws.send('ENCODING CP1252');
  }

  private _fetchHostname(): void {
    fetch('https://api.ipify.org?format=json').then((response) => {
      return response.json();
    }).then((jsonResponse) => {
      this.hostname = jsonResponse;
    });
  }

  private onwelcome(content): void {
    this.listChannels();
    this.channels = [{}];
  }

  private onping(content): void {
    let serverName = content.split(':').pop();
    this.ws.send(`PONG :${serverName}`);
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
    console.log(payload);
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
    const channel = {
      name: name,
      quantity: quantity,
      description: description,
    }
    this.channels.push(channel);
  }

  private listChannels() {
    this.ws.send('LIST >4,<10000');
  }

  private onendofmotd(content) {
    this.ws.send('JOIN #undefined');
    this.usersList = [];
  }

  private onnamreply(content) {
    //Parse users list with JOIN
    const indexUser = content.indexOf(' :');
    let users = content.slice(indexUser + 2).split(' ');
    users.pop()
    this.usersList = this.usersList.concat(users);
  }
}
