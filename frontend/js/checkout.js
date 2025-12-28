console.log("checkout.js loaded");

function loadCheckout() {
  const flight = JSON.parse(localStorage.getItem("selected_flight"));

  if (!flight) {
    location.hash = "#flights";
    return;
  }

  $("#checkout-flight-summary").html(`
    <p><strong>Flight:</strong> ${flight.airline} ${flight.flight_number}</p>
    <p><strong>Route:</strong>
  ${flight.from.city} (${flight.from.iata_code})
  →
  ${flight.to.city} (${flight.to.iata_code})
</p>
    <p><strong>Date:</strong> ${flight.departure_time}</p>
    <p><strong>Total:</strong> $${flight.price}</p>
  `);
}

$(document).on("submit", "#skyfly-checkout-form", function (e) {
  e.preventDefault();

  const user = JSON.parse(localStorage.getItem("user"));
  const flight = JSON.parse(localStorage.getItem("selected_flight"));

  const name = $("#checkout-name").val();
  const email = $("#checkout-email").val();

  if (!flight) {
    alert("No flight selected");
    return;
  }

  $.ajax({
    url: "skyfly-airline-booking-app-production.up.railway.app/bookings",
    type: "POST",
    headers: {
      "Authentication": user.token
    },
    contentType: "application/json",
    data: JSON.stringify({
      flight_id: flight.flight_id
    }),
    success: function (booking) {

      localStorage.setItem(
        "booking_confirmation",
        JSON.stringify({
          booking_id: booking.booking_id,
          name: name,
          email: email,
          flight: flight
        })
      );

      // (optional, still useful elsewhere)
      localStorage.setItem("last_booking_id", booking.booking_id);

      // navigate
      location.hash = "#booking-confirmation";
    },
    error: function () {
      alert("Booking failed");
    },
    complete: function () {
      $.unblockUI();
    }

  });
});
