import axios from "axios";
const api = axios.create({
  baseURL: "https://99cc-45-9-230-193.ngrok-free.app",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
