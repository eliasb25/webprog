let folderIndex = new URLSearchParams(window.location.search).get('folderIndex');



let folders = [];
if (localStorage.getItem("Folders")) {
    const jsonString = localStorage.getItem("Folders");
    folders = JSON.parse(jsonString);
}

let cardIndex = 0;

if (localStorage.getItem("cardIndex")) {
    cardIndex = localStorage.getItem("cardIndex");
}
else {
    localStorage.setItem("cardIndex", cardIndex);
}



let currentCard = folders[folderIndex].cards[cardIndex];


window.addEventListener("load", () => {
    let deckTitle = document.getElementById("deckTitle");
    deckTitle.innerText = folders[folderIndex].name;

    let frontCard = document.getElementById("frontInput");
    frontCard.innerText = currentCard.front;


    let checkButton = document.getElementById("checkBtn");
    checkButton.addEventListener("click", () => {
        let form = document.getElementById("cardForm");
        checkButton.style.display = "none";
        form.innerHTML += getBack(currentCard.back);
        addButtonListeners(folders, folderIndex, cardIndex, currentCard);
    });
});









function getBack(back) {
    return `<div class="mb-1"> <label for="frontInput" class="form-label">Back</label>
                        <p class="form-control-plaintext highlight-card" id="frontInput">${back}</p>
                    </div>
                    <div class="text-center mt-5">
                        <button id="wrongBtn" type="button" class="btn align-items-center mx-2 icon-button">
                            <img class="icon-lg" src="rsc/x-circle.svg" alt="Wrong">
                        </button>
                        <button id="rightBtn" type="button" class="btn align-items-center mx-2 icon-button">
                            <img class="icon-lg" src="rsc/check2.svg" alt="Right">
                        </button>
                    </div>`;
}



function addButtonListeners(folders, folderIndex, cardIndex, currentCard) {
    let rightButton = document.getElementById("rightBtn");
    rightButton.addEventListener("click", () => {
        if (cardIndex < folders[folderIndex].cards.length - 1) {
            cardIndex++;
            localStorage.setItem("cardIndex", cardIndex);
            currentCard = folders[folderIndex].cards[cardIndex];
            location.reload();
        } else {
            localStorage.setItem("cardIndex", 0);

            
            window.location.href = "learning-page-done.html";
        }
    });

    let wrongButton = document.getElementById("wrongBtn");
    wrongButton.addEventListener("click", () => {

    });
}