import uuidv4 from 'uuid/v4'

class Goal {
    constructor(player, team, time, date, points = 1) {
        this.id = uuidv4()
        this.match = null // eg.: { id: 1234, name: 'Company Xmas Match 2018' }
        this.player = player
        this.team = team
        this.time = time
        this.date = date
        this.points = points
    }
}

export default Goal
