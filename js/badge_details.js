document.addEventListener('DOMContentLoaded', function () {
    const badgeDetailModal = document.getElementById('badgeDetailModal');

    badgeDetailModal.addEventListener('show.bs.modal', function (event) {
        const badge = event.relatedTarget;

        const title = badge.getAttribute('data-title');
        const imgSrc = badge.getAttribute('data-img-src');
        const description = badge.getAttribute('data-description');

        const modalTitle = badgeDetailModal.querySelector('.modal-title');
        const modalImage = badgeDetailModal.querySelector('#modalBadgeImage');
        const modalDescription = badgeDetailModal.querySelector('#modalBadgeDescription');

        modalTitle.textContent = title;
        modalImage.src = imgSrc;
        modalDescription.textContent = description;
    });
});