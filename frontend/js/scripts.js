    $(document).ready(function () {
    UserService.init();
    UserService.applyAuthState();
    });

   // Auto-slide interval for the hero carousel
    const carouselElement = document.querySelector('#heroCarousel');
    const carousel = new bootstrap.Carousel(carouselElement, {
    interval: 5000, // 5 seconds
    ride: 'carousel'
    });

    // Smooth scrolling for internal links
    document.querySelectorAll('a.nav-link').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
            behavior: 'smooth'
            });
        }
        });
    });
    

    let currentIndex = 0;

    function moveSlide(direction) {
        const slides = document.querySelectorAll('.offer-card');
        const totalSlides = slides.length;
        const visibleSlides = window.innerWidth <= 768 ? 1 : 3; // 1 for mobile, 3 for desktop

        // Calculate new index based on direction
        if (direction === 1 && currentIndex < totalSlides - visibleSlides) {
            currentIndex++;
        } else if (direction === -1 && currentIndex > 0) {
            currentIndex--;
        }

        const offset = -currentIndex * (100 / visibleSlides);
        document.querySelector('.slider-wrapper').style.transform = `translateX(${offset}%)`;
    }
    let lastScrollTop = 0;
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', function() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > lastScrollTop) {
        // Scrolling down - hide navbar
        navbar.classList.add('hidden');
    } else {
        // Scrolling up - show navbar
        navbar.classList.remove('hidden');
    }
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // For Mobile or negative scrolling
});

document.addEventListener('DOMContentLoaded', function () {
    const destinationInput = document.getElementById('destination');
    const suggestionsList = document.getElementById('suggestions');
    const searchButton = document.getElementById('search-btn');
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toast-message');
    const dateInput = document.getElementById('date'); // <input type="month">
    const availableDatesList = document.createElement('ul');

    availableDatesList.id = 'available-dates';
    availableDatesList.className = 'available-dates-list';
    dateInput.parentElement.appendChild(availableDatesList);

    let offersData = [];
    let selectedDestination = '';

    // Fetch offers from JSON
    async function fetchOffers() {
        try {
            const response = await fetch('../json/offers.json');
            offersData = await response.json();
        } catch (error) {
            console.error('Error fetching offers:', error);
        }
    }

    function formatDate(jsonDate) {
        // Convert "10-14.12" → "2024-12" (assuming the trips are in 2024)
        const parts = jsonDate.split('.');
        if (parts.length === 2) {
            return `2024-${parts[1]}`; // Hardcoded year 2024 (modify if needed)
        }
        return null; // Invalid format
    }

    function displaySuggestions(suggestions) {
        suggestionsList.innerHTML = '';
        suggestions.forEach(dest => {
            const listItem = document.createElement('li');
            listItem.textContent = dest;
            listItem.addEventListener('click', function () {
                destinationInput.value = dest;
                suggestionsList.style.display = 'none';
                selectedDestination = dest;
                displayAvailableDates(dest);
            });
            suggestionsList.appendChild(listItem);
        });
        suggestionsList.style.display = 'block';
    }

    function displayAvailableDates(destination) {
        availableDatesList.innerHTML = '';
        const availableDates = [...new Set(offersData
            .filter(offer => offer.title.toLowerCase() === destination.toLowerCase())
            .map(offer => formatDate(offer.date))
            .filter(date => date))]; // Filter out null values

        if (availableDates.length) {
            availableDates.forEach(date => {
                const dateItem = document.createElement('li');
                dateItem.textContent = date;
                dateItem.addEventListener('click', function () {
                    dateInput.value = date;
                    availableDatesList.style.display = 'none';
                });
                availableDatesList.appendChild(dateItem);
            });
            availableDatesList.style.display = 'block';
        } else {
            availableDatesList.style.display = 'none';
        }
    }

    destinationInput.addEventListener('input', function () {
        const query = destinationInput.value.trim().toLowerCase();
        if (query) {
            const filteredDestinations = [...new Set(offersData.map(offer => offer.title))]
                .filter(dest => dest.toLowerCase().startsWith(query));

            displaySuggestions(filteredDestinations);
        } else {
            suggestionsList.style.display = 'none';
            availableDatesList.style.display = 'none';
        }
    });

    destinationInput.addEventListener('focus', function () {
        displaySuggestions([...new Set(offersData.map(offer => offer.title))]);
    });

    dateInput.addEventListener('focus', function () {
        if (selectedDestination) {
            displayAvailableDates(selectedDestination);
        }
    });

    document.addEventListener('click', function (event) {
        if (!event.target.closest('.input-group')) {
            suggestionsList.style.display = 'none';
            availableDatesList.style.display = 'none';
        }
    });

    function showToast(message) {
        toastMessage.textContent = message;
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }

    searchButton.addEventListener('click', function () {
        performSearch();
    });

    destinationInput.addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            const firstSuggestion = suggestionsList.querySelector('li');
            if (firstSuggestion) {
                if (!selectedDestination) {
                    destinationInput.value = firstSuggestion.textContent;
                    suggestionsList.style.display = 'none';
                    selectedDestination = firstSuggestion.textContent;
                    displayAvailableDates(selectedDestination);
                } else {
                    performSearch();
                }
            } else {
                performSearch();
            }
        }
    });

    function performSearch() {
        const destination = destinationInput.value.trim().toLowerCase();
        const travelDate = dateInput.value.trim();
    
        if (!destination || !travelDate) {
            showToast('Please enter all required information.');
            return;
        }
    
        // Find the offer based on the destination
        const matchedOffer = offersData.find(
            offer => offer.title.toLowerCase() === destination
        );
    
        if (matchedOffer && matchedOffer.available) {
            // Check if "PRILAGOĐENO" is in the badges list, redirect immediately if found
            if (matchedOffer.badges.includes("PRILAGOĐENO") || matchedOffer.badges.includes("MAJ")) {
                window.location.href = `./pages/${matchedOffer.link}`;
            } else {
                // If no "PRILAGOĐENO", continue with the regular date validation
                const matchedOfferByDate = offersData.find(
                    offer => offer.title.toLowerCase() === destination && formatDate(offer.date) === travelDate
                );
    
                if (matchedOfferByDate) {
                    window.location.href = `./pages/${matchedOfferByDate.link}`;
                } else {
                    showToast('Nažalost, nema ponude za ovu destinaciju i datum.');
                }
            }
        } else {
            showToast('Nažalost, nema ponude za ovu destinaciju.');
        }
    }
    
    

    // Load offers on page load
    fetchOffers();
});

