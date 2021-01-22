import produce from 'immer';
import ADMIN_REDUX_CONSTANTS from '../constants/ManageAdminConstant';
// eslint-disable-next-line import/prefer-default-export
const manageAdminReducer = (state = null, action) => {
  switch (action.type) {
    case ADMIN_REDUX_CONSTANTS.GET_ADMIN_DATA:
      return action.data;

    case ADMIN_REDUX_CONSTANTS.DELETE_ADMIN:
      return state.filter(user => user._id !== action.id);

    case ADMIN_REDUX_CONSTANTS.UPDATE_ADMIN:
      // eslint-disable-next-line no-case-declarations
      // const findIndex = state.data.findIndex(item => item._id === action.data._id);
      return state;
    case ADMIN_REDUX_CONSTANTS.CHANGE_PASS:
      return state;

    default:
      return state;
  }
};

const manageAdmin = produce(manageAdminReducer);
export default manageAdmin;
