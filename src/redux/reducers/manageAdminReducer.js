import ADMIN_REDUX_CONSTANTS from '../constants/ManageAdminConstant';

// eslint-disable-next-line import/prefer-default-export
export const manageAdmin = (state = null, action) => {
  switch (action.type) {
    case ADMIN_REDUX_CONSTANTS.GET_ADMIN_DATA:
      return action.data;
    case ADMIN_REDUX_CONSTANTS.DELETE_ADMIN:
      return action.data.filter(item => item !== action.data);

    default:
      return state;
  }
};
