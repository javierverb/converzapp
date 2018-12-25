import { codes, generated, protocol } from './_events';
export class Parser {

  constructor() {}

  public parseCommand(rawData: string) {
    /*
      Parse message like as:
      ':livingstone.freenode.net NOTICE * :*** Checking Ident'
      and extract his hostname (livingstone.freenode.net),
      his command (NOTICE)
      and his content (:*** Checking Ident)
    */

    rawData = rawData.toLowerCase();
    let contentList = rawData.split(' ');

    // maybe its a event message
    let key = contentList[1];
    console.log('key:', key);
    if (codes[key]) {
      return codes[key];
    }

    // its a notification message
    if (generated.includes(name)) {
      return generated.find((item) => item == name);
    }
    // maybe its a protocol message, so, lets find inside
    for (var i = 0; i < contentList.length; i++) {
      let name = contentList[i];
      let code = protocol.find((item) => item == name);
      if (code != undefined) {
        return code;
      }
    }
  }
}
