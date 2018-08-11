import React, { Component } from 'react'
import './player-input-list.css'
import gwUser from './../../img/gw-user.svg'
import { Player } from '../../model'
import { IconTextInputField, IncroButton } from './../'

class PlayerInputList extends Component {
  constructor (props) {
    super(props)
    const {
      players = [new Player(0, '')],
      parentHandler,
      teamId
    } = props
    this.state = {
      players,
      parentHandler,
      teamId
    }

    this.addNewPlayer = this.addNewPlayer.bind(this)
    this.removePlayer = this.removePlayer.bind(this)
  }

  addNewPlayer() {
    const allPlayers = this.state.players
    const newIndex = allPlayers.length
    const newPlayer = new Player(newIndex, '')
    this.setState({ players: [ ...allPlayers, newPlayer ] })
  }

  removePlayer() {
    const allPlayers = this.state.players
    const removedPlayer = allPlayers.pop()
    this.setState({ players: [ ...allPlayers ] })
    this.props.parentHandler(allPlayers, this.state.teamId)
    return removedPlayer
  }

  playerById(id = -1) {
    return this.state.players.filter(player => player.id === id)[0]
  }

  onChangePlayerName(id, e) {
    e.preventDefault()
    const { players, teamId } = this.state
    const currentPlayer = this.playerById(id)
    if (!currentPlayer) return
    currentPlayer.name = e.target.value
    players[id] = currentPlayer
    this.setState({ players })
    this.props.parentHandler(players, teamId)
  }

  validate() {
    // TODO: Add validation here or rely only on server side validation.
  }

  render() {
    const { players } = this.state
    const limit = { min: 1, max: 4 }
    return (
      <div className="PlayerInputList">
        <ul>
          {
              (players.length <= 0) ? (<li>No players</li>) :
                (players.map((player, key) => <li key={ player.id }>
                    <IconTextInputField
                      placeholder={ `Name of Player ${ (key + 1) }` }
                      value={ player.name }
                      iconSrc={ gwUser }
                      onChangeAction={
                        this.onChangePlayerName.bind(this, player.id)
                      }
                      rel={ 'name' }  />
                </li>))
            }
        </ul>
        <IncroButton
          addAction={ this.addNewPlayer }
          removeAction={ this.removePlayer }
          value={ players.length || 0 }
          limit={ limit } />
      </div>
    )
  }
}

export default PlayerInputList
