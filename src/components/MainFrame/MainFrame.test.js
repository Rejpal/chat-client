/* eslint-env mocha, jest */
import React from 'react'
import { MainFrame } from './MainFrame'
import { shallow } from 'enzyme'

describe('<MainFrame>', () => {
  it('should render when userName is not empty and there are no messages', () => {
    const appStore = {
      user: { isNameEmpty: () => { return false } },
      getMessages: () => { return [] }
    }
    expect(shallow(<MainFrame appStore={appStore} />)).toMatchSnapshot()
  })

  it('should render when userName is not empty and there are some messages', () => {
    const appStore = {
      user: { isNameEmpty: () => { return false } },
      getMessages: () => { return [{ id: '1' }, { id: '2' }] }
    }
    expect(shallow(<MainFrame appStore={appStore} />)).toMatchSnapshot()
  })

  it('should render userForm when userName is empty', () => {
    const appStore = {
      user: { isNameEmpty: () => { return true } }
    }
    expect(shallow(<MainFrame appStore={appStore} />)).toMatchSnapshot()
  })
})
