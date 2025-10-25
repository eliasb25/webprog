import { Folder } from "./folder.js";
import { Card } from "./card.js";
import { createMenuItem } from "./createMenuItem.js";


let folder1 = new Folder("Deutsch");
folder1.addCard(new Card("Rechtschreibung", "Inhalt 1"));
folder1.addCard(new Card("Rechtschreibung2", "Inhalt 2"));
folder1.addCard(new Card("Rechtschreibung3", "Inhalt 3"));
folder1.addCard(new Card("Rechtschreibung4", "Inhalt 4"));

let folder2 = new Folder("Englisch");

let folder3 = new Folder("Mathe");






const jsonString = JSON.stringify(folder1, null, 2);
localStorage.setItem(folder1.getName(), jsonString);







let folders = [folder1, folder2, folder3];

window.addEventListener("load", () => {
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
                div.innerHTML = createMenuItem(i, folders[i].getName(), folders[i].getCards());



                menu.appendChild(div);
            }

            addCardsEventListeners();
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
});

function addCardsEventListeners() {
    let menuItems = document.getElementsByClassName("menu-item");
    for (let i = 0; i < menuItems.length; i++) {
        menuItems[i].addEventListener("click", (event) => {
            let parent = event.target.parentElement.parentElement.parentElement.parentElement;
            let text = parent.querySelector(".accordion-button").innerText;
            text += " - " + event.target.innerText;
            console.log(text);
        })
    }
}