var loader = document.getElementById('loadingio-spinner-ellipsis-nq4q5u6dq7r');
var backload = document.getElementById('backload');
    window.addEventListener('load', function() {
        // Set opacity to 0 for transition
        loader.style.opacity = '0';
        backload.style.opacity = '0';
    
        // Remove loader after the transition ends
        setTimeout(() => {
            loader.style.display = 'none';
            backload.style.display = 'none';
        }, 1200); // Match the duration to the CSS transition time (1s)
    });

    document.addEventListener("DOMContentLoaded", function () {
        fetch("../json/offers.json") // Adjust the path if needed
            .then(response => response.json())
            .then(offers => {
                const offersContainer = document.querySelector(".slider-wrapper");
    
                if (!offersContainer) return; // Prevent errors if no offers section
    
                offersContainer.innerHTML = ""; // Clear existing content
    
                offers.forEach(offer => {
                    // Create Offer Card
                    const offerCard = document.createElement("div");
                    offerCard.classList.add("offer-card");
                    if (!offer.available) {
                        offerCard.classList.add("unavailable");
                    }
    
                    offerCard.innerHTML = `
                        <div class="card-img">
                            <img src="${offer.image}" alt="${offer.title}" class="img-fluid">
                            <div class="badge-container">
                                ${offer.badges.map(badge => `<div class="badge">${badge}</div>`).join("")}
                            </div>
                            ${!offer.available ? '<div class="soon-overlay">Uskoro</div>' : ""}
                        </div>
                        <h3>${offer.title}</h3>
                        <p class="trip-duration">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-clock" viewBox="0 0 16 16">
                                <path d="M8 3.5a.5.5 0 0 1 .5.5v4h3a.5.5 0 0 1 0 1h-3.5a.5.5 0 0 1-.5-.5v-4a.5.5 0 0 1 .5-.5z"/>
                                <path d="M8 15a7 7 0 1 0 0-14 7 7 0 0 0 0 14zm0 1A8 8 0 1 1 8 0a8 8 0 0 1 0 16z"/>
                            </svg>
                            <span class="duration">Trajanje: ${offer.duration}</span>
                        </p>
                        <p class="date">${offer.date}</p>
                        <p class="price"><span class="normal-price">${offer.normalPrice}</span> <span class="discounted-price">${offer.discountedPrice}</span> po osobi</p>
                        <a href="${offer.available ? offer.link : '#'}" class="btn btn-primary ${offer.available ? "" : "disabled"}">Saznajte više</a>
                    `;
    
                    // Make the entire card clickable
                    offerCard.addEventListener("click", function () {
                        if (offer.available) {
                            window.location.href = `./pages/${offer.link}`;
                        }
                    });
    
                    offersContainer.appendChild(offerCard);
                });
            })
            .catch(error => console.error("Error loading offers:", error));
    });
    
    document.addEventListener('DOMContentLoaded', function () {
        const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
        const navbarCollapse = document.getElementById('navbar1');
      
        navLinks.forEach(link => {
          link.addEventListener('click', function () {
            if (window.innerWidth <= 992) { // Adjust the width as per your breakpoint
              const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
                toggle: false
              });
              bsCollapse.hide();
            }
          });
        });
      });
    

      document.addEventListener("DOMContentLoaded", function () {
        const form = document.getElementById("customTripForm");
        const successMessage = document.getElementById("successMessage");
    
        form.addEventListener("submit", function (event) {
          event.preventDefault(); // Prevent default form submission
    
          const formData = new FormData(form);
    
          fetch(form.action, {
            method: "POST",
            body: formData,
            headers: { "Accept": "application/json" }
          }).then(response => {
            if (response.ok) {
              successMessage.style.display = "block"; // Show success message
              form.reset(); // Reset form fields
              setTimeout(() => successMessage.style.display = "none", 5000); // Hide message after 5s
            } else {
              alert("Došlo je do greške. Molimo pokušajte ponovo.");
            }
          }).catch(() => {
            alert("Došlo je do greške pri slanju forme.");
          });
        });
      });
    

      // frontend/js/router.js
