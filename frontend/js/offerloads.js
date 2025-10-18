document.addEventListener('DOMContentLoaded', function() {
  document.body.addEventListener('click', function(e) {
    const card = e.target.closest('.flight-card');
    if (!card) return; // clicked outside a card

    e.preventDefault();

    // Get target view from data attribute or default to #flights
    const target = card.getAttribute('data-href') || '#flights';

    // Optional: store destination info for later use
    const destination = card.querySelector('h3')?.textContent.trim();
    sessionStorage.setItem('selectedDestination', destination);

    // Navigate to the flights view
    location.hash = target;
  });
});
