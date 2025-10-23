// Warte, bis das gesamte HTML-Dokument geladen ist
document.addEventListener("DOMContentLoaded", function () {
  
    // Finde das Formular-Element anhand seiner ID
    const signupForm = document.getElementById("signup-form");

    // Füge einen Event-Listener für das 'submit'-Ereignis hinzu
    signupForm.addEventListener("submit", function (event) {
        // Verhindere das Standard-Verhalten des Formulars (Seiten-Neuladen)
        event.preventDefault();

        // Hole die Werte aus den Input-Feldern
        const email = document.getElementById("emailInput").value;
        const password = document.getElementById("passwordInput").value;

        // 1. Lade vorhandene Benutzer aus dem localStorage
        // || [] sorgt dafür, dass wir ein leeres Array haben, falls noch nichts gespeichert ist
        const users = JSON.parse(localStorage.getItem("users")) || [];

        // 2. Prüfe, ob der Benutzer (E-Mail) bereits existiert
        const userExists = users.find(user => user.email === email);

        if (userExists) {
            alert("Diese E-Mail-Adresse ist bereits registriert!");
        } else {
            // 3. Füge den neuen Benutzer zum Array hinzu
            users.push({ email: email, password: password });

            // 4. Speichere das aktualisierte Array zurück im localStorage
            // JSON.stringify wandelt das Array in einen Text um (localStorage kann nur Text speichern)
            localStorage.setItem("users", JSON.stringify(users));

            alert("Registrierung erfolgreich! Du kannst dich jetzt anmelden.");

            window.location.href = "login-page.html";
        }
    });
});