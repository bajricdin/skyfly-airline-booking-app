// frontend/js/services/api.js
<<<<<<< HEAD
const API_BASE = 'http://localhost/skyfly2/backend/rest';
=======
const API_BASE = 'http://localhost/backend/rest'; // adapt when deployed
>>>>>>> origin/main

async function apiFetch(path, opts = {}) {
  const headers = opts.headers || {};
  const token = localStorage.getItem('token');
  if (token) headers['Authorization'] = 'Bearer ' + token;
  opts.headers = { 'Content-Type': 'application/json', ...headers };
  const res = await fetch(API_BASE + path, opts);
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

// examples
export async function searchFlights(query) {
  return apiFetch(`/routes/flights.php?${query}`);
}
