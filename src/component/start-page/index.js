import React, { Component } from 'react'
import { TeamInputList, TheButton } from './../'
import { Link } from 'react-router-dom'
import { Match } from '../../model';

class StartPage extends Component {
  state = { match: this.props.match || new Match() }

  render() {
    const { match } = this.state
    const negativeAction = this.props.toggleDoneEditingAction.bind(this, false)
    const positiveAction = this.props.toggleDoneEditingAction.bind(this, true)
    const doubleAction = () => {
      positiveAction()
      negativeAction()
    }
    return (<div>
      <p className="App-intro">
        To get started, add the players you want for your teams
      </p>
      <TeamInputList match={ match } />
      <div className="App-match-btn-group">
        <Link
          onClick={ doubleAction }
          onTouchStart={ positiveAction }
          onKeyDown={ doubleAction }
          to={ `/matches/${ match.id }/session` }>
            <TheButton
              onMouseEnter={ positiveAction }
              onMouseLeave={ negativeAction }>Create Match</TheButton>
        </Link>
        <Link onClick={ negativeAction } to={ `/` }>
          <TheButton iscancel="true">Cancel</TheButton>
        </Link>
      </div>
    </div>)
  }
}

export default StartPage
