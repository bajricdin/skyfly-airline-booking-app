console.log("api.js loaded");

const API_BASE = "skyfly-airline-booking-app-production.up.railway.app";

function getAuthHeaders() {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    ...(token && { "Authentication": token })
  };
}
