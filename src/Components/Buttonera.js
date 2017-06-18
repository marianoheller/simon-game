import React, { Component } from 'react';
import './Buttonera.css';

export default class Buttonera extends Component{
    render() {
        const simonButtons = Object.keys(this.props.colors).map( ( keyColor, i) => 
        <SimonButtonContainer 
            disabled={!this.props.gameState.isOn}
            key={`button${i}`} 
            id={`button${i}`}  
            className={this.props.colors[keyColor].colorClass}
            index={i}
            color={keyColor}
            playing={ this.props.gameState.singing===i }
            onInput={ this.props.widgetHandlers.onInput }
        ></SimonButtonContainer>);
        return(
            <div className="pure-g">
                <div className="pure-u-3-24"></div>
                <div className="pure-u-18-24">
                    <div className="pure-g simon-buttons-container">
                        {simonButtons}
                    </div>
                </div>
                <div className="pure-u-3-24"></div>
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
        }, 750);
    }

    render() {
        return(
            <SimonButton
            playing={this.state.playing}
            color={this.props.color}
            index={this.props.index}
            className={this.props.className}
            disabled={this.props.disabled}
            onInput={this.props.onInput}
            containerClickHandler = { this.containerClickHandler.bind(this)}
            ></SimonButton>
        )
    }
}


export class SimonButton extends Component {


    getButtonClass() {
        let ret = "simon-button-container ";
        ret +=  this.props.playing ? `simon-button-${this.props.className}-playing ` : " ";
        ret += `simon-button-${this.props.className} `;
        return ret;
    }

    getContainerDivClass() {
        let ret = "pure-u-1-2 ";
        switch (this.props.className) {
            case "red":
            case "blue":
                ret += " button-container-align-left";
                break;
            case "green":
            case "yellow":
                ret += " button-container-align-right";
                break;
            default:
                break;
        }
        return ret;
    }


    handleClick(e) {
        const { index, onInput, containerClickHandler } = this.props;
        containerClickHandler();
        onInput(index);
    }

    render() {
        const { disabled } = this.props;
        return (
            <div className={this.getContainerDivClass()}>
                <div 
                className={this.getButtonClass()}
                onClick={this.handleClick.bind(this)}
                disabled={disabled}>
                    {/*{this.props.index} - {this.props.color}*/}
                </div>
            </div>
        )
    }
}