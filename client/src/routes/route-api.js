const BASE_URL = import.meta.env.VITE_BACKEND_URI;
const YT_API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;

export const WEB_PUSH_URI = {
  SUBSCRIBE: `${BASE_URL}/webpush/subscribe`,
};

export const AUTH_API_URI = {
  REGISTER_USER: `${BASE_URL}/auth/register`,
  CHECK_USERNAME: (username) => `${BASE_URL}/auth/user/${username}`,
  VERIFY_OTP: `${BASE_URL}/auth/verify`,
  VALIDATE_TOKEN: `${BASE_URL}/auth/validate`,
};

export const SCENARIO_API_URI = {
  LIST_BY_ID: (userId) => `${BASE_URL}/scenario?userId=${userId}`,
  CREATE: `${BASE_URL}/scenario`,
  UPDATE_BY_ID: (userID) => `${BASE_URL}/scenario/${userID}`,
  DELETE_BY_ID: (userID) => `${BASE_URL}/scenario/${userID}`,
};

export const RESUME_API_URI = {
  UPLOAD: `${BASE_URL}/resume`,
  GUEST_UPLOAD: `${BASE_URL}/resume/guest`,
  LIST: (userId) => `${BASE_URL}/resume/${userId}`,
  DOWNLOAD: (fileName) => `${BASE_URL}/resume/download?fileName=${fileName}`,
};

export const REPORT_API_URI = {
  LIST_BY_ID: (userId) => `${BASE_URL}/report?userId=${userId}`,
};

export const PATHWAY_API_URI = {
  SAVE_LAYOUT: `${BASE_URL}/course/save`,
  GENERATE_LAYOUT: `${BASE_URL}/course/generate`,
  GENERATE_CONTENT: `${BASE_URL}/chapter/generate`,
  GET_COURSE: `${BASE_URL}/course/get`,
  UPDATE_COURSE: `${BASE_URL}/course/layout`,
  YOUTUBE_BASE: `https://www.googleapis.com/youtube/v3/search`,
  GET_COURSE_BY_ID: `${BASE_URL}/course/get/course`,
  DELETE_COURSE_BY_ID: `${BASE_URL}/course/delete`,
  GET_CHAPTER_BY_COURSE: (courseId) => `${BASE_URL}/chapter/${courseId}`,
  GET_CHAPTER_BY_COURSE_CHAPTER: (courseId, chapterId) =>
    `${BASE_URL}/chapter/${courseId}/${chapterId}`,
  PUBLISH_COURSE_BY_ID: `${BASE_URL}/course/publish`,
  MARK_CHAPTER: `${BASE_URL}/chapter/chapter`,
};

export const JOBS_API_URI = {
  FETCH_ALL_JOBS: `${BASE_URL}/job`,
  FETCH_JOB_BY_ID: (jobId) => `${BASE_URL}/job/${jobId}`,
};

export const INSIGHTS_API_URI = {
  JOB_POSTINGS_OVER_TIME: (interval) =>
    `${BASE_URL}/insight/job/postdate?interval=${interval}`,
};

export const STRIPE_API_URI = {
  CREATE_CHECKOUT_SESSION: `${BASE_URL}/stripe/checkout`,
};
