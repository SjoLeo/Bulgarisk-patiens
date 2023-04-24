let arrayCards = [3,3,3,1]
const maxAmountCards = 52


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
    let outputArray = inputArray;
    for (let i = 0; i < inputArray.length; i++)
        if (inputArray[0] == 0){
            outputArray.shift();
        }
    return outputArray;
}

function didLoose(currentArray, allArrays){
    
    if(currentArray.toString() == allArrays[allArrays.length - 2].toString()){ //funkar inte, måste checka manuellt
        return true;
    } else {
        return false;
    }

}

//function didWin()

//randomizeCardPlacement(maxAmountCards, arrayCards)


running = true;
let testedArrays = [[...arrayCards]];
let currenIndex;
while (running){
    arrayCards = arrayCards.map(x => x-1);
    arrayCards.push(arrayCards.length);
    sort(arrayCards);
    removeZero(arrayCards);
    testedArrays.push(arrayCards);
    console.log(arrayCards)
    if (didLoose(arrayCards, testedArrays) == true ){
        console.log("du förlorade");
        running = false;
    }
}

