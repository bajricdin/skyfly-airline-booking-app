console.log("confirmation.view.js loaded ✅");

window.ConfirmationView = {
  render: function (data) {
    const { passenger, flight } = data;

    $("#confirmation-summary").html(`
      <p><strong>Passenger:</strong> ${passenger.name}</p>
      <p><strong>Email:</strong> ${passenger.email}</p>
      <hr>
      <p><strong>Flight:</strong> ${flight.airline} ${flight.flight_number}</p>
      <p><strong>Route:</strong> ${flight.from.city} (${flight.from.iata_code}) → ${flight.to.city} (${flight.to.iata_code})</p>
      <p><strong>Departure:</strong> ${flight.departure_time}</p>
      <p><strong>Arrival:</strong> ${flight.arrival_time}</p>
      <hr>
      <p><strong>Total Paid:</strong> $${flight.price}</p>
    `);
  }
};
