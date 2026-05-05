function showToast(message, type = "default") {
  const toast = document.getElementById("toast");
  if (!toast) return;

  toast.textContent = message;

  toast.classList.remove("success", "error");
  if (type === "success") toast.classList.add("success");
  if (type === "error") toast.classList.add("error");

  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 2500);
}

// API Configuration
const API_BASE_URL = "http://localhost:5000/api";

function getAuthHeaders() {
  const token = localStorage.getItem("token");
  if (!token) {
    window.location.href = "login.html"; // Redirect if no token
    return {};
  }
  return {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`
  };
}

async function apiGet(endpoint) {
  const res = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: getAuthHeaders()
  });
  if (res.status === 401) {
    localStorage.removeItem("token");
    window.location.href = "login.html";
  }
  return res.json();
}

async function apiPost(endpoint, data) {
  const res = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(data)
  });
  return res;
}

async function apiPut(endpoint, data) {
  const res = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(data)
  });
  return res;
}

async function apiDelete(endpoint) {
  const res = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: "DELETE",
    headers: getAuthHeaders()
  });
  return res;
}