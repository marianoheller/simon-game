import React, { Component } from 'react';
import SimonButton from './SimonButton';
import {generateOrder, audioSources, processInput, playOrder } from './SimonEngine';




export default class Simon extends Component {

    constructor(props) {
        super(props);

        this.state = {
            counterStep: 1,
            currentOrder: generateOrder([]),
            currentInput: []
        }
    }

    handleInput(value) {
        const { currentOrder, currentInput } = this.state;
        currentInput.push(value);
        const { order: newOrder, input: newInput} = processInput(currentInput, currentOrder);

        this.setState( {
            ...this.state,
            currentInput: newInput,
            currentOrder: newOrder
        });
    }

    componentDidUpdate(prevProps, prevState) {
        //playOrder(this.state.currentOrder);
    }


    render() {

        const buttons = (new Array(4)).fill(0).map( (e,i) => 
        <SimonButton 
            key={`button${i}`} 
            id={`button${i}`}  
            value={i} 
            audioSrc={audioSources[i]}
            onInput={this.handleInput.bind(this)}
        ></SimonButton>);

        return (
            <div className="pure-g">
                <div className="pure-u-1">
                    <p>Step Nº: {this.state.counterStep}</p>
                    <div>
                        {this.state.currentOrder.join(",")}
                    </div>
                    <div>
                        {this.state.currentInput.join(",")}
                    </div>
                    
                    {buttons}
                </div>
            </div>
        )
    }
}



