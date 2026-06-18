import axios from "axios";
import { AppVariables } from "../app/AppVariables";
import AppStore from "../redux";

const apiClient = axios.create({
  baseURL: AppVariables.API_BASE_URL,
  timeout: 10000,
  timeoutErrorMessage:
    "Sorry, there's a problem connecting to our server right now, please try again!!!",
});

apiClient.interceptors.request.use(
  function (config) {
    const state = AppStore.getState();
    const { user } = state.auth || {};
    const { accessToken } = user || {};

    if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;

    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

export default apiClient;
