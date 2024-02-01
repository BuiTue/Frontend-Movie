import axios from "axios";
import { getAcessToken } from "./auth/helper";

const instance = axios.create({
  baseURL: "http://localhost:8081/", // base URL
  timeout: 5000, // thời gian hết hạn call API
  headers: { "Content-Type": "application/json" },
});

// interceptor can thiệp vào quá trình request
instance.interceptors.request.use(
  function (config) {
    const token = getAcessToken();
    if (token) {
      config.headers["Authorization"] = `Bearer ` + token;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// interceptor can thiệp vào quá trình nhận response từ BE gửi về
instance.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default instance;
