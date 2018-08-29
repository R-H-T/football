import React, { Component } from 'react'
import { TeamInputList, TheButton } from './../'
import { Link, Redirect } from 'react-router-dom'
import { Match } from '../../model';

class StartPage extends Component {
  state = { ...this.props, shouldRedirect: false }

  render() {
    const { match = new Match() } = this.state
    const continueToMatchSession = () => {
      for(var i=0; i<match.teams.length; i++) {
        const team = match.teams[i]
        const returnedUnNamed = team.players.filter(player => (player.name.trim() === ''))
        if (returnedUnNamed.length !== 0) {
          this.props.toggleDoneEditingAction(false)
          return
        }
      }
      this.props.toggleDoneEditingAction(true)
      this.setState({ shouldRedirect: true })
    }
    return (<div>
      { (this.state.shouldRedirect) ? <Redirect to={ `/matches/${ match.id }/session` } /> : '' }
      <p className="App-intro">
        To get started, add the players you want for your teams
      </p>
      <TeamInputList match={ match } />
      <div className="App-match-btn-group">
        <a>
          <TheButton onClick={ continueToMatchSession.bind(this) }>Create Match</TheButton>
        </a>
        <Link to={ `/` }>
          <TheButton iscancel="true">Cancel</TheButton>
        </Link>
      </div>
    </div>)
  }
}

export default StartPage
