// import AUTH_REDUX_CONSTANTS from '../constants/AuthReduxConstant';
import SUBSCRIBERS_REDUX_CONSTANTS from '../constants/SubscribersConstant';

// eslint-disable-next-line import/prefer-default-export
export const subscrberReducer = (state = null, action) => {
  switch (action.type) {
    case SUBSCRIBERS_REDUX_CONSTANTS.GET_ALL_SUBSCRIBERS:
      return action.data;

    default:
      return state;
  }
};
