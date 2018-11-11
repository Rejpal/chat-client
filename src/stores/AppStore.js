// @flow
import { types } from 'mobx-state-tree'
import { sendMessage as socketSendMessage } from '../api/socket'

type Readed = {
  reader: string,
  readAt: Date
}

type IMessage = {
  id: string,
  author: string,
  content: string,
  created: Date,
  read: Array<Readed>
}

const ReadBy = types
  .model({
    reader: types.string,
    readAt: types.Date
  })

const Message = types
  .model('Message', {
    id: types.string,
    author: types.string,
    content: types.string,
    created: types.Date,
    read: types.array(ReadBy)
  })
  .actions(self => ({
    readMessage (reader) {
      self.read.push({ reader, readAt: Date.now() })
    }
  }))

export const AppStore = types.model('AppStore', {
  messages: types.array(Message),
  currentMessage: types.optional(Message, {
    id: '1',
    author: 'Roman',
    content: '',
    created: Date.now(),
    read: []
  })
})
  .views(self => {
    function getMessages () {
      return self.messages
    }

    function getMessageById (id: string): ?IMessage {
      const foundMessages = self.messages.filter(message => id === message.id)
      return foundMessages.length > 0 ? foundMessages[0] : null
    }

    function getCurrentMessageText () {
      return self.currentMessage.content
    }

    function isMessageAlreadyInMessages (testedMessage: IMessage): boolean {
      const foundMessages = self.messages.find(message => message.id === testedMessage.id)
      if (foundMessages && foundMessages.length === 0) {
        return false
      }
      return true
    }

    return {
      getCurrentMessageText,
      getMessageById,
      getMessages,
      isMessageAlreadyInMessages
    }
  })

  .actions(self => {
    function sendMessage (message?: IMessage) {
      const messageToSend = message || self.currentMessage
      messageToSend.id = String(Math.random() * 1000000)
      // self.messages.push(clone(messageToSend))
      socketSendMessage(messageToSend)
      self.currentMessage = {
        id: 'dummyId',
        author: 'Roman',
        content: '',
        created: Date.now(),
        read: []
      }
    }

    function addMessage (newMessage:IMessage) {
      if (self.isMessageAlreadyInMessages(newMessage)) {
        self.messages.push(newMessage)
      }
    }

    function updateCurrentMessage (newChar: string) {
      self.currentMessage = {
        id: 'dummyId',
        author: 'Roman',
        content: self.currentMessage.content + newChar || '',
        created: Date.now(),
        read: []
      }
    }

    return {
      updateCurrentMessage,
      addMessage,
      sendMessage
    }
  })

const appStore = AppStore.create({ messages: [] })
window.appStore = appStore

export default appStore
