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
      <h1>{ title }</h1>
      <p className="App-intro">
        { intro }
      </p>
      <br />
      <div className="App-match-btn-group">
        { children }
      </div>
    </div>)
  }
}

export default MenuPage
