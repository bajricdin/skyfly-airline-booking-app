console.log("dashboard.view.js loaded ✅");

window.DashboardView = {
  renderBookings: function (bookings) {
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
  }
};
