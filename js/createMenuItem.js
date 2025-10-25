export function createMenuItem(num, name, cards){
    let res = `<h2 class="accordion-header" id="panelsStayOpen-heading${num}">`
                +'<button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"'
                    +`data-bs-target="#panelsStayOpen-collapse${num}" aria-expanded="false"`
                    +`aria-controls="panelsStayOpen-collapse${num}">`

                    + '<span class="flex-grow-1">'
                    +   `<b>${name}</b>`
                    + '</span>'
                    + '<span role="button" class="bi bi-plus-circle-fill text-success me-2 add-card-btn" ' 
                    + `  onclick="event.stopPropagation(); alert('Plus-Button für ${name} geklickt!');">`
                    + '</span>'

                +'</button>'
            +'</h2>'
            +`<div id="panelsStayOpen-collapse${num}" class="accordion-collapse collapse"`
               +`aria-labelledby="panelsStayOpen-heading${num}">`;
    
    for(let i = 0; i < cards.length; i++){
        res += createCard(cards[i].front);
    }

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