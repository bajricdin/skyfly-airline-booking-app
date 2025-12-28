$("#login-form").validate({
  rules: {
    email: {
      required: true,
      email: true
    },
    password: {
      required: true,
      minlength: 6
    }
  },
  messages: {
    email: {
      required: "Email is required",
      email: "Enter a valid email address"
    },
    password: {
      required: "Password is required",
      minlength: "Password must be at least 6 characters"
    }
  },
  submitHandler: function () {
    $.blockUI({ message: "<h3>Logging in...</h3>" });
    UserService.login();
  }
});

$("#register-form").validate({
  rules: {
    full_name: {
      required: true,
      minlength: 3
    },
    email: {
      required: true,
      email: true
    },
    password: {
      required: true,
      minlength: 8
    }
  },
  messages: {
    full_name: "Full name must have at least 3 characters",
    email: {
      required: "Email is required",
      email: "Invalid email format"
    },
    password: {
      required: "Password is required",
      minlength: "Password must be at least 8 characters"
    }
  },
  submitHandler: function () {
    $.blockUI({ message: "<h3>Registering...</h3>" });
    UserService.register();
  }
});

$("#add-flight-form").validate({
  rules: {
    "af-airline": {
      required: true,
      minlength: 2
    },
    "af-flight-number": {
      required: true
    },
    "af-dep-airport": {
      required: true,
      digits: true
    },
    "af-arr-airport": {
      required: true,
      digits: true
    },
    "af-dep-time": {
      required: true
    },
    "af-arr-time": {
      required: true
    },
    "af-price": {
      required: true,
      number: true,
      min: 1
    },
    "af-seats": {
      required: true,
      digits: true,
      min: 1
    }
  },
  messages: {
    "af-airline": "Airline name is required",
    "af-price": "Price must be greater than 0",
    "af-seats": "Seats must be a positive number"
  },
  submitHandler: function () {
    $.blockUI({ message: "<h3>Saving flight...</h3>" });
    $("#add-flight-form").trigger("submit");
  }
});

$("#skyfly-checkout-form").validate({
  rules: {
    "checkout-name": {
      required: true,
      minlength: 3
    },
    "checkout-email": {
      required: true,
      email: true
    },
    "checkout-payment": {
      required: true
    }
  },
  messages: {
    "checkout-name": "Full name is required",
    "checkout-email": "Valid email is required",
    "checkout-payment": "Select a payment method"
  },
  submitHandler: function () {
    $.blockUI({ message: "<h3>Processing booking...</h3>" });
    $("#skyfly-checkout-form").trigger("submit");
  }
});

console.log("validation.js loaded ✅");

function initLoginValidation() {
  if (!$("#login-form").length || $("#login-form").data("validator")) return;

  $("#login-form").validate({
    rules: {
      email: { required: true, email: true },
      password: { required: true, minlength: 6 }
    },
    messages: {
      email: { required: "Email is required", email: "Enter a valid email" },
      password: { required: "Password is required", minlength: "Min 6 characters" }
    },
    errorClass: "input-error-text",
    errorElement: "div",
    submitHandler: function (form) { form.submit(); }
  });
}

function initRegisterValidation() {
  if (!$("#register-form").length || $("#register-form").data("validator")) return;

  $("#register-form").validate({
    rules: {
      full_name: { required: true, minlength: 3 },
      email: { required: true, email: true },
      password: { required: true, minlength: 8 }
    },
    messages: {
      full_name: "Full name must be at least 3 characters",
      email: { required: "Email is required", email: "Invalid email format" },
      password: { required: "Password is required", minlength: "Min 8 characters" }
    },
    errorClass: "input-error-text",
    errorElement: "div",
    submitHandler: function (form) { form.submit(); }
  });
}

function initCheckoutValidation() {
  if (!$("#skyfly-checkout-form").length || $("#skyfly-checkout-form").data("validator")) return;

  $("#skyfly-checkout-form").validate({
    rules: {
      name: { required: true, minlength: 3 },
      email: { required: true, email: true },
      payment_method: { required: true }
    },
    messages: {
      name: "Name is required",
      email: "Valid email is required",
      payment_method: "Select payment method"
    },
    errorClass: "input-error-text",
    errorElement: "div",
    submitHandler: function (form) { form.submit(); }
  });
}

function initAdminFlightValidation() {
  if (!$("#add-flight-form").length || $("#add-flight-form").data("validator")) return;

  $("#add-flight-form").validate({
    rules: {
      airline: { required: true, minlength: 2 },
      flight_number: { required: true },
      departure_airport_id: { required: true, digits: true },
      arrival_airport_id: { required: true, digits: true },
      departure_time: { required: true },
      arrival_time: { required: true },
      price: { required: true, number: true, min: 1 },
      seats_available: { required: true, digits: true, min: 1 }
    },
    messages: {
      airline: "Airline is required",
      price: "Price must be >= 1",
      seats_available: "Seats must be >= 1"
    },
    errorClass: "input-error-text",
    errorElement: "div",
    submitHandler: function (form) { form.submit(); }
  });
}

// Run validators when SPApp loads a view
$(document).on("spapp:loaded spapp.view.change", function () {
  initLoginValidation();
  initRegisterValidation();
  initCheckoutValidation();
  initAdminFlightValidation();
});

