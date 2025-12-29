<<<<<<< HEAD
console.log("airports.js loaded");
=======
console.log("airports.js loaded ✅");
>>>>>>> origin/main

window.Airports = {
  map: {},
  loaded: false,

  load: function (callback) {
    if (this.loaded) {
      callback();
      return;
    }

    const user = JSON.parse(localStorage.getItem("user"));

    $.ajax({
      url: "http://localhost/skyfly2/backend/rest/airports",
      type: "GET",
      headers: {
        "Authentication": user?.token
      },
      success: (airports) => {
        airports.forEach(a => {
          this.map[a.airport_id] = a;
        });

        this.loaded = true;
        console.log("Airports loaded ✅", this.map);
        callback();
      },
      error: () => {
        console.error("Failed to load airports");
<<<<<<< HEAD
      },
      complete: function () {
      $.unblockUI();
    }
=======
      }
>>>>>>> origin/main
    });
  }
};
