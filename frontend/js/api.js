console.log("api.js loaded");

const API_BASE = "http://localhost/skyfly2/backend/rest";

function getAuthHeaders() {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    ...(token && { "Authentication": token })
  };
}
