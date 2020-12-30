import AuthService from '../../../services/auth-services/AuthSevices';
import AUTH_REDUX_CONSTANTS from '../../constants/AuthReduxConstant';
import { errorNotification, successNotification } from '../../../constants/Toast';

// eslint-disable-next-line import/prefer-default-export
export const loginUser = (emailAddress, password) => {
  return (dispatch) => {
    AuthService.loginUser(emailAddress, password)
      .then((response) => {
        if (response.data.status === 'SUCCESS' || response.data.status === 'PROMPT_FOR_OTP') {
          dispatch({
            type: AUTH_REDUX_CONSTANTS.LOGIN_USER,
            data: response.data.data,
          });

          localStorage.setItem('userToken', response.data.token);
          successNotification('Login successfully');
        }
      })
      .catch((e) => {
        if (e.response.data.status === undefined) {
          errorNotification('It seems like server is down, Please try after sometime.');
        } else if (e.response.data.status === 'INTERNAL_SERVER_ERROR') {
          errorNotification('Internal server error');
        } else if (e.response.data.status === 'INVALID_EMAIL_OR_PASSWORD') {
          errorNotification('Invalid credential');
        }
      });
  };
};
