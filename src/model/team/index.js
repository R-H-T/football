import { Player } from './../';

const uuidv4 = require('uuid/v4');

class Team {
  constructor(id = uuidv4(), name = '', players = [new Player()], color = '#c05a5a') {
    this.id = id;
    this.name = name;
    this.players = players;
    this.color = color;
    this.createdAt = Date.now();
  }
}

export default Team;
