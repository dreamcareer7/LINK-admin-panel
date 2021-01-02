import { combineReducers } from 'redux';
import { loggedUser } from './AuthReducer';
import { errorMessage } from './settingReducer';
import { manageAdmin } from './manageAdminReducer';

const rootReducer = combineReducers({
  loggedUser,
  errorMessage,
  manageAdmin,
});
export default rootReducer;
