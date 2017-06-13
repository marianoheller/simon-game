

export const audioSources = [   "https://s3.amazonaws.com/freecodecamp/simonSound1.mp3",
                                "https://s3.amazonaws.com/freecodecamp/simonSound2.mp3",
                                "https://s3.amazonaws.com/freecodecamp/simonSound3.mp3",
                                "https://s3.amazonaws.com/freecodecamp/simonSound4.mp3" ];


export function processInput(input, order, stepN, strict, callBackPlayingAudio) {
    //console.log(input, order, stepN, strict);  
    //Si gano (Apreto todos los botones), reseteo input y genero nuevo order
    if( order.every( (e,i) => e === input[i]) ) {
        input.splice(0,input.length);
        order =  generateOrder(order);
        stepN++;
        playOrder(order, callBackPlayingAudio);
    }
    //Si le pifio a la tecla, reseteo input pero no hago nada con el order
    //Si es strict tmb reseteo orden y steps
    else if( !input.every( (e,i) => e===order[i]) ) {
        input.splice(0,input.length);
        if( strict ) {
            order = generateOrder([]);
            stepN = 1;
        }
        playError();
        playOrder(order, callBackPlayingAudio);
    }

    return {
        order: order,
        input: input,
        step: stepN
    }
}


function playOrder(order, callBackPlayingAudio) {
    order.forEach( (e,i) => {
        setTimeout( () => {
            callBackPlayingAudio(e);
            playAudioSource(audioSources[e]);
            setTimeout( () => {
                callBackPlayingAudio(e, false);
            }, 500)
        }, 1250+750*(i));
    });
}

function playError() {
    audioSources.forEach( (s) => {
        playAudioSource(s);
    });
}

function playAudioSource(audioSource) {
    (new Audio(audioSource)).play();
}

export function generateOrder(currentOrder) {
    currentOrder.push( Math.floor( Math.random() * audioSources.length ) );
    //return (new Array(counterStep)).fill(0).map( (e,i) => Math.floor( Math.random() * audioSources.length ));
    return currentOrder;
}
