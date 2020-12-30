export const BASE_URL = 'http://localhost:3200/';
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
};
