import { Player } from './../';

class Team {
  constructor(id, name='', players = [new Player(0, '')], color = 'red') {
    this.id = id;
    this.name = name;
    this.players = players;
    this.color = color;
    this.createdAt = Date.now();
  }
}

export default Team;
