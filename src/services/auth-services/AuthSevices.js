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
};
export default AuthService;
