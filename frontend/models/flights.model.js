console.log("flights.model.js loaded ✅");

window.FlightsModel = {
  getAll: function (done, fail) {
    RestClient.get("flights", done, fail);
  },

  getById: function (id, done, fail) {
    RestClient.get(`flights/${id}`, done, fail);
  },

  create: function (payload, done, fail) {
    RestClient.post("flights", payload, done, fail);
  },

  update: function (id, payload, done, fail) {
    RestClient.put(`flights/${id}`, payload, done, fail);
  },

  remove: function (id, done, fail) {
    RestClient.del(`flights/${id}`, done, fail);
  }
};
