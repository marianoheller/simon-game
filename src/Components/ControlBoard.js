import React, { Component } from 'react';
import { StartButton, OnOffButton, StrictButton, StepCounter } from './ControlGadgets';


export default class ControlBoard extends Component {
    render() {
        const { strict, isOn, isStarted } = this.props.boardState;
        return (
            <div className="pure-g">
                <div className="pure-u-1">
                    <StepCounter disabled={!isOn} step={this.props.step}></StepCounter>
                    <OnOffButton onOnOff={this.props.handlers.onOnOff}></OnOffButton>
                    <StartButton disabled={!isOn} onStart={this.props.handlers.onStart}></StartButton>
                    <StrictButton disabled={!isOn} onStrict={this.props.handlers.onStrict}></StrictButton>
                </div>
            </div>
        )
    }
}