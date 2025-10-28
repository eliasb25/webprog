document.addEventListener('DOMContentLoaded', function() {

    const filterSelect = document.getElementById('badgeFilter');
    const badgeContainer = document.getElementById('badgeContainer');
    const badges = badgeContainer.querySelectorAll('[data-status]');

    function filterBadges() {
        const badges = badgeContainer.querySelectorAll('[data-status]');
        const selectedValue = filterSelect.value.toLowerCase();

        badges.forEach(badge => {
            const status = badge.getAttribute('data-status').toLowerCase();
            if (selectedValue === 'alle' || status === selectedValue) {
                badge.classList.remove('d-none');
            } else {
                badge.classList.add('d-none');
            }
        });
    }


    filterBadges();

    filterSelect.addEventListener('change', filterBadges);
});