import { Action, NewMessageAction } from '../actions/Action'
import { Store } from './Store'
import { Map, List } from 'immutable'

export type MessageId = string

export interface IMessage {
  id: MessageId;
  createdAt: Date;
  message: String;
  from: String;
}

export class MessageStore extends Store {
  private messages: Map<MessageId, IMessage>;

  constructor () {
    this.messages = Map({})
    super()
  }

  dispatchCallback (action: Action): boolean {
    switch (action.constructor) {
      // case UpdateMessageAction:
      // case DeleteMessageAction:
      case NewMessageAction:
        let message : IMessage = (<NewMessageAction> action).message
        this.messages = this.messages.set(message.id, message)
        this.emit('change', message)
        break

      default:
        // noop
    }

    return true
  }

  getById (id: string): IMessage {
    return this.messages.get(id)
  }

  getAll(): List<IMessage> {
    return this.messages.toList()
  }
}

export const messageStore = new MessageStore()
