import axios from "axios";

const api = axios.create({
  baseURL: "https://fakestoreapi.com",
  headers: {
    "Content-Type": "application/json",
  },
});

// 🔐 Login API
export const loginService = async (credentials) => {
  const response = await api.post("/auth/login", {
    username: credentials.username,
    password: credentials.password,
  });

  return response.data; // { token }
};

// 📝 Register API
export const registerService = async (registerCredentials) => {
  const response = await api.post("/users", {
    username: registerCredentials.username,
    email: registerCredentials.email,
    password: registerCredentials.password,
  });

  return response.data; // user object
};

export default api;
