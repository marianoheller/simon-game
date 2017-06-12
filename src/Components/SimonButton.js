import React, { Component } from 'react';

export default class SimonButton extends Component {

    constructor(props) {
        super(props);

        this.state = {
            highlighted: false,
        }
    }

    handleClick(e) {
        const { audioSrc, onInput, value } = this.props;
        (new Audio(audioSrc)).play();
        onInput(value);
    }

    render() {
        return (
            <div className="simon-button-container">
                <button onClick={this.handleClick.bind(this)}>{this.props.value}</button>
            </div>
        )
    }
}