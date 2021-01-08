import ADMIN_REDUX_CONSTANTS from '../constants/ManageAdminConstant';

// eslint-disable-next-line import/prefer-default-export
export const dashboardReducer = (state = null, action) => {
  switch (action.type) {
    case ADMIN_REDUX_CONSTANTS.GET_ADMIN_BY_ID:
      return action.data;

    default:
      return state;
  }
};
