$(document).on("spapp:loaded", function (e, view) {
  console.log("SPAPP LOADED:", view.id);

  if (view.id === "dashboard") {
    console.log("Dashboard activated");
    loadMyBookings();
  }

  if (view.id === "booking-confirmation") {
    console.log("Confirmation activated");
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

  const url = "skyfly-airline-booking-app-production.up.railway.app/bookings";

  console.log("Loading bookings from:", url);

  $.ajax({
    url: url,
    type: "GET",
    headers: {
      "Authentication": user.token
    },
    success: function (bookings) {
      console.log("Bookings loaded", bookings);

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
    },complete: function () {
      $.unblockUI();
    }
  });
}


