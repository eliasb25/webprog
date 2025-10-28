document.addEventListener("DOMContentLoaded", () => {
    populateRanking();
});

function populateRanking() {
    const currentUserEmail = sessionStorage.getItem("currentUserEmail");
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const sortedUsers = users.sort((a, b) => (b.cardsLearned || 0) - (a.cardsLearned || 0));

    const rank1Name = document.getElementById("rank-1-name");
    const rank1Score = document.getElementById("rank-1-score");
    const rank2Name = document.getElementById("rank-2-name");
    const rank2Score = document.getElementById("rank-2-score");
    const rank3Name = document.getElementById("rank-3-name");
    const rank3Score = document.getElementById("rank-3-score");

    const listContainer = document.getElementById("rank-list-container");
    listContainer.innerHTML = "";

    const getUserName = (email) => {
        return email.split('@')[0]
                    .replace(/[._]/g, ' ')
                    .replace(/\b\w/g, l => l.toUpperCase()); // Ersten Buchstaben groß schreiben
    };

    const updatePodiumSlot = (user, nameEl, scoreEl) => {
        if (user) {
            const score = user.totalCardsReviewed || 0;
            nameEl.textContent = getUserName(user.email);
            scoreEl.textContent = `${score} gelernte Karten`;
            
            if (user.email === currentUserEmail) {
                nameEl.textContent += " (DU)";
                nameEl.classList.add("fw-bold");
            }
        } else {
            nameEl.textContent = "-";
            scoreEl.textContent = "-";
            nameEl.parentElement.style.display = 'none';
        }
    };

    updatePodiumSlot(sortedUsers[0], rank1Name, rank1Score);
    updatePodiumSlot(sortedUsers[1], rank2Name, rank2Score);
    updatePodiumSlot(sortedUsers[2], rank3Name, rank3Score);

    if (sortedUsers.length > 3) {
        for (let i = 3; i < sortedUsers.length; i++) {
            const user = sortedUsers[i];
            const li = document.createElement("li");
            const score = user.cardsLearned || 0;
            const userName = getUserName(user.email);
            
            li.textContent = `${i + 1}. ${userName} - ${score} gelernte Karten`;
            
            if (user.email === currentUserEmail) {
                li.classList.add("fw-bold");
                li.textContent += " (DU)";
            }
            
            listContainer.appendChild(li);
        }
    } else if (sortedUsers.length === 0) {
        listContainer.innerHTML = "<li>Noch keine Daten vorhanden.</li>";
    }

}