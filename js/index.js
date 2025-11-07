document.addEventListener('DOMContentLoaded', () => {

    

    const tabLinks = document.querySelectorAll('#list-tab .list-group-item');

    users = JSON.parse(localStorage.getItem("users")) || [];

    addUsers(users);

    tabLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault(); 
            console.log('Angeklickt:', link.id);
        });
    });

    const currentUserEmail = sessionStorage.getItem("currentUserEmail");
    
    if (currentUserEmail) {
        const users = JSON.parse(localStorage.getItem("users")) || [];
        const currentUser = users.find(user => user.email === currentUserEmail);

        if (currentUser) {
            const currentStreakEl = document.getElementById("current-streak-display");
            const bestStreakEl = document.getElementById("best-streak-display");

            if (currentStreakEl) {
                currentStreakEl.textContent = `${currentUser.currentStreak} Tage`;
            }
            if (bestStreakEl) {
                bestStreakEl.textContent = `${currentUser.bestStreak} Tage`;
            }

            const progressBarFg = document.querySelector(".progress-bar-fg");

            if (progressBarFg) {
                const currentStreak = currentUser.currentStreak || 0;
                const bestStreak = currentUser.bestStreak || 0;

                let percentage = 0;

                if (bestStreak > 0) {
                    percentage = Math.min((currentStreak / bestStreak) * 100, 100);
                }
                
                progressBarFg.style.width = `${percentage}%`;
            }
        } else {
            console.error("Eingeloggter Benutzer konnte nicht in localStorage gefunden werden.");
        }
    } else {
        console.warn("Kein Benutzer eingeloggt. Zeige Standard-Streak-Werte.");
        window.location.href = "login-page.html";
    }

    loadBadges();
});

function loadBadges() {

    let box = document.getElementById("badge-box");

    const userJson = localStorage.getItem("users");
    let users = JSON.parse(userJson);
    const currentUserEmail = sessionStorage.getItem("currentUserEmail");
    let user = users.find(u => u.email === currentUserEmail);
    if (user) {
        if (!user.totalCardsReviewed) {
            user.totalCardsReviewed = 0;
        }

        let badgeNumber = Math.floor(user.totalCardsReviewed / 50) * 50;

        box.innerHTML += `<div class="row">
                    <div class="col-6 col-md-3 col-lg-2 small-badge">
                        <div class="badge-container achieved">
                            <img src="rsc/fire.png" alt="Badge 1" class="badge-icon">
                        </div>
                        <p class="text-center mt-2"><strong>${badgeNumber} Karten</strong></p>
                    </div>

                    <div class="col-6 col-md-3 col-lg-2 small-badge">
                        <div class="badge-container locked">
                            <img src="rsc/training.png" alt="Badge 1" class="badge-icon">
                        </div>
                        <p class="text-center mt-2"><strong>${badgeNumber+50} Karten</strong></p>
                    </div>
                </div>`;
    }
    else {
        box.style.display = "none";
        return;
    }
}

function addUsers(users) {
     if(users.length < 2){
       
        for(let i = 1; i < 6; i++){
        users.push({ 
                email: `name${i}`, 
                password: i, 
                currentStreak: 0,
                bestStreak: 0,
                lastLoginDate: null,
                totalCardsReviewed: 0
            });
        }

        localStorage.setItem("users", JSON.stringify(users));
     }
}