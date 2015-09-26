import { IMessage } from '../stores/MessageStore'

export abstract class Action {
  public type: string;
}

export class NewMessageAction extends Action {
  public message: IMessage;

  constructor (message) {
    super()
    this.type = 'NewMessage'
    this.message = message
  }
}
