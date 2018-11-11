import React from 'react'
import './Message.css'

export default function Message (props) {
  const { message } = props
  return (
    <div className='Message'>
      <span>{message.author}:</span>
      &nbsp;
      <span>{message.content}</span>
    </div>
  )
}
