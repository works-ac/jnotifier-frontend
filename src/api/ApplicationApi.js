import axios from "axios";
import { AppVariables } from "../app/AppVariables";

const apiClient = axios.create({
  baseURL: AppVariables.API_BASE_URL,
  timeout: 10000,
  timeoutErrorMessage:
    "Sorry, there's a problem connecting to our server right now, please try again!!!",
  withCredentials: true,
});

// apiClient.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;
//     const status = error?.response?.status;

//     if (status === 401 && !originalRequest._retry) {
//       // originalRequest._retry = true;

//       try {
//         await apiClient.post("/api/v1/auth/refresh-token");
//         return apiClient(originalRequest);
//       } catch (refreshError) {
//         return Promise.reject(refreshError);
//       }
//     }

//     return Promise.reject(error);
//   },
// );

export default apiClient;
