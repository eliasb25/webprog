export function createMenuItem(num, folder){
    let res = `<h2 class="accordion-header" id="panelsStayOpen-heading${num}">`
                +'<button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"'
                    +`data-bs-target="#panelsStayOpen-collapse${num}" aria-expanded="false"`
                    +`aria-controls="panelsStayOpen-collapse${num}">`

                    + '<span class="flex-grow-1">'
                    +   `<b>${folder.name}</b>`
                    + '</span>'
                    + '<span role="button" class="bi bi-plus-circle-fill text-success me-2 add-card-btn">'
                    + '</span>'

                +'</button>'
            +'</h2>'
            +`<div id="panelsStayOpen-collapse${num}" class="accordion-collapse collapse"`
               +`aria-labelledby="panelsStayOpen-heading${num}">`;
    
    for(let i = 0; i < folder.cards.length; i++){
        res += createCard(folder.cards[i].front);
    }

    res += createAddButton(num);

    return res +'</div>';
}

export function createCard(name){
    return `<a href="#">
                <div class="accordion-body" style="padding: 0;">
                    <div class="menu-item">
                        ${name}
                    </div>
                </div>
            </a>`;
}

function createAddButton() {

    return `<a href="#">
                    <div class="accordion-body" style="padding: 0;">
                        <div class="menu-item bg-dark menu-button">
                            <img src="rsc/white-plus.jpg" class="plus-icon"></img>
                            <span>Neue Karte</span>
                        </div>
                    </div>
                </a>`;
}


function addButtonsEventListeners() {
    let addButtons = document.querySelectorAll(".menu-item.bg-dark.menu-button");
    for (let i = 0; i < addButtons.length; i++) {
        addButtons[i].addEventListener("click", (event) => {
            sessionStorage.setItem("selected-folder",i);
            window.location.href = "karte-anlegen.html";
        });
    }
}
