import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'

class UserForm extends Component {
  constructor () {
    super()
    this.state = {
      name: ''
    }
    this.input = React.createRef()
  }

  componentDidMount () {
    this.input.current.focus()
  }

  handleChange = (e) => {
    this.setState({ name: e.target.value })
  }

  handleSetUser = () => {
    this.props.appStore.user.setUserName(this.state.name)
  }

  render () {
    return (
      <form className='userForm' onSubmit={this.handleSetUser}>
        <label>Name:</label>
        <input
          ref={this.input}
          type='text'
          onChange={this.handleChange}
          value={this.state.name}
        />
        <button onClick={this.handleSetUser}>Save</button>
      </form>
    )
  }
}

export default inject('appStore')(observer(UserForm))
