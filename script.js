var arrayCards = [];
var testedArrays = [];
var wonOrLost = false;
counter = 0;
const maxAmountCards = 52;

// Randomizes the number of Cards and Stacks
// Input: 
//  MaxAmountOfCards, is a constant number that determines the max amount of cards that can be generated for a single game.
//  cardStack, number of stacks in play.
// Return:
//  Random number of stacks with a random number of cards generated. 
function randomizeCardPlacement(MaxAmountOfCards, cardStack){
    let amountOfCards = Math.floor(Math.random() * (MaxAmountOfCards));
    amountOfCards++;
    console.log(amountOfCards)
    let cardsLeft = amountOfCards + 1;
    while (cardsLeft > 1){
    
        var cardsInStack = Math.floor(Math.random() * cardsLeft);
        if (cardsInStack != 0){

            cardStack.push(cardsInStack);
            cardsLeft -= cardsInStack;
        }  
    }
    return cardStack;

}

function sortCards(cardStack){
    cardStack = cardStack.sort(function (a, b) {  return a - b;  });
}

// Removes all empty stacks (zeros)
// Input:
//  inputArray, is an array of card stacks
// Return:
//  Return card stacks without any empty stacks (zeros)
function removeZero(inputArray){
    while (inputArray[0] == 0 && inputArray.length > 0){
        inputArray.shift();
    }
    return inputArray;
}

// Cheks if you have lost by comparing your current stacks of cards with the stacks of cards played right before.
// Input:
//  currentArray, your current Stacks of Cards.
//  allArrays, all stacks of cards played, trough your game.
// Return:
//  True if you lost or false if you did not lose. 
function didLose(currentArray, allArrays){
    
    if(currentArray.toString() == allArrays[allArrays.length - 2].toString()){
        return true;
    } else {
        return false;
    }

}

// Cheks if you have won by comparing your current stacks of cards with all stacks of cards played during your current game.
// Input:
//  currentArray, your current Stacks of Cards.
//  allArrays, all stacks of cards played, trough your game.
// Return:
//  Returns true if you have won or false if the game continues.
function didWin(currentArray, allArrays){
    for (let i = 0; i < allArrays.length; i++){
        try {
            if(currentArray.toString() === allArrays[i].toString() && currentArray.toString() !== allArrays[i+1].toString()) {
                return true;
            }  
        } catch (error) {
            break;
        }

    }
    return false;

}
// Starts a new game with a selected number of cards and stacks
function onClickSubmit(){
    clearBoard(); // clears everything before submitting
    let input = document.getElementById("input").value;
    let result = input.replace(/[^0-9]+/g, ",").replace(/^,|,$/g, "");
    arrayCards = result.split(",");
    sortCards(arrayCards)
    removeZero(arrayCards)
    console.log(arrayCards)
    testedArrays.push([...arrayCards]);
    addImages(arrayCards);
    
    
}
// The next turn is played
function onClickNext(){
    if(wonOrLost == false && arrayCards.toString() !== ""){
        run();
        counter++;
        showTurns(counter)
    }
}

function clearBoard(){ // clear everything
    arrayCards = [];
    testedArrays = [];
    wonOrLost = false;
    counter = 0;
    showTurns(counter) 
    removeImg();
    removeDivs();
    
}
// Runs the "randomizeCardPlacement()" function when the button "Randomize" is used. It randomizes a number of cards and stacks.
function onClickRandomize(){
    clearBoard();
    document.getElementById('input').value = randomizeCardPlacement(maxAmountCards, arrayCards);
    onClickSubmit();
}

// Shortcuts for a keyboard so you don't have to use the cursor or mouse.
function keyPress(){
    window.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        document.getElementById("submitButton").click();
    }
    if (event.key === "ArrowRight"){
        event.preventDefault();
        document.getElementById("nextButton").click();
    }
    });

}

// Check if the amount of input Cards is over 52 and if so update the submit button so that it will not be submit again until the number of cards is equal to or lower than 52.
function invalidCardSize(){
    let inputValue = document.getElementById("input").value;
    let inputString = inputValue.replace(/[^0-9]+/g, ",").replace(/^,|,$/g, "");


    let inputArrayNumber = inputString.split(',').map(Number); // funkar ej


    let sum = inputArrayNumber.reduce((a, b) => {
        return a + b;
      }, 0);


    if (sum > maxAmountCards){
        document.querySelector('#submitButton').disabled = true;
        document.getElementById('submitButton').style.border = "solid red"
    }else{
        document.querySelector('#submitButton').disabled = false;
        document.getElementById('submitButton').style.border = "solid white"
    }
}

function removeDivs(){
    const cardcontainer = document.getElementById("cardsid");

    const divsToRemove = cardcontainer.querySelectorAll(".cards-column");

    divsToRemove.forEach((div) => {div.remove()});
}

function removeImg(){
    const imgContainer = document.getElementById("messageBoxid");
    const imgToRemove = imgContainer.querySelectorAll("img");
    imgToRemove.forEach((img) => {img.remove()});
}

function addImages(cards){
    removeDivs()
    
    // Loop through the array and create an img element for each element
    for (let i = 0; i < cards.length; i++) {
        const newDiv = document.createElement("div");
        const cardcontainer = document.getElementById('cardsid');
        newDiv.classList.add("cards-column");
        cardcontainer.appendChild(newDiv);

        for (let j = 0; j < cards[i]; j++) {
            const newImg = document.createElement("img");
            newImg.classList.add("baksida-kort");
            newDiv.appendChild(newImg);
            newImg.src = "card back orange.png";
        }
    }
}

//Shows how many turns have been played.
// Input:
//  numberOfTurns, how many turns each game has had.
function showTurns(numberOfTurns){
    textContainer = document.getElementById('turnAmountId')
    textContainer.innerHTML = numberOfTurns
}

// Shows the end screen, that you have won or lost.
// Input:
//  type, is "win" or empty, empty meaning you have lost
function endMessage(type){
    
    const newImg = document.createElement("img");
    const winImgDiv = document.getElementById('messageBoxid');
    if (type === "win"){
        newImg.classList.add("winImage");
        newImg.id = "endMessageId";
        winImgDiv.appendChild(newImg);
        newImg.src = "winImg.png";
        console.log(counter+1)
    }else {
        newImg.classList.add("youLoseImage");
        newImg.id = "endMessageId";
        winImgDiv.appendChild(newImg);
        newImg.src = "youLoseImg.png";
        console.log(counter+1)
    }
    
    
}
// Main game function
function run(){
    
    arrayCards = arrayCards.map(x => x-1); //remove one card from each stack
    arrayCards.push(arrayCards.length); // add the new stack
    sortCards(arrayCards);
    removeZero(arrayCards);
    testedArrays.push([...arrayCards]); // saving the current stacks
    console.log(arrayCards);
    addImages(arrayCards)
    
    if (didLose(arrayCards, testedArrays)){
        console.log("Patiensen gick ut");
        endMessage("win");
        wonOrLost = true;
    }
    else if (didWin(arrayCards, testedArrays)){
        console.log('Patiensen gick inte ut');
        endMessage();
        wonOrLost = true;
    }
        
}

keyPress()    
