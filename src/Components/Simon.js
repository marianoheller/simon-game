import React, { Component } from 'react';


const audioSources = [  "https://s3.amazonaws.com/freecodecamp/simonSound1.mp3",
                        "https://s3.amazonaws.com/freecodecamp/simonSound2.mp3",
                        "https://s3.amazonaws.com/freecodecamp/simonSound3.mp3",
                        "https://s3.amazonaws.com/freecodecamp/simonSound4.mp3" ];


export default class Simon extends Component {

    constructor(props) {
        super(props);

        this.state = {
            counterStep: 1,
            currentOrder: [Math.floor(Math.random() * audioSources.length)],
            currentInput: []
        }
    }


    generateOrder(currentOrder) {
        currentOrder.push( Math.floor( Math.random() * audioSources.length ) );
        //return (new Array(counterStep)).fill(0).map( (e,i) => Math.floor( Math.random() * audioSources.length ));
        return currentOrder;
    }

    handleInput(value) {
        const { currentOrder, currentInput } = this.state;
        currentInput.push(value);
        let newCurrentOrder = Array.from(currentOrder);

        //Si gano el step
        if( currentOrder.every( (e,i) => e === currentInput[i]) ) {
            currentInput.splice(0,currentInput.length);
            newCurrentOrder =  Array.from(this.generateOrder(currentOrder));
        }
        //Si le pifio a la tecla
        else if( !currentInput.every( (e,i) => e===currentOrder[i]) ) {
            currentInput.splice(0,currentInput.length);
        }

        this.setState( {
            ...this.state,
            currentInput: currentInput,
            currentOrder: newCurrentOrder
        });
    }

    componentDidUpdate(prevProps, prevState) {
        this.playOrder();
    }

    playOrder() {
        const { currentOrder } = this.state;
        currentOrder.forEach( (e,i) => {
            setTimeout( () => {
                (new Audio(audioSources[e])).play();
            }, 1000*i);
        });
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

class SimonButton extends Component {

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
            <div>
                <button onClick={this.handleClick.bind(this)}>asdasd</button>
            </div>
        )
    }
}

