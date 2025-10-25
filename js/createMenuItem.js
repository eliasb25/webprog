export function createMenuItem(num, name, cards){
    let res = `<h2 class="accordion-header" id="panelsStayOpen-heading${num}">`
                +'<button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"'
                    +`data-bs-target="#panelsStayOpen-collapse${num}" aria-expanded="false"`
                    +`aria-controls="panelsStayOpen-collapse${num}">`
                    +`<b>${name}</b>`
                +'</button>'
            +'</h2>'
            +`<div id="panelsStayOpen-collapse${num}" class="accordion-collapse collapse"`
               +`aria-labelledby="panelsStayOpen-heading${num}">`;
    
    for(let i = 0; i < cards.length; i++){
        res += createCard(cards[i].getFront());
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