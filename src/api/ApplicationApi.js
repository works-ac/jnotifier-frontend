import axios from "axios";
import { AppVariables } from "../app/AppVariables";
import { refreshToken, clearCookies } from "../services/SignupService";
import axiosRetry from "axios-retry";

// 2. Initialize Axios Client
const apiClient = axios.create({
  baseURL: AppVariables.API_BASE_URL,
  timeout: 10000,
  timeoutErrorMessage:
    "Sorry, there's a problem connecting to our server right now, please try again!!!",
  withCredentials: true,
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve();
    }
  });
  failedQueue = [];
};

// 3. Response Interceptor
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // --- NEW: Handle Connection Refused & Network Errors ---
    if (!error.response) {
      // If error.response is undefined, the server didn't respond at all.
      // This catches ERR_CONNECTION_REFUSED, Network Errors, and CORS issues.

      // Preserve the custom timeout message if it was a timeout, otherwise set a friendly network error
      error.message =
        error.code === "ECONNABORTED"
          ? error.message
          : "Cannot connect to the server. Please check your internet connection or try again later.";

      // You can also trigger a global toast/UI notification here
      console.error("[Network Error]:", error.message);

      return Promise.reject(error);
    }
    // -------------------------------------------------------

    if (error.response?.status === 403) {
      if (
        error.response?.data?.error?.code === "TOKEN_REFRESH_EXPIRED" ||
        error.response?.data?.error?.code === "TOKEN_REFRESH_ERROR"
      ) {
        try {
          await clearCookies();
        } catch {}

        globalThis.location.href = "/account";
        return Promise.reject(error);
      }

      if (!originalRequest._retry && !originalRequest.url.includes("/clear")) {
        if (isRefreshing) {
          return new Promise((resolve, reject) => {
            failedQueue.push({ resolve, reject });
          })
            .then(() => apiClient(originalRequest))
            .catch((err) => Promise.reject(err));
        }

        originalRequest._retry = true;
        isRefreshing = true;

        try {
          await refreshToken();
          processQueue(null);
          return apiClient(originalRequest);
        } catch (refreshError) {
          processQueue(refreshError);
          globalThis.location.href = "/account";
          return Promise.reject(refreshError);
        } finally {
          isRefreshing = false;
        }
      }
    }

    return Promise.reject(error);
  },
);

axiosRetry(apiClient, {
  retries: 3,

  retryCondition: (error) => {
    return error.response?.status === 429 || axiosRetry.isNetworkError(error);
  },

  retryDelay: (retryCount, error) => {
    const headers = error.response?.headers;

    if (headers) {
      const headerVal = headers["retry-after"] || headers["request-after"];

      if (headerVal) {
        const delaySeconds = isNaN(headerVal)
          ? (new Date(headerVal).getTime() - Date.now()) / 1000
          : parseFloat(headerVal);

        if (delaySeconds > 0) {
          return delaySeconds * 1000 + 100;
        }
      }
    }

    const baseDelay = Math.pow(2, retryCount - 1) * 1000;
    const jitter = Math.random() * 200;
    return baseDelay + jitter;
  },

  // --- UPDATED: Accurately log the difference between 429 and Connection Refused ---
  onRetry: (retryCount, error, requestConfig) => {
    if (error.response?.status === 429) {
      const waitTime =
        error.response?.headers["retry-after"] ||
        error.response?.headers["request-after"];
      console.warn(
        `[HTTP 429] Rate limit hit on ${requestConfig.url}. Retrying attempt #${retryCount} after ${waitTime || "calculated"}s...`,
      );
    } else {
      console.warn(
        `[Network Error] Connection failed on ${requestConfig.url}. Retrying attempt #${retryCount}...`,
      );
    }
  },
});

export default apiClient;
