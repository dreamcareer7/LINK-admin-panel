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
        if (e.response.data.status === undefined) {
          errorNotification('It seems like server is down, Please try after sometime');
        } else if (e.response.data.status === 'INTERNAL_SERVER_ERROR') {
          errorNotification('Internal server error');
        }
      });
  };
};

export const updateErrorMessage = data => {
  return dispatch => {
    SettingServices.updateErrorMessage(data)
      .then(res => {
        if (res.data.status === 'SUCCESS') {
          dispatch({
            type: SETTING_REDUX_CONSTANTS.UPDATE_ERROR_MESSAGE,
            data: res.data,
          });
          dispatch(getAllErrorMessage());
          successNotification('Error message updated successfully');
        }
      })
      .catch(() => errorNotification('Error during updating Error Message'));
  };
};
