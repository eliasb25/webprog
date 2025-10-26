document.addEventListener('DOMContentLoaded', () => {
            const tabLinks = document.querySelectorAll('#list-tab .list-group-item');

            users = JSON.parse(localStorage.getItem("users")) || [];

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
            }
        });