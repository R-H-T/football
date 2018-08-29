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
    this.name = ""
    this.createdAt = new Date()
    this.isActive = false
    this.startTime = null
    this.pauseTime = null
    this.endTime = null
    this.timeActive = 0
    this.goals = []
  }

  static matchFromResponseData(match) {
    const { id, name, timeActive, teams=[], goals=[], createdAt } = match
    const newTeams = teams.map(({ id, name, teamColor, players }) => {
      const newPlayers = players.map(player => new Player(player.id, player.name))
      return new Team(id, name, newPlayers, teamColor)
    })
    const newGoals = goals.map(({ id, match, player, team, time, points, createdAt }) => {
      const goal = new Goal(player.id, team.id, time, new Date(createdAt), points)
      goal.id = id
      goal.match = { id: match.id, name: match.name }
      return goal
    });
    const newMatch = new Match(id, newTeams)
    newMatch.name = name
    newMatch.goals = newGoals
    newMatch.timeActive = timeActive
    newMatch.createdAt = new Date(createdAt)
    return newMatch
  }

  toMatchInput() {
    const teams = this.teams.map(team => {
      const players = team.players.map(({ id, name }) => {
        return {
          id,
          name,
        }
      })
      return {
        id: team.id,
        name: team.name,
        teamColor: team.teamColor,
        players,
      }
    })
    const goals = this.goals.map(goal => {
      const teamName = teams.filter(team => (team.id === goal.team))[0].name || ''
      let playerName = ''
      let tmpPlayer = null
      for(const team of teams) {
        tmpPlayer = team.players.filter(player => (player.id === goal.player))[0] || null
        if (tmpPlayer !== null) {
          playerName = `${ tmpPlayer.name }`
          tmpPlayer = null
          break
        }
      }
      const goalTeam = {
        id: goal.team || '1234',
        name: teamName,
      }
      const goalPlayer = {
        id: goal.player || '1234',
        name: playerName,
      }
      return {
        id: goal.id || '1234',
        match: goal.match,
        player: goalPlayer,
        team: goalTeam,
        time: goal.time || 0,
        points: goal.points || 1,
      }
    })

    return {
      id: this.id,
      timeActive: this.timeActive,
      name: this.name,
      teams: teams,
      goals,
    }
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
    goal.match = { id: this.id, name: this.name }
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
