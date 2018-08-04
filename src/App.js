import React, { Component } from 'react';
import logo from './logo.svg';
import burgerMenu from './img/gw-burger-menu.svg';
import './App.css';
import TeamInputList from './component/team-input-list';
import { Match } from './model';

class App extends Component {
  constructor(props) {
    super(props);
    const { match = new Match(0) } = props;
    this.state = { match };
  }

  render() {
    const { match } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Table Football</h1>
          <div role="button" className="burger-menu" aria-label="Menu"><img src={ burgerMenu } /></div>
        </header>
        <p className="App-intro">
          To get started, add the players you want for your teams
        </p>
        <TeamInputList match={ match } />
        <div className="App-match-btn-group">
          <button>Start Match</button>
          <button disabled>Restart last match</button>
        </div>
      </div>
    );
  }
}

export default App;
