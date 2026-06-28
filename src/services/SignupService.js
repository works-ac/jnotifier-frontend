import ApplicationApi from "../api/ApplicationApi";

const AUTH_SERVICE_BASE_URI = "/auth/";

export async function getCaptcha() {
  return await ApplicationApi.get(AUTH_SERVICE_BASE_URI + "captcha");
}

export async function register(payload) {
  return await ApplicationApi.post(AUTH_SERVICE_BASE_URI + "signup", payload);
}

export async function resendOTP(payload) {
  return await ApplicationApi.post(
    AUTH_SERVICE_BASE_URI + "resend-otp",
    payload,
  );
}

export async function verifyOTP(payload) {
  return await ApplicationApi.post(
    AUTH_SERVICE_BASE_URI + "verify-otp",
    payload,
  );
}

export async function login(payload) {
  return await ApplicationApi.post(AUTH_SERVICE_BASE_URI + "signin", payload);
}

export async function refreshToken() {
  return await ApplicationApi.post(AUTH_SERVICE_BASE_URI + "refresh-token");
}

export async function logout() {
  return await ApplicationApi.post(AUTH_SERVICE_BASE_URI + "logout");
}
