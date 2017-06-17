


export function processInput(input, order, score, strict, onSinging) {
    let shouldPlayOrder = false;

    //Si gano (Apreto todos los botones), reseteo input y genero nuevo order
    if( order.every( (e,i) => e === input[i]) ) {
        input.splice(0,input.length);
        order =  generateOrder(order);
        score++;
        shouldPlayOrder = true;
    }
    //Si le pifio a la tecla, reseteo input pero no hago nada con el order
    //Si es strict tmb reseteo orden y steps
    else if( !input.every( (e,i) => e===order[i]) ) {
        input.splice(0,input.length);
        if( strict ) {
            order = generateOrder([]);
            score = 1;
        }
        shouldPlayOrder = true;
        // playError();
    }

    return {
        order,
        input,
        score,
        shouldPlayOrder
    }
}


export function playOrder(order, audioSources,onSinging) {
    order.forEach( (e,i) => {
        setTimeout( () => {
            onSinging(e, true);
            playAudioSource(audioSources[e]);
            if ( i === order.length-1 ) {
                setTimeout( () => {
                    onSinging(e, false);
                }, 750);
            }
        }, 1250+750*(i));
    });
}


export function playAudioSource(audioSource) {
    (new Audio(audioSource)).play();
}

export function generateOrder(currentOrder, colorsLength=4) {
    currentOrder.push( Math.floor( Math.random() * colorsLength ) );
    return currentOrder;
}
