import axios from "axios";

import request from "./axios.request";
import response from "./axios.response";

const axiosInstance = axios.create({
  baseURL: "https://62ed1f1ba785760e6764cb98.mockapi.io/",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

axiosInstance.interceptors.request.use(
  request.onRequest,
  request.onRequestError
);
axiosInstance.interceptors.response.use(
  response.onResponse,
  response.onResponseError
);

export default axiosInstance;
