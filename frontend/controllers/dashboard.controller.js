console.log("dashboard.controller.js loaded ✅");

window.DashboardController = {
  onEnter: function () {
    BookingsModel.myBookings(
      (bookings) => DashboardView.renderBookings(bookings),
      (xhr) => console.error("Bookings error", xhr.responseText)
    );
  }
};
