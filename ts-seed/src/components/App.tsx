import React = require('react')
import { Inbox } from './Inbox'

export = class App extends React.Component<any, any> {
  render () {
    return (
      <div>
        <Inbox />
      </div>
    )
  }
}
