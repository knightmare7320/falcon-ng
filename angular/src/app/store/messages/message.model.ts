export interface IMessage {
   message: string;
   timestamp: Date;
}

export class Message implements IMessage {
   constructor(
      public message: string,
      public timestamp: Date,
   ) { }
}