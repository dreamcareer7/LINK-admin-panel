import ManageAdminService from '../../../services/manage-admin/ManageAdminServices';
import ADMIN_REDUX_CONSTANTS from '../../constants/ManageAdminConstant';
import { errorNotification } from '../../../constants/Toast';

// eslint-disable-next-line import/prefer-default-export
export const manageAdmin = token => {
  return dispatch => {
    ManageAdminService.manageAdmin(token)
      .then(response => {
        console.log('response->', response);
        if (response.data.status === 'SUCCESS') {
          dispatch({
            type: ADMIN_REDUX_CONSTANTS.GET_ADMIN_DATA,
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

export const deleteAdmin = (token, userId) => {
  return dispatch => {
    ManageAdminService.manageAdmin(token, userId)
      .then(response => {
        console.log('response->', response);
        if (response.data.status === 'SUCCESS') {
          dispatch({
            type: ADMIN_REDUX_CONSTANTS.DELETE_ADMIN,
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
