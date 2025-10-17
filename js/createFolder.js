

window.addEventListener("load", () => {
    let createButton = document.getElementById("anlegenButton");
    createButton.addEventListener("click", () => {
        let input = document.getElementById("verzeichnis-name");
        let folder = new Folder(input.value);
        folders.push(folder);
        console.log(folders);
        let menu = document.getElementById("accordionPanelsStayOpenExample");
        let div = document.createElement("div");
        div.id = "test";
        div.className = "accordion-item";
        div.innerHTML = createMenuItem(4, input.value);
        menu.appendChild(div);
        
    });
});