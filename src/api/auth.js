import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

export async function signup({ name, email, password }) {
  const response = await axios.post(`${API_URL}/api/auth/signup`, {
    name,
    email,
    password,
  });
  return response.data;
}

export async function login({ email, password }) {
  const response = await axios.post(`${API_URL}/api/auth/login`, {
    email,
    password,
  });
  return response.data;
}

export async function fetchMe(token) {
  const response = await axios.get(`${API_URL}/api/auth/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
}
