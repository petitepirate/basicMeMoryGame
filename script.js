const gameContainer = document.getElementById("game");
let card1 = null;
let card2 = null;
let cardsFlipped = 0;
let noClicking = false;

const COLORS = [
    "red",
    "blue",
    "green",
    "orange",
    "purple",
    "red",
    "blue",
    "green",
    "orange",
    "purple"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
    let counter = array.length;

    // While there are elements in the array
    while (counter > 0) {
        // Pick a random index
        let index = Math.floor(Math.random() * counter);

        // Decrease counter by 1
        counter--;

        // And swap the last element with it
        let temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }

    return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
    for (let color of colorArray) {
        const newDiv = document.createElement("div");
        newDiv.classList.add(color);
        newDiv.addEventListener("click", handleCardClick);
        gameContainer.append(newDiv);
    }
}


function handleCardClick(e) {
    if (noClicking) return;  // not clicked, return the card as is
    if (e.target.classList.contains("flipped")) return;

    let currentCard = e.target;  // assigns current card
    currentCard.style.backgroundColor = currentCard.classList[0];  // changes background of current card

    if (!card1 || !card2) {
        currentCard.classList.add("flipped");  // adds class "flipped" which will be removed later.
        card1 = card1 || currentCard;
        card2 = currentCard === card1 ? null : currentCard;
    }

    if (card1 && card2) {
        noClicking = true;

        let color1 = card1.className;   //assigns your clicked card to a variable
        let color2 = card2.className;   //assigns your clicked card to a variable

        if (color1 === color2) {  // compares the variables and if = sets cards to stay with their colors showing
            cardsFlipped += 2;
            card1.removeEventListener("click", handleCardClick);
            card2.removeEventListener("click", handleCardClick);
            card1 = null;
            card2 = null;
            noClicking = false;
        } else {                    // sets cards to have no color showing to be clicked again
            setTimeout(function () {
                card1.style.backgroundColor = "";   // sets background back to nothing
                card2.style.backgroundColor = "";   // sets background back to nothing
                card1.classList.remove("flipped");    //removes class "flipped" that was added earlier
                card2.classList.remove("flipped");    //removes class "flipped" that was added earlier
                card1 = null;
                card2 = null;
                noClicking = false;
            }, 1000);
        }
    }

    if (cardsFlipped === COLORS.length) alert("game over!");  // ends game.
}

createDivsForColors(shuffledColors);  // creates the div's of the shuffled colors

