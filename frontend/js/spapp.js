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
        load: "dashboard.html"
     });

     app.route({
        view: "flights",
        load: "flights.html"
     });
    app.route({
        view: "flight-details",
        load: "flight-details.html"
     });
     app.route({
        view: "checkout",
        load: "checkout.html"
     });
     app.route({
        view: "booking-confirmation",
        load: "booking-confirmation.html"
     });





    // Scrolls to top of the page insted of the page section
    $(window).on("hashchange", function () {
        window.scrollTo(0, 0);
    });

    app.run();
});

