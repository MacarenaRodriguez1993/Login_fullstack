import axios from "axios";
const intance = axios.create({
  baseURL: "http://localhost:3001/",
});

intance.interceptors.request.use(
  (config) => {
    const data = localStorage.getItem("user");
    const { token } = JSON.parse(data);
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default intance;
