console.log("checkout.controller.js loaded ✅");

window.CheckoutController = {
  onEnter: function () {
    const flight = JSON.parse(localStorage.getItem("selected_flight") || "null");
    if (!flight) return (location.hash = "#flights");

    CheckoutView.renderSummary(flight);
  },

  onSubmit: function () {
    const flight = JSON.parse(localStorage.getItem("selected_flight") || "null");
    if (!flight) return CheckoutView.showError("No flight selected.");

    const name = ($("#checkout-name").val() || "").trim();
    const email = ($("#checkout-email").val() || "").trim();

    if (name.length < 2) return CheckoutView.showError("Name is required.");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return CheckoutView.showError("Valid email is required.");

    BookingsModel.create(
      { flight_id: flight.flight_id },
      (booking) => {
        localStorage.setItem(
          "booking_confirmation",
          JSON.stringify({
            booking_id: booking.booking_id,
            passenger: { name, email },
            flight
          })
        );

        location.hash = "#booking-confirmation";
      },
      () => CheckoutView.showError("Booking failed.")
    );
  },

  onEnterConfirmation: function () {
    const data = JSON.parse(localStorage.getItem("booking_confirmation") || "null");
    if (!data) {
      $("#confirmation-summary").html(`<p style="color:red">Missing booking data.</p>`);
      return;
    }
    ConfirmationView.render(data);
  }
};

$(document).on("submit", "#skyfly-checkout-form", function (e) {
  e.preventDefault();
  CheckoutController.onSubmit();
});
