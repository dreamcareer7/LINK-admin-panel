import SettingServices from '../../../services/setting-services/SettingServices';
import SETTING_REDUX_CONSTANTS from '../../constants/SettingReduxConstant';
import { errorNotification, successNotification } from '../../../constants/Toast';

// eslint-disable-next-line import/prefer-default-export
export const getAllErrorMessage = () => {
  return dispatch => {
    SettingServices.getAllErrorMessage()
      .then(response => {
        if (response.data.status === 'SUCCESS') {
          dispatch({
            type: SETTING_REDUX_CONSTANTS.GET_ERROR_DATA,
            data: response.data.data,
          });
        }
      })
      .catch(e => {
        errorNotification('Error during updating');
        return Promise.reject(e);
      });
  };
};

export const updateErrorMessage = (id, data) => {
  return dispatch => {
    SettingServices.updateErrorMessage(id, data)
      .then(res => {
        dispatch({
          type: SETTING_REDUX_CONSTANTS.UPDATE_ERROR_MESSAGE,
          data: res.data,
        });
        successNotification('Error Message updated successfully');
      })
      .catch(() => errorNotification('Error during updating quote'));
  };
};
