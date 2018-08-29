import React, { Component } from 'react'
import { Switch, Route, Redirect, Prompt, Link } from 'react-router-dom'
import { withApollo, Query } from 'react-apollo'
import { StartPage, MatchList, MatchDetail, MatchActivityView, TheButton } from './../'
import { MATCH_QUERY } from './../match-detail'
import { Match } from './../../model'

class MatchesPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
          ...this.props,
          doneEditing: false,
        }
        this.toggleDoneEditing = this.toggleDoneEditing.bind(this)
    }

    _getMatch = async id => {
      const results = await this.props.client.query({
        query: MATCH_QUERY,
        variables: { id }
      })
      const match = results.data.match
      console.debug('match', match)
      return { ...match }
    }

    toggleDoneEditing(flag) {
      this.setState(
        {
          doneEditing:
            (flag !== undefined || flag !== null)
            ? flag
            : !(this.state.doneEditing)
        }
      )
    }

    render() {
        return (
          <Switch>
            <Route exact path="/matches" render={ ({ location }) => {
              return (
                  <MatchList />
                )
            } } />
            <Route exact path="/matches/new" render={ ({ location }) => {
              return (
                <div>
                <StartPage
                  match={ this.state.match }
                  toggleDoneEditingAction={ this.toggleDoneEditing } />
                <Prompt
                  when={ !this.state.doneEditing }
                  message="Are you sure you want to exit from creating this new match?" />
                </div>
                )
              } } />
            <Route exact path="/matches/:id" render={ (props) => {
              return (<MatchDetail matchId={ props.match.params.id } />)
             } } />
            <Route exact path="/matches/:id/session" render={ ({ location, match: { params } }) => {
              const currentMatchId = params.id
              return (
                <div className="session-window">
                  <h1>Match Session</h1>
                  <Query query={ MATCH_QUERY } variables={ { id: currentMatchId } } fetchPolicy="network-only">
                    {
                      ({ loading, error, data }) => {
                        if (loading) return (
                            <div>Loading...</div>
                        )
                        if (error) return (this.state.match) ? (<div>
                          <MatchActivityView match={ this.state.match } />
                          <div className="App-match-btn-group">
                              <Link to="/"><TheButton iscancel="true">Cancel</TheButton></Link>
                          </div></div>) : (
                            <div style={{ background: '#e66', color: '#fff', borderColor: '#ddd', width: '70vw', margin: '0 auto', padding: 8, borderRadius: 8 }}>Error loading match</div>
                        )
                        const { match } = data
                        if (match) {
                          const aMatch = Match.matchFromResponseData(match)
                          return (<div>
                            <p>(<em>Resumed match</em>)</p>
                            <MatchActivityView match={ aMatch } />
                            <div className="App-match-btn-group">
                                <Link to="/"><TheButton iscancel="true">Cancel</TheButton></Link>
                            </div>
                          </div>)
                        } else {
                          return (<div>
                            <MatchActivityView match={ this.state.match } />
                            <div className="App-match-btn-group">
                                <Link to="/"><TheButton iscancel="true">Cancel</TheButton></Link>
                            </div>
                          </div>)
                        }
                    }
                  }</Query>
                </div>
              )
             }} />
            <Redirect from="/matches/:id/session/exit" to="/" />
          </Switch>)
    }
}

export default withApollo(MatchesPage)
