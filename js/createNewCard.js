window.addEventListener("load", () => {
    let addButtons = document.getElementsByClassName("add-card-btn");
    console.log(addButtons);
    if (addButtons != null) {
        for (let i = 0; i < addButtons.length; i++) {
            addButtons[i].addEventListener("click", () => {
                console.log(i);
            });
        }
    }
});