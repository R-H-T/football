import React, { Component } from 'react'
import { Link, Redirect, withRouter } from 'react-router-dom'
import { Query, Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import './match-detail.css'
import { Match, Goal } from './../../model'
import { TeamScoreBoxStatic, WinnerTextView, TheButton } from './../'
import { MATCHES_QUERY } from '../match-list'

export const MATCH_QUERY = gql`
query MatchById($id: ID!) {
    match(id: $id) {
        id
        name
        timeActive
        createdAt
        teams {
          id
          name
          teamColor
          players {
              id
              name
          }
        }
        goals {
          id
          match {
              id
              name
          }
          player {
              id
              name
          }
          team {
              id
              name
          }
          points
          createdAt
        }
    }
}`

const DELETE_MATCH_MUTATION = gql`
    mutation DeleteMatch($id: ID!) {
        deleteMatch(id: $id) {
            id
        }
    }
`

const RESET_MATCH_MUTATION = gql`
    mutation ResetMatch($id: ID!) {
        resetMatch(id: $id) {
            id
            timeActive
            teams {
                id
                name
                players {
                    id
                    name
                }
            }
            goals {
                time
                match {
                    id
                    name
                }
                player {
                    id
                    name
                }
                team {
                    id
                    name
                }
                points
            }
        }
    }
`

const DeleteMatchButton = ({ matchId, redirectAction = ()=>{} }) => (<Mutation
    mutation={ DELETE_MATCH_MUTATION }
    variables={ { id: matchId } }
    onCompleted={ () => redirectAction() }
    onError={ (error) => { alert(`Failed to delete this match.\n\nTechnical details:\nError: ${ error.message }`); console.debug(error.message); redirectAction() } }
    update={ (store, { data: { match } }) => {
        const data = store.readQuery({ query: MATCHES_QUERY })
        const index = data.matches.indexOf(match)
        if (index === -1) return
        data.matches.slice(index, 1)
        store.writeQuery({
          query: MATCHES_QUERY,
          data
        })
      } }
>
{ (mutationAction) => (<a>
    <TheButton onClick={ () => (window.confirm(`Are you sure you want to delete this match?\nWarning: Removed matches can not be restored.`)) ? mutationAction({ matchId }) : () => {} } iscancel="true">Delete Match</TheButton>
</a>)
}
</Mutation>)

const ResetMatchButton = ({ matchId, redirectAction = ()=>{} }) =>
(<Mutation
    mutation={ RESET_MATCH_MUTATION }
    variables={ { id: matchId } }
    onCompleted={ () => alert('All scores are now reset to Nil-Nil.') }
    onError={ (error) => { alert(`Failed to reset this match.\n\nTechnical details:\nError: ${ error.message }`); console.debug(error.message); redirectAction() } }
    update={ (store, { data: { match } }) => {
        let data = store.readQuery({ query: MATCHES_QUERY })
        const index = data.matches.indexOf(match)
        if (index === -1) return
        data.matches[index] = match
        store.writeQuery({
          query: MATCHES_QUERY,
          data
        })
      } }
>
{ (mutationAction) => (<a>
    <TheButton onClick={ () => (window.confirm(`Are you sure you want to reset this match?`)) ? mutationAction({ matchId }) : () => {} }>Reset Match (Nil-Nil)</TheButton>
</a>)
}
</Mutation>)

const MatchDetailView = ({ match: { id, teams, goals } }) => {
    const match = new Match(id, teams)
    match.goals = goals.map(({ id, player, team, time, points, createdAt }) => {
        const goal = new Goal(player.id, team.id, time, new Date(createdAt), points)
        goal.id = id
        return goal
    });
    return ( !match ) ? '' : (<div>
        <div>Teams count: { teams.length }</div>
        <div>Players count: { teams.reduce((prev, curr) => { return prev + curr.players.length }, 0) }</div>
        <div>Goals count: { goals.reduce((prev, curr) => { return prev + curr.points }, 0) }</div>
        <div>Winner: <WinnerTextView goals={ goals } teams={ teams } /></div>
        <TeamScoreBoxStatic match={ match } />
    </div>)
}

class MatchDetail extends Component {
    state = { ...this.props }
    render() {
        const { matchId } = this.state
        return (<div className="MatchDetail">
            <h1>Match Details</h1>
            <p><strong>id:</strong> <code>{ matchId }</code></p>
            <Query query={ MATCH_QUERY } variables={ { id: matchId } }>
                {
                    ({ loading, error, data }) => {
                    if (loading) return (
                        <div>Loading...</div>
                    )
                    if (error) return (
                        <div style={{ background: '#e66', color: '#fff', borderColor: '#ddd' }}>Error loading match</div>
                    )
                    const { match } = data
                    if (!match) return <Redirect to="/matches" />
                    return (<div><MatchDetailView match={ match } />
                        <br />
                        <p><small><em>You can manage this match with the options provided below.</em></small></p>
                        <div className="App-match-btn-group">
                            <Link to={`/matches/${ matchId }/session`}>
                                <TheButton>Resume Match</TheButton>
                            </Link>
                            <ResetMatchButton matchId={ matchId } redirectAction={ this.props.history.push.bind(this, `/matches/${ matchId }/`) } />
                            <DeleteMatchButton matchId={ matchId } redirectAction={ this.props.history.push.bind(this, '/matches/') } />
                        </div>
                    </div>)
                    }
                }
            </Query>
            <hr />
            <br />
            <div className="App-match-btn-group">
                <Link to="/matches">
                    <TheButton>Back to Matches</TheButton>
                </Link>
            </div>
        </div>)
    }
}

export default withRouter(MatchDetail);
