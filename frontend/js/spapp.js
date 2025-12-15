$(document).ready(function () {
    var app = $.spapp({
        defaultView: "home",
        templateDir  : './views/',
    });

    // Routes
    app.route({
        view: "home",
        load: "home.html"
    });

    app.route({
        view: "login",
        load: "login.html"
    });

    app.route({
        view: "register",
        load: "register.html"
    });

    app.route({
        view: "dashboard",
        load: "dashboard.html",
        onReady: function () {
            loadMyBookings();
        }
    });

    app.route({
        view: "flights",
        load: "flights.html",
        onCreate: loadFlights,
        onReady: loadFlights
    });

    app.route({
        view: "checkout",
        load: "checkout.html",
        onReady: function () {
            loadCheckout();
        },
        onCreate: function () {
            loadCheckout();
        }    
    });

    app.route({
        view: "booking-confirmation",
        load: "booking-confirmation.html",
        onCreate: loadConfirmation,
        onReady:loadConfirmation
    });

    // app.route({
    //     view: "admin-flights",
    //     load: "admin-flights.html",
    //     onCreate: function () {
    //         loadAdminFlights();
    //     }
    // }); 
    app.run();
});

