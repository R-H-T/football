import { Team, Player, Goal } from './../'
import uuidv4 from 'uuid/v4'

class Match {
  constructor(
    id = uuidv4(),
    teams = [new Team(undefined, '', [new Player()], '#c05a5a'),
            new Team(undefined, '', [new Player()], '#395bbb')],
    ) {
    this.id = id
    this.teams = teams
    this.createdAt = new Date()
    this.isActive = false
    this.startTime = null
    this.pauseTime = null
    this.endTime = null
    this.timeActive = null
    this.goals = []
  }

  get isStarted() { return (this.startTime !== null) }
  get isPaused() { return (this.pauseTime !== null) }
  get hasEnded() { return (this.endTime !== null) }

  goalsBy(playerId = -1, teamId = -1) {
    const goals = this.goals.filter(goal => {
      return (goal.player === playerId && goal.team === teamId)
    })
    let sum = 0
    if (goals.length > 0) goals.forEach(goal => { sum += goal.points })
    return (playerId === -1 || teamId === -1) ? 0 : sum
  }

  addGoal(player = -1, team = -1, time, date) {
    const goal = new Goal(player, team, time, date)
    this.goals.push(goal)
  }

  removeGoal(playerId = -1, teamId = -1) {
    let goals = this.goals.filter(goal => (goal.player === playerId && goal.team === teamId))
    let removedGoal = null
    if (goals.length > 0) {
      const index = this.goals.indexOf(goals.pop())
      removedGoal = this.goals.splice(index, 1)
    }
    return removedGoal
  }

  totalTeamScore(teamId = -1) {
    let sum = 0
    const goals = this.goals.filter(goal => (goal.team === teamId))
    if (goals.length > 0) goals.forEach(goal => { sum += goal.points })
    return sum
  }

  winner() {
    let totalsByTeam = []
    let highest = { teamId: -1, score: 0 }

    this.teams.forEach(({ id }) => {
      totalsByTeam.push({ teamId: id, score: this.totalTeamScore(id) })
    });

    totalsByTeam.forEach(({ teamId, score }) => {
      if (score === highest.score) { highest = { teamId: -1, score: 0 }; return }
      if (score > highest.score) { highest = { teamId, score } }
    });

    return (highest.teamId !== -1 && highest.score !== 0) ? highest.teamId : null
  }
}

export default Match
