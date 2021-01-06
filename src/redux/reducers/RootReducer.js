/* eslint-disable no-param-reassign */
import { combineReducers } from 'redux';
import { loggedUser } from './AuthReducer';
import { errorMessage } from './settingReducer';
import { manageAdmin } from './manageAdminReducer';
import { allQuotes, selectedQuote } from './QuoteReducer';
import AUTH_REDUX_CONSTANTS from '../constants/AuthReduxConstant';

const appReducer = combineReducers({
  loggedUser,
  errorMessage,
  manageAdmin,
  // Quote
  allQuotes,
  selectedQuote,
});

const rootReducer = (state, action) => {
  if (action.type === AUTH_REDUX_CONSTANTS.USER_LOGOUT) {
    // eslint-disable-next-line no-return-assign
    Object.keys(state).forEach(e => (state[e] = null));
  }

  return appReducer(state, action);
};

export default rootReducer;
