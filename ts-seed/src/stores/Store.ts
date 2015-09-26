import { dispatcher } from '../dispatcher/Dispatcher'
import { Action } from '../actions/Action'
import EventEmitter = require('eventemitter3')

export abstract class Store extends EventEmitter {
  public dispatchToken: string;
  protected abstract dispatchCallback(a: Action): boolean

  constructor () {
    super()
    this.dispatchCallback = this.dispatchCallback.bind(this)
    this.dispatchToken = dispatcher.register(this.dispatchCallback)
  }
}
