console.log("flights.view.js loaded ✅");

window.FlightsView = {
  airlineImages: {
    "Turkish Airlines": "assets/turkish-airlines.png",
    "FlyDubai": "assets/flydubai.png",
    "RyanAir": "assets/ryanair.png",
    "SkyFly": "assets/skyfly.png",
    "SkyFly Airways": "assets/skyfly.png"
  },

  renderList: function (flights, isAdmin) {
    let html = "";

    flights.forEach(f => {
      const logo = this.airlineImages[f.airline] || "assets/airline-default.png";
      const from = AirportsModel.map[f.departure_airport_id];
      const to = AirportsModel.map[f.arrival_airport_id];

      html += `
        <div class="skyfly-card">
          <div class="skyfly-card-info">
            <img src="${logo}" class="skyfly-logo" alt="${f.airline}">
            <div>
              <h3>${f.airline} ${f.flight_number}</h3>
              <p>${from?.city || "Airport " + f.departure_airport_id} (${from?.iata_code || "-"}) → ${to?.city || "Airport " + f.arrival_airport_id} (${to?.iata_code || "-"})</p>
              <p>${f.departure_time} → ${f.arrival_time}</p>
            </div>
          </div>

          <div class="skyfly-card-price">
            <h3>$${f.price}</h3>
            <button class="skyfly-btn js-select-flight" data-id="${f.flight_id}">Select</button>

            ${
              isAdmin
                ? `
                  <button class="skyfly-btn mt-2 js-edit-flight" data-id="${f.flight_id}">Edit</button>
                  <button class="skyfly-btn mt-2 js-delete-flight" data-id="${f.flight_id}">Delete</button>
                `
                : ""
            }
          </div>
        </div>
      `;
    });

    $("#flights-list").html(html);
  }
};
