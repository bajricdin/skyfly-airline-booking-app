console.log("airports.model.js loaded ✅");

window.AirportsModel = {
  map: {},
  loaded: false,

  ensureLoaded: function (done) {
    if (this.loaded) return done();

    RestClient.get(
      "airports",
      (airports) => {
        airports.forEach(a => (this.map[a.airport_id] = a));
        this.loaded = true;
        done();
      },
      () => {
        console.error("Failed to load airports");
        done();
      }
    );
  }
};
