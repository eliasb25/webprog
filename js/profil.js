export function loadUserName() {
    const userEmail = sessionStorage.getItem("currentUserEmail");
    const trennzeichen = "@";

    const userName = userEmail.split(trennzeichen)[0];

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
}