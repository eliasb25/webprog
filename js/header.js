import { loadUserName, signOut } from './profil.js';
import { deleteAccount } from './profil.js';

window.addEventListener("load",async () => {
    await fetch('header.html') 
        .then(response => response.text()) 
        .then(htmlContent => {
            const container = document.getElementById('header');

            container.innerHTML = htmlContent;
        })
        .catch(error => {
            console.error('Error fetching the HTML file:', error);
        });

    fetch('footer.html')
        .then(response => response.text())
        .then(htmlContent => {
            const container = document.getElementById('footer');

            container.innerHTML = htmlContent;
        })
        .catch(error => {
            console.error('Error fetching the HTML file:', error);
        });

    const loginLi = document.querySelector('a.nav-link[href="login-page.html"]')?.parentElement;
    const profileIconLi = document.querySelector('a[data-bs-target="#userProfileModal"]')?.parentElement;

    const currentUserEmail = sessionStorage.getItem("currentUserEmail");

    if (currentUserEmail) {
        // ========== BENUTZER IST EINGELOGGT ==========
        if (loginLi) {
            loginLi.style.display = 'none';
        }

        if (profileIconLi) {
            profileIconLi.style.display = ''; // Sicherstellen, dass es sichtbar ist
        }

        const currentUserName = currentUserEmail.split('@')[0];
        const usernameLi = document.createElement('li');
        usernameLi.className = 'nav-item';
        usernameLi.innerHTML = `
            <a class="nav-link" href="#" data-bs-toggle="modal" data-bs-target="#userProfileModal">
                ${currentUserName}
            </a>
        `;
        
        if (profileIconLi) {
            profileIconLi.parentElement.insertBefore(usernameLi, profileIconLi);
        }

        loadUserName();
        deleteAccount();
        signOut();

    } else {
        // ========== BENUTZER IST NICHT EINGELOGGT ==========
        if (loginLi) {
            loginLi.style.display = '';
        }
        
        if (profileIconLi) {
            profileIconLi.style.display = 'none';
        }
    }
    
});
