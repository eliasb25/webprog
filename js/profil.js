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

export function signOut(){
    const logoutButton = document.getElementById("logout-button");

    logoutButton.addEventListener("click", function(event) {
        event.preventDefault();

        const emailToDelete = sessionStorage.getItem("currentUserEmail");

        if(emailToDelete) {
            const users = JSON.parse(localStorage.getItem("users")) || [];

            const updatedUsers = users.filter(user => user.email !== emailToDelete);

            localStorage.setItem("users", JSON.stringify(updatedUsers));
        }
        
        sessionStorage.removeItem("currentUserEmail");
        window.location.href = "sign-up-page.html";
    });
}