import React, { Component } from 'react'
import { Provider, observer } from 'mobx-react'
import './App.css'

import MainFrame from './MainFrame/MainFrame'
import AppStore from '../stores/AppStore'

class App extends Component {
  renderMainContent () {
    // if (AppStore.user.getUserName() === '') {
    //   return <div>Enter Name first:</div>
    // }
    return (
      <Provider appStore={AppStore} />
    )
  }

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
