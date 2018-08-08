import React, { Component } from 'react';
import { Switch, Route, Redirect, Link, Prompt } from 'react-router-dom';
import { StartPage, TeamScoreBox, TheButton, StopwatchPanel, MatchList } from './../';

class MatchesPage extends Component {
    constructor(props) {
        super(props);
        this.state = { ...this.props, doneEditing: false, isPlaying: false };
        this.toggleDoneEditing = this.toggleDoneEditing.bind(this);
        this.addGoal = this.addGoal.bind(this);
        this.removeGoal = this.removeGoal.bind(this);
    }

    toggleDoneEditing(flag) {
      this.setState({ doneEditing: (flag !== undefined || flag !== null) ? flag : !(this.state.doneEditing) });
    }

    addGoal(player, team, time, date) {
      const { match } = this.state;
      match.addGoal(player, team, time, date);
      this.setState({ match });
    }

    removeGoal(player, team) {
      const { match } = this.state;
      match.removeGoal(player, team);
      this.setState({ match });
    }

    render() {
        return (<Switch>
            <Route exact path="/matches" render={ (props) => {
              return (<MatchList />);
            } } />
            <Route exact path="/matches/new" render={ (props) => {
              return (<div>
                <StartPage match={ this.state.match } toggleDoneEditingAction={ this.toggleDoneEditing } />
                <Prompt
                  when={ !this.state.doneEditing }
                  message="Are you sure you want to exit from creating this new match?" />
                </div>);
              } } />
            <Route exact path="/matches/:id" render={ (props) => {
              return (<h1>Match id { props.match.params.id }</h1>);
            } } />
            <Route exact path="/matches/:id/session" render={ (props) => {
              const { match, match: { teams, teams: players }, isPlaying } = this.state;
              if (match === 'undefined') return <Redirect to = "/" />;
              if (teams === 'undefined') return <Redirect to = "/" />;
              if (players === 'undefined') return <Redirect to = "/" />;
              for(var i=0; i<teams.length; i++) {
                const team = teams[i];
                const returnedUnNamed = team.players.filter(player => (player.name.trim() === ''));
                if (returnedUnNamed.length !== 0) {
                  return <Redirect to = "/matches/new" / > ;
                }
              }
              return (<div className="session-window">
                <h1>Match Session</h1>
                <StopwatchPanel startAction={ (()=>{ this.setState({ isPlaying: true }); console.log('playing'); }) } stopAction={ ((time)=>{ match.timeActive = time; match.endTime = new Date(); this.setState({ isPlaying: false, match }); console.log('stopping with time in seconds: ', time.getTime() / 1000); }) } resetAction={ ()=>{} } />
                <TeamScoreBox match={ this.state.match } addGoal={ this.addGoal } removeGoal={ this.removeGoal } freeze={ !isPlaying } />
                <div className="App-match-btn-group">
                  <p>Hit the start button at the stopwatch panel above when you're ready!</p>
                  <p><small><em>Closing this session will save the current match to the matches section.</em></small></p>
                  <Link to="/matches"><TheButton iscancel="true">Close</TheButton></Link>
                </div>
                <Prompt
                  when={ true }
                  message={
                    `Are you sure you want to exit this match session?
(The match will be saved so you can resume it later from the recent matches section)`}
                   />
            </div>);
            } } />
            <Redirect from="/matches/:id/session/exit" to="/" />
          </Switch>);
    }
}

export default MatchesPage;
