import { Parser } from './parser';
import { codes } from './_events';

export class IRC {

  private ws;
  private parser;
  private hostname: string;
  private serverhost: string;
  private channels:[string];

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
    /* TODO: extraer channel , description y cantidad de usuarios
    el contenido viene de la forma...
    :ganimedes.chathispano.com 322 javierverb #El_Salvador 5 :Chat de #El_Salvador pasa y disfruta del chat salvadoreño!!!!
    el primer '#' determina el nombre del canal, el primer número después del canal determina la cantidad de usuarios
    remover los primeros ':' con .slice(1)
    los otros ':' determinan la descripción del canal
    */
  }

  private listChannels() {
    this.ws.send('LIST >4,<10000');
  }

  private onendofmotd(content) {
    this.ws.send('JOIN #undefined');
  }

}
