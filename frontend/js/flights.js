console.log("flights.js loaded ✅");
let editingFlightId = null;

/* ===============================
   RELOAD ON HASH CHANGE (SAFE)
================================ */

$(window).on("hashchange", function () {
  if (location.hash === "#flights") {
    loadFlights();
  }
});

/* ===============================
   AIRLINE LOGOS
================================ */

const airlineImages = {
  "Turkish Airlines": "assets/turkish-airlines.png",
  "FlyDubai": "assets/flydubai.png",
  "RyanAir": "assets/ryanair.png",
  "SkyFly": "assets/skyfly.png",
  "SkyFly Airways": "assets/skyfly.png"
};

/* ===============================
   LOAD FLIGHTS
================================ */

function loadFlights() {
    applyFlightsAdminUI();
  console.log("Flights list element:", $("#flights-list").length);

  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) return;

  // 🔑 ENSURE AIRPORTS ARE LOADED FIRST
  Airports.load(() => {

    $.ajax({
      url: "http://localhost/skyfly2/backend/rest/flights",
      type: "GET",
      headers: {
        "Authentication": user.token
      },
      success: function (flights) {
        console.log("Flights loaded ✅", flights);

        let html = "";

        flights.forEach(f => {
          const logo = airlineImages[f.airline] || "assets/airline-default.png";

          const from = Airports.map[f.departure_airport_id];
          const to   = Airports.map[f.arrival_airport_id];

          html += `
            <div class="skyfly-card">
              <div class="skyfly-card-info">
                <img src="${logo}" class="skyfly-logo" alt="${f.airline}">
                <div>
                  <h3>${f.airline} ${f.flight_number}</h3>
                  <p>
                    ${from.city} (${from.iata_code})
                    →
                    ${to.city} (${to.iata_code})
                  </p>
                  <p>${f.departure_time} → ${f.arrival_time}</p>
                </div>
              </div>

              <div class="skyfly-card-price">
                <h3>$${f.price}</h3>

                <button class="skyfly-btn" onclick="selectFlight(${f.flight_id})">
                    Select
                </button>

                ${
                    isAdmin()
                    ? `
                        <button class="skyfly-btn mt-2" onclick="editFlight(${f.flight_id})">
                        Edit
                        </button>
                        <button class="skyfly-btn mt-2" onclick="deleteFlight(${f.flight_id})">
                        Delete
                        </button>
                    `
                    : ""
                }
                </div>
            </div>
          `;
        });

        $("#flights-list").html(html);
      },
      error: function (err) {
        console.error("Flights error", err.responseText);
      }
    });

  });
}

/* ===============================
   SELECT FLIGHT
================================ */

function selectFlight(flightId) {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) return;

  // always clear previous selection
  localStorage.removeItem("selected_flight");

  Airports.load(() => {

    $.ajax({
      url: `http://localhost/skyfly2/backend/rest/flights/${flightId}`,
      type: "GET",
      headers: {
        "Authentication": user.token
      },
      success: function (f) {

        const from = Airports.map[f.departure_airport_id];
        const to   = Airports.map[f.arrival_airport_id];

        // 🔥 STORE FULL, RESOLVED FLIGHT
        localStorage.setItem(
          "selected_flight",
          JSON.stringify({
            ...f,
            from,
            to
          })
        );

        location.hash = "#checkout";
      },
      error: function () {
        alert("Failed to load flight");
      }
    });

  });
}


function isAdmin() {
  const user = JSON.parse(localStorage.getItem("user"));
  return user && user.role === "admin";
}

function applyFlightsAdminUI() {
  if (isAdmin()) {
    $("#btn-open-add-flight").removeClass("d-none");
  } else {
    $("#btn-open-add-flight").addClass("d-none");
    $("#add-flight-modal").addClass("d-none");
  }
}

// Open/close modal
$(document).on("click", "#btn-open-add-flight", function () {
  $("#add-flight-modal").removeClass("d-none");
});

$(document).on("click", "#btn-close-add-flight", function () {
  $("#add-flight-modal").addClass("d-none");
});

// Submit add flight
$(document).on("submit", "#add-flight-form", function (e) {
  e.preventDefault();

  const user = JSON.parse(localStorage.getItem("user"));
  if (!user || user.role !== "admin") return;

  const payload = {
    airline: $("#af-airline").val().trim(),
    flight_number: $("#af-flight-number").val().trim(),
    departure_airport_id: +$("#af-dep-airport").val(),
    arrival_airport_id: +$("#af-arr-airport").val(),
    departure_time: $("#af-dep-time").val().replace("T", " ") + ":00",
    arrival_time: $("#af-arr-time").val().replace("T", " ") + ":00",
    price: +$("#af-price").val(),
    seats_available: +$("#af-seats").val()
  };

  const isEdit = editingFlightId !== null;

  $.ajax({
    url: isEdit
      ? `http://localhost/skyfly2/backend/rest/flights/${editingFlightId}`
      : "http://localhost/skyfly2/backend/rest/flights",
    type: isEdit ? "PUT" : "POST",
    headers: { "Authentication": user.token },
    contentType: "application/json",
    data: JSON.stringify(payload),
    success: function () {
      alert(isEdit ? "Flight updated ✅" : "Flight added ✅");
      editingFlightId = null;
      $("#add-flight-form")[0].reset();
      $("#add-flight-modal").addClass("d-none");
      loadFlights();
    },
    error: function (xhr) {
      console.error(xhr.responseText);
      alert("Save failed");
    }
  });
});


function deleteFlight(flightId) {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user || user.role !== "admin") {
    alert("Not authorized");
    return;
  }

  if (!confirm("Are you sure you want to delete this flight?")) return;

  $.ajax({
    url: `http://localhost/skyfly2/backend/rest/flights/${flightId}`,
    type: "DELETE",
    headers: {
      "Authentication": user.token
    },
    success: function () {
      alert("Flight deleted ✅");
      loadFlights();
    },
    error: function (xhr) {
      console.error(xhr.responseText);
      alert("Cannot delete flight that is already booked!");
    }
  });
}

function editFlight(flightId) {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user || user.role !== "admin") return;

  $.ajax({
    url: `http://localhost/skyfly2/backend/rest/flights/${flightId}`,
    type: "GET",
    headers: {
      "Authentication": user.token
    },
    success: function (f) {
      editingFlightId = f.flight_id;

      $("#af-airline").val(f.airline);
      $("#af-flight-number").val(f.flight_number);
      $("#af-dep-airport").val(f.departure_airport_id);
      $("#af-arr-airport").val(f.arrival_airport_id);
      $("#af-dep-time").val(f.departure_time.replace(" ", "T").slice(0, 16));
      $("#af-arr-time").val(f.arrival_time.replace(" ", "T").slice(0, 16));
      $("#af-price").val(f.price);
      $("#af-seats").val(f.seats_available);

      $("#add-flight-modal").removeClass("d-none");
    }
  });
}

$(document).on("click", "#btn-close-add-flight", function () {
  editingFlightId = null;
  $("#add-flight-modal").addClass("d-none");
});


