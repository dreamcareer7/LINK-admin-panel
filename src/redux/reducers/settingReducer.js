import SETTING_REDUX_CONSTANTS from '../constants/SettingReduxConstant';

// eslint-disable-next-line import/prefer-default-export
export const errorMessage = (state = null, action) => {
  switch (action.type) {
    case SETTING_REDUX_CONSTANTS.GET_ERROR_DATA:
      return action.data;

    default:
      return state;
  }
};
