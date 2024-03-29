import axios from 'axios';
import { API_METHODS, AUTH_URLS } from '../../constants/UrlConstant';
import ApiService from '../api-service/ApiService';

const AuthService = {
  loginUser: (emailAddress, password) => {
    return axios({
      method: API_METHODS.POST,
      url: AUTH_URLS.LOGIN_URL,
      data: {
        email: emailAddress,
        password,
      },
    });
  },
  forgotPassword: emailAddress => {
    return axios({
      method: API_METHODS.POST,
      url: AUTH_URLS.FORGOT_PASSWORD_URL,
      data: {
        email: emailAddress,
      },
    });
  },
  setNewPassword: (token, newPassword) => {
    return axios({
      method: API_METHODS.PUT,
      url: `${AUTH_URLS.RESET_PASSWORD_URL}${token}`,
      data: {
        password: newPassword,
      },
    });
  },
  verify2faLogin: (token, code) => {
    return axios({
      method: API_METHODS.POST,
      url: AUTH_URLS.VERIFY_2FA_LOGIN_URL,
      data: {
        token,
        code,
      },
    });
  },
  configure2faLogin: (twoFAStatus, code) => {
    const data = { twoFAStatus, code };
    return ApiService.putData(AUTH_URLS.CONFIGURE_2FA, data);
  },
  logOutUser: () => ApiService.postData(AUTH_URLS.USER_LOGOUT),
  getLogedInUser: () => ApiService.getData(AUTH_URLS.GET_USER_DETAILS),
  configure2FA: data => ApiService.putData(AUTH_URLS.CONFIGURE_2FA, data),
  setPassword: (token, data) => ApiService.putData(AUTH_URLS.SET_PASSWORD_URL + token, data),
};
export default AuthService;
