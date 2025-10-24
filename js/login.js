document.addEventListener("DOMContentLoaded", function () {

    const loginForm = document.getElementById("login-form");

    loginForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const email = document.getElementById("emailInput").value;
        const password = document.getElementById("passwordInput").value;

        const users = JSON.parse(localStorage.getItem("users")) || [];

        const userFound = users.find(user => user.email === email && user.password === password);

        if (userFound) {
            const today = getTodayDateString();
            const yesterday = getYesterdayDateString();
            const lastLogin = userFound.lastLoginDate;

            if (userFound.currentStreak === undefined) {
                userFound.currentStreak = 0;
            }
            if (userFound.bestStreak === undefined) {
                userFound.bestStreak = 0;
            }
            if (userFound.lastLoginDate === undefined) {
                userFound.lastLoginDate = null;
            }

            if (lastLogin === today) {
                //passiert nix
            } else if (lastLogin === yesterday) {
                userFound.currentStreak++;
                if (userFound.currentStreak > userFound.bestStreak) {
                    userFound.bestStreak = userFound.currentStreak;
                }
                userFound.lastLoginDate = today;
            } else {
                userFound.currentStreak = 1;
                userFound.lastLoginDate = today;
                if (userFound.bestStreak === 0) {
                    userFound.bestStreak = 1;
                }
            }

            const userIndex = users.findIndex(user => user.email === userFound.email);
            if (userIndex !== -1) {
                users[userIndex] = userFound;
                localStorage.setItem("users", JSON.stringify(users));
            }

            sessionStorage.setItem("currentUserEmail", userFound.email);
            window.location.href = "index.html";
        } else {
            alert("Falsche E-Mail oder falsches Passwort.");
        }
    });
});

function getTodayDateString() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Monate sind 0-indiziert
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

function getYesterdayDateString() {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const year = yesterday.getFullYear();
    const month = String(yesterday.getMonth() + 1).padStart(2, '0');
    const day = String(yesterday.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}