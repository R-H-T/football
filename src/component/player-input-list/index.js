import React, { Component } from 'react'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'
import './player-input-list.css'
import gwUser from './../../img/gw-user.svg'
import { Player } from '../../model'
import { IconTextInputField, IncroButton } from './../'

const PLAYERS_QUERY = gql`
{
  players {
    name
  }
}
`

const PlayerInputListView = ({
  limit = { min: 1, max: 4 },
  players = [],
  playersDataList = [],
  onChangeAction = ()=>{},
  addAction,
  removeAction,
}) => {
  return (
  <div className="PlayerInputList">
    <TransitionGroup
      component="ul"
      >
        {
          (players.length <= 0) ? (<li>No players</li>) :
            (players.map((player, index) => (
            <CSSTransition
              key={ index }
              classNames="PlayerInputList-list"
              timeout={{ enter: 200, exit: 150 }}>
                <li key={ player.id }>
                    <IconTextInputField
                      placeholder={ `Name of Player ${ (index + 1) }` }
                      value={ player.name }
                      iconSrc={ gwUser }
                      list={ { options: playersDataList } }
                      onChangeAction={
                        onChangeAction.bind(this, player.id)
                      }
                      rel={ 'name' }  />
                </li>
              </CSSTransition>
            )
            )
          )
        }
        </TransitionGroup>
    <IncroButton
      addAction={ addAction }
      removeAction={ removeAction }
      value={ players.length || 0 }
      limit={ limit } />
  </div>)
}

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
    this.onChangePlayerName = this.onChangePlayerName.bind(this)
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
    return(<Query query={ PLAYERS_QUERY } fetchPolicy="network-only">
                { ({ loading, error, data }) => {
                if (loading) return (
                    <div>
                      <br />
                      <ul>
                          <li style={{ border: 'none', background: 'none', boxShadow: 'none' }}><div>Loading...</div></li>
                      </ul>
                      <br />
                    </div>
                )
                if (error) return (
                  <PlayerInputListView
                    limit={ limit }
                    players={ players }
                    onChangeAction={ this.onChangePlayerName }
                    addAction={ this.addNewPlayer }
                    removeAction={ this.removePlayer } />
                )
                const playersDataList = data.players.map(player => player.name)
                return (
                  <PlayerInputListView
                    limit={ limit }
                    players={ players }
                    playersDataList={ playersDataList }
                    onChangeAction={ this.onChangePlayerName }
                    addAction={ this.addNewPlayer }
                    removeAction={ this.removePlayer } />
                  )
                }
                }
    </Query>)
  }
}

export default PlayerInputList
