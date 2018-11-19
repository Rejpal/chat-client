/* eslint-env mocha, jest */
import Message from './Message'
import { shallow } from 'enzyme'
import React from 'react'
import ReactDOM from 'react-dom'

describe('Message', () => {
  it('shouldRender a message', () => {
    const message = {
      author: { id: '1', name: 'tester' },
      content: 'Test Message'
    }

    expect(shallow(<Message message={message} />)).toMatchSnapshot()
    const div = document.createElement('div')
    ReactDOM.render(<Message message={message} />, div)
    ReactDOM.unmountComponentAtNode(div)
  })
})
