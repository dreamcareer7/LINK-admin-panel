export const BASE_URL = 'https://link.dev.gradlesol.com/app/';
// export const BASE_URL = 'https://link.dev.humanpixel.com.au/app/'; // <-- HP Dev
// export const BASE_URL = 'https://link.test.humanpixel.com.au/app/'; // <-- HP Staging
// export const BASE_URL = 'https://jayla.linkfluencer.com/app/'; // <-- Production
// export const BASE_URL = 'https://7d43b9db8ce0.ngrok.io/';
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
  USER_LOGOUT: `${BASE_URL}authAdmin/logout`,
  GET_USER_DETAILS: `${BASE_URL}admin/get-admin`,
  CONFIGURE_2FA: `${BASE_URL}authAdmin/configure-2fa`,
  SET_PASSWORD_URL: `${BASE_URL}authAdmin/set-password/`,
};

export const SETTING_URLS = {
  GET_ERROR_MESSAGE: `${BASE_URL}error-message/get-messages`,
  UPDATE_ERROR_MESSAGE: `${BASE_URL}error-message/update-messages`,
};

export const SUBSCRIBERS_URLS = {
  GET_ALL_SUBSCRIBERS: `${BASE_URL}subscribers/get-subscribers`,
  DELETE_SUBSCRIPTION: `${BASE_URL}subscribers/delete-subscription/`,
  GET_SUBSCRIPTION_BYID: `${BASE_URL}subscribers/get-subscriber/`,
  GET_INDUSTRY: `${BASE_URL}organization/admin-industries`,
  GET_COMPANY_SIZE: `${BASE_URL}organization/admin-companysize`,
  UPDATE_SUBSCRIPTION: `${BASE_URL}subscribers/update-subscriber/`,
  INVITEE_SUBSCRIBERS: `${BASE_URL}client-invitation/get-invitations`,
  ADD_INVITED_SUBSCRIBERS: `${BASE_URL}client-invitation/send-invitation`,
  DOWNLOAD_SUBSCRIBERS: `${BASE_URL}subscribers/get-subscribers/download`,
  DOWNLOAD_INVITEES: `${BASE_URL}client-invitation/get-invitations/download`,
  SEARCH_SUBSCRIBERS: `${BASE_URL}subscribers/search-subscriber`,
  DELETE_INVITEE: `${BASE_URL}client-invitation/delete-invitation/`,
  EDIT_INVITEE: `${BASE_URL}client-invitation/get-invitations/`,
  UPDATE_INVITEE: `${BASE_URL}client-invitation/update-invitations/`,
};

export const DASHBOARD_URLS = {
  DEAL_VALUE_DATA: `${BASE_URL}admin-analytics/deal-value`,
  INDUSTRIES_VALUE_DATA: `${BASE_URL}admin-analytics/industries`,
  GENDER_VALUE_DATA: `${BASE_URL}admin-analytics/gender`,
  SUBSCRIPTION_VALUE_DATA: `${BASE_URL}admin-analytics/subscription`,
  OPPORTUNITY_VALUE_DATA: `${BASE_URL}admin-analytics/opportunities`,
  COMPANY_VALUE_DATA: `${BASE_URL}admin-analytics/company-size`,
};

export const MANAGE_ADMIN_URLS = {
  GET_ALL_ADMIN: `${BASE_URL}admin/all-admin`,
  GET_ADMIN: `${BASE_URL}admin/get-admin/`,
  ADD_ADMIN: `${BASE_URL}admin/sign-up`,
  UPDATE_ADMIN: `${BASE_URL}admin/update/`,
  DELETE_ADMIN: `${BASE_URL}admin/delete/`,
  GENERATE_2FA: `${BASE_URL}authAdmin/generate-2fa`,
  CHANGE_PASSWORD: `${BASE_URL}authAdmin/change-password`,
  ADD_PROFILE_PIC: `${BASE_URL}admin/upload/profile-pic`,
  DELETE_PROFILE_PIC: `${BASE_URL}admin/profile-pic`,
};
export const QUOTE_URLS = {
  ALL_QUOTE_URL: `${BASE_URL}quote/all-quote`,
  SET_PUBLISHED_STATUS_URL: `${BASE_URL}quote/published-unpublished/`,
  DELETE_QUOTE_URL: `${BASE_URL}quote/delete-quote/`,
  ADD_QUOTE_URL: `${BASE_URL}quote/add-quote/`,
  UPDATE_QUOTE_URL: `${BASE_URL}quote/update-quote/`,
  GET_SINGLE_QUOTE_URL: `${BASE_URL}quote/get-quote/`,
};
