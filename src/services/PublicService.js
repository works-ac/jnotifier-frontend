import ApplicationApi from "../api/ApplicationApi";

const PUBLIC_SERVICE_BASE_URL = "/public/";

export async function postView() {
  return await ApplicationApi.post(PUBLIC_SERVICE_BASE_URL + "views");
}
