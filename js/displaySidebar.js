
window.addEventListener("load", () => {
    fetch('sidebar.html') // The path to the HTML file
    .then(response => response.text()) // Get the response as text
    .then(htmlContent => {
        // Find the container element
        const container = document.getElementById('sidebar');

        // Insert the fetched HTML content into the container
        container.innerHTML = htmlContent;
    })
    .catch(error => {
        console.error('Error fetching the HTML file:', error);
    })
});