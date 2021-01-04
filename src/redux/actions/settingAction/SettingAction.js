import SettingServices from '../../../services/setting-services/SettingServices';
import SETTING_REDUX_CONSTANTS from '../../constants/SettingReduxConstant';
import { errorNotification } from '../../../constants/Toast';

// eslint-disable-next-line import/prefer-default-export
export const errorMessage = token => {
  return dispatch => {
    SettingServices.errorMessage(token)
      .then(response => {
        if (response.data.status === 'SUCCESS') {
          dispatch({
            type: SETTING_REDUX_CONSTANTS.GET_ERROR_DATA,
            data: response.data.data,
          });
        }
      })
      .catch(e => {
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
