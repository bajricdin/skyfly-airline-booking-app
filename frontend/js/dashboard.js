$(document).on("spapp:loaded", function (e, view) {
  console.log("SPAPP LOADED:", view.id);

  if (view.id === "dashboard") {
<<<<<<< HEAD
    console.log("Dashboard activated");
=======
    console.log("Dashboard activated ✅");
>>>>>>> origin/main
    loadMyBookings();
  }

  if (view.id === "booking-confirmation") {
<<<<<<< HEAD
    console.log("Confirmation activated");
=======
    console.log("Confirmation activated ✅");
>>>>>>> origin/main
    loadConfirmation();
  }
});

function loadMyBookings() {
  $("#my-bookings-list").html("");

  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) {
    console.warn("No user in localStorage");
    return;
  }

  const url = "http://localhost/skyfly2/backend/rest/bookings";

  console.log("Loading bookings from:", url);

  $.ajax({
    url: url,
    type: "GET",
    headers: {
      "Authentication": user.token
    },
    success: function (bookings) {
<<<<<<< HEAD
      console.log("Bookings loaded", bookings);
=======
      console.log("Bookings loaded ✅", bookings);
>>>>>>> origin/main

      if (!bookings || bookings.length === 0) {
        $("#my-bookings-list").html("<p>No bookings found.</p>");
        return;
      }

      let html = "";

      bookings.forEach(b => {
        html += `
          <div class="skyfly-card">
            <div class="skyfly-card-info">
              <div>
                <h3>${b.airline} ${b.flight_number}</h3>
                <p><strong>Departure:</strong> ${b.departure_time}</p>
                <p><strong>Arrival:</strong> ${b.arrival_time}</p>
                <p><strong>Status:</strong> ${b.status}</p>
              </div>
            </div>

            <div class="skyfly-card-price">
              <h3>$${b.price}</h3>
            </div>
          </div>
        `;
      });

      $("#my-bookings-list").html(html);
    },
    error: function (err) {
      console.error("Bookings error", err.responseText);
<<<<<<< HEAD
    },complete: function () {
      $.unblockUI();
=======
>>>>>>> origin/main
    }
  });
}


