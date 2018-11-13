// @flow
import { types } from 'mobx-state-tree'
import { sendMessage as socketSendMessage } from '../api/socket'
import uuidv4 from 'uuid/v4'

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

const User = types
  .model('User', {
    id: types.string,
    name: types.string
  })
  .views(self => ({
    getUserName (): string {
      return self.name
    },

    isNameEmpty (): boolean {
      return self.name === ''
    }
  }))
  .actions(self => ({
    setUserName (newName: string) {
      self.name = newName
    }
  }))

const Message = types
  .model('Message', {
    id: types.string,
    author: User,
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
  user: User,
  messages: types.array(Message),
  currentMessage: types.optional(Message, {
    id: '1',
    author: { id: '1', name: '' },
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
      messageToSend.id = uuidv4()
      socketSendMessage(messageToSend)
      self.currentMessage = {
        id: uuidv4(),
        author: { ...self.user },
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
        author: { ...self.user },
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

const appStore = AppStore.create({
  messages: [],
  user: {
    id: uuidv4(),
    name: ''
  }
})
window.appStore = appStore

export default appStore
