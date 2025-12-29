console.log("admin-flights.js loaded ✅");

function loadAdminFlights() {
  const user = JSON.parse(localStorage.getItem("user"));

  $.ajax({
    url: "http://localhost/skyfly2/backend/rest/flights",
    type: "GET",
    headers: {
      Authentication: user.token
    },
    success: function (flights) {
      let html = "";

      flights.forEach(f => {
        html += `
          <div class="admin-flight-card">
            <div class="admin-flight-info">
              <h5>${f.airline} ${f.flight_number}</h5>
              <p>${f.departure_airport_id} → ${f.arrival_airport_id}</p>
              <p>${f.departure_time} → ${f.arrival_time}</p>
              <p>$${f.price}</p>
            </div>

            <div class="admin-flight-actions">
              <button class="skyfly-btn delete-btn"
                onclick="deleteFlight(${f.flight_id})">
                Delete
              </button>
            </div>
          </div>
        `;
      });

      $("#admin-flights-list").html(html);
    }
  });
}

function deleteFlight(id) {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!confirm("Delete this flight?")) return;

  $.ajax({
    url: `http://localhost/skyfly2/backend/rest/flights/${id}`,
    type: "DELETE",
    headers: {
      Authentication: user.token
    },
    success: function () {
      loadAdminFlights();
    },
    error: function (xhr) {
      alert("Cannot delete flight");
    }
  });
}


function toggleFlight(id, active) {
  const user = JSON.parse(localStorage.getItem("user"));

  $.ajax({
    url: `http://localhost/skyfly2/backend/rest/flights/${id}`,
    type: "PATCH",
    headers: { Authentication: user.token },
    contentType: "application/json",
    data: JSON.stringify({ is_active: active ? 0 : 1 }),
    success: loadAdminFlights
  });
}


/* ADD FLIGHT */
console.log("admin-flights.js loaded ✅");

/* ===============================
   ADMIN ADD FLIGHT (ISOLATED)
================================ */

$(document).on("submit", "#admin-add-flight-form", function (e) {
  e.preventDefault();

  const user = JSON.parse(localStorage.getItem("user"));
  if (!user || user.role !== "admin") {
    alert("Admin only");
    return;
  }

  const airline = $("#af-airline").val();
  const flightNumber = $("#af-flight_number").val();

  if (!airline || !flightNumber) {
    alert("Airline and flight number are required");
    return;
  }

  const payload = {
    airline: airline,
    flight_number: flightNumber,
    departure_airport_id: Number($("#af-departure_airport_id").val()),
    arrival_airport_id: Number($("#af-arrival_airport_id").val()),
    departure_time: $("#af-departure_time").val().replace("T", " ") + ":00",
    arrival_time: $("#af-arrival_time").val().replace("T", " ") + ":00",
    price: Number($("#af-price").val()),
    seats_available: Number($("#af-seats_available").val())
  };

  $.ajax({
    url: "http://localhost/skyfly2/backend/rest/flights",
    type: "POST",
    headers: {
      Authentication: user.token
    },
    contentType: "application/json",
    data: JSON.stringify(payload),
    success: function () {
      alert("Flight added ✅");
      $("#admin-add-flight-form")[0].reset();

      // refresh admin list if you have it
      if (typeof loadAdminFlights === "function") {
        loadAdminFlights();
      }
    },
    error: function (xhr) {
      console.error(xhr.responseText);
      alert("Failed to add flight");
    }
  });
});
