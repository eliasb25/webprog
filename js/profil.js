export function loadUserName() {
    const userEmail = sessionStorage.getItem("currentUserEmail");
    const trennzeichen = "@";

    const userName = `Hey ${userEmail.split(trennzeichen)[0]}`;

    const profil_name = document.getElementById("profile-email");


    if (userEmail && profil_name) {
        profil_name.innerHTML = userName;
    } else {
        if (profil_name) {
             profil_name.innerHTML = "Nicht angemeldet";
        }
    }

};

export function deleteAccount(){
    const logoutButton = document.getElementById("delete-account-button");

    logoutButton.addEventListener("click", function(event) {

        event.preventDefault();

        if (window.confirm("ACHTUNG!\n\Möchtest du dein Konto wirklich DAUERHAFT löschen?\n\nAlle deine Daten gehen dabei verloren und können nicht wiederhergestellt werden.")) {

        const emailToDelete = sessionStorage.getItem("currentUserEmail");

        if(emailToDelete) {
            const users = JSON.parse(localStorage.getItem("users")) || [];

            const updatedUsers = users.filter(user => user.email !== emailToDelete);

            localStorage.setItem("users", JSON.stringify(updatedUsers));
        }
        
        sessionStorage.removeItem("currentUserEmail");
        window.location.href = "sign-up-page.html";
    }
    });
}

export function signOut(){
    const logoutButton = document.getElementById("sign-out-button");

    logoutButton.addEventListener("click", function(event) {

        event.preventDefault();

        sessionStorage.removeItem("currentUserEmail");
        window.location.href = "login-page.html";
    });
}