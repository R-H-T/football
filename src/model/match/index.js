import { Team, Player } from './../';

class Match {
  constructor(id = 0, teams = [new Team(0, '', [new Player(0, '')], '#c05a5a'), new Team(1, '', [new Player(0, '')], '#395bbb')]) {
    this.id = id;
    this.teams = teams;
    this.createdAt = Date.now();
    this.isActive = false;
    this.startTime = null;
    this.pauseTime = null;
    this.endTime = null;
  }

  get isStarted() { return (this.startTime !== null); }
  get isPaused() { return (this.pauseTime !== null); }
  get hasEnded() { return (this.endTime !== null); }
}

export default Match;
