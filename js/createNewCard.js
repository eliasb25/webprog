import { createCard } from "./createMenuItem.js";
import { saveFolders } from "./sidebar.js";

export function showCreateSection(folder, index, update, card, menuCard) {
    console.log(folder.name);
    let mainView = document.getElementById("mainView");
    if (mainView != null) {
        let parent = mainView.parentElement;
        mainView.remove();
        let div = document.createElement("div");
        div.innerHTML = getCreateSectionHTML(folder.name);
        div.classList.add("createSection");
        parent.appendChild(div);
    } else {
        updateCreateSection(folder);
    }
    if (update) {
        changeCardView(folder, card);
        updateButtonListener(card, menuCard);
        deleteButtonListener(folder, card, menuCard);
    } else {
        addButtonListener(folder, index);
    }
}

function changeCardView(folder, card) {
    let heading = document.getElementById("heading-createView");
    heading.textContent = "Karteikarte für " + folder.name + " ändern";
    let createButtonText = document.getElementById("createButtonText");
    createButtonText.textContent = "Karteikarte ändern";
    let deleteButtonText = document.getElementById("deleteButtonText");
    deleteButtonText.textContent = "Karteikarte löschen";
    let questionInputField = document.getElementById("frontQuestion");
    questionInputField.value = card.front;
    let answerInputField = document.getElementById("backAnswer");
    answerInputField.value = card.back;
}

function updateCreateSection(folder) {
    let view = document.querySelector(".createSection");
    view.innerHTML = getCreateSectionHTML(folder.name);
}

function getCreateSectionHTML(name) {
    return `<div class="container my-5" style="margin-left: auto; margin-right: auto">
            <div class="row justify-content-center">
                <div class="col-md-8">
                    <h2 class="text-center mb-4" id="heading-createView">Neue Karteikarte für ${name} erstellen</h2>
                    <div class="card p-4 custom-card-shadow padding-top">

                        <form>
                            <div class="mb-4">
                                <label for="frontQuestion" class="form-label custom-label-style">Vorderseite
                                    (Frage)</label>
                                <textarea class="form-control custom-input" id="frontQuestion" rows="3"
                                    placeholder="Gib die Fragestellung ein..." required></textarea>
                            </div>
                    </div>
                    <div class="card p-4 custom-card-shadow">
                        <div class="mb-4">
                            <label for="backAnswer" class="form-label custom-label-style">Rückseite (Antwort)</label>
                            <textarea class="form-control custom-input" id="backAnswer" rows="5"
                                placeholder="Gib die Antwort/Lösung ein..." required></textarea>
                        </div>

                        <div class="mb-5">
                            <label for="imageUpload" class="form-label custom-label-style">Bild hinzufügen
                                (optional)</label>
                            <input class="form-control custom-input-file" type="file" id="imageUpload" accept="image/*">
                        </div>
                    </div>
                    </form>
                </div>
                <div class="row space-above">
                    <div class="wrapping">
                        <div class="col-4 col-md-3 order-2 order-md-1 button-size">
                            <div class="bg-dark text-white p-4 rounded-3 podium-card" data-bs-toggle="modal"
                        data-bs-target="#deleteCardModal">
                                <span class="fs-5" id="deleteButtonText">Eingaben löschen</span>
                            </div>
                        </div>
                    </div>
                    <div class="wrapping">
                        <div class="col-4 col-md-3 order-2 order-md-1 button-size" id="createButton">
                            <div class="bg-yellow p-4 rounded-3 podium-card">
                                <span class="fs-5" id="createButtonText">Karteikarte anlegen</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div id="footer" class="mt-auto" style="margin-left: 20%;"></div>
        </div>`;
}

function updateButtonListener(card, menuCard) {
    let updateButton = document.getElementById("createButton");
    updateButton.addEventListener("click", () => {
        let inputFront = document.getElementById("frontQuestion");
        let inputBack = document.getElementById("backAnswer");
        card.front = inputFront.value;
        card.back = inputBack.value;
        saveFolders();
        menuCard.textContent = inputFront.value;
    });
}

function addButtonListener(folder, index) {
    let createButton = document.getElementById("createButton");
    createButton.addEventListener("click", () => {
        let inputFront = document.getElementById("frontQuestion");
        let inputBack = document.getElementById("backAnswer");
        let card = { front: inputFront.value, back: inputBack.value };
        folder.cards.push(card);

        saveFolders();

        let menuItem = document.getElementById(`cards-section${index}`);
        let displayCard = document.createElement("div");
        displayCard.innerHTML = createCard(card.front);
        menuItem.appendChild(displayCard);
    });
}


function deleteButtonListener(folder, card, menuCard) {
    let deleteButton = document.getElementById("card-delete-Button");
    deleteButton.replaceWith(deleteButton.cloneNode(true));
    deleteButton = document.getElementById("card-delete-Button");

    deleteButton.addEventListener("click", () => {
        let deleteIndex = folder.cards.findIndex(c => c == card);
        console.log("delete: " + deleteIndex);
        folder.cards.splice(deleteIndex, 1);
        saveFolders();
        bootstrap.Modal.getInstance(document.getElementById("deleteCardModal")).hide();
        removeCardFromSidebar(menuCard);
        window.location.href = "index.html";
    });
}


function removeCardFromSidebar(menuCard) {
    menuCard.remove();
}