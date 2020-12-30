import axios from 'axios';
import { API_METHODS, AUTH_URLS } from '../../constants/UrlConstant';

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
  forgotPassword: (emailAddress) => {
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
};
export default AuthService;
