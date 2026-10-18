import ApplicationApi from "../api/ApplicationApi";

const APPLIED_JOBS_BASE_URI = "/users/applied-jobs/";

export async function markJobAsApplied(applicationId) {
  return await ApplicationApi.post(APPLIED_JOBS_BASE_URI + `mark/${applicationId}`);
}

export async function getAppliedJobs(page = 0, size = 10) {
  return await ApplicationApi.get(APPLIED_JOBS_BASE_URI + `list?page=${page}&size=${size}`);
}
