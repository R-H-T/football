import React, { Component } from 'react';
import './stopwatch-panel.css';
import { GWStopwatch } from './../';

// POLYFILLS

/* eslint-disable no-extend-native */
// https://github.com/uxitten/polyfill/blob/master/string.polyfill.js
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/padStart
if (!String.prototype.padStart) {
    String.prototype.padStart = function padStart(targetLength,padString) {
        targetLength = targetLength>>0; // truncate if number or convert non-number to 0
        padString = String((typeof padString !== 'undefined' ? padString : ' '));
        if (this.length > targetLength) {
            return String(this);
        } else {
            targetLength = (targetLength - this.length);
            if (targetLength > padString.length) {
                padString += padString.repeat(targetLength / padString.length); // append to original to ensure we are longer than needed
            }
            return padString.slice(0,targetLength) + String(this);
        }
    };
}
/* eslint-enable no-extend-native */

// POLYFILLS (END)

const TimerDisplay = ({ days = '00', hours = '00', minutes = '00', seconds = '00', milliseconds = '00' }) => (
    <div className="TimerDisplay">
        <span>{ days }</span><span>:</span>
        <span>{ hours }</span><span>:</span>
        <span>{ minutes }</span><span>:</span>
        <span>{ seconds }</span><span>:</span>
        <span>{ milliseconds }</span>
    </div>
);

class StopwatchPanel extends Component {
  constructor(props) {
    super(props);
    const {
      angle = 0,
      initialTime = new Date(),
      stopTime = new Date(),
      lastTimeDiff = new Date(0),
      enableSingleButtonMode = false,
    } = this.props;
    this.state = {
      angle,
      initialTime,
      stopTime,
      isCounting: false,
      lastTimeDiff,
      enableSingleButtonMode,
    };
    this.updateAngle = this.updateAngle.bind(this);
    this.setAngle = this.setAngle.bind(this);
    this.start = this.start.bind(this);
    this.reset = this.reset.bind(this);
    this.stop = this.stop.bind(this);
    this.incrementSeconds = this.incrementSeconds.bind(this);
  }

  get seconds() {
    const { initialTime, stopTime } = this.state;
    return Math.trunc(parseInt((stopTime - initialTime) / 1000, 0));
  }

  start() {
    if (!this.state.isCounting) {

      if (!this.enableSingleButtonMode) {
        const { lastTimeDiff } = this.state;
        this.reset(lastTimeDiff);
        this.currentTimeId = setInterval(this.incrementSeconds, 16 + 100);
        this.props.startAction();
        this.setState({ isCounting: true });
        return;
      }

      this.reset();
      this.currentTimeId = setInterval(this.incrementSeconds, 16 + 100);
      this.props.startAction();
      this.setState({ isCounting: true });

    } else if (this.state.isCounting) {
      this.stop();
    } else if (!(this.state.isCounting) && this.state.enableSingleButtonMode === true) {
      this.reset();
    }
  }

  stop() {
    clearInterval(this.currentTimeId);
    this.currentTimeId = -1;
    const { stopTime, initialTime } = this.state;
    const lastTimeDiff = new Date(stopTime - initialTime);
    this.setState({
      lastTimeDiff,
      isCounting: false,
    });
    this.props.stopAction(lastTimeDiff);
  }

  reset(value) {
    this.setState({
      initialTime: (value) ? new Date(new Date() - value) : new Date(),
      stopTime: new Date(),
      isCounting: false,
    });
  }

  incrementSeconds() {
    this.setState({ stopTime: new Date() });
    this.updateAngle();
  }

  updateAngle() {
    this.setAngle(this.seconds * 6);
  }

  setAngle(angle) {
    this.setState({ angle });
  }
  render() {
    const { stopTime, initialTime, isCounting } = this.state;
    const diff = new Date(stopTime - initialTime);
    const daysDiv = (1000 * 60 * 60 * 24);
    const pad = '0';
    const ms = (diff.getMilliseconds() + '').padStart(3, pad);
    const sec = (diff.getSeconds() + '').padStart(2, pad);
    const min = (diff.getMinutes() + '').padStart(2, pad);
    const hrs = (diff.getUTCHours() + '').padStart(2, pad);
    const days = (Math.round(diff.getTime() / daysDiv) + '').padStart(2, pad);
    return (<div className={ `StopwatchPanel${ (isCounting) ? ' active' : '' }` }>
      <GWStopwatch angle={ this.state.angle || 0 } />
      <TimerDisplay
        days={ days }
        hours={ hrs }
        minutes={ min }
        seconds={ sec }
        milliseconds={ ms } />
      <button className={ `${ (isCounting) ? 'counting' : '' }` } onClick={ this.start }>{ (isCounting) ? 'Stop' : 'Start' }</button>
    </div>);
  }
}

export default StopwatchPanel;
