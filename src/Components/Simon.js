import React, { Component } from 'react';
import Buttonera from './Buttonera';
import ControlBoard from './ControlBoard';
import {generateOrder, processInput, playAudioSource, playOrder, playError } from './SimonEngine';


import "./Simon.css";


const initState = {
    game: {
        score: "",
        singing: false,
        isStarted: false,
        strictMode: false,
        isOn: false,
    },
    match: {
        currentOrder: generateOrder([]),
        currentInput: [],
    },
    colors : {
        green: {
            colorDown: "#008800",
            colorUp: "#00ff00",
            audioSource: "https://s3.amazonaws.com/freecodecamp/simonSound3.mp3",
        },
        red: {
            colorDown: "#880000",
            colorUp: "#ff0000",
            audioSource: "https://s3.amazonaws.com/freecodecamp/simonSound1.mp3",
        },
        yellow: {
            colorDown: "#888800",
            colorUp: "#ffff00",
            audioSource: "https://s3.amazonaws.com/freecodecamp/simonSound4.mp3",
        },
        blue: {
            colorDown: "#000088",
            colorUp: "#0000ff",
            audioSource: "https://s3.amazonaws.com/freecodecamp/simonSound2.mp3",
        },
    }
}


export default class SimonContainer extends Component {

    constructor(props) {
        super(props);

        this.state = initState;
    }

    toggleOn() {
        this.setState( {
            ...this.state,
            game: {
                ...this.state.game,
                isOn: !this.state.game.isOn,
                score: "",
                strictMode: false,
            },
            match: {
                currentInput: [],
                currentOrder: generateOrder([])
            }
        });
    }

    toggleStrictMode() {
        this.setState( {
            ...this.state,
            game: {
                ...this.state.game,
                strictMode: !this.state.game.strictMode
            }
        })
    }

    toggleIsStarted() {
        if ( !this.state.game.isStarted ) {
            const audioSources = Object.keys(this.state.colors).map( (key) => {
                const { colors }  = this.state;
                return colors[key].audioSource;
            });
            playOrder(this.state.match.currentOrder, audioSources,this.onSinging.bind(this));
        }
        this.setState( {
            ...this.state,
            game: {
                ...this.state.game,
                isStarted: !this.state.game.isStarted,
                score: !this.state.game.isStarted ? 0 : "",
            },
            
        })
    }

    onSinging(indexAudio, estado=true) {
        this.setState( {
            ...this.state,
            game: {
                ...this.state.game,
                singing: estado ? indexAudio : false,
            }
        })
    }

    handleInput(indexButton) {
        //Ignore if game not started
        if ( !this.state.game.isStarted ) {   return;   }

        //Assign new input to inputs array
        const { currentInput, currentOrder } = this.state.match;
        const { strictMode, score } = this.state.game;
        const { colors } = this.state;
        currentInput.push(indexButton);

        //Play current button and handle state
        const colorKey = Object.keys(colors)[indexButton];
        playAudioSource(colors[colorKey].audioSource);
        this.onSinging(indexButton, true);
        setTimeout( () => {
            this.onSinging(indexButton, false);
        }, 750);
            
        //Get new state to be assigned
        let { 
            order: newOrder, 
            input: newInput,
            score: newScore,
            shouldPlayOrder,
            errorHappened,
        } = processInput(currentInput, currentOrder, score, strictMode, this.onSinging.bind(this));

        //Evaluate if player reached score 20
        if( newScore >= 20 ) {
             newScore = 0;
             newOrder = generateOrder([]);             
        }

        //Play whole order array if the condition are given
        const audioSources = Object.keys(this.state.colors).map( (key) => {
            const { colors }  = this.state;
            return colors[key].audioSource;
        });
        if ( shouldPlayOrder ) {
            if ( errorHappened ) {
                playError(audioSources);
                setTimeout( () => {
                    playOrder(newOrder, audioSources,this.onSinging.bind(this));
                }, 500);
            }
            else {
                playOrder(newOrder, audioSources,this.onSinging.bind(this));
            }
        }
        
        //And finally assign state
        this.setState( {
            ...this.state,
            match: {
                ...this.state.match,
                currentInput: newInput,
                currentOrder: newOrder,
            },
            game: {
                ...this.state.game,
                score: newScore,
            },
        });
    }

    render() {

        const widgetHandlers = {
            onStart: this.toggleIsStarted.bind(this),
            onOnOff: this.toggleOn.bind(this),
            onStrict: this.toggleStrictMode.bind(this),
            onInput: this.handleInput.bind(this),
        };
        const colors = { ...this.state.colors };
        const gameState = { ...this.state.game };
        const matchState = { ...this.state.match };

        return (
            <Simon 
            widgetHandlers={widgetHandlers} 
            gameState={gameState} 
            matchState={matchState}
            colors={colors}
            ></Simon>
        )
    }
}







export class Simon extends Component {
    render() {

        return(
            <div className="pure-g">
                <div className="pure-u-1">
                    <div>
                        
                    </div>
                    <div className="simon-container">
                        <ControlBoard 
                        gameState={this.props.gameState} 
                        widgetHandlers={this.props.widgetHandlers} >
                        </ControlBoard>

                        <Buttonera
                        gameState={this.props.gameState}
                        widgetHandlers={this.props.widgetHandlers}
                        colors={this.props.colors}
                        ></Buttonera>
    
                        
                        
                    </div>
                </div>
            </div>
        )
    }
}



