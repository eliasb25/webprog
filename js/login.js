document.addEventListener("DOMContentLoaded", function () {

    const loginForm = document.getElementById("login-form");

    loginForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const email = document.getElementById("emailInput").value;
        const password = document.getElementById("passwordInput").value;

        const users = JSON.parse(localStorage.getItem("users")) || [];

        const userFound = users.find(user => user.email === email && user.password === password);

        if (userFound) {
            sessionStorage.setItem("currentUserEmail", userFound.email);
            window.location.href = "folder-selection.html";
        } else {
            alert("Falsche E-Mail oder falsches Passwort.");
        }
    });
});