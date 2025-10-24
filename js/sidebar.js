folders = [new Folder("Deutsch"), new Folder("Englisch"), new Folder("Mathe")];

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
                div.innerHTML = createMenuItem(i, folders[i].getName());
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
});


function addButtonsEventListeners() {
    let addButtons = document.querySelectorAll(".menu-item.bg-dark.menu-button");
    for (let i = 0; i < addButtons.length; i++) {
        addButtons[i].addEventListener("click", (event) => {
            console.log(event.target.textContent);
        });
    }
}


function addCardsEventListeners() {
    let menuItemsAll = document.querySelectorAll(".menu-item");
    let menuItems = [...menuItemsAll].filter((element) => element.classList.length == 1);
    for (let i = 0; i < menuItems.length; i++) {
        menuItems[i].addEventListener("click", (event) => {
            let parent = event.target.parentElement.parentElement.parentElement.parentElement;
            let text = parent.querySelector(".accordion-button").innerText;
            text += " - " + event.target.innerText;
            console.log(text);
        })
    }
}