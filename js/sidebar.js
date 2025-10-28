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

    const editModalElement = document.getElementById('editDeckModal');
    if (editModalElement) {
        const editModal = bootstrap.Modal.getOrCreateInstance(editModalElement);
        const editModalInput = document.getElementById('edit-verzeichnis-name');
        const editModalSaveButton = document.getElementById('edit-speichernButton');

        editModalSaveButton.addEventListener('click', () => {
            const newName = editModalInput.value.trim();
            const index = editModalSaveButton.dataset.folderIndex; 

            if (newName && index !== undefined && folders[index]) {
                // Ordner umbenennen
                folders[index].name = newName;
                saveFolders();
                createFolders(folders); // Sidebar neu aufbauen
                editModal.hide(); // Modal schließen
            }
        });
    }

    const deleteModalElement = document.getElementById('deleteDeckModal');
    if (deleteModalElement) {
        const deleteModal = bootstrap.Modal.getOrCreateInstance(deleteModalElement);
        let deleteButton = document.getElementById("delete-löschenButton");

        deleteButton.addEventListener("click", () => {
        const index = deleteButton.dataset.folderIndex; 
            if(folders[index]){
                folders.splice(index, 1); // Ordner aus dem Array entfernen
                saveFolders();
                createFolders(folders); // Sidebar neu aufbauen
                deleteModal.hide();
            }
        });
    }
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

                let accordionButton = div.querySelector(".accordion-button");
                if (accordionButton) {
                    const collapseTargetId = accordionButton.dataset.bsTarget;
                    accordionButton.removeAttribute('data-bs-toggle');

                    // Dropdown-Container erstellen
                    let dropdownDiv = document.createElement("div");
                    dropdownDiv.className = "dropdown ms-auto folder-options-dropdown"; 
                    
                    dropdownDiv.innerHTML = `
                        <button class="btn btn-sm btn-light p-1 border-0" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <i class="bi bi-three-dots-vertical"></i>
                        </button>
                        <ul class="dropdown-menu">
                            <li><a class="dropdown-item learn-deck-btn" href="#" data-folder-index="${i}">Abfrage starten</a></li>
                            <li><hr class="dropdown-divider"></li>
                            <li><a class="dropdown-item edit-deck-btn" href="#" data-folder-index="${i}">Bearbeiten</a></li>
                            <li><hr class="dropdown-divider"></li>
                            <li><a class="dropdown-item delete-deck-btn text-danger" href="#" data-folder-index="${i}">Löschen</a></li>
                        </ul>
                    `;

                    dropdownDiv.addEventListener('click', (e) => {
                        e.stopPropagation();
                    });

                    // Dropdown an den Akkordeon-Button anhängen
                    accordionButton.appendChild(dropdownDiv);

                    accordionButton.addEventListener('click', (event) => {
                        if (event.target.closest('.folder-options-dropdown')) {
                            return; 
                        }

                        const collapseElement = document.querySelector(collapseTargetId);
                        if (collapseElement) {
                            bootstrap.Collapse.getOrCreateInstance(collapseElement).toggle();
                            accordionButton.classList.toggle('deck-open');
                        }
                    });
                }

                menu.appendChild(div);
            }

            addCardsEventListeners();
            addButtonsEventListeners();
            addDeckActionEventListeners();
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
        console.log(index); //Die Ordnernamen müssen hierfür eindeutig sein
        showCreateSection(folders[folderIndex], folderIndex, true, card, menuCard);
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

function addDeckActionEventListeners() {
    const editModalElement = document.getElementById('editDeckModal');
    if (!editModalElement) return; // Falls Modal nicht geladen ist
    const deleteDeckElement = document.getElementById('deleteDeckModal');
    if (!deleteDeckElement) return; // Falls Modal nicht geladen ist

    const editModal = bootstrap.Modal.getOrCreateInstance(editModalElement);
    const deleteModal = bootstrap.Modal.getOrCreateInstance(deleteDeckElement);
    const editModalInput = document.getElementById('edit-verzeichnis-name');
    const editModalSaveButton = document.getElementById('edit-speichernButton');
    const editModalLabel = document.getElementById('editDeckModalLabel');
    const deleteModalButton = document.getElementById('delete-löschenButton');
    const deleteModalLabel = document.getElementById('deleteDeckModalLabel');
    
    // --- Bearbeiten-Buttons ---
    document.querySelectorAll(".edit-deck-btn").forEach(button => {
        button.addEventListener("click", (event) => {
            event.preventDefault();
            event.stopPropagation();

            let index = event.currentTarget.dataset.folderIndex;
            let folder = folders[index];
            if (!folder) return;

            editModalLabel.innerText = `Ordner "${folder.name}" bearbeiten`;
            editModalInput.value = folder.name;
            
            editModalSaveButton.dataset.folderIndex = index;

            editModal.show();
        });
    });

    // --- Löschen-Buttons ---
    document.querySelectorAll(".delete-deck-btn").forEach(button => {
        button.addEventListener("click", (event) => {
            event.preventDefault();
            event.stopPropagation();

            let index = event.currentTarget.dataset.folderIndex;
            let folder = folders[index];
            if (!folder) return;

            deleteModalLabel.innerText = `Willst du Ordner "${folder.name}" wirklich löschen?`;

            deleteModalButton.dataset.folderIndex = index;

            deleteModal.show(); 
        });
    });

    // --- Abfrage-Buttons ---
    document.querySelectorAll(".learn-deck-btn").forEach(button => {
        button.addEventListener("click", (event) => {
            event.preventDefault();
            event.stopPropagation();


            window.location.href = `learning-page.html?folderIndex=${event.currentTarget.dataset.folderIndex}`;
            

        });
    });
}