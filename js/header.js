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
    
    loadUserName();
    deleteAccount();
    signOut();
    
});
