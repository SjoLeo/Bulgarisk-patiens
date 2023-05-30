var arrayCards = [];
var testedArrays = [];
var wonOrLost = false;
counter = 0;
const maxAmountCards = 52;


//Randomizes number of Cards and Stacks
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

//Removes Zero (0) from 
function removeZero(inputArray){
    while (inputArray[0] == 0 && inputArray.length > 0){
        inputArray.shift();
    }
    return inputArray;
}

function didLose(currentArray, allArrays){
    
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
                return true;
            }  
        } catch (error) {
            break;
        }

    }
    return false;

}

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

function onClickRandomize(){
    clearBoard();
    document.getElementById('input').value = randomizeCardPlacement(maxAmountCards, arrayCards);
    onClickSubmit();
}

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
// Checks if the amunt of inputed Cards is over 52, and if so returns True, the input is not valid.
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

function showTurns(numberOfTurns){
    textContainer = document.getElementById('turnAmountId')
    textContainer.innerHTML = numberOfTurns
}

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
    
    