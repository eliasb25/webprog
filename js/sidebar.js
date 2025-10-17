folders = ["Deutsch", "Englisch", "Mathe"];

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
                div.innerHTML = createMenuItem(i, folders[i]);
                menu.appendChild(div);
            }
        })
        .catch(error => {
            console.error('Error fetching the HTML file:', error);
        });

    let menuItems = document.getElementsByClassName("menu-item");
    for (let i = 0; i < menuItems.length; i++) {
        menuItems[i].addEventListener("click", (event) => {
            let parent = event.target.parentElement.parentElement.parentElement.parentElement;
            let text = parent.querySelector(".accordion-button").innerText;
            text += " - " + event.target.innerText;
            console.log(text);
        })
    }

    /* let folders = document.getElementsByClassName("accordion-button");
    console.log(folders);
    for(let i = 0; i < folders.length; i++) {
        folders[i].addEventListener("click", (event) => {
            console.log("test");
            event.target.classList.add("bg-yellow");
        });
    } */
});