const routes = {
  '/': 'pages/home.html',
  '/home': 'pages/home.html',
  '/offers': 'pages/offers.html',
  '/flights': 'pages/flights.html',
  '/flight-details': 'pages/flight-details.html',
  '/login': 'pages/login.html',
  '/register': 'pages/register.html',
  '/dashboard': 'pages/dashboard.html'
};

async function loadContent(path) {
  const app = document.getElementById('app');
  try {
    const res = await fetch(path);
    if (!res.ok) throw new Error('Page not found');
    const html = await res.text();
    app.innerHTML = html;

    // run <script> tags inside the loaded HTML (simple approach)
    const tmp = document.createElement('div');
    tmp.innerHTML = html;
    tmp.querySelectorAll('script').forEach(oldScript => {
      const newScript = document.createElement('script');
      if (oldScript.src) {
        newScript.src = oldScript.src;
      } else {
        newScript.textContent = oldScript.textContent;
      }
      document.body.appendChild(newScript);
      // remove after run for cleanliness (optional)
      document.body.removeChild(newScript);
    });
  } catch (err) {
    app.innerHTML = `<p class="p-4">Page not found</p>`;
    console.error(err);
  }
}

function parseHash() {
  const hash = location.hash.slice(1) || '/';
  // separate path and query
  const [pathPart, queryPart] = hash.split('?');
  const path = pathPart.startsWith('/') ? pathPart : '/' + pathPart;
  return { path, query: queryPart || '' };
}

function router() {
  const { path, query } = parseHash();
  const page = routes[path] || routes['/'];
  loadContent(page).then(() => {
    // let page-specific JS read query using location.hash if needed
    window.dispatchEvent(new CustomEvent('pageLoaded', { detail: { path, query } }));
  });
}

window.addEventListener('hashchange', router);
window.addEventListener('load', router);

