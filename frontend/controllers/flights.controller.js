console.log("flights.controller.js loaded ✅");

window.FlightsController = {
  onEnter: function () {
    AirportsModel.ensureLoaded(() => {
      FlightsModel.getAll(
        (flights) => FlightsView.renderList(flights, AppController.isAdmin()),
        (xhr) => console.error(xhr.responseText)
      );
    });
  }
};

$(document).on("click", ".js-select-flight", function () {
  const id = $(this).data("id");

  FlightsModel.getById(
    id,
    (f) => {
      AirportsModel.ensureLoaded(() => {
        const from = AirportsModel.map[f.departure_airport_id];
        const to = AirportsModel.map[f.arrival_airport_id];

        localStorage.setItem("selected_flight", JSON.stringify({ ...f, from, to }));
        location.hash = "#checkout";
      });
    },
    () => alert("Failed to load flight")
  );
});

$(document).on("click", ".js-delete-flight", function () {
  if (!AppController.isAdmin()) return alert("Not authorized");

  const id = $(this).data("id");
  if (!confirm("Delete this flight?")) return;

  FlightsModel.remove(
    id,
    () => FlightsController.onEnter(),
    (xhr) => alert(xhr.responseText || "Cannot delete flight (maybe already booked).")
  );
});
