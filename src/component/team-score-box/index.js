import React from 'react'
import './team-score-box.css'
import gwUser from './../../img/gw-user.svg'
import {
    IceBox,
    IconTextInputField,
    IncroButton,
    TotalTeamScoreBadge
} from './../'

const TeamScoreBox = ({
    match,
    match: { teams },
    freeze = false,
    addGoal = ()=>{},
    removeGoal = ()=>{},
}) => (
    <div className="TeamScoreBox">
        <ul>
        {
            (teams.length <= 0) ? (<li>Loading...</li>) : (
            teams.map((team, key) => {
                const title = `Team ${ (key + 1) }`
                return (<li key={ team.id }>
                <IceBox
                    title={ title }
                    winner={ (match.winner() === team.id) }
                    lidColor={ team.color }>
                    <ul>
                    { (team.players.length <= 0) ? <li>No players</li>
                        : team.players.map((player, key) => {
                        return (<li key={ player.id }>
                        <IconTextInputField
                            placeholder={ `Name of Player ${ (key + 1) }` }
                            value={ player.name }
                            iconSrc={ gwUser }
                            rel={ 'name' }
                            isReadOnly>
                            <IncroButton
                                value={
                                    match.goalsBy(player.id, team.id) || 0
                                    }
                                    addAction={
                                        () => addGoal(
                                                    player.id,
                                                    team.id,
                                                    null,
                                                    new Date())
                                                    }
                                    removeAction={
                                        () => removeGoal(
                                                    player.id,
                                                    team.id
                                                    )
                                                    }
                                    isDisabled={ freeze } />
                        </IconTextInputField>
                        </li>)
                    }) }
                    </ul>
                    <div style={{ position: 'relative' }}>
                        <div className="space" style={{ height: 58 }}></div>
                        <TotalTeamScoreBadge
                            value={ match.totalTeamScore(team.id) }
                            badgeColor={ team.color } />
                    </div>
                </IceBox>
                </li>)
                })
            ) }
        </ul>
    </div>)

export default TeamScoreBox
