import AUTH_REDUX_CONSTANTS from '../constants/AuthReduxConstant';

// eslint-disable-next-line import/prefer-default-export
export const loggedUser = (state = null, action) => {
  switch (action.type) {
    case AUTH_REDUX_CONSTANTS.LOGIN_USER:
      return action.data;

    case AUTH_REDUX_CONSTANTS.CHANGE_USER_PROFILE_IMAGE:
      return {
        ...state,
        profilePic: action.data,
      };

    case AUTH_REDUX_CONSTANTS.CONFIGURE_2FA:
      return state;

    default:
      return state;
  }
};
