const uuidv4 = require('uuid/v4');

class Goal {
    constructor(player, team, time, date, points = 1) {
        this.id = uuidv4();
        this.player = player;
        this.team = team;
        this.time = time;
        this.date = date;
        this.points = points;
    }
}

export default Goal;
