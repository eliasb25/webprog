import { createMenuItem } from "./createMenuItem.js";
import { showCreateSection } from "./createNewCard.js";

let folders = [];
if (localStorage.getItem("Folders")) {
    const jsonString = localStorage.getItem("Folders");
    folders = JSON.parse(jsonString);
}


window.addEventListener("load", () => {
    let createButton = document.getElementById("anlegenButton");
    createButton.addEventListener("click", () => {
        let input = document.getElementById("verzeichnis-name");
        let folder = { name: input.value, cards: [] };

        folders.push(folder);
        createFolders(folders);

        saveFolders();
    });
    createFolders(folders);
});

export function saveFolders() {
    const jsonString = JSON.stringify(folders, null, 2);
    localStorage.setItem("Folders", jsonString);
}

function createFolders(folders) {
    fetch('sidebar.html') // The path to the HTML file
        .then(response => response.text()) // Get the response as text
        .then(htmlContent => {
            // Find the container element
            const container = document.getElementById('sidebar');

            // Insert the fetched HTML content into the container
            container.innerHTML = htmlContent;

            let menu = document.getElementById("accordionPanelsStayOpenExample");

            for (let i = 0; i < folders.length; i++) {
                let div = document.createElement("div");
                div.id = `accordionItem-${i}`;
                div.className = "accordion-item";
                div.innerHTML = createMenuItem(i, folders[i]);



                menu.appendChild(div);
            }

            addCardsEventListeners();
            addButtonsEventListeners();
        })
        .catch(error => {
            console.error('Error fetching the HTML file:', error);
        });

    /* let folders = document.getElementsByClassName("accordion-button");
    console.log(folders);
    for(let i = 0; i < folders.length; i++) {
        folders[i].addEventListener("click", (event) => {
            console.log("test");
            event.target.classList.add("bg-yellow");
        });
    } */
}

function addCardsEventListeners() {
    let menuItemsAll = document.getElementsByClassName("menu-item");

    let menuItems = [...menuItemsAll].filter((element) => element.classList.length == 1);

    for (let i = 0; i < menuItems.length; i++) {
        addSingleCardEventListener(menuItems[i], i);
    }
}

function addSingleCardEventListener(menuCard, index) {
    menuCard.addEventListener("click", () => {
        let menuItem = menuCard.parentElement.parentElement.parentElement.parentElement.parentElement;
        let text = menuItem.querySelector(".flex-grow-1").textContent;
        let folderIndex = folders.findIndex((folder) => folder.name == text);
        let card = folders[folderIndex].cards[index]
        console.log(card); //Die Ordnernamen müssen hierfür eindeutig sein
        showCreateSection(folders[folderIndex], folderIndex, true, card);
    });
}

function addButtonsEventListeners() {
    let addButtons = document.querySelectorAll(".menu-item.bg-dark.menu-button");
    for (let i = 0; i < addButtons.length; i++) {
        addButtons[i].addEventListener("click", (event) => {
            showCreateSection(folders[i], i);
        });
    }
}