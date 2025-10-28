document.addEventListener("DOMContentLoaded", function () {
  
    const signupForm = document.getElementById("signup-form");

    signupForm.addEventListener("submit", function (event) {
        event.preventDefault();
        
        const signUpElementSuccess = document.getElementById('signUpModalSuccess');
        if (!signUpElementSuccess) return;
        const signUpModalSuccess = bootstrap.Modal.getOrCreateInstance(signUpElementSuccess);
        const signUpModalLabelSuccess = document.getElementById('signUpModalLabelSuccess');

        const signUpElement = document.getElementById('signUpModal');
        if (!signUpElement) return;
        const signUpModal = bootstrap.Modal.getOrCreateInstance(signUpElement);
        const signUpModalLabel = document.getElementById('signUpModalLabel');

        const email = document.getElementById("emailInput").value;
        const password = document.getElementById("passwordInput").value;

        const users = JSON.parse(localStorage.getItem("users")) || [];


        const userExists = users.find(user => user.email === email);
        if (userExists) {
            signUpModalLabel.innerText = 'Diese E-Mail-Adresse ist bereits registriert!';
            signUpModal.show();
        } else {
            users.push({ 
                email: email, 
                password: password, 
                currentStreak: 0,
                bestStreak: 0,
                lastLoginDate: null,
                totalCardsReviewed: 0
            });

            localStorage.setItem("users", JSON.stringify(users));

            signUpModalLabelSuccess.innerText = 'Registrierung erfolgreich! Du kannst dich jetzt anmelden.';
            signUpModalSuccess.show();
        }
    });

    const acceptButton = document.getElementById("acceptButton");

    if (acceptButton) {
        acceptButton.addEventListener("click", function() {
            window.location.href = "login-page.html";
        });
    }
});