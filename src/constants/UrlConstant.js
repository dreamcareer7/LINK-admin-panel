export const BASE_URL = 'https://link.dev.gradlesol.com/app/';
// BASE_URL = 'https://link.dev.gradlesol.com/app/';
export const API_METHODS = {
  GET: 'GET',
  POST: 'POST',
  DELETE: 'DELETE',
  PUT: 'PUT',
};

export const AUTH_URLS = {
  LOGIN_URL: `${BASE_URL}authAdmin/login/`,
  FORGOT_PASSWORD_URL: `${BASE_URL}authAdmin/forgot-password/`,
  RESET_PASSWORD_URL: `${BASE_URL}authAdmin/reset-password/`,
  VERIFY_2FA_LOGIN_URL: `${BASE_URL}authAdmin/verify-2fa`,
  GET_ERROR_MESSAGE: `${BASE_URL}error-message/get-messages`,
  LOGOUT_USER: `${BASE_URL}authAdmin/logout`,
  GET_USER_DETAILS: `${BASE_URL}admin/get-admin`,
};

export const SETTING_URLS = {
  GET_ERROR_MESSAGE: `${BASE_URL}error-message/get-messages`,
};

export const MANAGE_ADMIN_URLS = {
  GET_ALL_ADMIN: `${BASE_URL}admin/all-admin`,
  DELETE_ADMIN: `${BASE_URL}admin/delete/`,
};
export const QUOTE_URLS = {
  ALL_QUOTE_URL: `${BASE_URL}quote/all-quote`,
  SET_PUBLISHED_STATUS_URL: `${BASE_URL}quote/published-unpublished/`,
  DELETE_QUOTE_URL: `${BASE_URL}quote/delete-quote/`,
};
