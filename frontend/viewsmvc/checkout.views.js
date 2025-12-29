console.log("checkout.view.js loaded ✅");

window.CheckoutView = {
  renderSummary: function (flight) {
    $("#checkout-flight-summary").html(`
      <p><strong>Flight:</strong> ${flight.airline} ${flight.flight_number}</p>
      <p><strong>Route:</strong> ${flight.from.city} (${flight.from.iata_code}) → ${flight.to.city} (${flight.to.iata_code})</p>
      <p><strong>Date:</strong> ${flight.departure_time}</p>
      <p><strong>Total:</strong> $${flight.price}</p>
    `);
  },

  showError: function (msg) {
    alert(msg);
  }
};
