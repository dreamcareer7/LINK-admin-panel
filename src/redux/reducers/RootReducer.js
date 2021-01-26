/* eslint-disable no-param-reassign */
import {combineReducers} from 'redux';
import {loggedUser} from './AuthReducer';
import {errorMessage} from './settingReducer';
import manageAdmin from './manageAdminReducer';
import {allQuotes, selectedQuote} from './QuoteReducer';
import {editAdminReducer} from './AdminEditReducer';
import {subscrberReducer} from './SubScribersReducer';
import {Admin2FAReducer} from './2FaReducerReducer';
import {dashboardReducer} from './dashboardReducer';

import AUTH_REDUX_CONSTANTS from '../constants/AuthReduxConstant';
import {LoaderReducer} from "./LoaderReducer";

const appReducer = combineReducers({
  loggedUser,
  apiLoader: LoaderReducer,
  errorMessage,
  manageAdmin,
  allQuotes,
  editAdminReducer,
  selectedQuote,
  subscrberReducer,
  Admin2FAReducer,
  dashboardReducer,
});

const rootReducer = (state, action) => {
  if (action.type === AUTH_REDUX_CONSTANTS.USER_LOGOUT) {
    // eslint-disable-next-line no-return-assign
    Object.keys(state).forEach(e => (state[e] = null));
  }

  return appReducer(state, action);
};

export default rootReducer;
