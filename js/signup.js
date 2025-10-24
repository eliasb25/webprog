document.addEventListener("DOMContentLoaded", function () {
  
    const signupForm = document.getElementById("signup-form");

    signupForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const email = document.getElementById("emailInput").value;
        const password = document.getElementById("passwordInput").value;

        const users = JSON.parse(localStorage.getItem("users")) || [];

        const userExists = users.find(user => user.email === email);

        if (userExists) {
            alert("Diese E-Mail-Adresse ist bereits registriert!");
        } else {
            users.push({ email: email, password: password });

            localStorage.setItem("users", JSON.stringify(users));

            alert("Registrierung erfolgreich! Du kannst dich jetzt anmelden.");

            window.location.href = "login-page.html";
        }
    });
});