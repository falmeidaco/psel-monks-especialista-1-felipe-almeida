import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/wp-json/custom/v1",
});

export default api;