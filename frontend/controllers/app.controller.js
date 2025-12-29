console.log("app.controller.js loaded ✅");

window.AppController = {
  isAdmin: function () {
    const user = JSON.parse(localStorage.getItem("user") || "null");
    return user && user.role === "admin";
  },

  boot: function () {
    $(document).on("spapp:loaded", (e, view) => {
      if (view.id === "flights") FlightsController.onEnter();
      if (view.id === "checkout") CheckoutController.onEnter();
      if (view.id === "booking-confirmation") CheckoutController.onEnterConfirmation();
      if (view.id === "dashboard") DashboardController.onEnter();
      if (view.id === "admin-flights") AdminFlightsController.onEnter();
    });
  }
};

$(document).ready(function () {
  AppController.boot();
});
