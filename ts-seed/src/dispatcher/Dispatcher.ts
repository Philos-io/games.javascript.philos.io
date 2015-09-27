import flux = require('flux')
import { Action } from '../actions/Action'

export const dispatcher = new flux.Dispatcher<Action>()
