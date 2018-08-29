import React, { Component } from 'react'
import { WinnerTextView } from './../'

class MatchListItem extends Component {
    state = { ...this.props }
    render () {
        const { match: { id, teams = [], goals, createdAt }, index } = this.state;
        return (<li key={ id } onClick={ () => { this.props.navigateTo(`/matches/${ id }`) } } className="MatchList-list-item">
            <div>{ (index + 1) }</div>
            <div>
                <ul className="MatchList-team-list">
                {   (!teams.length) ? <li>No teams</li>
                    : teams.map(({ id, teamColor, players = [] }, index) =>
                        <li className="MatchList-team-list-item" key={ id }>
                            <span style={{ color: teamColor }}>
                                { `Team ${ index + 1 }`} <small><em>{ `(players: ${ players.length })` }</em></small>
                            </span>
                        </li>)
                }
                </ul>
            </div>
            <div><WinnerTextView goals={ goals } teams={ teams } /></div>
            <div>{ `${ new Date(createdAt).toLocaleString('ja') }` }</div>

        </li>)
    }
}

export default MatchListItem
