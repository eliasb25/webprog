function createMenuItem(num, name){
    return `<h2 class="accordion-header" id="panelsStayOpen-heading${num}">`
                +'<button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"'
                    +`data-bs-target="#panelsStayOpen-collapse${num}" aria-expanded="false"`
                    +`aria-controls="panelsStayOpen-collapse${num}">`
                    +`<b>${name}</b>`
                +'</button>'
            +'</h2>'
            +`<div id="panelsStayOpen-collapse${num}" class="accordion-collapse collapse"`
               +`aria-labelledby="panelsStayOpen-heading${num}">`
                +'<a href="#">'
                    +'<div class="accordion-body" style="padding: 0;">'
                        +'<div class="menu-item">'
                            +'Karte 1'
                        +'</div>'
                    +'</div>'
                +'</a>'
                +'<a href="#">'
                    +'<div class="accordion-body" style="padding: 0;">'
                        +'<div class="menu-item" style="border-bottom:none;">'
                            +'Karte 2'
                        +'</div>'
                    +'</div>'
                +'</a>'
            +'</div>';
}