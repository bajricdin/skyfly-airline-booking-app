console.log("bookings.model.js loaded ✅");

window.BookingsModel = {
  myBookings: function (done, fail) {
    RestClient.get("bookings", done, fail);
  },

  create: function (payload, done, fail) {
    RestClient.post("bookings", payload, done, fail);
  }
};
