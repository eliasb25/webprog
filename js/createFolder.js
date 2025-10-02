import { Folder } from "/js/folder.js";

window.addEventListener("load", () => {
    let createButton = document.getElementById("anlegenButton");
    createButton.addEventListener("click", () => {
        let input = document.getElementById("verzeichnis-name");
        let folder = new Folder(input.value);
        folders.push(folder);
    });
});