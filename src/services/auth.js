/* eslint-disable no-unused-vars, array-callback-return */

import axios from "axios";
import qs from "qs";
import {
  LOGIN_URL,
  REGISTER_URL,
  GET_USER_INFO_URL,
  FORGOT_PASSWORD_URL,
  RESET_PASSWORD_URL,
  GET_ORGANIZATION_INFO,
  MASTER_TRAINER_URL,
  PATCH_USER_FIRSTTIME_URL,
  GET_USER_DETAILS,
  UPDATE_AUDIT,
  AUDUIT_USER,
  SET_PERSONAL_TRAINER,
  USER_DIVISION,
  USER_BATCHES,
} from "../contants/urls";

const buildUrlParams = (url, params) => {
  let urls = `${url}?${qs.stringify(params)}`;

  return urls;
};

export const login = (payload) => axios.post(LOGIN_URL, payload);

export const register = (payload) => axios.post(REGISTER_URL, payload);

export const fetchUserInfo = () => axios.get(GET_USER_INFO_URL);

export const fetchUserDetails = (userId) =>
  axios.get(`${GET_USER_DETAILS}/${userId}`);

export const forgetPassword = (payload) =>
  axios.post(FORGOT_PASSWORD_URL, payload);

export const resetPassword = (payload) =>
  axios.post(RESET_PASSWORD_URL, payload);

export const fetchOrganizationInfo = (orgId) =>
  axios.get(`${GET_ORGANIZATION_INFO}/${orgId}`);

export const fetchMasterTrainer = (payload, url) =>
  axios.get(buildUrlParams(url, payload));

export const patchUserFirstTimeUser = (userId, payload) =>
  axios.patch(`${PATCH_USER_FIRSTTIME_URL}/${userId}`, payload);

export const patchAudit = (userId, payload) =>
  axios.patch(`${UPDATE_AUDIT}/${userId}`, payload);

export const saveAudit = (userId, payload, isEdit) => {
  if (isEdit) {
    return axios.patch(`${UPDATE_AUDIT}/${userId}`, payload);
  } else {
    return axios.post(`${UPDATE_AUDIT}/${userId}`, payload);
  }
};

export const fetchUsers = (pageNumber, pageSize) =>
  axios.get(`${AUDUIT_USER}?pageNumber=${pageNumber}&pageSize=${pageSize}`);
export const fetchAuditByUserId = (userId) =>
  axios.get(`${UPDATE_AUDIT}/${userId}`);
export const setPersonalTrainer = (userId, payload) => {
  return axios.put(
    buildUrlParams(`${SET_PERSONAL_TRAINER}/${userId}`, payload),
    { params: payload }
  );
};

export const getAllDivisions = () => axios.get(`${USER_DIVISION}`);
export const getAllBatches = () => axios.get(`${USER_BATCHES}`);
