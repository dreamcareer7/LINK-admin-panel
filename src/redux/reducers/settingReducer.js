// import AUTH_REDUX_CONSTANTS from '../constants/AuthReduxConstant';
import SETTING_REDUX_CONSTANTS from '../constants/SettingReduxConstant';

// eslint-disable-next-line import/prefer-default-export
export const errorMessage = (state = null, action) => {
  switch (action.type) {
    case SETTING_REDUX_CONSTANTS.GET_ERROR_DATA:
      return action.data;

    case SETTING_REDUX_CONSTANTS.UPDATE_ERROR_MESSAGE:
      // eslint-disable-next-line no-case-declarations
      const findIndex = state.findIndex(item => item._id === action.data._id);
      // eslint-disable-next-line no-case-declarations
      const temp = [...state];
      temp[findIndex] = action.data;
      return temp;

    default:
      return state;
  }
};
