import uuidv4 from 'uuid/v4'
import { Player } from './../'

class Team {
  constructor(
    id = uuidv4(),
    name = '',
    players = [new Player()],
    teamColor = '#c05a5a'
  ) {
    this.id = id
    this.name = name
    this.players = players
    this.teamColor = teamColor
    this.createdAt = Date.now()
  }
}

export default Team
