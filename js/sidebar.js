window.addEventListener("load", ()=>{
    let menuItems = document.getElementsByClassName("menu-item");
    for(let i = 0; i < menuItems.length; i++){
        menuItems[i].addEventListener("click", (event)=>{
            let parent = event.target.parentElement.parentElement.parentElement.parentElement;
            let text = parent.querySelector(".accordion-button").innerText;
            text += " - " + event.target.innerText;
            console.log(text);
        })
    }
});