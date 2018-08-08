const uuidv4 = require('uuid/v4');

class Player {
  constructor(id = uuidv4(), name = '') {
    this.id = id;
    this.name = name;
  }
}

export default Player;
