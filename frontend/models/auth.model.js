console.log("auth.model.js loaded ✅");

window.AuthModel = {
  login: function (payload, done, fail) {
    $.ajax({
      url: Constants.PROJECT_BASE_URL + "auth/login",
      type: "POST",
      data: JSON.stringify(payload),
      contentType: "application/json",
      success: done,
      error: fail
    });
  },

  register: function (payload, done, fail) {
    $.ajax({
      url: Constants.PROJECT_BASE_URL + "auth/register",
      type: "POST",
      data: JSON.stringify(payload),
      contentType: "application/json",
      success: done,
      error: fail
    });
  }
};
