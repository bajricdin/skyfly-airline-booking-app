(function ($) {
  $.spapp = function (options) {

    // Configuration and route storage
    var config, routes = {};

    config = $.extend({
      defaultView: 'home',
      templateDir: './views/',
      pageNotFound: false
    }, options);

    // Initialize routes from <main id="spapp"> sections
    $("main#spapp > section").each(function () {
      var elm = $(this);
      routes[elm.attr("id")] = {
        view: elm.attr("id"),
        load: elm.data("load"),
        onCreate: function () { },
        onReady: function () { }
      };
    });

    // Add route manually (optional)
    this.route = function (options) {
      $.extend(routes[options.view], options);
    };

    // Handle route changes
    var routeChange = function () {
      var id = location.hash.slice(1) || config.defaultView;
      var route = routes[id];
      var elm = $("#" + id);

      // Hide all other sections before showing the new one
      $("main#spapp > section").hide();

      if (!elm || !route) {
        if (config.pageNotFound) {
          window.location.hash = '#' + config.pageNotFound;
        } else {
          console.warn("Route not defined:", id);
        }
        return;
      }

      // Show the new section
      elm.show();

      if (elm.hasClass("spapp-created")) {
        route.onReady();
      } else {
        elm.addClass("spapp-created");
        if (!route.load) {
          route.onCreate();
          route.onReady();
        } else {
          elm.load(config.templateDir + route.load, function () {
            route.onCreate();
            route.onReady();
          });
        }
      }
    };

    // Initialize and run router
    this.run = function () {
      window.addEventListener('hashchange', routeChange);
      if (!window.location.hash) {
        window.location.hash = '#' + config.defaultView;
      } else {
        routeChange();
      }
    };

    return this;
  };
})(jQuery);
