import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'

import UserForm from './UserForm/UserForm'
import ReplyBox from './ReplyBox/ReplyBox'
import Message from './Message/Message'

export class MainFrame extends Component {
  renderMessages () {
    const messages = this.props.appStore.getMessages()
    const messageComponents = []
    messages.forEach((message) => {
      messageComponents.push(<Message message={message} key={message.id} />)
    })

    return messageComponents
  }

  render () {
    if (this.props.appStore.user.isNameEmpty()) {
      return <UserForm />
    }

    return (
      <React.Fragment>
        <div className='Messages'>
          {this.renderMessages()}
        </div>
        <ReplyBox />
      </React.Fragment>
    )
  }
}

export default inject('appStore')(observer(MainFrame))
