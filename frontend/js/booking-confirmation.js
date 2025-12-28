console.log("booking-confirmation.js loaded");

function loadConfirmation() {
  console.log("Loading booking confirmation");

  const flight = JSON.parse(localStorage.getItem("selected_flight"));
  const booking = JSON.parse(localStorage.getItem("booking_confirmation"));

  if (!flight || !booking) {
    $("#confirmation-summary").html(`
      <p style="color:red">Missing booking data.</p>
    `);
    return;
  }

  $("#confirmation-summary").html(`
    <p><strong>Passenger:</strong> ${booking.name}</p>
    <p><strong>Email:</strong> ${booking.email}</p>

    <hr>

    <p><strong>Flight:</strong> ${flight.airline} ${flight.flight_number}</p>
    <p><strong>Route:</strong> 
      ${flight.from.city} (${flight.from.iata_code}) →
      ${flight.to.city} (${flight.to.iata_code})
    </p>
    <p><strong>Departure:</strong> ${flight.departure_time}</p>
    <p><strong>Arrival:</strong> ${flight.arrival_time}</p>

    <hr>

    <p><strong>Total Paid:</strong> $${flight.price}</p>
  `);
}
