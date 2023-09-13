/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */

import axios from "axios";

const axiosIns = axios.create({
  baseURL: "http://127.0.0.1:8000/api/",
});

axiosIns.interceptors.request.use((config) => {
  const token = JSON.parse(localStorage.getItem("token"));
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    config.headers["Content-Type"] = "application/json";
  }
  return config;
});

export default axiosIns;
