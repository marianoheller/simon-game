import React, { Component } from 'react';
import './SimonButton.css';

export default class SimonButton extends Component {

    constructor(props) {
        super(props);

        this.state = {
            playing: this.props.playing,
            color: this.props.color,
        }
    }

    getButtonClass() {
        let ret = "simon-button-container ";
        ret +=  this.state.playing ? "simon-button-playing " : " ";
        ret += `simon-button-${this.state.color} `;
        return ret;
    }

    componentWillReceiveProps(nextProps) {
        this.setState( {
            ...this.state,
            playing: nextProps.playing,
            color: nextProps.color,
        } );
    }

    offPlayingState() {
        this.setState( {
            ...this.state,
            playing: false,
        });
    }

    handleClick(e) {
        const { audioSrc, onInput, value } = this.props;
        (new Audio(audioSrc)).play();
        this.setState( {
            ...this.state,
            playing: true,
        } );
        setTimeout( this.offPlayingState.bind(this), 500);
        onInput(value);
    }

    render() {
        return (
            <div className={this.getButtonClass()} >
                <button onClick={this.handleClick.bind(this)}>{this.props.value} - {this.props.color}</button>
            </div>
        )
    }
}