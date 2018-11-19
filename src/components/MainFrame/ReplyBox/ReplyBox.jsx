import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import './ReplyBox.css'

const ENTER_KEY = 13

type Props = {
  appStore: any
}

export class ReplyBox extends Component<Props> {
  static defaultProps = {
    appStore: null
  }

  constructor () {
    super()
    this.textInput = React.createRef()
  }

  componentDidMount () {
    this.textInput.current.focus()
  }

  handleChangeMessage = (e: React.SyntheticKeyboardEvent) => {
    if (e.charCode === ENTER_KEY) {
      this.handleSend()
      return
    }

    this.props.appStore.updateCurrentMessage(e.key)
  }

  handleSend = () => {
    this.props.appStore.sendMessage()
    this.textInput.current.focus()
  }

  getMessageText (): string {
    const message = this.props.appStore.getCurrentMessageText()
    return message
  }

  render () {
    return (
      <div className='ReplyBoxWrapper'>
        <div className='ReplyBox'>
          <textarea
            ref={this.textInput}
            onKeyPress={this.handleChangeMessage}
            value={this.getMessageText()}
          />
          <button onClick={this.handleSend}>Send</button>
        </div>
      </div>
    )
  }
}

export default inject('appStore')(observer(ReplyBox))
