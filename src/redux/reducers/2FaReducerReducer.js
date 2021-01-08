import ADMIN_REDUX_CONSTANTS from '../constants/ManageAdminConstant';

// eslint-disable-next-line import/prefer-default-export
export const Admin2FAReducer = (state = null, action) => {
  switch (action.type) {
    case ADMIN_REDUX_CONSTANTS.GENERATE_2FA:
      return action.data;

    default:
      return state;
  }
};
