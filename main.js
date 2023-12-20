const tilesContainer = document.querySelector(".tiles");
const colors = ["aqua", "aquamarine", "crimson", "blue", "dodgerblue", "gold", "greenyellow", "teal"];
const colorsPicklist = [...colors, ...colors]; // contains 2x the colors array;
const tileCount = colorsPicklist.length;

// Game state
let revealedCount = 0;
let activeTile = null; // tile which the user has just clicked on
let awaitingEndOfMove = false; // when set to true, the user is waiting for the 2 unmatched tiles to be turned over again


// Build up tiles

function buildTile(color) {
    const element = document.createElement("div");
    element.classList.add("tile");
    element.setAttribute("data-color", color);

    element.addEventListener("click", () => {

        // Make sure current turn has ended
        if(awaitingEndOfMove) { 
            return;
        }

        element.style.backgroundColor = color;

        //Check if the first tile has been selected, if not, set first tile as activeTile
        if(!activeTile) {
            activeTile = element;
            return;
        }

        const colorToMatch = activeTile.getAttribute("data-color");    
        // If colors match, reset activetile and awaitingendoftile
        if(colorToMatch === color) {
            activeTile = null;
            awaitingEndOfMove = false;
            revealedCount+=2;

            if(revealedCount === tileCount)
            {
                setTimeout(() => {
                    alert("You win! Refresh to play again!");
                }, 250);
            }

            return;
        }

        //since the first tile has been selected, the second one is next, so enable awaiting end of move to stop new turns
        awaitingEndOfMove = true;

        //set timeout, in the timeout reveal both colors, and reset awaitingendofmove and activetile
        setTimeout(() => {
            element.style.backgroundColor = null;
            activeTile.style.backgroundColor = null;
            
            awaitingEndOfMove = false;
            activeTile = null;
        }, 800)
        


    });

    return element;
}

for(let i=0; i<tileCount; i++)
{
    const randomIndex = Math.floor(Math.random() * colorsPicklist.length);
    const color = colorsPicklist[randomIndex];
    const tile = buildTile(color, randomIndex);

    colorsPicklist.splice(randomIndex, 1); //remove the color at randomIndex since its already been chosen
    tilesContainer.appendChild(tile);
}

