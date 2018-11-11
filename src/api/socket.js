import io from 'socket.io-client'
import AppStore from '../stores/AppStore'

const { REACT_APP_CHAT_SERVER_HOST } = process.env

export const socket = io.connect(REACT_APP_CHAT_SERVER_HOST)

export function sendMessage (message) {
  socket.emit('SEND_MESSAGE', message)
}

socket.on('connect', () => {
  console.log('connected to server')
})

socket.on('MESSAGE_RECEIVED', (message) => {
  AppStore.addMessage(message)
})
