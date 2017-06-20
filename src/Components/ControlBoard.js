import React, { Component } from 'react';
import { StartButton, OnOffButton, StrictButton, ScoreCounter } from './ControlGadgets';


export default class ControlBoard extends Component {
    render() {
        const { isOn, score, strictMode } = this.props.gameState;
        return (
            <div className="pure-g">
                <div className="pure-u-1">
                    <ScoreCounter 
                    disabled={!isOn} 
                    score={score}
                    ></ScoreCounter>

                    <OnOffButton 
                    onOnOff={this.props.widgetHandlers.onOnOff}
                    isOn={isOn}
                    ></OnOffButton>

                    <StartButton 
                    disabled={!isOn} 
                    onStart={this.props.widgetHandlers.onStart}
                    ></StartButton>

                    <StrictButton 
                    disabled={!isOn} 
                    onStrict={this.props.widgetHandlers.onStrict} 
                    strictMode={strictMode}
                    ></StrictButton>
                </div>
            </div>
        )
    }
}