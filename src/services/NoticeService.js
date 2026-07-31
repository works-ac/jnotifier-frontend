import ApplicationApi from "../api/ApplicationApi";

const NOTICE_SERVICE_BASE_URL = "/public/";

export async function getNotices(payload) {
  const params = payload ?? { page: 0, size: 10 };
  return await ApplicationApi.get(NOTICE_SERVICE_BASE_URL + "notices", {
    params,
  });
}

export async function getNoticeById(noticeId) {
  return await ApplicationApi.get(
    NOTICE_SERVICE_BASE_URL + "notice/" + noticeId,
  );
}

export async function getAllArchivedNotices(payload) {
  const params = payload ?? { page: 0, size: 10 };
  return await ApplicationApi.get(
    NOTICE_SERVICE_BASE_URL + "notices/archived",
    {
      params,
    },
  );
}
