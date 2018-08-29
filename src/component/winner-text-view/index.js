import React from 'react'
import { Match, Goal } from '../../model';

const WinnerTextView = ({ goals, teams }) => {
    let _match = new Match(-1, teams)
    _match.goals = goals.map(({ id, player, team, time, points, createdAt }) => {
        const goal = new Goal(player.id, team.id, time, new Date(createdAt), points)
        goal.id = id
        return goal
    });
    const winner = _match.winner()
    _match = null
    return (
        <span>
            { (winner) ? `Team ${ (teams.indexOf(teams.filter(team => team.id === winner)[0]) + 1) }` : 'Ended in a Tie ⑅' }
        </span>
    )
}

export default WinnerTextView
