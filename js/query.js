import { saveFolders } from "./sidebar.js";
import { getDateString } from "./date.js";

let folderIndex = new URLSearchParams(window.location.search).get('folderIndex');



let folders = [];
if (localStorage.getItem("Folders")) {
    const jsonString = localStorage.getItem("Folders");
    folders = JSON.parse(jsonString);
}

let cardIndex = new URLSearchParams(window.location.search).get('cardIndex');
if (cardIndex === null) {
    window.location.href = `learning-page.html?folderIndex=${folderIndex}&cardIndex=0`;
}
skipLearnedCards();
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

        let img = document.getElementById("testimage");
        if (currentCard.image && currentCard.image != '') {
            img.src = currentCard.image;
        } else {
            img.style.display = "none";
        }

        addButtonListeners(folders, folderIndex, cardIndex, currentCard);
    });
});









function getBack(back) {
    return `<div class="mb-1"> <label for="frontInput" class="form-label">Back</label>
                        <p class="form-control-plaintext highlight-card" id="frontInput">${back}</p>
                    </div>
                    <img id="testimage"></img>
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
        let tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        currentCard.nextReviewDate = getDateString(tomorrow);

        const jsonString = JSON.stringify(folders, null, 2);
        localStorage.setItem("Folders", jsonString);

        skipLearnedCards();

        const userJson = localStorage.getItem("users");
        let users = JSON.parse(userJson);
        const currentUserEmail = sessionStorage.getItem("currentUserEmail");
        let user = users.find(u => u.email === currentUserEmail);
        if (user) {
            if (!user.totalCardsReviewed) {
                user.totalCardsReviewed = 0;
            }
            user.totalCardsReviewed += 1;
            localStorage.setItem("users", JSON.stringify(users));
        }
        
        if (cardIndex < folders[folderIndex].cards.length - 1) {
            currentCard = folders[folderIndex].cards[cardIndex];
            window.location.href = `learning-page.html?folderIndex=${folderIndex}&cardIndex=${cardIndex}`;
        } else {
            window.location.href = "learning-page-done.html";
        }
    });

    let wrongButton = document.getElementById("wrongBtn");
    wrongButton.addEventListener("click", () => {
        location.reload();
    });
}

function skipLearnedCards() {
    let tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    while (cardIndex < folders[folderIndex].cards.length - 1) {
        if (folders[folderIndex].cards[cardIndex].nextReviewDate !== getDateString(tomorrow)) {
            break;
        }
        cardIndex++;
    }
    for (let i=0; i < folders[folderIndex].cards.length; i++) {
        if (folders[folderIndex].cards[i].nextReviewDate !== getDateString(tomorrow)) {
            return;
        }
    }
    window.location.href = "learning-page-done.html";
}