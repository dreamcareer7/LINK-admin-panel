import ManageAdminService from '../../../services/manage-admin/ManageAdminServices';
import ADMIN_REDUX_CONSTANTS from '../../constants/ManageAdminConstant';
import { errorNotification, successNotification } from '../../../constants/Toast';

// eslint-disable-next-line import/prefer-default-export
export const manageAdmin = token => {
  return dispatch => {
    ManageAdminService.manageAdmin(token)
      .then(response => {
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
        }
      });
  };
};

export const deleteUser = id => {
  return dispatch => {
    ManageAdminService.deleteUser(id)
      .then(() => {
        dispatch({
          type: ADMIN_REDUX_CONSTANTS.DELETE_ADMIN,
          id,
        });
        successNotification('Admin deleted successfully');
      })
      .catch(() => errorNotification('Error during deleting Admin'));
  };
};
