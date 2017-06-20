import React, { Component } from 'react';
import { StartButton, OnOffButton, StrictButton, ScoreCounter } from './ControlGadgets';

import './ControlBoard.css';


export default class ControlBoard extends Component {
    render() {
        const { isOn, score, strictMode, isStarted } = this.props.gameState;
        return (
            <div className="pure-g">
                <div className="pure-u-6-24"></div>
                <div className="pure-u-12-24">
                    <div className="pure-g control-board-container">
                        <div className="pure-u-1 brand">
                            <h1 className="brand">
                                Simon
                                <span className="small">®</span>
                            </h1>
                        </div>
                        <div className="pure-u-1 control-board-buttons-container">
                            <div className="pure-g">
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
                            isStarted={isStarted}
                            onStart={this.props.widgetHandlers.onStart}
                            ></StartButton>

                            <StrictButton 
                            disabled={!isOn} 
                            onStrict={this.props.widgetHandlers.onStrict} 
                            strictMode={strictMode}
                            ></StrictButton>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="pure-u-6-24"></div>
            </div>
            
        )
    }
}