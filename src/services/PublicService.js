import ApplicationApi from "../api/ApplicationApi";

const PUBLIC_SERVICE_BASE_URL = "/public/";

export async function postView(clientDetails = {}) {
  const {
    visitedPage,
    browserName,
    browserVersion,
    osName,
    deviceType,
    deviceVendor,
  } = clientDetails;

  return await ApplicationApi.post(
    PUBLIC_SERVICE_BASE_URL + "views",
    undefined,
    {
      headers: {
        "x-user-loc": visitedPage,
        "x-brow-name": browserName ?? null,
        "X-Brow-Version": browserVersion ?? null,
        "X-OS-Name": osName ?? null,
        "X-Device-Type": deviceType ?? null,
        "X-Device-Vendor": deviceVendor ?? null,
      },
    },
  );
}
