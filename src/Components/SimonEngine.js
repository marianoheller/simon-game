

export const audioSources = [   "https://s3.amazonaws.com/freecodecamp/simonSound1.mp3",
                                "https://s3.amazonaws.com/freecodecamp/simonSound2.mp3",
                                "https://s3.amazonaws.com/freecodecamp/simonSound3.mp3",
                                "https://s3.amazonaws.com/freecodecamp/simonSound4.mp3" ];


export function processInput(input, order) {
    console.log(input, order);  
    //Si gano el step, reseteo input y genero nuevo order
    if( order.every( (e,i) => e === input[i]) ) {
        input.splice(0,input.length);
        order =  generateOrder(order);
    }
    //Si le pifio a la tecla, reseteo input pero no hago nada con el order
    else if( !input.every( (e,i) => e===order[i]) ) {
        input.splice(0,input.length);
    }

    return {
        order: order,
        input: input
    }
}


export function playOrder(order) {
    order.forEach( (e,i) => {
        setTimeout( () => {
            console.log("Playing:", e);
            (new Audio(audioSources[e])).play();
        }, 1000*i);
    });

}

export function generateOrder(currentOrder) {
    currentOrder.push( Math.floor( Math.random() * audioSources.length ) );
    //return (new Array(counterStep)).fill(0).map( (e,i) => Math.floor( Math.random() * audioSources.length ));
    return currentOrder;
}
