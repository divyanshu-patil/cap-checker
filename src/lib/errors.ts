export class NotFoundError extends Error {
  constructor(msg: string) {
    super(msg);
    this.name = "NotFoundError";
  }
}
export class MissingFieldsError extends Error {
  constructor(msg: string) {
    super(msg);
    this.name = "MissingFieldsError";
  }
}
export class InvalidFieldsError extends Error {
  constructor(msg: string) {
    super(msg);
    this.name = "InvalidFieldsError";
  }
}

export class ServerError extends Error {
  constructor(msg: string) {
    super(msg);
    this.name = "ServerError";
  }
}
