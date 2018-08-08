import React, { Component } from 'react';
import './team-input-list.css';
import { Player, Team, Match } from './../../model';
import { PlayerInputList, IceBox } from './../';

class TeamInputList extends Component {
  constructor (props) {
    super(props);
    const { match: { teams = [new Team(0, '', [new Player(0, '')], '#c05a5a'), new Team(1, '', [new Player(0, '')], '#395bbb')] } = new Match(0) } = props;
    this.state = { teams };
  }

  teamById(id = -1) {
    return this.state.teams.filter(team => team.id === id)[0];
  }

  onKeyUpHandler(players, teamId) {
    const team = this.teamById(teamId);
    if (!team) return;
    team.players = players;
    const { teams } = this.state;
    teams[teamId] = team;
    this.setState({ match: teams });
  }

  render() {
    const { teams } = this.state;
    return (
      <div className="TeamInputList">
        <ul>
          {
            (teams.length <= 0) ? (<li>No players</li>) : (
              teams.map((team, key) => {
                const title = `Team ${ (key + 1) }`;
                return (<li key={ team.id }>
                  <IceBox title={ title } lidColor={ team.color }>
                    <PlayerInputList
                      parentHandler={ this.onKeyUpHandler.bind(this) }
                      players={ team.players }
                      teamId={ team.id } />
                  </IceBox>
                </li>);
                })
              ) }
        </ul>
      </div>
    );
  }
}

export default TeamInputList;
