import React, { Component } from 'react'
import { Provider, observer } from 'mobx-react'
import './App.css'

import ReplyBox from './ReplyBox/ReplyBox'
import Message from './Message/Message'

import AppStore from '../stores/AppStore'

class App extends Component {
  renderMessages () {
    const messages = AppStore.getMessages()
    const messageComponents = []
    messages.forEach((message) => {
      messageComponents.push(<Message message={message} key={message.id} />)
    })

    return messageComponents
  }

  render () {
    return (
      <Provider appStore={AppStore} >
        <div className='App'>
          <div className='Messages'>
            {this.renderMessages()}
          </div>
          <ReplyBox />
        </div>
      </Provider>
    )
  }
}

export default observer(App)
