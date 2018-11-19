import React, { Component } from 'react'
import { Provider, observer } from 'mobx-react'
import './App.css'

import MainFrame from './MainFrame/MainFrame'
import AppStore from '../stores/AppStore'

export class App extends Component {
  render () {
    return (
      <Provider appStore={AppStore} >
        <div className='App' >
          <MainFrame />
        </div>
      </Provider>
    )
  }
}

export default observer(App)
