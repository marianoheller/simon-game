import React, { Component } from 'react';
import './ControlGadgets.css';


export class ScoreCounter extends Component {
    render() {
        const { disabled } = this.props;
        return (
            <div className="pure-g control-button-container" disabled={disabled}>
                <div className="pure-u-1 counter-container">
                    {this.props.score}
                </div>
                <div className="pure-u-1">
                    Score
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
                    <button onClick={this.props.onOnOff} className="pure-button control-button on-off-button"></button>
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
                    <button 
                    onClick={this.props.onStart} 
                    className="pure-button control-button start-button" 
                    disabled={disabled}
                    ></button>
                </div>
                <div className="pure-u-1">
                    Start
                </div>
            </div>
        )
    }
}

export class StrictButton extends Component {

    constructor(props) {
        super(props);

        this.state = {
            activated: !this.props.disabled,
        }
    }

    handleClick() {
        this.setState( {
            ...this.state,
            activated: !this.state.activated,
        })
        this.props.onStrict()
    }

    render() {
        const { disabled } = this.props;
        return (
            <div className="pure-g control-button-container">
                <div className="pure-u-1">
                    <Led color="red" activated={this.state.activated}></Led>
                </div>
                <div className="pure-u-1">
                    <button 
                    onClick={this.handleClick.bind(this)} 
                    className="pure-button control-button strict-button" 
                    disabled={disabled} 
                    ></button>
                </div>
                <div className="pure-u-1">
                    Strict
                </div>
            </div>
        )
    }
}

class Led extends Component {

    getClass() {
        let ret = "led ";
        ret += `led-red `;
        ret += this.props.activated ? "led-red-activated " : " ";
        return ret;
    }

    render() {
        return (
            <div className="led-container">
                <div className={this.getClass()} >
                </div>
            </div>
            
        )
    }
}