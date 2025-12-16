$(document).on("spapp.view.change", function (e, view) {
  if (view === "flight-details") {
    loadFlightDetails();
  }
});

function loadFlightDetails() {
  const flightId = localStorage.getItem("selected_flight_id");
  if (!flightId) {
    window.location.hash = "#flights";
    return;
  }

  const user = JSON.parse(localStorage.getItem("user"));

  $.ajax({
    url: `http://localhost/skyfly2/backend/rest/flights/${flightId}`,
    type: "GET",
    headers: {
      Authentication: user?.token
    },
    success: function (f) {
      $("#fd-title").text(`${f.airline} ${f.flight_number}`);
      $("#fd-route").text(`Airport ${f.departure_airport_id} → Airport ${f.arrival_airport_id}`);
      $("#fd-time").text(`${f.departure_time} → ${f.arrival_time}`);
      $("#fd-price").text(`$${f.price}`);
    }
  });
}

function goToCheckout() {
  window.location.hash = "#checkout";
}
