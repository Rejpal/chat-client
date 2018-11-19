/* eslint-env mocha, jest */
import React from 'react'
import { ReplyBox } from './ReplyBox'
import { mount } from 'enzyme'

describe('<ReplyBox>', () => {
  it('should render', () => {
    const appStore = {
      getCurrentMessageText: () => { return '' }
    }
    expect(mount(<ReplyBox appStore={appStore} />)).toMatchSnapshot()
  })

  it('should render with text in the input', () => {
    const appStore = {
      getCurrentMessageText: () => { return 'test text' }
    }
    expect(mount(<ReplyBox appStore={appStore} />)).toMatchSnapshot()
  })

  it('should call update upon change', () => {
    const updateMessage = jest.fn()
    const appStore = {
      getCurrentMessageText: () => { return 'test text' },
      updateCurrentMessage: updateMessage
    }
    const wrapper = mount(<ReplyBox appStore={appStore} />)
    wrapper.find('textarea').simulate('keyPress', { key: 's', charCode: 45 })
    expect(updateMessage).toHaveBeenCalled()
  })

  it('should call send on click', () => {
    const handleSendMessage = jest.fn()
    const appStore = {
      getCurrentMessageText: () => { return 'test text' },
      sendMessage: handleSendMessage
    }
    const wrapper = mount(<ReplyBox appStore={appStore} />)
    wrapper.find('button').simulate('click')
    expect(handleSendMessage).toHaveBeenCalled()
  })

  it('should call send on press Enter key', () => {
    const handleSendMessage = jest.fn()
    const appStore = {
      getCurrentMessageText: () => { return 'test text' },
      sendMessage: handleSendMessage
    }
    const wrapper = mount(<ReplyBox appStore={appStore} />)
    wrapper.find('textarea').simulate('keyPress', { key: 'enter', charCode: 13 })
    expect(handleSendMessage).toHaveBeenCalled()
  })
})
