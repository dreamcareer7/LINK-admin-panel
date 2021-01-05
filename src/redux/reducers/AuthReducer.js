import AUTH_REDUX_CONSTANTS from '../constants/AuthReduxConstant';

// eslint-disable-next-line import/prefer-default-export
export const loggedUser = (state = null, action) => {
  switch (action.type) {
    case AUTH_REDUX_CONSTANTS.LOGIN_USER:
      return action.data;

    case AUTH_REDUX_CONSTANTS.LOGOUT_USER:
      return state;

    default:
      return state;
  }
};
