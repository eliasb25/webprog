let images = ['rsc/fire.png', 'rsc/training.png', 'rsc/shuttle.png'];


window.addEventListener("load", () => {
    
    let badgeContainer = document.getElementById('badgeContainer');

    const userJson = localStorage.getItem("users");
    let users = JSON.parse(userJson);
    const currentUserEmail = sessionStorage.getItem("currentUserEmail");
    let user = users.find(u => u.email === currentUserEmail);
    if (user) {
        if (!user.totalCardsReviewed) {
            user.totalCardsReviewed = 0;
        }

        let counter = 50;
        while (counter <= user.totalCardsReviewed) {
            let img = images[Math.floor(Math.random() * images.length)];
            badgeContainer.innerHTML += addBadge(counter, img, 'erreichte');
            counter += 50;
        }

        let img = images[Math.floor(Math.random() * images.length)];
        badgeContainer.innerHTML += addBadge(counter, img, 'gesperrt');
        
    }
});

function addBadge(num, img, status) {
    const badgeClass = status === 'erreichte' ? 'achieved' : 'locked';
    return `<div class="col-6 col-md-3 col-lg-2" data-status="${status}" data-bs-toggle="modal"
                    data-bs-target="#badgeDetailModal" data-title="${num} Karten" data-img-src="${img}"
                    data-description="Du hast schon ${num} Karten gelernt. Weiter so!">
                    <div class="badge-container ${badgeClass}">
                        <img src="${img}" class="badge-icon">
                    </div>
                    <p class="text-center mt-2"><strong>${num} Karten</strong></p>
                </div>`;
}
