var arrayCards = []
var testedArrays = [];
var wonOrLost = false
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

function onClickSubmit(){
    if (wonOrLost == false){

        let input = document.getElementById("input").value
        arrayCards = input.split(",")
        testedArrays.push([...arrayCards]);
        console.log(arrayCards)
        addImages(arrayCards)
    }
    
    
}
function onClickNext(){
    if(wonOrLost == false){
        run()
    }
}

function onClickNewGame(){
    arrayCards = []
    testedArrays = []
    wonOrLost = false
    removeDivs()
}

function removeDivs(){
    const cardcontainer = document.getElementById("cardsid")

    const divsToRemove = cardcontainer.querySelectorAll(".cards-column")

    divsToRemove.forEach((div) => {div.remove()})
}

function addImages(cards){
    removeDivs()
    
    // Loop through the array and create an img element for each element
    for (let i = 0; i < cards.length; i++) {
        const newDiv = document.createElement("div");
        const cardcontainer = document.getElementById('cardsid')
        newDiv.classList.add("cards-column")
        cardcontainer.appendChild(newDiv);

        for (let j = 0; j < cards[i]; j++) {
            const newImg = document.createElement("img");
            newImg.classList.add("baksida-kort")
            newDiv.appendChild(newImg)
            newImg.src = "card back orange.png"
        }
    }
}

function run(){
    
    arrayCards = arrayCards.map(x => x-1); //remove one card from each stack
    arrayCards.push(arrayCards.length); // add the new stack
    sort(arrayCards);
    removeZero(arrayCards);
    testedArrays.push([...arrayCards]); // saving the current stacks
    console.log(arrayCards);
    addImages(arrayCards)
    
    if (didLoose(arrayCards, testedArrays)){
        console.log("Patiensen gick ut");
        wonOrLost = true
    }
    else if (didWin(arrayCards, testedArrays)){
        console.log('Patiensen gick inte ut');
        wonOrLost = true
    }
        
        
    

}
    
    
    