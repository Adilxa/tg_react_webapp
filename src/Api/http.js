import axios from "axios";

export const API_URL = "";

const $api = axios.create({
  withCredentials: false,
  baseURL: API_URL,
});

$api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer 12345`;
  return config;
});

export default $api;
