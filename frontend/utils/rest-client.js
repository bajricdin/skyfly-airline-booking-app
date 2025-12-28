let RestClient = {
  get: function (url, callback, error_callback) {
    $.ajax({
      url: Constants.PROJECT_BASE_URL + url,
      type: "GET",
      beforeSend: function (xhr) {
        xhr.setRequestHeader(
          "Authentication",
          localStorage.getItem("user_token")
        );
      },
      success: callback,
      error: error_callback,
      complete: function () {
        $.unblockUI();
      }

    });
  },

  post: function (url, data, callback, error_callback) {
    $.ajax({
      url: Constants.PROJECT_BASE_URL + url,
      type: "POST",
      data: JSON.stringify(data),
      contentType: "application/json",
      beforeSend: function (xhr) {
        xhr.setRequestHeader(
          "Authentication",
          localStorage.getItem("user_token")
        );
      },
      success: callback,
      error: error_callback,
      complete: function () {
        $.unblockUI();
      }
    });
  }
};
