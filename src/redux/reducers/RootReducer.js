import { combineReducers } from 'redux';
import { loggedUser } from './AuthReducer';

const rootReducer = combineReducers({
  loggedUser,
});
export default rootReducer;
