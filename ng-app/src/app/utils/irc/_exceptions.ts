export class NickError extends Error {

  constructor(public message: string) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype); // restore prototype chain
  }

}
