import React, { Component }  from 'react';
import { Link } from 'react-router-dom';
import './match-list.css';
import { TheButton } from './../';
import { Match } from '../../model';

class MatchList extends Component {
    constructor(props) {
        super(props);
        const { matches = [] } = this.props;
        this.state = { matches };
    }

    render() {
        const { matches } = this.state;
        return (<div className="MatchList">
            <h1>Matches</h1>
            <hr />
            <div className="MatchList-list-header"><div>#</div><div>Name</div><div>Winner</div><div>Date</div></div>
            <hr />
            <ul>
                {
                    (matches.length <= 0)
                    ? (<li><p><small><em>No recent matches to display</em></small></p></li>)
                    : [new Match()].map((match, key) => (<li key={ match.id } className="MatchList-list-item">
                            <div>{ (key + 1) }</div>
                            <div>{ match.name }</div>
                            <div>{ 'Not available' }</div>
                            <div>{ match.createdAt }</div>
                    </li>))
                }
            </ul>
            <hr />
            <br />
            <div className="App-match-btn-group">
                <Link to="/">
                    <TheButton>Back to Main Menu</TheButton>
                </Link>
            </div>
        </div>);
    }
}

export default MatchList;
