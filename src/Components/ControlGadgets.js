import React, { Component } from 'react';
import './ControlGadgets.css';


export class StepCounter extends Component {
    render() {
        const { disabled } = this.props;
        return (
            <div className="pure-g control-button-container">
                <div className="pure-u-1 counter-container">
                    {this.props.step}
                </div>
                <div className="pure-u-1">
                    Count
                </div>
            </div>
        )
    }
}

export class OnOffButton extends Component {
    render() {
        return (
            <div className="pure-g control-button-container">
                <div className="pure-u-1">
                    <button onClick={this.props.onOnOff} className="control-button on-off-button"></button>
                </div>
                <div className="pure-u-1">
                    On/Off
                </div>
            </div>
        )
    }
}

export class StartButton extends Component {
    render() {
        const { disabled } = this.props;
        return (
            <div className="pure-g control-button-container">
                <div className="pure-u-1">
                    <button onClick={this.props.onStart} className="control-button start-button" disabled={disabled}></button>
                </div>
                <div className="pure-u-1">
                    Start
                </div>
            </div>
        )
    }
}

export class StrictButton extends Component {

    render() {
        const { disabled } = this.props;
        return (
            <div className="pure-g control-button-container">
                <div className="pure-u-1">
                    <button onClick={this.props.onStrict} className="control-button strict-button" disabled={disabled} ></button>
                </div>
                <div className="pure-u-1">
                    Strict
                </div>
            </div>
        )
    }
}