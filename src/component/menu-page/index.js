import React, { Component } from 'react'

class MenuPage extends Component {
  state = { ...this.props }

  render() {
    const {
      title = 'Main Menu',
      intro = 'Choose the path you seek',
      children
    } = this.state
    return (<div>
      <p className="App-intro">
        { intro }
      </p>
      <h1>{ title }</h1>
      <div className="App-match-btn-group">
        { children }
      </div>
    </div>)
  }
}

export default MenuPage
