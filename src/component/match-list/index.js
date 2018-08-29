import React, { Component }  from 'react'
import { Link, withRouter } from 'react-router-dom'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import './match-list.css'
import { TheButton, MatchListItem } from './../'
import { AUTH_TOKEN } from './../../constant'

export const MATCHES_QUERY = gql`
{
  matches {
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
        time
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
}
`

const MatchListBox = ({ children }) => (
    <ul className="MatchList-list">
        <li>
            <div>#</div>
            <div>Teams</div>
            <div>Winner</div>
            <div>Date</div>
        </li>
        { children }
    </ul>
)

class MatchList extends Component {
    state = { matches: this.props.matches || [] }
    navigateTo(url) {
        this.props.history.push(url)
    }
    render() {
        const isAuthorized = !!localStorage.getItem(AUTH_TOKEN)
        return (<div className="MatchList">
            <h1>Matches</h1>
            <hr />
            <Query query={ MATCHES_QUERY } fetchPolicy="network-only">
                { ({ loading, error, data }) => {
                if (loading) return (
                    <MatchListBox>
                        <li style={{ border: 'none', background: 'none', boxShadow: 'none' }}><div>Loading...</div></li>
                    </MatchListBox>
                )
                if (error) return (
                    <MatchListBox>
                        <li className="ErrorListItem" onMouseOver={ e => { e.target.style.opacity = 1 } } style={{ border: 'none', background: 'none', boxShadow: 'none', cursor: 'default' }}>
                            <div style={{ display: 'flex', flexFlow: 'column' , background: 'none', border: 'none', color: 'none', borderColor: '#ddd', minHeight: (isAuthorized) ? 'inherit' : 80, opacity: 1 } }>
                                <span style={{ color: '#e66' }}><h3 style={{ marginTop: 0 }}>Error loading matches</h3></span>
                                {
                                    (!isAuthorized)
                                    ? (
                                        <span className="error-description" style={{ display: 'flex', flexFlow: 'column' }}>
                                            <span>You need to be signed in to save matches <span role="img" aria-label="football" style={{ font: 'Helvetica-Regular', fontStyle: 'normal' }}>⚽️</span></span>
                                            <Link to="/#auth" style={{ color: 'rgb(238, 102, 102)', fontStyle: 'normal', textDecoration: 'none', fontWeight: 100, padding: '8px 16px', marginTop: 8, borderRadius: 100, backgroundColor: '#eee', maxWidth: 250, minWidth: 60, margin: '16px auto 0' }}>Login / Sign up</Link>
                                        </span>)
                                    : ''
                                }
                            </div>
                        </li>
                    </MatchListBox>
                )
                const { matches } = data
                return (
                    <MatchListBox>
                        {
                            (matches.length <= 0)
                            ? (<li><p><small><em>No recent matches to display</em></small></p></li>)
                            : matches.map((match, index) => <MatchListItem navigateTo={ this.navigateTo.bind(this) } key={ match.id } match={ match } index={ index } />)
                        }
                    </MatchListBox>
                )
                }
                }
            </Query>
            <hr />
            <p><small><em>You can click an item to see more details about the match.</em></small></p>
            <br />
            <div className="App-match-btn-group">
                <Link to="/">
                    <TheButton>Back to Main Menu</TheButton>
                </Link>
            </div>
        </div>)
    }
}

export default withRouter(MatchList)
