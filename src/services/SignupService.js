import ApplicationApi from "../api/ApplicationApi";

const AUTH_SERVICE_BASE_URI = "/auth/";

export async function getCaptcha() {
  return await ApplicationApi.get(AUTH_SERVICE_BASE_URI + "captcha");
}

export async function register(payload) {
  return await ApplicationApi.post(AUTH_SERVICE_BASE_URI + "signup", payload);
}
