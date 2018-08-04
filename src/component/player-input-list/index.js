import React, { Component } from 'react';
import './player-input-list.css';
import gwUser from './../../img/gw-user.svg';
import { Player } from '../../model';

class PlayerInputList extends Component {
  constructor (props) {
    super(props);
    const { players = [new Player(0, '')], parentHandler, teamId } = props;
    this.state = { players, parentHandler, teamId };

    this.addNewPlayer = this.addNewPlayer.bind(this);
    this.removePlayer = this.removePlayer.bind(this);
  }

  addNewPlayer() {
    const allPlayers = this.state.players;
    const newIndex = allPlayers.length;
    const newPlayer = new Player(newIndex, '');
    this.setState({ players: [ ...allPlayers, newPlayer ] });
  }

  removePlayer() {
    const allPlayers = this.state.players;
    const removedPlayer = allPlayers.pop();
    console.log('removed player', removedPlayer);
    this.setState({ players: [ ...allPlayers ] });
    this.props.parentHandler(allPlayers, this.state.teamId);
  }

  playerById(id = -1) {
    return this.state.players.filter(player => player.id === id)[0];
  }

  onChangePlayerName(id, e) {
    e.preventDefault();
    const { players, teamId } = this.state;
    const currentPlayer = this.playerById(id);
    if (!currentPlayer) return;
    currentPlayer.name = e.target.value;
    players[id] = currentPlayer;
    this.setState({ players });
    this.props.parentHandler(players, teamId);
  }

  render() {
    const { players } = this.state;
    const limit = { min: 1, max: 4 };
    return (
      <div className="PlayerInputList">
        <ul>
          {
              (players.length <= 0) ? (<li>No players</li>) :
                (players.map((player, key) => <li key={ player.id }>
                    <div className="input-field-group">
                        <span className="icon-field" role="img" aria-label="Player icon"><img style={{ verticalAlign: 'middle' }} src={ gwUser } />{ /* <span role="img" aria-label="football" style={{ fontSize: 8 }}>⚽</span>🏃‍*/ }</span>
                        <input className="text-field"
                               onChange={ this.onChangePlayerName.bind(this, player.id) }
                               type="text"
                               rel="name"
                               placeholder={`Name of Player ${ key + 1 }`}
                               autoComplete="true"
                               autoCorrect="false"
                               value={ player.name } />
                    </div>
                </li>))
            }
        </ul>
        <div className="PlayerInputList-btn-group">
          <button onClick={ (players.length > limit.min) ? this.removePlayer : ()=>{} }
                  className="negative-action"
                  disabled={ (players.length <= limit.min) }>-</button>
          <input className="number-badge" type="text" aria-label="Number of players added" value={ players.length || 0} readOnly />
          <button onClick={ (players.length < limit.max) ? this.addNewPlayer : ()=>{} } disabled={ (players.length >= limit.max) }>+</button>
        </div>
      </div>
    );
  }
}

export default PlayerInputList;
