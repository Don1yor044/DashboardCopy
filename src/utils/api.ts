import axios from "axios";
const baseURL = axios.create({
  baseURL: "https://873f-45-9-230-29.ngrok-free.app",
  headers: {
    "Content-Type": "application/json",
  },
});

export default baseURL;
