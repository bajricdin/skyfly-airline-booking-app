var UserService = {
  init: function () {
<<<<<<< HEAD
    console.log("UserService.init()");
=======
    console.log("UserService.init() ✅");
>>>>>>> origin/main

    // REGISTER
    $(document).on("submit", "#register-form", function (e) {
      e.preventDefault();

      const payload = {
        full_name: $("#register-name").val(),
        email: $("#register-email").val(),
        password: $("#register-password").val()
      };

      $.ajax({
        url: Constants.PROJECT_BASE_URL + "auth/register",
        type: "POST",
        data: JSON.stringify(payload),
        contentType: "application/json",
        success: function () {
          alert("Registered successfully");
          window.location.hash = "#login";
        },
        error: function (xhr) {
          alert(xhr.responseText || "Registration failed");
<<<<<<< HEAD
        },
        complete: function () {
          $.unblockUI();
        }

=======
        }
>>>>>>> origin/main
      });
    });

    // LOGIN
    $(document).on("submit", "#login-form", function (e) {
      e.preventDefault();

      const payload = {
        email: $("#login-email").val(),
        password: $("#login-password").val()
      };

      $.ajax({
        url: Constants.PROJECT_BASE_URL + "auth/login",
        type: "POST",
        data: JSON.stringify(payload),
        contentType: "application/json",
        success: function (res) {
          localStorage.setItem("jwt", res.data.token);
          localStorage.setItem("user", JSON.stringify(res.data));

          UserService.applyAuthState();
          window.location.hash = "#dashboard";
        },
        error: function () {
          alert("Login failed");
        }
      });
    });
  },
    logout: function () {
    localStorage.removeItem("user");
    this.applyAuthState();
    window.location.hash = "#home";
  },

    applyAuthState: function () {
  const user = JSON.parse(localStorage.getItem("user"));

  // RESET EVERYTHING FIRST
  $(".guest-only").removeClass("d-none");
  $(".auth-only").addClass("d-none").removeClass("d-flex");
  $(".admin-only").addClass("d-none");

  if (user && user.token) {
    // show auth items EXCEPT admin
    $(".guest-only").addClass("d-none");
    $(".auth-only:not(.admin-only)")
      .removeClass("d-none")
      .addClass("d-flex");

    // show admin ONLY if admin
    if (user.role === "admin") {
      $(".admin-only")
        .removeClass("d-none")
        .addClass("d-flex");
    }
  }}};

$(document).ready(function () {
  UserService.applyAuthState();
<<<<<<< HEAD
});

=======
});
>>>>>>> origin/main
