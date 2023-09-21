/* eslint-disable no-unused-vars, array-callback-return */
import Config from "../config";

export const BASE_URL = "http://localhost:4000/v1";
// export const BASE_URL = "https://uatapi.pedgog.in/v1";
// export let BASE_URL = Config.API_URL;

export const REGISTER_URL = `${BASE_URL}/auth/register`;
// export const REGISTER_URL = `http://localhost:5001/v1/auth/register`;
export const LOGIN_URL = `${BASE_URL}/auth/login`;
export const LOGOUT_URL = `${BASE_URL}/auth/logout`;
export const FORGOT_PASSWORD_URL = `${BASE_URL}/auth/forgot-password`;
export const RESET_PASSWORD_URL = `${BASE_URL}/auth/reset-password`;

export const GET_USER_INFO_URL = `${BASE_URL}/users/get/user`;
export const GET_USER_DETAILS = `${BASE_URL}/users`;
export const GET_ORGANIZATION_INFO = `${BASE_URL}/organization`;

export const DASHBOARD_CONFIG_URL = `${BASE_URL}/dashboard`;
// export const DASHBOARD_CONFIG_URL = `http://localhost:5001/v1/dashboard`;
// export const COLLEGE_DETAIL_URL = `${BASE_URL}/analytics/college`;

export const ANALYTICS_URL = `${BASE_URL}/analytics/`;
// export const ANALYTICS_URL = `http://localhost:8000/v1/analytics/`

// BASE_URL = "http://localhost:8000/v1"
export const MASTER_TRAINER_URL = `${ANALYTICS_URL}trainer_quality/master_trainer`;
export const CERTIFICATION_REPORT_URL = `${ANALYTICS_URL}field_Staff_quality/certification_report`;
export const LICI_REPORT_URL = `${ANALYTICS_URL}field_Staff_quality/li_ci_report`;

export const PATCH_USER_FIRSTTIME_URL = `${BASE_URL}/users`;
export const UPDATE_AUDIT = `${BASE_URL}/audit`;
export const AUDUIT_USER = `${BASE_URL}/audit/users`;
export const SET_PERSONAL_TRAINER = `${BASE_URL}/audit`;
