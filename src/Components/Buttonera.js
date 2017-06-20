import React, { Component } from 'react';
import {Layer, Stage, Arc} from 'react-konva';
import './Buttonera.css';

const canvasConfig = {
    stage: {
        width: 380,
        height: 380,
    }
}

export default class Buttonera extends Component{
    
    render() {
        const simonButtons = Object.keys(this.props.colors).map( ( keyColor, i) => 
        <SimonButtonContainer 
        disabled={!this.props.gameState.isOn}
        isStarted={this.props.gameState.isStarted}
        key={`button${i}`}
        colorUp={this.props.colors[keyColor].colorUp}
        colorDown={this.props.colors[keyColor].colorDown}
        index={i}
        color={keyColor}
        stage = { canvasConfig.stage }
        playing={ this.props.gameState.singing===i }
        onInput={ this.props.widgetHandlers.onInput }
        ></SimonButtonContainer>);

        return(
            <div className="buttonera-container">
                <Stage width={canvasConfig.stage.width} height={canvasConfig.stage.height}>
                    <Layer>
                        {simonButtons}                
                    </Layer>
                </Stage>
            </div>
            
        )
    }
}


export class SimonButtonContainer extends Component {
    
    constructor(props) {
        super(props);
        
        this.state = {
            playing: props.playing,
        }
    }
    
    componentWillReceiveProps(nextProps) {
        this.setState( {
            ...this.state,
            playing: nextProps.playing,
        })
    }
    
    containerClickHandler() {
        this.setState( {
            ...this.state,
            playing: true,
        });
        setTimeout( () => {
            this.setState( {
                ...this.state,
                playing: false,
            });
        }, 400);
    }
    
    render() {
        return(
            <SimonButton
                playing={this.state.playing}
                stage = {this.props.stage}
                color={this.props.color}
                index={this.props.index}
                colorUp={this.props.colorUp}
                colorDown={this.props.colorDown}
                disabled={this.props.disabled}
                isStarted={this.props.isStarted}
                onInput={this.props.onInput}
                containerClickHandler = { this.containerClickHandler.bind(this)}
                ></SimonButton>
        )
    }
}


export class SimonButton extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            color: props.colorDown
        };
        this.handleClick = this.handleClick.bind(this);
    }
    
    handleClick() {
        if ( this.props.isStarted ) {
            const { index, onInput, containerClickHandler } = this.props;
            containerClickHandler();
            onInput(index);
        }
    }

    render() {
        const { stage, index, playing, colorDown, colorUp } = this.props;
        const color = playing ? colorUp : colorDown;
        return (
            <Arc
                x= {stage.width/2}
                y= {stage.height/2}
                innerRadius= {stage.height/4}
                outerRadius= {stage.height/2}
                angle= {90}
                rotation = {360-(90*index)}
                onClick= {this.handleClick}
                fill= {color}
                stroke= 'black'
                strokeWidth= {4}
                />
        );
    }
}


