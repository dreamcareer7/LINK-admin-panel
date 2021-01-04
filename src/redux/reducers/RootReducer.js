import { combineReducers } from 'redux';
import { loggedUser } from './AuthReducer';
import { errorMessage } from './settingReducer';
import { manageAdmin } from './manageAdminReducer';
import { allQuotes } from './QuoteReducer';

const rootReducer = combineReducers({
  loggedUser,
  errorMessage,
  manageAdmin,
  // Quote
  allQuotes,
});
export default rootReducer;
