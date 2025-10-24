document.addEventListener('DOMContentLoaded', () => {
            const tabLinks = document.querySelectorAll('#list-tab .list-group-item');

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
                } else {
                    console.error("Eingeloggter Benutzer konnte nicht in localStorage gefunden werden.");
                }
            } else {
                console.warn("Kein Benutzer eingeloggt. Zeige Standard-Streak-Werte.");
            }
        });