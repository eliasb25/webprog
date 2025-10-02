// Führe das Skript aus, sobald die Seite vollständig geladen ist
document.addEventListener('DOMContentLoaded', function() {

    const filterSelect = document.getElementById('badgeFilter');
    const badgeContainer = document.getElementById('badgeContainer');
    const badges = badgeContainer.querySelectorAll('[data-status]');

    function filterBadges() {
        const selectedValue = filterSelect.value;

        badges.forEach(badge => {
            const status = badge.getAttribute('data-status');

            if (selectedValue === 'alle') {
                badge.classList.remove('d-none');
            } else {
                if (status === 'erreichte') {
                    badge.classList.remove('d-none');
                } else {
                    badge.classList.add('d-none');
                }
            }
        });
    }

    filterBadges();

    filterSelect.addEventListener('change', filterBadges);
});