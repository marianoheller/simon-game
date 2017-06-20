import React, { Component } from 'react';
import './ControlGadgets.css';


export class ScoreCounter extends Component {
    render() {
        const { disabled } = this.props;
        return (
            <div className="pure-u-6-24 control-button-container">
                <div className="pure-g" disabled={disabled}>
                    <div className="pure-u-1 control-button-middle score-counter">
                        {this.props.score}
                    </div>
                    <div className="pure-u-1 control-button-bottom">
                        Score
                    </div>
                </div>
            </div>
        )
    }
}

export class OnOffButton extends Component {
    render() {
        return (
            <div className="pure-u-6-24 control-button-container">
                <div className="pure-g">
                    <div className="pure-u-1 control-button-top">
                        <Led color="red" activated={this.props.isOn}></Led>
                    </div>
                    <div className="pure-u-1 control-button-middle">
                        <button onClick={this.props.onOnOff} className="pure-button control-button on-off-button"></button>
                    </div>
                    <div className="pure-u-1 control-button-bottom">
                        On/Off
                    </div>
                </div>
            </div>
        )
    }
}

export class StartButton extends Component {
    render() {
        const { disabled } = this.props;
        return (
            <div className="pure-u-6-24 control-button-container">
                <div className="pure-g">
                    <div className="pure-u-1 control-button-top">
                    </div>
                    <div className="pure-u-1 control-button-middle">
                        <button 
                        onClick={this.props.onStart} 
                        className="pure-button control-button start-button" 
                        disabled={disabled}
                        ></button>
                    </div>
                    <div className="pure-u-1 control-button-bottom">
                        Start
                    </div>
                </div>
            </div>
        )
    }
}

export class StrictButton extends Component {

    constructor(props) {
        super(props);

        this.state = {
            activated: this.props.strictMode,
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState( {
            ...this.state,
            activated: nextProps.strictMode,
        })
    }
    handleClick() {
        this.props.onStrict()
    }

    render() {
        const { disabled } = this.props;
        return (
            <div className="pure-u-6-24 control-button-container">
                <div className="pure-g">
                    <div className="pure-u-1 control-button-top">
                        <Led color="red" activated={this.state.activated}></Led>
                    </div>
                    <div className="pure-u-1 control-button-middle">
                        <button 
                        onClick={this.handleClick.bind(this)} 
                        className="pure-button control-button strict-button" 
                        disabled={disabled} 
                        ></button>
                    </div>
                    <div className="pure-u-1 control-button-bottom">
                        Strict
                    </div>
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