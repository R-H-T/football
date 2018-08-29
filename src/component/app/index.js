import React, { Component } from 'react'
import { Switch, Link, Route, Redirect } from 'react-router-dom'
import './App.css'
import { Match } from './../../model'
import {
  AuthorizationView,
  Header,
  ScrollToTop,
  MenuPage,
  MatchesPage,
  TheButton,
} from './../'

class App extends Component {
  state = { match: new Match() }

  newMatch() {
    this.setState({ match: new Match() })
  }

  render() {
    const { match } = this.state;
    return (
      <div className="App">
        <Header />
        <ScrollToTop />
        <main>
          <Switch>
            <Route exact path="/" render={ () => {
              return (<div className="App-view-group">
                <AuthorizationView />
                <MenuPage>
                  <Link onClick={ this.newMatch.bind(this) } to="/matches/new"><TheButton>New Match</TheButton></Link>
                  <Link to="/matches"><TheButton>Recent Matches</TheButton></Link>
                  <Link to="/statistics"><TheButton disabled>Statistics</TheButton></Link>
                  <Link to="/about"><TheButton>About</TheButton></Link>
                </MenuPage>
                </div>);
            } } />
            <Route path="/matches" render={ () => <MatchesPage match={ match } /> } />
            <Redirect from="/statistics" to="/" />
            <Route
              path="/about"
              render={
                () => (
                <div>
                  <h1>About</h1>
                  <article
                    style={{ width: 360, margin: '0 auto' }}
                  >
                    <h2>The Table Football Web App</h2>
                    <p>This app is a demo on building a real-world React web application,
                      and for the fun purpose of playing table football,
                      and keeping scores logged for a fair match.
                      <br />
                      <br />
                      <strong>— Roberth Hansson-Tornéus</strong>
                      <br />
                      (Gawee.Narak@gmail.com)
                      </p>
                    </article>
                    <div className="App-match-btn-group">
                      <Link to="/">
                        <TheButton>Back to Main Menu</TheButton>
                      </Link>
                    </div>
                  </div>)
                } />
          </Switch>
        </main>
      </div>
    )
  }
}

export default App
