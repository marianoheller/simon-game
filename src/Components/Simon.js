import React, { Component } from 'react';
import SimonButton from './SimonButton';
import ControlBoard from './ControlBoard';
import {generateOrder, audioSources, processInput } from './SimonEngine';

const colors = [
    "red",
    "blue",
    "green",
    "yellow"
];


export default class Simon extends Component {

    constructor(props) {
        super(props);

        this.state = {
            counterStep: 1,
            currentOrder: generateOrder([]),
            currentInput: [],
            playingAudioSource: false,
            strictMode: false,
            isOn: false,
            isStarted: false,
        }
    }

    toggleOn() {
        this.setState( {
            ...this.state,
            isOn: !this.state.isOn
        })
    }

    toggleStrictMode() {
        this.setState( {
            ...this.state,
            strictMode: !this.state.strictMode
        })
    }

    toggleIsStarted() {
        this.setState( {
            ...this.state,
            isStarted: !this.state.isStarted
        })
    }

    playingAudioSource(srcIndex, estado=true) {
        this.setState( {
            ...this.state,
            playingAudioSource: estado ? srcIndex : false,
        })
    }

    handleInput(value) {
        const { currentOrder, currentInput, counterStep: stepN, strictMode: strict } = this.state;
        currentInput.push(value);
        const { 
            order: newOrder, 
            input: newInput,
            step: newStep
        } = processInput(currentInput, currentOrder, stepN, strict, this.playingAudioSource.bind(this));

        this.setState( {
            ...this.state,
            currentInput: newInput,
            currentOrder: newOrder,
            counterStep: newStep
        });
    }

    render() {

        const widgetHandlers = {
            onStart: this.toggleIsStarted.bind(this),
            onOnOff: this.toggleOn.bind(this),
            onStrict: this.toggleStrictMode.bind(this)
        };

        const boardState = {
            strict: this.state.strictMode,
            isOn: this.state.isOn,
            isStarted: this.state.isStarted,
        };

        const simonButtons = (new Array(colors.length)).fill(0).map( (e,i) => 
        <SimonButton 
            key={`button${i}`} 
            id={`button${i}`}  
            value={i} 
            color={colors[i]}
            audioSrc={audioSources[i]}
            playing={ this.state.playingAudioSource===i }
            onInput={this.handleInput.bind(this)}
        ></SimonButton>);

        return (
            <div className="pure-g">
                <div className="pure-u-1">
                    <div>
                        {this.state.currentOrder.join(",")}
                    </div>
                    <div>
                        {this.state.currentInput.join(",")}
                    </div>
                    <div>
                        <ControlBoard 
                        boardState={boardState} 
                        handlers={widgetHandlers} 
                        step={this.state.counterStep}>
                        </ControlBoard>
                    </div>
                    { simonButtons }
                </div>
            </div>
        )
    }
}



