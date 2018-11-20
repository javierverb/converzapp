export class IRC {

  private ws: WebSocket;
  private hostname: String;
  private __servername = 'livingstone.freenode.net';


  constructor() {
    this.ws = new WebSocket('ws://localhost:5000/webirc/websocket/');
    this.ws.onmessage = (event: any) => {
      let commandName = this._parseCommand(event.data);
      // like as getattr from python:
      let command = this[`on${commandName}`];
      (command != undefined ? command() : null);
    }
    this._fetchHostname();
    this.ws.onopen = (event) => {
      this._configureSession();
    }
  }

  private _configureSession() {
    let msg = `USER javierverb javierverb  ${this.__servername} :realname`;
    this.ws.send(msg);
  }

  private _fetchHostname() {
    fetch('https://api.ipify.org?format=json').then((response) => {
      return response.json();
    }).then((jsonResponse) => {
      this.hostname = jsonResponse;
    });
  }

  private _parseCommand(data: string): string {
    debugger;
    return '';
  }

}
