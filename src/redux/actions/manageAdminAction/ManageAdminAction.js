import ManageAdminService from '../../../services/manage-admin/ManageAdminServices';
import ADMIN_REDUX_CONSTANTS from '../../constants/ManageAdminConstant';
import { errorNotification, successNotification } from '../../../constants/Toast';

// eslint-disable-next-line import/prefer-default-export
export const getAllAdmins = () => {
  return dispatch => {
    ManageAdminService.getAllAdmins()
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

export const getAdminById = id => {
  return dispatch => {
    ManageAdminService.getAdmin(id)
      .then(response => {
        if (response.data.status === 'SUCCESS') {
          dispatch({
            type: ADMIN_REDUX_CONSTANTS.GET_ADMIN_BY_ID,
            data: response.data.data,
          });
        }
      })
      .catch(() => errorNotification('Error during Getting Admin'));
  };
};

export const editAdminById = (id, data) => {
  return async dispatch => {
    await ManageAdminService.editAdmin(id, data)
      .then(response => {
        if (response.data.status === 'SUCCESS') {
          dispatch({
            type: ADMIN_REDUX_CONSTANTS.UPDATE_ADMIN,
            data: response.data.data,
          });
          successNotification('Admin Updated successfully');
        }
      })
      .catch(e => {
        return Promise.reject(e);
      });
  };
};

export const addAdmin = data => {
  return dispatch => {
    ManageAdminService.addAdmin(data)
      .then(res => {
        if (res.data.status === 'SUCCESS') {
          dispatch({
            type: ADMIN_REDUX_CONSTANTS.ADD_NEW_ADMIN,
            data: res.data.data,
          });
          successNotification('Admin added successfully');
        }
      })
      .catch(() => errorNotification('Error during adding Admin'));
  };
};

export const generate2FA = () => {
  return dispatch => {
    ManageAdminService.generate2FA()
      .then(response => {
        if (response.data.status === 'SUCCESS') {
          dispatch({
            type: ADMIN_REDUX_CONSTANTS.GENERATE_2FA,
            data: response.data.data,
          });
        }
      })
      .catch(() => errorNotification('Error during 2FA'));
  };
};

export const deleteUser = id => {
  return dispatch => {
    ManageAdminService.deleteUser(id)
      .then(res => {
        if (res.data.status === 'SUCCESS') {
          dispatch({
            type: ADMIN_REDUX_CONSTANTS.DELETE_ADMIN,
            id,
          });
          successNotification('Admin deleted successfully');
        }
      })
      .catch(() => errorNotification('Error during deleting Admin'));
  };
};

export const changeAdminPass = (data, cb) => {
  return dispatch => {
    ManageAdminService.changeAdminPass(data)
      .then(response => {
        if (response.data.status === 'SUCCESS') {
          dispatch({
            type: ADMIN_REDUX_CONSTANTS.CHANGE_PASS,
            data: response.data.data,
          });
          successNotification('Password successfully changed');
          if (cb) {
            cb();
          }
        }
      })
      .catch(() => errorNotification('Please check your current password'));
  };
};
