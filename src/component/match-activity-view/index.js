import React, { Component } from 'react'
import { Redirect, Prompt } from 'react-router-dom'
import { withApollo } from 'react-apollo'
import gql from 'graphql-tag';
import './match-activity-view.css'
import { TeamScoreBox, TheButton, StopwatchPanel } from './../'
import { AUTH_TOKEN } from '../../constant';

const CREATE_MATCH_MUTATION = gql`
mutation CreateMatch($id: ID!, $timeActive: Int, $name: String!, $teams: [TeamInput!]!, $goals: [GoalInput]!) {
  createMatch(input: {
    id: $id
    timeActive: $timeActive
    name: $name
    teams: $teams
    goals: $goals
  }) {
    id
  }
}
`

class MatchActivityView extends Component {
    _initialTime = new Date()
    _stopTime = new Date(this._initialTime.getTime() + this.props.match.timeActive)
    constructor(props) {
      super(props)
      this.state = {
        match: this.props.match,
        isPlaying: false,
        isSavingSession: false,
        shouldRedirectAfterSavingSession: false,
      }
      this.addGoal = this.addGoal.bind(this)
      this.removeGoal = this.removeGoal.bind(this)
      this._createOrUpdateMatch = this._createOrUpdateMatch.bind(this)
    }

    addGoal(player, team, date) {
      const { match } = this.state
      match.addGoal(player, team, this.timeActive.getTime() || 0, date)
      this.setState({ match })
    }

    removeGoal(player, team) {
      const { match } = this.state
      match.removeGoal(player, team)
      this.setState({ match })
    }

    _createOrUpdateMatch = async () => {
      this.setState({ isSavingSession: true })
      await new Promise((resolve) => { // Ensuring everything is stopped before we proceed to save this session.
        const tid = setTimeout(() => { clearInterval(iid); this.setState({ isPlaying: false }); resolve() }, 500)
        const iid = setInterval(() => {
          if (!this.state.isPlaying) {
          clearTimeout(tid)
          clearInterval(iid)
          resolve()
        }
      }, 100)
      })
      const { match } = this.state
      const { id, timeActive, name, teams, goals } = match.toMatchInput()
      await this.props.client.mutate({
        mutation: CREATE_MATCH_MUTATION,
        variables: { id, timeActive, name, teams, goals },
      })
      .then(() =>
        this.setState({ shouldRedirectAfterSavingSession: true, isSavingSession: false })
      )
      .catch(error => {
        console.debug('Error', error)
        alert(`Failed to save this session.\n\nTechnical details:\nError: ${ error.message }`)
        this.setState({ isSavingSession: false })
      })
    }
    render() {
        if (this.state.shouldRedirectAfterSavingSession) return <Redirect exact to="/matches" />
        if (this.state.match === 'undefined') return <Redirect to="/" />
        if (this.state.match.teams === 'undefined') return <Redirect to="/" />
        this.state.match.teams.forEach(team => { if (team.players === 'undefined') return <Redirect to="/" /> })
        for(var i=0; i<this.state.match.teams.length; i++) {
          const team = this.state.match.teams[i]
          const returnedUnNamed = team.players.filter(player => (player.name.trim() === ''))
          if (returnedUnNamed.length !== 0) {
            return <Redirect to = "/matches/new" / >
          }
        }
        return (<div
                    className={ `MatchActivityView${ (this.state.isSavingSession) ? ' saving-session' : '' }` }
                    data-saving-session-icon="⏳"
                    data-saving-session-text="Saving session...">
          <Prompt
              when={ !this.state.shouldRedirectAfterSavingSession }
              message={ 'Exiting will cancel the current match. Are you sure?\nHit cancel and use the Save & Close button to save this match session.' }
              />
          <StopwatchPanel
              initialTime={ this._initialTime }
              stopTime={ this._stopTime }
              readTimeCallback={ time => { this.timeActive = time } }
              shouldStop={ this.state.isSavingSession }
              startAction={ (() => {
                    this.setState({ isPlaying: true })
                  }) }
              stopAction={ ( time => {
                    const { match } = this.state
                    match.timeActive = time.getTime()
                    match.endTime = new Date()
                    this.setState({ isPlaying: false, match })
                  })}
              resetAction={ ()=>{} } />
          <TeamScoreBox match={ this.state.match } addGoal={ this.addGoal } removeGoal={ this.removeGoal } freeze={ !this.state.isPlaying } />
          <div className="App-match-btn-group">
            {
              (this.state.isPlaying)
              ? <p>Hit the <em><strong>Stop</strong></em> button at the stopwatch panel to stop the match</p>
              : <p>Hit the <em><strong>Start</strong></em> button at the stopwatch panel above when you're ready!</p>
            }
            {
              (localStorage.getItem(AUTH_TOKEN))
              ? <p><small><em><strong>Save & Close</strong> will save the current match session to the matches section.</em></small></p>
              : <p><small><em><strong>You'll need to be signed in in order to save this match session.</strong></em></small></p>
            }
            <a><TheButton
                  disabled={ this.state.isSavingSession }
                  onClick={
                    (this.state.isSavingSession)
                    ? ()=>{}
                    : () => {
                        this._createOrUpdateMatch()
                    }
                    }
                    >Save & Close</TheButton></a>
          </div>
      </div>)
    }
}

export default withApollo(MatchActivityView)
