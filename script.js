let arrayCards = []
//const maxAmountCards = 12

//randomizeCardPlacement(maxAmountCards, arrayCards)

function randomizeCardPlacement(amountOfCards, cardStack){
    let cardsLeft = amountOfCards + 1
    while (cardsLeft > 1){
    
        var cardsInStack = Math.floor(Math.random() * cardsLeft);
        if (cardsInStack != 0){

            cardStack.push(cardsInStack)
            cardsLeft -= cardsInStack
        }  
    }
    return cardStack

}

function sort(cardStack){
    cardStack = cardStack.sort(function (a, b) {  return a - b;  });
}

function removeZero(inputArray){
    while (inputArray[0] == 0 && inputArray.length > 0){
        inputArray.shift()
    }
    return inputArray;
}

function didLoose(currentArray, allArrays){
    
    if(currentArray.toString() == allArrays[allArrays.length - 2].toString()){
        return true;
    } else {
        return false;
    }

}

function didWin(currentArray, allArrays){
    for (let i = 0; i < allArrays.length; i++){
        try {
            if(currentArray.toString() === allArrays[i].toString() && currentArray.toString() !== allArrays[i+1].toString()) {
                return true
            }  
        } catch (error) {
            break
        }

    }
    return false

}

function onClick(){
    let input = document.getElementById("input").value
    let array = input.split(",")
    run(array)
}


function run(arrayCards){
    console.log(arrayCards)
    running = true
    let testedArrays = [[...arrayCards]];
    while (running){
        
        arrayCards = arrayCards.map(x => x-1); //remove one card from each stack
        arrayCards.push(arrayCards.length); // add the new stack
        sort(arrayCards);
        removeZero(arrayCards);
        testedArrays.push(arrayCards); // saving the current stacks
        console.log(arrayCards);
        if (didLoose(arrayCards, testedArrays)){
            console.log("You lost");
            running = false;
        }
        else if (didWin(arrayCards, testedArrays)){
            console.log('You won');
            running = false;
        }
        
    }
}
    
    
    