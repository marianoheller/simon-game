import React, { Component } from 'react';

export default class SimonButton extends Component {

    constructor(props) {
        super(props);

        this.state = {
            playing: this.props.playing,
            color: this.props.color,
        }
    }

    getPlayingClass() {
        return this.state.playing ? "simon-button-playing" : "";
    }

    getColorClass() {
        return `simon-button-${this.state.color}`;
    }

    componentWillReceiveProps(nextProps) {
        this.setState( {
            ...this.state,
            playing: nextProps.playing,
            color: nextProps.color,
        } );
    }

    handleClick(e) {
        const { audioSrc, onInput, value } = this.props;
        (new Audio(audioSrc)).play();
        onInput(value);
    }

    render() {
        return (
            <div className="simon-button-container" className={this.getPlayingClass()} className={this.getColorClass()} >
                <button onClick={this.handleClick.bind(this)}>{this.props.value}</button>
            </div>
        )
    }
}